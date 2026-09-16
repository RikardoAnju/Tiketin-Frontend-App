# TIKETIN API - Go Backend

Modern REST API for TIKETIN ticketing platform built with **Fiber**, **GORM**, and **PostgreSQL**.

## Tech Stack

- **Framework**: Fiber v3 (Fast HTTP framework)
- **ORM**: GORM (Object-Relational Mapping)
- **Database**: PostgreSQL 15+
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Built-in struct validation
- **Runtime**: Go 1.21+

## Project Structure

```
backend-go/
├── main.go                 # Application entry point
├── go.mod                  # Go module definition
├── Dockerfile              # Docker configuration
├── fly.toml                # Fly.io configuration
├── config/
│   └── jwt.go             # JWT token management
├── middleware/
│   └── middleware.go      # CORS, Logger, Auth middleware
├── models/
│   ├── user.go            # User & Partner models
│   ├── event.go           # Event model
│   └── ticket.go          # Ticket model
├── handlers/
│   ├── health.go          # Health check endpoint
│   ├── auth.go            # Authentication handlers
│   ├── events.go          # Event CRUD handlers
│   └── tickets.go         # Ticket handlers
└── README.md
```

## Local Development

### Prerequisites

- Go 1.21+
- PostgreSQL 15+
- Git

### Setup

1. **Clone & Install Dependencies**

```bash
cd backend-go
go mod download
```

2. **Configure Environment**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tiketin?sslmode=disable"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

3. **Run Application**

```bash
go run main.go
```

Server runs on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Health status

### Authentication
- `POST /api/auth/register` - Register customer
- `POST /api/auth/login` - Login
- `POST /api/auth/register-partner` - Register partner
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/verify-phone` - Verify phone
- `GET /api/auth/me` - Get current user (Protected)

### Events
- `GET /api/events` - List events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (Protected)
- `PUT /api/events/:id` - Update event (Protected)
- `DELETE /api/events/:id` - Delete event (Protected)

### Tickets
- `GET /api/tickets` - List tickets
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/tickets` - Create tickets (Protected)

## Docker Build

### Build Image

```bash
docker build -t tiketin-api .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/tiketin" \
  -e JWT_SECRET="secret" \
  tiketin-api
```

## Deploy to Fly.io

### Prerequisites

- Fly.io account
- Flyctl CLI installed

### Deployment Steps

1. **Login to Fly.io**

```bash
flyctl auth login
```

2. **Launch App**

```bash
flyctl launch
```

3. **Set Secrets**

```bash
flyctl secrets set DATABASE_URL="..."
flyctl secrets set JWT_SECRET="..."
```

4. **Deploy**

```bash
flyctl deploy
```

5. **View Logs**

```bash
flyctl logs
```

## Database Migrations

The application automatically creates tables on startup using GORM's AutoMigrate.

To recreate tables, delete them from database and restart the application.

## Testing

### Health Check

```bash
curl http://localhost:3000/api/health
```

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "phone": "08123456789",
    "fullName": "John Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Protected Route

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

## Development Notes

### Adding New Endpoints

1. Create model in `models/`
2. Create handler in `handlers/`
3. Register route in `main.go`

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (pooler)
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 3000)
- `ENV` - Environment (development/production)

## Troubleshooting

### Database Connection Error

Check DATABASE_URL format and PostgreSQL is running

### Migration Issues

Delete tables and restart app to re-create schema

### JWT Token Expired

Tokens expire in 24 hours, login again

## Future Enhancements

- [ ] Email verification
- [ ] OTP via SMS
- [ ] Payment integration
- [ ] Notification system
- [ ] Analytics dashboard
- [ ] Rate limiting
- [ ] Caching layer
- [ ] File upload (avatar, documents)

## License

MIT License - See LICENSE file
