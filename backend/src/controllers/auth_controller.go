package controllers

import (
	dto "backend/src/dtos"
	"backend/src/helpers"
	"backend/src/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

type AuthController struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{
		authService: authService,
	}
}

// SendInvite godoc
// @Summary Send invitation
// @Description Send invitation to email
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.RegisterRequest true "Register request"
// @Success 200 {object} helpers.Response
// @Failure 400 {object} helpers.Response
// @Router /auth/invite [post]
func (ctrl *AuthController) SendInvite(c echo.Context) error {
	var req dto.RegisterRequest
	if err := c.Bind(&req); err != nil {
		return helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err)
	}

	response, err := ctrl.authService.SendInvite(req.Email)
	if err != nil {
		return helpers.ErrorResponse(c, http.StatusBadRequest, "Failed to send invite", err)
	}

	return helpers.SuccessResponse(c, http.StatusOK, "Invite sent successfully", response)
}

// AcceptInvite godoc
// @Summary Accept invitation
// @Description Accept invitation and create account
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.AcceptInviteRequest true "Accept invite request"
// @Success 200 {object} helpers.Response
// @Failure 400 {object} helpers.Response
// @Router /auth/accept-invite [post]
func (ctrl *AuthController) AcceptInvite(c echo.Context) error {
	var req dto.AcceptInviteRequest
	if err := c.Bind(&req); err != nil {
		return helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err)
	}

	response, err := ctrl.authService.AcceptInvite(&req)
	if err != nil {
		return helpers.ErrorResponse(c, http.StatusBadRequest, "Failed to accept invite", err)
	}

	return helpers.SuccessResponse(c, http.StatusOK, "Account created successfully", response)
}

// Login godoc
// @Summary Login
// @Description Login user
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.LoginRequest true "Login request"
// @Success 200 {object} helpers.Response
// @Failure 400 {object} helpers.Response
// @Router /auth/login [post]
func (ctrl *AuthController) Login(c echo.Context) error {
	var req dto.LoginRequest
	if err := c.Bind(&req); err != nil {
		return helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err)
	}

	response, err := ctrl.authService.Login(&req)
	if err != nil {
		return helpers.ErrorResponse(c, http.StatusUnauthorized, "Login failed", err)
	}

	return helpers.SuccessResponse(c, http.StatusOK, "Login successful", response)
}