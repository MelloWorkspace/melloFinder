package services

import (
	"backend/src/config"
	dto "backend/src/dtos"
	"backend/src/helpers"
	"backend/src/models"
	"errors"
	"fmt"
	"log"

	"gorm.io/gorm"
)

type AuthService struct {
	db            *gorm.DB
	config        *config.Config
	userService   *UserService
	inviteService *InviteService
	emailService  *EmailService
}

func NewAuthService(db *gorm.DB, config *config.Config, userService *UserService, inviteService *InviteService, emailService *EmailService) *AuthService {
	return &AuthService{
		db:            db,
		config:        config,
		userService:   userService,
		inviteService: inviteService,
		emailService:  emailService,
	}
}

func (s *AuthService) SendInvite(email string) (*dto.InviteResponse, error) {
	invite, err := s.inviteService.CreateInvite(email)
	if err != nil {
		return nil, err
	}

	// Отправляем email с приглашением
	if err := s.emailService.SendInviteEmail(email, invite.Token); err != nil {
		log.Printf("Failed to send invite email to %s: %v", email, err)
		
		// Помечаем инвайт как failed (вместо удаления)
		if markErr := s.inviteService.MarkInviteAsFailed(invite.ID.String()); markErr != nil {
			log.Printf("Failed to mark invite as failed: %v", markErr)
		}
		
		return nil, fmt.Errorf("failed to send invite email: %w", err)
	}

	return &dto.InviteResponse{
		Message: "Invite sent successfully",
	}, nil
}

func (s *AuthService) AcceptInvite(req *dto.AcceptInviteRequest) (*dto.AuthResponse, error) {
	invite, err := s.inviteService.AcceptInvite(req.Token)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &models.User{
		Email:     invite.Email,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		IsActive:  true,
	}

	hashedPassword, err := helpers.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}
	user.Password = hashedPassword

	if err := s.db.Create(user).Error; err != nil {
		return nil, err
	}

	// Отправляем приветственный email
	go func() {
		welcomeSubject := "Добро пожаловать!"
		welcomeBody := `
		<h2>Добро пожаловать в нашу систему!</h2>
		<p>Ваша регистрация успешно завершена.</p>
		<p>Вы можете войти в систему, используя ваш email и пароль.</p>
		`
		if err := s.emailService.SendEmail(user.Email, welcomeSubject, welcomeBody, true); err != nil {
			log.Printf("Failed to send welcome email to %s: %v", user.Email, err)
		}
	}()

	// Generate JWT
	token, err := helpers.GenerateJWT(user.ID, user.Email, s.config.JWT.Secret, s.config.JWT.ExpiresIn)
	if err != nil {
		return nil, err
	}

	userDTO := dto.UserDTO{
		ID:        user.ID,
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}

	return &dto.AuthResponse{
		Token: token,
		User:  userDTO,
	}, nil
}

func (s *InviteService) MarkInviteAsFailed(id string) error {
	return s.db.Model(&models.Invite{}).
		Where("id = ?", id).
		Update("status", "failed").Error
}

func (s *AuthService) Login(req *dto.LoginRequest) (*dto.AuthResponse, error) {
	user, err := s.userService.GetUserByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	if !helpers.CheckPassword(req.Password, user.Password) {
		return nil, errors.New("invalid credentials")
	}

	if !user.IsActive {
		return nil, errors.New("account is deactivated")
	}

	token, err := helpers.GenerateJWT(user.ID, user.Email, s.config.JWT.Secret, s.config.JWT.ExpiresIn)
	if err != nil {
		return nil, err
	}

	userDTO := dto.UserDTO{
		ID:        user.ID,
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}

	return &dto.AuthResponse{
		Token: token,
		User:  userDTO,
	}, nil
}
