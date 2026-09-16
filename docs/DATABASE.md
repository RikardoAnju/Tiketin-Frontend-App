# Database Setup

## Provider
- Supabase (PostgreSQL 15+)

## Connection String Format
```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

## Tables

### users
- id (PK)
- email (UNIQUE)
- phone (UNIQUE)
- password (hashed)
- fullName
- role (customer, partner, admin)
- isActive
- createdAt
- updatedAt

### partners
- id (PK)
- userId (FK → users)
- companyName
- companyAddress
- companyPhone
- taxId (UNIQUE)
- bankAccount
- isVerified
- verificationDoc
- createdAt
- updatedAt

### events
- id (PK)
- partnerId (FK → partners)
- title
- description
- image
- location
- startDate
- endDate
- price
- quota
- sold
- category
- tags (JSON)
- isActive
- createdAt
- updatedAt

### tickets
- id (PK)
- eventId (FK → events)
- userId (FK → users)
- code (UNIQUE)
- price
- status (available, sold, expired)
- bookedAt
- paidAt
- createdAt
- updatedAt

## Supabase Setup

1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database → Connection Pooling
4. Copy connection string (use Pooler)
5. Set DATABASE_URL in .env files
