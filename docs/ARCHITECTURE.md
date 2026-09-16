# System Architecture

## Overview
TIKETIN adalah platform tiket all-in-one dengan arsitektur modern yang scalable.

## Technology Stack

### Backend
- Go 1.21+ + Fiber v3
- GORM ORM
- PostgreSQL (Supabase)

### Frontend
- Next.js 16
- Plus Jakarta Sans, Poppins fonts

### Deployment
- Backend: Fly.io
- Frontend: Vercel
- Database: Supabase

## API Routes
- POST /api/auth/register
- POST /api/auth/login
- GET /api/events
- POST /api/events (Protected)
- GET /api/tickets
- POST /api/tickets (Protected)
