# Struktur Folder Frontend Tiketin

```
frontend/
├── app/              # Routing Next.js App Router (page.tsx, layout.tsx, globals.css)
├── components/       # Komponen UI siap pakai (SiteHeader, SearchWidget, HomeApp)
│   └── ui/           # Komponen dasar/primitive (Button, Card, Input) - reusable & unstyled
├── features/         # Kode per-domain (hotel/, pesawat/, kereta/, dst) - types, logic khusus fitur
├── hooks/            # Custom React hooks
├── layouts/          # Kerangka halaman (MainLayout, DashboardLayout)
├── public/           # Aset statis (images, icons, fonts)
├── services/         # Komunikasi API (fetch wrapper, endpoint calls)
├── store/            # State management global (Zustand)
└── utils/            # Fungsi bantu (format currency, date, dll)
```

## Kapan pakai folder yang mana?

- **components/** → Komponen spesifik project, sudah lengkap styling-nya.
- **components/ui/** → Komponen generik (Button, Card, Input) yang dipakai ulang di banyak tempat, minim styling khusus.
- **features/{nama}/** → Semua yang berhubungan dengan satu fitur (types, hooks, service khusus fitur itu).
- **services/** → Semua pemanggilan API backend.
- **store/** → State yang dipakai lintas komponen (misal: filter pencarian aktif).
- **utils/** → Fungsi murni tanpa side-effect (format, validasi, dll).

## Import alias

Gunakan `@/` untuk import dari root frontend, contoh:

```ts
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
```
﻿# Contributing to TIKETIN

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/tiketin/tiketin.git
cd tiketin
```

2. **Setup your environment**
```bash
# Copy environment files
cp backend-go/.env.example backend-go/.env.local
cp web/frontend/.env.example web/frontend/.env.local

# Edit with your values (DATABASE_URL, API_URL, etc)
```

3. **Install dependencies**
```bash
# Backend
cd backend-go
go mod download

# Frontend
cd ../web/frontend
npm install
```

## Development Workflow

### Backend (Go)
```bash
cd backend-go
go run main.go
# API available at http://localhost:3000
```

### Frontend (Next.js)
```bash
cd web/frontend
npm run dev
# Site available at http://localhost:3000
```

## Code Standards

### Go Backend
- Use `go fmt` for formatting
- Follow standard Go conventions
- Write tests for handlers
- Add comments for exported functions

### Frontend
- Use ESLint for linting
- Follow Next.js best practices
- Component naming: PascalCase
- Variable/function naming: camelCase

## Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- test: Test additions
- chore: Build, deps

**Examples:**
```
feat(auth): add JWT token verification
fix(events): handle empty event list
docs(api): update endpoint documentation
```

## Pull Request Process

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
- Write clean, tested code
- Update documentation
- Add comments where necessary

3. **Commit and push**
```bash
git add .
git commit -m "feat(scope): description"
git push origin feature/your-feature-name
```

4. **Create Pull Request**
- Describe what you changed and why
- Link related issues
- Request reviewers

5. **Code Review**
- Address feedback
- Make requested changes
- Ensure CI passes

6. **Merge**
- Rebase if needed
- Use "Squash and merge" for clean history

## Testing

### Backend
```bash
cd backend-go
go test ./...
```

### Frontend
```bash
cd web/frontend
npm test
npm run lint
```

## Documentation

- Update README.md for major changes
- Add comments for complex logic
- Update docs/ for API/architecture changes
- Keep CHANGELOG updated

## Deployment

### Backend to Fly.io
```bash
cd backend-go
flyctl deploy
```

### Frontend to Vercel
```bash
cd web/frontend
npm run build
vercel deploy
```

## Need Help?

- Check [docs/](../docs/) for documentation
- Review existing code for patterns
- Ask in GitHub discussions
- Contact maintainers

## Code of Conduct

- Be respectful and inclusive
- Focus on the code, not the person
- Help others learn
- Report issues appropriately

---

**Happy Contributing! 🚀**
