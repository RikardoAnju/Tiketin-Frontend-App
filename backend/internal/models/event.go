package models

import (
	"time"

	"gorm.io/datatypes"
)

type Event struct {
	ID          uint                        `gorm:"primaryKey" json:"id"`
	PartnerID   uint                        `json:"partnerId"`
	Partner     Partner                     `gorm:"foreignKey:PartnerID" json:"-"`
	Title       string                      `json:"title"`
	Description string                      `gorm:"type:text" json:"description"`
	Image       string                      `json:"image"`
	Location    string                      `json:"location"`
	StartDate   time.Time                   `json:"startDate"`
	EndDate     time.Time                   `json:"endDate"`
	Price       float64                     `json:"price"`
	Quota       int                         `json:"quota"`
	Sold        int                         `gorm:"default:0" json:"sold"`
	Category    string                      `json:"category"`
	Tags        datatypes.JSONSlice[string] `gorm:"type:jsonb" json:"tags"`
	IsActive    bool                        `gorm:"default:true" json:"isActive"`
	CreatedAt   time.Time                   `json:"createdAt"`
	UpdatedAt   time.Time                   `json:"updatedAt"`
}

type CreateEventRequest struct {
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description" validate:"required"`
	Image       string    `json:"image"`
	Location    string    `json:"location" validate:"required"`
	StartDate   time.Time `json:"startDate" validate:"required"`
	EndDate     time.Time `json:"endDate" validate:"required"`
	Price       float64   `json:"price" validate:"required,min=0"`
	Quota       int       `json:"quota" validate:"required,min=1"`
	Category    string    `json:"category" validate:"required"`
	Tags        []string  `json:"tags"`
}

type UpdateEventRequest struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Location    string    `json:"location"`
	StartDate   time.Time `json:"startDate"`
	EndDate     time.Time `json:"endDate"`
	Price       float64   `json:"price"`
	Quota       int       `json:"quota"`
	Category    string    `json:"category"`
	Tags        []string  `json:"tags"`
	IsActive    bool      `json:"isActive"`
}
