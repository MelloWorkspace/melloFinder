package controllers

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	dto "backend/src/dtos"
	"backend/src/helpers"
	"backend/src/services"
)

type UserController struct {
	userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

// GetProfile godoc
// @Summary Get user profile
// @Description Get current user profile
// @Tags users
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} helpers.Response
// @Failure 401 {object} helpers.Response
// @Router /users/profile [get]
func (ctrl *UserController) GetProfile(c echo.Context) error {
	userID := c.Get("user_id").(uuid.UUID)
	
	user, err := ctrl.userService.GetUserByID(userID)
	if err != nil {
		return helpers.ErrorResponse(c, http.StatusNotFound, "User not found", err)
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

	return helpers.SuccessResponse(c, http.StatusOK, "Profile retrieved successfully", userDTO)
}

// GetAllUsers godoc
// @Summary Get all users
// @Description Get all users (admin only)
// @Tags users
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} helpers.Response
// @Failure 401 {object} helpers.Response
// @Router /users [get]
func (ctrl *UserController) GetAllUsers(c echo.Context) error {
	users, err := ctrl.userService.GetAllUsers()
	if err != nil {
		return helpers.ErrorResponse(c, http.StatusInternalServerError, "Failed to retrieve users", err)
	}

	var userDTOs []dto.UserDTO
	for _, user := range users {
		userDTOs = append(userDTOs, dto.UserDTO{
			ID:        user.ID,
			Email:     user.Email,
			FirstName: user.FirstName,
			LastName:  user.LastName,
			IsActive:  user.IsActive,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		})
	}

	return helpers.SuccessResponse(c, http.StatusOK, "Users retrieved successfully", userDTOs)
}