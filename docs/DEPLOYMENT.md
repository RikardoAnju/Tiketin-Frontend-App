# Deployment Guide

## Prerequisites
- Fly.io account & CLI
- Vercel account (optional, for frontend)
- Supabase database

## Backend Deployment (Go)

### To Fly.io

```bash
cd backend-go

# 1. Login
flyctl auth login

# 2. Launch app
flyctl launch

# 3. Set secrets
flyctl secrets set DATABASE_URL="postgresql://..."
flyctl secrets set JWT_SECRET="your-secret"

# 4. Deploy
flyctl deploy

# 5. View logs
flyctl logs
```

### Environment Variables
- DATABASE_URL (Supabase connection)
- JWT_SECRET (Auth key)
- PORT (default: 3000)

## Frontend Deployment (Next.js)

### To Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Set environment variables:
   - NEXT_PUBLIC_API_URL

5. Deploy

### Environment Variables
- NEXT_PUBLIC_API_URL (API base URL)

## Database Setup

Use Supabase PostgreSQL:
1. Create project on https://supabase.com
2. Get connection string from Settings → Database
3. Use Pooler connection for backend

## Monitoring

- **Backend**: flyctl logs
- **Frontend**: Vercel dashboard
- **Database**: Supabase dashboard

## Troubleshooting

### Build fails on Fly.io
- Check Docker build: docker build -t tiketin-api backend-go/
- Check go.mod dependencies

### Frontend build fails
- Clear npm cache: npm cache clean --force
- Check Node version: node --version

### Database connection fails
- Verify DATABASE_URL format
- Check firewall rules (Supabase)
- Test connection locally

## Scaling

### Backend
```bash
flyctl scale count=3  # 3 instances
```

### Frontend
Auto-scales on Vercel

### Database
Upgrade plan on Supabase dashboard
