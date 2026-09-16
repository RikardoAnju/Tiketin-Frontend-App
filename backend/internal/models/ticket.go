package models

import (
	"time"
)

type TicketStatus string

const (
	StatusAvailable TicketStatus = "available"
	StatusSold      TicketStatus = "sold"
	StatusExpired   TicketStatus = "expired"
)

type Ticket struct {
	ID        uint         `gorm:"primaryKey" json:"id"`
	EventID   uint         `gorm:"index" json:"eventId"`
	Event     Event        `gorm:"foreignKey:EventID" json:"-"`
	UserID    uint         `json:"userId"`
	User      User         `gorm:"foreignKey:UserID" json:"-"`
	Code      string       `gorm:"uniqueIndex" json:"code"`
	Price     float64      `json:"price"`
	Status    TicketStatus `gorm:"default:'available'" json:"status"`
	BookedAt  *time.Time   `json:"bookedAt"`
	PaidAt    *time.Time   `json:"paidAt"`
	CreatedAt time.Time    `json:"createdAt"`
	UpdatedAt time.Time    `json:"updatedAt"`
}

type CreateTicketRequest struct {
	EventID uint `json:"eventId" validate:"required"`
	Qty     int  `json:"qty" validate:"required,min=1,max=10"`
}

type GetTicketsFilter struct {
	EventID uint   `query:"eventId"`
	Status  string `query:"status"`
	Page    int    `query:"page" validate:"min=1"`
	Limit   int    `query:"limit" validate:"min=1,max=100"`
}
