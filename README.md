# allunipply

A modern university and scholarship application platform built with Next.js, TypeScript, Prisma, and NextAuth.

## Live Demo

- Production: https://allunipply.vercel.app

## Overview

allunipply helps students discover universities and scholarships, manage application workflows, upload documents, and track progress through a responsive dashboard.

The application includes:

- Public discovery pages for universities, programs, and scholarships.
- Student account creation and authentication.
- A multi-step application workflow with progress tracking.
- Document upload metadata management and verification state tracking.
- In-app notifications for account and application events.
- News updates and content feeds.

## Core Features

- University exploration:
	- Browse national and international universities.
	- Search and filter by location, type, and academic criteria.
- Scholarship discovery:
	- Filter scholarships by country, university, and type.
	- Track scholarship amount types and deadlines.
- Authentication and user session:
	- Credentials sign-in with hashed passwords.
	- Optional Google provider if OAuth env vars are provided.
	- JWT-based sessions via NextAuth.
- Application management:
	- Create, update, submit, and withdraw applications.
	- Track section-level completion and computed progress.
- Document management:
	- Attach documents to applications/sections.
	- Filter and paginate uploads by type and relation.
- Notifications:
	- User-scoped notifications with read/unread state.
	- Bulk mark-as-read support.
- Launch-readiness baseline:
	- Privacy policy and terms pages.
	- Rate-limiting added on sensitive write endpoints.

## Tech Stack

- Framework: Next.js (App Router), React, TypeScript
- Styling: Tailwind CSS, Framer Motion
- Auth: NextAuth
- Database ORM: Prisma
- Database: PostgreSQL (via Prisma adapter for `pg`)
- Tooling: ESLint
- Deployment: Vercel

## Project Structure

```text
app/
	api/
		applications/
		auth/
		documents/
		news/
		notifications/
		scholarships/
		universities/
	dashboard/
	international-university/
	national-university/
	scholarship/
	sign-in/
	sign-up/
components/
	dashboard/
	footer/
	layout/
	navbar/
lib/
	auth/
	db.ts
	rate-limit.ts
prisma/
	schema.prisma
	seed.js
public/
types/
```

## API Surface (High Level)

All API routes are under `app/api`.

- `GET /api/universities`, `POST /api/universities`
- `GET /api/universities/:id`, `PATCH /api/universities/:id`, `DELETE /api/universities/:id`
- `GET /api/scholarships`, `POST /api/scholarships`
- `GET /api/news`, `POST /api/news`
- `GET /api/applications`, `POST /api/applications`
- `GET /api/applications/:id`, `PATCH /api/applications/:id`, `DELETE /api/applications/:id`
- `GET /api/documents`, `POST /api/documents`
- `GET /api/documents/:id`, `DELETE /api/documents/:id`
- `GET /api/notifications`, `PATCH /api/notifications`
- `POST /api/auth/sign-up`
- `GET /api/auth/me`
- `GET|POST /api/auth/[...nextauth]`

## Database Model (Summary)

Main entities defined in Prisma schema:

- `User`
- `University`
- `Program`
- `Scholarship`
- `News`
- `Application`
- `ApplicationSection`
- `Document`
- `Notification`

Enums are used for application status, university type, scholarship type, notification type, and more.

## Environment Variables

Create a `.env` file in the project root.

Required for local development:

- `DATABASE_URL` or `DIRECT_URL` (PostgreSQL connection string)
- `AUTH_SECRET` or `NEXTAUTH_SECRET` (session/JWT secret)

Optional:

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (enable Google auth provider)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (WhatsApp floating button destination)

Example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/allunipply
DIRECT_URL=postgresql://user:password@localhost:5432/allunipply
AUTH_SECRET=replace_with_a_long_random_secret
NEXTAUTH_SECRET=replace_with_a_long_random_secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=8801400000000
```

## Getting Started (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Add your `.env` file as shown above.

### 3. Prepare database

```bash
npm run prisma:generate
npm run prisma:migrate
```

Optional seed:

```bash
npm run prisma:seed
```

### 4. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - generate Prisma client and build for production
- `npm run start` - start production server
- `npm run lint` - run ESLint
- `npm run prisma:format` - format Prisma schema
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run Prisma development migrations
- `npm run prisma:push` - push schema to database without migrations
- `npm run prisma:studio` - open Prisma Studio
- `npm run prisma:seed` - run database seed script

## Security Notes

- Sensitive write endpoints use an in-memory rate limiter.
- In-memory rate limiting is suitable for single-instance setups.
- For distributed or high-scale deployments, use a shared store (for example Redis) for consistent global limiting.

## Deployment

### Vercel

1. Import this repository into Vercel.
2. Add environment variables in Vercel project settings.
3. Ensure database connection strings point to your hosted PostgreSQL instance.
4. Deploy.

Live URL:

- https://allunipply.vercel.app

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

No license file is currently configured in this repository.
