package handlers

import (
	"github.com/gofiber/fiber/v3"
	"gorm.io/datatypes"
	"gorm.io/gorm"
	"tiketin-api/internal/config"
	"tiketin-api/internal/models"
)

func GetEvents(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		page := fiber.Query(c, "page", 1)
		limit := fiber.Query(c, "limit", 10)
		category := c.Query("category")

		var events []models.Event
		query := db.Where("is_active = true")

		if category != "" {
			query = query.Where("category = ?", category)
		}

		if result := query.
			Offset((page - 1) * limit).
			Limit(limit).
			Find(&events); result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to fetch events",
			})
		}

		return c.JSON(events)
	}
}

func GetEventByID(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		id := c.Params("id")

		var event models.Event
		if result := db.First(&event, id); result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "event not found",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to fetch event",
			})
		}

		return c.JSON(event)
	}
}

func CreateEvent(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		claims := c.Locals("user").(*config.JWTClaims)

		// Check if user is partner
		var partner models.Partner
		if result := db.Where("user_id = ?", claims.ID).First(&partner); result.Error != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "only partners can create events",
			})
		}

		var req models.CreateEventRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		event := models.Event{
			PartnerID:   partner.ID,
			Title:       req.Title,
			Description: req.Description,
			Image:       req.Image,
			Location:    req.Location,
			StartDate:   req.StartDate,
			EndDate:     req.EndDate,
			Price:       req.Price,
			Quota:       req.Quota,
			Category:    req.Category,
			Tags:        datatypes.NewJSONSlice(req.Tags),
			IsActive:    true,
		}

		if result := db.Create(&event); result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to create event",
			})
		}

		return c.Status(fiber.StatusCreated).JSON(event)
	}
}

func UpdateEvent(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		claims := c.Locals("user").(*config.JWTClaims)
		id := c.Params("id")

		var event models.Event
		if result := db.First(&event, id); result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "event not found",
			})
		}

		// Check if user is the partner owner
		if event.PartnerID != claims.ID {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "you can only update your own events",
			})
		}

		var req models.UpdateEventRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		if result := db.Model(&event).Updates(req); result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to update event",
			})
		}

		return c.JSON(event)
	}
}

func DeleteEvent(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		claims := c.Locals("user").(*config.JWTClaims)
		id := c.Params("id")

		var event models.Event
		if result := db.First(&event, id); result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "event not found",
			})
		}

		// Check if user is the partner owner
		if event.PartnerID != claims.ID {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "you can only delete your own events",
			})
		}

		if result := db.Delete(&event); result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to delete event",
			})
		}

		return c.SendStatus(fiber.StatusNoContent)
	}
}
