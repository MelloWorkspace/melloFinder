package services

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"backend/src/config"
	"backend/src/models"

	"gorm.io/gorm"
)

type InviteService struct {
	db     *gorm.DB
	config *config.Config
}

func NewInviteService(db *gorm.DB, config *config.Config) *InviteService {
	return &InviteService{
		db:     db,
		config: config,
	}
}

func (s *InviteService) CreateInvite(email string) (*models.Invite, error) {
	// Check if user already exists
	var existingUser models.User
	if err := s.db.Where("email = ?", email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user already exists")
	}

	// Check if invite already exists and is pending
	var existingInvite models.Invite
	if err := s.db.Where("email = ? AND status = ?", email, models.InviteStatusPending).First(&existingInvite).Error; err == nil {
		if !existingInvite.IsExpired() {
			return &existingInvite, nil
		}
		// Mark as expired
		existingInvite.Status = models.InviteStatusExpired
		s.db.Save(&existingInvite)
	}

	// Generate token
	token, err := s.generateToken()
	if err != nil {
		return nil, err
	}

	invite := &models.Invite{
		Email:     email,
		Token:     token,
		Status:    models.InviteStatusPending,
		ExpiresAt: time.Now().Add(s.config.Invite.ExpiresIn),
	}

	if err := s.db.Create(invite).Error; err != nil {
		return nil, err
	}

	return invite, nil
}

func (s *InviteService) GetInviteByToken(token string) (*models.Invite, error) {
	var invite models.Invite
	if err := s.db.Where("token = ?", token).First(&invite).Error; err != nil {
		return nil, err
	}
	return &invite, nil
}

func (s *InviteService) AcceptInvite(token string) (*models.Invite, error) {
	invite, err := s.GetInviteByToken(token)
	if err != nil {
		return nil, err
	}

	if invite.Status != models.InviteStatusPending {
		return nil, errors.New("invite is not pending")
	}

	if invite.IsExpired() {
		invite.Status = models.InviteStatusExpired
		s.db.Save(invite)
		return nil, errors.New("invite has expired")
	}

	invite.Status = models.InviteStatusAccepted
	if err := s.db.Save(invite).Error; err != nil {
		return nil, err
	}

	return invite, nil
}

func (s *InviteService) generateToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}