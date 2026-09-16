# API Documentation

## Base URL
- Development: http://localhost:3000
- Production: https://tiketin-api.fly.dev

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Auth
- POST /api/auth/register - Register customer
- POST /api/auth/login - Login
- POST /api/auth/register-partner - Register partner
- POST /api/auth/resend-otp - Resend OTP
- POST /api/auth/verify-phone - Verify phone
- GET /api/auth/me - Get current user (Protected)

### Events
- GET /api/events - List events
- POST /api/events - Create event (Protected)
- GET /api/events/:id - Get event by ID
- PUT /api/events/:id - Update event (Protected)
- DELETE /api/events/:id - Delete event (Protected)

### Tickets
- GET /api/tickets - List tickets
- POST /api/tickets - Create tickets (Protected)
- GET /api/tickets/:id - Get ticket by ID

## Response Format
```json
{
  "data": { ... },
  "error": "error message if any"
}
```
