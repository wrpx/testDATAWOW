# Concert Reservation Assignment (Next.js + NestJS)

Full-stack assignment implementation for free concert ticket reservation.

## 1) Tech Stack

### Frontend

- Next.js 14
- React 18
- Tailwind CSS
- TanStack Query
- React Hook Form

### Backend

- NestJS 10
- class-validator / class-transformer
- Jest (unit tests)
- ESLint + TypeScript

## 2) Project Structure

- `frontend/` - web app UI
- `backend/` - REST API

## 3) Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Start Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Backend runs at: `http://localhost:3001/api`

### Start Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at: `http://localhost:3000`

## 4) Environment Variables

### Backend (`backend/.env`)

- `PORT` (default: `3001`)
- `FRONTEND_ORIGIN` (default: `http://localhost:3000`)

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3001/api`)
- `NEXT_PUBLIC_USER_ID` (default: `user-1`)
- `NEXT_PUBLIC_USERNAME` (default: `Sara John`)

## 5) Assignment Coverage

### Task 1-2: Setup + Responsive UI

- Landing page: `/`
- Admin pages: `/admin`, `/admin/history`
- User page: `/user`
- Shared layout and responsive behavior (mobile/tablet/desktop)

### Task 3: CRUD + Reservation Flow

Admin can:
- Create concert
- Delete concert
- View all reservation history
- View summary (total seats, reserve count, cancel count)

User can:
- View all concerts (including sold-out)
- Reserve seat (1 seat per 1 user)
- Cancel reservation
- View own reservation history

### Task 4: Validation + Error Handling

- Backend DTO validation using global `ValidationPipe`
- Global HTTP exception filter for consistent error response shape
- Frontend displays API errors in form messages and toast notifications

### Task 5: Unit Tests

- `backend/src/concerts/concerts.service.spec.ts`
- `backend/src/reservations/reservations.service.spec.ts`

## 6) API Endpoints

- `GET /api/concerts`
- `POST /api/admin/concerts`
- `DELETE /api/admin/concerts/:concertId`
- `GET /api/admin/summary`
- `GET /api/admin/reservations/history`
- `POST /api/users/:userId/reservations`
- `DELETE /api/users/:userId/reservations/:concertId`
- `GET /api/users/:userId/reservations/history`

## 7) Scripts

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
npm run lint
npm test -- --runInBand --watchman=false
npm run build
```

## 8) Architecture Notes

### Frontend pattern

`Component (display) -> Hook (state/logic) -> API module (network)`

- `src/components/*` - UI layer
- `src/hooks/*` - feature logic
- `src/api/*` - API calls
- `src/lib/queryKeys.ts` - query keys for cache invalidation

### Backend pattern

- `controller` - request/response boundary
- `service` - business rules
- `dto` - validation contract
- `storage` - in-memory datastore (assignment scope)

## 9) Bonus: Scaling Approach

### If traffic/data grows

- Add CDN and static asset caching
- Add pagination for large lists
- Add response caching for read-heavy endpoints
- Move to persistent DB with proper indexing
- Scale API horizontally behind load balancer

### If many users reserve at same time

- Use transaction/row locking or atomic conditional update
- Enforce one active reservation per user by DB constraint
- Add idempotency keys for reservation requests
- Return deterministic conflict responses when sold out
