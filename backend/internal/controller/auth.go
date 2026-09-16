package handlers

import (
	"github.com/gofiber/fiber/v3"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"tiketin-api/internal/config"
	"tiketin-api/internal/models"
)

func Register(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var req models.RegisterRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		// Hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to process password",
			})
		}

		// Create user
		user := models.User{
			Email:    req.Email,
			Phone:    req.Phone,
			FullName: req.FullName,
			Password: string(hashedPassword),
			Role:     models.RoleCustomer,
			IsActive: true,
		}

		if result := db.Create(&user); result.Error != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "email or phone already exists",
			})
		}

		// Generate token
		token, err := config.GenerateToken(user.ID, user.Email, string(user.Role))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to generate token",
			})
		}

		return c.Status(fiber.StatusCreated).JSON(models.LoginResponse{
			User:  &user,
			Token: token,
		})
	}
}

func Login(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var req models.LoginRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		var user models.User
		if result := db.Where("email = ?", req.Email).First(&user); result.Error != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid email or password",
			})
		}

		// Verify password
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid email or password",
			})
		}

		// Generate token
		token, err := config.GenerateToken(user.ID, user.Email, string(user.Role))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to generate token",
			})
		}

		return c.JSON(models.LoginResponse{
			User:  &user,
			Token: token,
		})
	}
}

func RegisterPartner(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var req models.RegisterPartnerRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		// Hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to process password",
			})
		}

		// Create user
		user := models.User{
			Email:    req.Email,
			FullName: req.FullName,
			Password: string(hashedPassword),
			Role:     models.RolePartner,
			IsActive: true,
		}

		// Create partner in transaction
		err = db.Transaction(func(tx *gorm.DB) error {
			if result := tx.Create(&user); result.Error != nil {
				return result.Error
			}

			partner := models.Partner{
				UserID:          user.ID,
				CompanyName:     req.CompanyName,
				CompanyAddress:  req.CompanyAddress,
				CompanyPhone:    req.CompanyPhone,
				TaxID:           req.TaxID,
				BankAccount:     req.BankAccount,
				VerificationDoc: req.VerificationDoc,
				IsVerified:      false,
			}

			if result := tx.Create(&partner); result.Error != nil {
				return result.Error
			}

			return nil
		})

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "failed to create partner",
			})
		}

		// Generate token
		token, err := config.GenerateToken(user.ID, user.Email, string(user.Role))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to generate token",
			})
		}

		return c.Status(fiber.StatusCreated).JSON(models.LoginResponse{
			User:  &user,
			Token: token,
		})
	}
}

func ResendOTP(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var req models.OTPRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		// TODO: Implement OTP logic using SMS gateway
		return c.JSON(fiber.Map{
			"message": "OTP sent to phone number",
		})
	}
}

func VerifyPhone(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var req models.VerifyPhoneRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		// TODO: Verify OTP and update user phone

		return c.JSON(fiber.Map{
			"message": "phone verified successfully",
		})
	}
}

func GetCurrentUser(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		claims := c.Locals("user").(*config.JWTClaims)

		var user models.User
		if result := db.First(&user, claims.ID); result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "user not found",
			})
		}

		return c.JSON(user)
	}
}
