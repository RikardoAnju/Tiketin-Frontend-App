# TIKETIN Folder Structure Guide

## Root Level

```
tiketin/
├── backend/              🚫 DEPRECATED - Legacy Next.js backend
├── backend-go/           ✅ ACTIVE - Go + Fiber backend (USE THIS)
├── web/                  ✅ ACTIVE - Frontend projects
│   ├── frontend/         Next.js website
│   └── ...
├── mobile/               🔄 PLANNING - Mobile app
├── packages/             📦 Shared packages
├── docs/                 📚 Documentation
├── scripts/              🛠️  Automation scripts
├── assets/               🎨 Brand & images
├── .claude/              ⚙️  Claude configuration
├── .legacy/              🚫 Archived files
├── .vscode/              VS Code settings
├── .gitignore            Git ignore rules
├── README.md             Project overview
└── BACKEND_MIGRATION_GO.md  Migration guide
```

## Key Directories

### /backend-go (✅ ACTIVE)
**Go Backend API**
- main.go - Entry point
- config/ - JWT, env config
- handlers/ - API handlers
- models/ - Data models
- middleware/ - Auth, CORS, logging
- Dockerfile - Container config
- fly.toml - Deployment config

### /web/frontend (✅ ACTIVE)
**Next.js Frontend**
- app/ - Pages & routes
- components/ - Reusable components
- styles/ - CSS & styling
- package.json - Dependencies
- next.config.js - Config

### /docs (📚 IMPORTANT)
**Documentation**
- ARCHITECTURE.md - System design
- API.md - API reference
- DATABASE.md - Database schema
- DEPLOYMENT.md - Deploy guide

### /scripts (🛠️  USEFUL)
**Automation Scripts**
- dev.sh - Start dev servers
- deploy.sh - Deploy guide
- setup.sh - Initial setup

### /.claude (⚙️  INTERNAL)
**Claude Code Config**
- Do not modify unless needed
- Contains project settings

### /.legacy (🚫 ARCHIVED)
**Old/Deprecated Files**
- Keeps repo clean
- Reference only

## Maintenance Tips

1. **Always update README.md** when adding new features
2. **Keep docs/ current** with API changes
3. **Use /scripts** for common commands
4. **Archive old files** to /.legacy
5. **Check .gitignore** before committing

## Quick Commands

```bash
# Development
npm run dev          # Frontend
go run main.go       # Backend

# Building
npm run build        # Frontend
go build -o app .    # Backend

# Deployment
flyctl deploy        # Deploy backend
vercel deploy        # Deploy frontend
```

## When to Use Each Folder

| Need | Folder | Use |
|------|--------|-----|
| Backend API | backend-go/ | All Go API code |
| Frontend | web/frontend/ | Next.js pages/components |
| Shared code | packages/ | Libraries used by multiple apps |
| Documentation | docs/ | Guides, API docs |
| Deployment | fly.toml, vercel.json | Config files |
| Scripts | scripts/ | Automation, CI/CD |
| Old code | .legacy/ | Archived, reference only |

## File Organization Best Practices

✅ DO:
- Keep related files together
- Use clear naming conventions
- Update docs when changing structure
- Archive old files instead of deleting

❌ DON'T:
- Create random root-level directories
- Leave orphaned files
- Modify .claude or .legacy without reason
- Forget to document changes

---

**Last Updated**: 2026-09-12
