# Frontend (Phase 1)

This folder contains the Next.js frontend scaffold for the concert reservation assignment.

## Included in Phase 1

- Next.js app router structure
- Tailwind setup + base theme
- Shared `AppShell` layout for Admin/User pages
- Landing page at `/`
- Static Admin screens:
  - `/admin`
  - `/admin/history`
- Static User screen:
  - `/user`
- API environment config via `NEXT_PUBLIC_API_BASE_URL`

## Run locally

1. Install packages:

```bash
npm install
```

2. Copy env and update as needed:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```
