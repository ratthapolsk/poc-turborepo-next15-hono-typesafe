# CLAUDE.md (English)

## 1. Project Description

Claude is a full-stack monorepo project managed with Turborepo. It separates frontend and backend into independent applications, while maintaining type safety, modularity, and modern development practices.

### 1.1 Turborepo

- Turborepo is used to orchestrate multiple apps and shared packages in the monorepo.
- Integrated with `pnpm` for efficient package and dependency management.

## Project Structure

project-root/
│
├── apps/
│   └── backoffice/
│       ├── app/                     # Next.js App Router
│       │   ├── page.tsx
│       │   └── layout.tsx
│       ├── components/              # UI Components
│       │   └── layout.tsx
│       ├── providers/               # Global Providers
│       │   └── global-provider.tsx
│       ├── consts/                  # Constants
│       ├── libs/                    # Utility libraries
│       ├── biz/                     # 💼 Business Logic (Client-side)
│       │   └── useUser.ts
│       ├── services/                # 🌐 API Fetcher / Middleware Layer
│       │   ├── fetcher.ts           # Used with React Query
│       │   └── client.ts            # Fetch wrapper with baseURL and headers
│   └── services/                    # Backend Hono
├── shared/
│   ├── utils/                       # Shared utilities
│   ├── components/                  # Shared UI Components

### 1.2 Frontend – Backoffice App

- Built using **Next.js 15** with the App Router and **TypeScript**.
- Uses **Mantine 8** for React UI components and **TailwindCSS 4** for styling.
- **React Query** is used for data fetching and caching.
- Business logic is isolated under the `biz/` folder, which contains client-only logic used in server pages via client components.
- API communication, fetch clients, and middleware are organized in the `services/` folder to support both React Query and regular `fetch` usage.


### 1.3 Backend – Hono

- Backend is developed with **Hono**, a fast and minimal TypeScript-first web framework.
- API endpoints are optimized for modern edge runtimes and follow clear, maintainable patterns.
- Designed to integrate seamlessly with frontend clients.

### 1.4 Type-safe Communication

- Shared types are maintained in a central package to ensure synchronization between frontend and backend.
- Type-safe data exchange is achieved via schema validation and shared contracts, using tools like Zod or trpc-like wrappers.

### 1.5 Database Layer

- The project uses **PostgreSQL** as its primary relational database.
- It is containerized using **Docker** and runs with a default configuration:
  - Username: `postgres`
  - Password: `project0*`
- Database schema and migrations are managed using tools like **Drizzle** or **TypeORM**.

### 1.6 Runtime Environment Configuration

- Environment variables are organized by scope:
  - `.env.local` for development
  - `.env.production` for deployment
  - `.env.test` for CI and testing
- Runtime variables such as `DATABASE_URL` or `NEXT_PUBLIC_API_BASE_URL` are accessed via secure loaders.
- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the frontend.
- Type-safe environment loading is enforced with tools like `zod`, `env-safe`, or custom parsers.

### 1.7 Docker Services

- All services including PostgreSQL (and optionally Redis) are containerized via Docker Compose.
- Volumes are defined to persist data across restarts.
- Configuration is separated per environment (development vs. production).