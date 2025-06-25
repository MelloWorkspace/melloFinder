// userstore.go
package auth

import (
	"context"
	"melloFinder/src/models"

	"github.com/volatiletech/authboss/v3"
	"gorm.io/gorm"
)

type UserStorer struct {
  DB *gorm.DB
}

func (us UserStorer) Load(_ context.Context, key string) (interface{}, error) {
  var user models.User
  if err := us.DB.First(&user, "email = ?", key).Error; err != nil {
    return nil, authboss.ErrUserNotFound
  }
  return user, nil
}

func (us UserStorer) Save(_ context.Context, user interface{}) error {
  u := user.(models.User)
  return us.DB.Save(&u).Error
}
