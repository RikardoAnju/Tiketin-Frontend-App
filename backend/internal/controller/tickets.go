package handlers

import (
	"fmt"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
	"tiketin-api/internal/config"
	"tiketin-api/internal/models"
)

func GetTickets(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		page := fiber.Query(c, "page", 1)
		limit := fiber.Query(c, "limit", 10)
		eventID := fiber.Query(c, "eventId", 0)

		var tickets []models.Ticket
		query := db

		if eventID > 0 {
			query = query.Where("event_id = ?", eventID)
		}

		if result := query.
			Offset((page - 1) * limit).
			Limit(limit).
			Preload("Event").
			Preload("User").
			Find(&tickets); result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to fetch tickets",
			})
		}

		return c.JSON(tickets)
	}
}

func GetTicketByID(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		id := c.Params("id")

		var ticket models.Ticket
		if result := db.
			Preload("Event").
			Preload("User").
			First(&ticket, id); result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "ticket not found",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to fetch ticket",
			})
		}

		return c.JSON(ticket)
	}
}

func CreateTicket(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		claims := c.Locals("user").(*config.JWTClaims)

		var req models.CreateTicketRequest
		if err := c.Bind().Body(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid request",
			})
		}

		// Get event
		var event models.Event
		if result := db.First(&event, req.EventID); result.Error != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "event not found",
			})
		}

		// Check quota
		if event.Sold+req.Qty > event.Quota {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "not enough quota available",
			})
		}

		// Create tickets
		var createdTickets []models.Ticket
		err := db.Transaction(func(tx *gorm.DB) error {
			for i := 0; i < req.Qty; i++ {
				ticket := models.Ticket{
					EventID: event.ID,
					UserID:  claims.ID,
					Code:    fmt.Sprintf("TIK-%d-%d-%d", event.ID, claims.ID, i),
					Price:   event.Price,
					Status:  models.StatusAvailable,
				}

				if result := tx.Create(&ticket); result.Error != nil {
					return result.Error
				}

				createdTickets = append(createdTickets, ticket)
			}

			// Update event sold count
			if result := tx.Model(&event).Update("sold", event.Sold+req.Qty); result.Error != nil {
				return result.Error
			}

			return nil
		})

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to create tickets",
			})
		}

		return c.Status(fiber.StatusCreated).JSON(createdTickets)
	}
}
