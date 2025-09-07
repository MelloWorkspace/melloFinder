package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
    ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Email     string         `gorm:"uniqueIndex:idx_users_email;not null;size:255" json:"email"`
    Password  string         `gorm:"not null;size:255" json:"-"`
    FirstName string         `gorm:"not null;size:100;index:idx_users_name" json:"first_name"`
    LastName  string         `gorm:"not null;size:100;index:idx_users_name" json:"last_name"`
    IsActive  bool           `gorm:"default:true;index:idx_users_active" json:"is_active"`
    CreatedAt time.Time      `gorm:"autoCreateTime;index" json:"created_at"`
    UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (User) TableName() string {
    return "users"
}

// Хуки GORM для дополнительной логики
func (u *User) BeforeCreate(tx *gorm.DB) error {
    if u.ID == uuid.Nil {
        u.ID = uuid.New()
    }
    return nil
}