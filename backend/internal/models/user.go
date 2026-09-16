package models

import (
	"time"
)

type UserRole string

const (
	RoleCustomer UserRole = "customer"
	RolePartner  UserRole = "partner"
	RoleAdmin    UserRole = "admin"
)

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Email     string    `gorm:"uniqueIndex;not null" json:"email"`
	Phone     string    `gorm:"uniqueIndex" json:"phone"`
	Password  string    `gorm:"not null" json:"-"`
	FullName  string    `json:"fullName"`
	Role      UserRole  `gorm:"default:'customer'" json:"role"`
	IsActive  bool      `gorm:"default:true" json:"isActive"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Partner struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	UserID          uint      `gorm:"uniqueIndex;not null" json:"userId"`
	User            User      `gorm:"foreignKey:UserID" json:"-"`
	CompanyName     string    `json:"companyName"`
	CompanyAddress  string    `json:"companyAddress"`
	CompanyPhone    string    `json:"companyPhone"`
	TaxID           string    `gorm:"uniqueIndex" json:"taxId"`
	BankAccount     string    `json:"bankAccount"`
	IsVerified      bool      `gorm:"default:false" json:"isVerified"`
	VerificationDoc string    `json:"verificationDoc"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

// DTOs
type RegisterRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
	Phone    string `json:"phone" validate:"required"`
	FullName string `json:"fullName" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type LoginResponse struct {
	User  *User  `json:"user"`
	Token string `json:"token"`
}

type RegisterPartnerRequest struct {
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=8"`
	FullName        string `json:"fullName" validate:"required"`
	CompanyName     string `json:"companyName" validate:"required"`
	CompanyAddress  string `json:"companyAddress"`
	CompanyPhone    string `json:"companyPhone"`
	TaxID           string `json:"taxId" validate:"required"`
	BankAccount     string `json:"bankAccount"`
	VerificationDoc string `json:"verificationDoc"`
}

type OTPRequest struct {
	Phone string `json:"phone" validate:"required"`
}

type VerifyPhoneRequest struct {
	Phone string `json:"phone" validate:"required"`
	OTP   string `json:"otp" validate:"required,len=6"`
}
