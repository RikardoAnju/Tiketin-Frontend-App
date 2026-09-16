# Deploy Backend to Fly.io

## Prerequisites

1. **Fly.io Account** - Sign up at https://fly.io
2. **Fly CLI** - Install from https://fly.io/docs/getting-started/installing-flyctl/
3. **Database** - Supabase PostgreSQL atau yang lain

## Setup Steps

### 1. Login to Fly.io

```bash
flyctl auth login
```

### 2. Create Fly.io App

Navigate to backend folder:

```bash
cd backend
```

Create app (ini akan interactive):

```bash
flyctl launch
```

Ketika ditanya:
- App name: `tiketin-api` (atau sesuai keinginan)
- Region: `sin` (Singapore) atau pilih region terdekat
- Database: `N` (kita sudah punya Supabase)

### 3. Set Environment Variables

Set secrets yang diperlukan:

```bash
flyctl secrets set DATABASE_URL="postgresql://user:password@host:port/db?pgbouncer=true"
flyctl secrets set DIRECT_URL="postgresql://user:password@host:port/db"
flyctl secrets set JWT_SECRET="your-secret-key-here"
```

**Dapatkan connection strings dari Supabase:**
1. Login ke Supabase Console
2. Pilih project → Settings → Database
3. Copy:
   - **Pooler Connection** → DATABASE_URL
   - **Direct Connection** → DIRECT_URL

### 4. Setup Database Migrations

Run migrations:

```bash
flyctl ssh console
cd /app
npm run prisma:migrate:deploy
exit
```

Atau gunakan Prisma Migrate langsung:

```bash
flyctl run npm run prisma:migrate:deploy
```

### 5. Deploy

Deploy app ke Fly.io:

```bash
flyctl deploy
```

Monitor logs:

```bash
flyctl logs
```

### 6. Verify Deployment

Check app status:

```bash
flyctl status
```

Test API:

```bash
curl https://tiketin-api.fly.dev/api/health
```

## Useful Commands

### View Logs
```bash
flyctl logs
```

### SSH into App
```bash
flyctl ssh console
```

### Scale App
```bash
flyctl scale count=2  # 2 instances
```

### Update Secrets
```bash
flyctl secrets list
flyctl secrets set VARIABLE_NAME="new-value"
```

### Restart App
```bash
flyctl restart
```

### Destroy App
```bash
flyctl apps destroy tiketin-api
```

## Troubleshooting

### Check Build Logs
```bash
flyctl logs
```

### Test Local Build
```bash
docker build -t tiketin-api .
docker run -p 3000:3000 -e DATABASE_URL="..." tiketin-api
```

### Database Connection Issues
- Pastikan DATABASE_URL dan DIRECT_URL benar
- Check Supabase firewall allows Fly.io IPs
- Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### Migration Errors
```bash
flyctl run npm run prisma:migrate:deploy
flyctl run npm run prisma:generate
```

## Health Check Setup

API harus punya `/api/health` endpoint yang return 200 OK:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok' });
}
```

## Auto-Deploy with GitHub

Setup GitHub Actions (optional):

1. Add secrets di GitHub:
   - `FLY_API_TOKEN` - dari `flyctl auth token`

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Fly

on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: cd backend && flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## Monitoring & Metrics

Akses metrics di https://fly.io/dashboard → Apps → tiketin-api

## Support

- Fly.io Docs: https://fly.io/docs
- GitHub Issues: Create issue di repo
