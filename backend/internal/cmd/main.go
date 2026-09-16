package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"tiketin-api/internal/controller"
	"tiketin-api/internal/middleware"
	"tiketin-api/internal/models"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(".env.local"); err != nil {
		log.Println("No .env.local file found, using environment variables")
	}

	// Initialize database
	db, err := initDatabase()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Auto migrate models
	if err := db.AutoMigrate(&models.User{}, &models.Event{}, &models.Ticket{}, &models.Partner{}); err != nil {
		log.Fatalf("Failed to migrate models: %v", err)
	}

	// Initialize Fiber app
	app := fiber.New()

	// Middleware
	app.Use(middleware.CORSMiddleware())
	app.Use(middleware.LoggerMiddleware())

	// Health check
	app.Get("/api/health", handlers.HealthCheck)

	// Auth routes
	authGroup := app.Group("/api/auth")
	authGroup.Post("/register", handlers.Register(db))
	authGroup.Post("/login", handlers.Login(db))
	authGroup.Post("/register-partner", handlers.RegisterPartner(db))
	authGroup.Post("/resend-otp", handlers.ResendOTP(db))
	authGroup.Post("/verify-phone", handlers.VerifyPhone(db))
	authGroup.Get("/me", middleware.Protected(), handlers.GetCurrentUser(db))

	// Events routes
	eventsGroup := app.Group("/api/events")
	eventsGroup.Get("/", handlers.GetEvents(db))
	eventsGroup.Get("/:id", handlers.GetEventByID(db))
	eventsGroup.Post("/", middleware.Protected(), handlers.CreateEvent(db))
	eventsGroup.Put("/:id", middleware.Protected(), handlers.UpdateEvent(db))
	eventsGroup.Delete("/:id", middleware.Protected(), handlers.DeleteEvent(db))

	// Tickets routes
	ticketsGroup := app.Group("/api/tickets")
	ticketsGroup.Get("/", handlers.GetTickets(db))
	ticketsGroup.Post("/", middleware.Protected(), handlers.CreateTicket(db))
	ticketsGroup.Get("/:id", handlers.GetTicketByID(db))

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("Starting server on port %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}

func initDatabase() (*gorm.DB, error) {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		return nil, fmt.Errorf("DATABASE_URL not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}
