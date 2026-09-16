package middleware

import (
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v3"
	"tiketin-api/internal/config"
)

func CORSMiddleware() fiber.Handler {
	return func(c fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(200)
		}

		return c.Next()
	}
}

func LoggerMiddleware() fiber.Handler {
	return func(c fiber.Ctx) error {
		method := c.Method()
		path := c.Path()
		start := time.Now()

		err := c.Next()

		statusCode := c.Response().StatusCode()
		log.Printf("[%s] %s - %d (%s)", method, path, statusCode, time.Since(start))

		return err
	}
}

func Protected() fiber.Handler {
	return func(c fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "missing authorization header",
			})
		}

		// Extract token from "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid authorization header",
			})
		}

		token := parts[1]

		// Verify token
		claims, err := config.VerifyToken(token)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid token",
			})
		}

		// Store claims in locals
		c.Locals("user", claims)
		return c.Next()
	}
}
