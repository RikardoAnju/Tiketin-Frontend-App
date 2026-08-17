# Image Assets Convention

- Format: **`.webp`** only (smaller size, supports transparency).
- Background: all icons, logos, and placeholders must have a **transparent background** — no white/solid fill baked into the image.
- Naming:
  - Icons → `ic_<name>.webp` (e.g. `ic_ticket.webp`, `ic_location.webp`)
  - Logos → `logo.webp`, `logo_white.webp`
  - Banners → `banner_<name>.webp`
  - Placeholders → `<name>_placeholder.webp`
- Register the actual path/name in `lib/core/constants/app_images.dart`, don't reference raw paths elsewhere in the app.

## Folders

- `logo/` — app logos
- `icons/` — UI icons, always `ic_` prefixed
- `banners/` — promo/marketing banners
- `placeholders/` — fallback images (event card, avatar, etc.)
