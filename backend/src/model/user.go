package models

type User struct {
  Email    string `gorm:"primaryKey"`
  Password string
}
