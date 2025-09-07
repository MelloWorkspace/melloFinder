package middlewares

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"

	"backend/src/config"
	"backend/src/helpers"
)

func JWTMiddleware(config *config.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return helpers.ErrorResponse(c, http.StatusUnauthorized, "Authorization header required", nil)
			}

			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				return helpers.ErrorResponse(c, http.StatusUnauthorized, "Invalid authorization header format", nil)
			}

			claims, err := helpers.ValidateJWT(tokenParts[1], config.JWT.Secret)
			if err != nil {
				return helpers.ErrorResponse(c, http.StatusUnauthorized, "Invalid token", err)
			}

			c.Set("user_id", claims.UserID)
			c.Set("email", claims.Email)
			return next(c)
		}
	}
}