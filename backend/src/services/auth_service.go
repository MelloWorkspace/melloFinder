package services

import (
	"errors"

	"backend/src/config"
	dto "backend/src/dtos"
	"backend/src/helpers"
	"backend/src/models"

	"gorm.io/gorm"
)

type AuthService struct {
	db            *gorm.DB
	config        *config.Config
	userService   *UserService
	inviteService *InviteService
}

func NewAuthService(db *gorm.DB, config *config.Config, userService *UserService, inviteService *InviteService) *AuthService {
	return &AuthService{
		db:            db,
		config:        config,
		userService:   userService,
		inviteService: inviteService,
	}
}

func (s *AuthService) SendInvite(email string) (*dto.InviteResponse, error) {
	invite, err := s.inviteService.CreateInvite(email)
	if err != nil {
		return nil, err
	}

	// Here you would send email with invite token
	// For now, we just return the token
	return &dto.InviteResponse{
		Message: "Invite sent successfully",
		Token:   invite.Token,
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