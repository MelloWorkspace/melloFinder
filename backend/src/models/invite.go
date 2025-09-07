package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type InviteStatus string

const (
	InviteStatusPending  InviteStatus = "pending"
	InviteStatusAccepted InviteStatus = "accepted"
	InviteStatusExpired  InviteStatus = "expired"
	InviteStatusRejected InviteStatus = "rejected"
)

type Invite struct {
	ID        uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Email     string         `json:"email" gorm:"not null"`
	Token     string         `json:"token" gorm:"uniqueIndex;not null"`
	Status    InviteStatus   `json:"status" gorm:"default:'pending'"`
	ExpiresAt time.Time      `json:"expires_at" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

func (i *Invite) BeforeCreate(tx *gorm.DB) error {
	if i.ID == uuid.Nil {
		i.ID = uuid.New()
	}
	return nil
}

func (i *Invite) IsExpired() bool {
	return time.Now().After(i.ExpiresAt)
}