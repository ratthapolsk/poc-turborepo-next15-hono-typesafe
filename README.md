# Approval System

Full-stack approval system built with modern technologies in a Turborepo monorepo.

## 🏗️ Tech Stack

- **Frontend**: Vite + React 18 + TypeScript
- **UI Library**: Mantine 8 + TailwindCSS 4
- **Backend**: Hono + Node.js
- **Database**: PostgreSQL + Drizzle ORM
- **Testing**: Vitest + Testing Library
- **Monorepo**: Turborepo + pnpm workspaces

## 📦 Project Structure

```
approval/
├── apps/
│   ├── backoffice/          # Frontend (Vite + React)
│   ├── services/            # Backend API (Hono)
│   └── database/            # Database schemas & migrations
├── shared/
│   ├── utils/               # Shared utilities
│   └── components/          # Shared UI components
├── docker-compose.yml       # PostgreSQL database
└── turbo.json              # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker & Docker Compose

### 1. Install Dependencies

```bash
# Install all dependencies for all workspaces
pnpm install
```

### 2. Start Database

```bash
# Start PostgreSQL container
docker-compose up -d

# Check database is running
docker ps
```

### 3. Start Development Servers

```bash
# Start all services (frontend + backend)
pnpm dev
```

This will start:
- **Frontend**: http://localhost:3001 (Vite dev server)
- **Backend**: http://localhost:8000 (Hono API server)
- **Database**: localhost:5432 (PostgreSQL)

### 4. Setup Database Schema

```bash
# Push schema to database (first time)
pnpm db:push

# Or generate and run migrations
pnpm db:generate
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

## 🛠️ Development Commands

### Root Level (Recommended)

```bash
# Development
pnpm dev          # Start all apps
pnpm build        # Build all apps
pnpm test         # Run all tests
pnpm lint         # Lint all apps
pnpm clean        # Clean all build outputs

# Database Operations
pnpm db:push      # Push schema to database
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open Drizzle Studio
pnpm db:seed      # Seed database with sample data
pnpm db:reset     # Reset database (truncate all tables)

# Utilities
pnpm secrets      # Generate secure environment secrets
pnpm format       # Format code with Prettier
```

### Individual Apps

```bash
# Frontend only
cd apps/backoffice
pnpm dev          # Vite dev server
pnpm test         # Vitest tests
pnpm test:ui      # Vitest UI
pnpm build        # Production build

# Backend only  
cd apps/services
pnpm dev          # Hono dev server with hot reload
pnpm build        # TypeScript compilation
pnpm start        # Production server

# Database only
cd apps/database
pnpm db:generate  # Generate migrations from schema
pnpm db:push      # Push schema directly
pnpm db:seed      # Seed database
pnpm db:reset     # Reset database
pnpm db:studio    # Open Drizzle Studio
```

## 🗄️ Database

### Connection Details

```env
Database: approval
Host: localhost
Port: 5432
Username: postgres
Password: project0*
```

### Sample Data

The database is initialized with sample users:
- admin@example.com (System Admin)
- user@example.com (Test User)

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Frontend tests with UI
cd apps/backoffice
pnpm test:ui

# Test coverage
pnpm test:coverage
```

## 📝 Environment Variables

Copy and modify these files as needed:

```bash
# Root level
.env.local           # Database and API URLs

# Frontend (apps/backoffice)
VITE_API_BASE_URL=http://localhost:3001

# Backend (apps/services)  
DATABASE_URL=postgresql://postgres:project0*@localhost:5432/approval
PORT=3001
```

## 🏃‍♂️ Step-by-Step Setup

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd approval
   pnpm install
   ```

2. **Database Setup**
   ```bash
   docker-compose up -d
   # Wait 30 seconds for PostgreSQL to initialize
   ```

3. **Start Development**
   ```bash
   pnpm dev
   ```

4. **Open Browser**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8000

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart database
docker-compose down
docker-compose up -d
```

### Port Conflicts
```bash
# Check what's using ports 3001/8000
lsof -i :3001
lsof -i :8000

# Kill processes if needed
killall node
```

### Dependencies Issues
```bash
# Clean and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

## 📚 API Documentation

### Interactive Documentation (Swagger UI)
The API includes interactive documentation powered by OpenAPI 3.0:

- **Swagger UI**: http://localhost:8000/docs
- **OpenAPI Spec**: http://localhost:8000/openapi.json

### Health Check
```bash
curl http://localhost:8000/health
```

### Users API
```bash
# Get all users (paginated)
curl http://localhost:8000/api/users

# Get users with custom pagination
curl "http://localhost:8000/api/users?pageIndex=2&pageSize=5"

# Get specific user
curl http://localhost:8000/api/users/1

# Create user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Update user
curl -X PUT http://localhost:8000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"updated@example.com","name":"Updated User"}'

# Delete user
curl -X DELETE http://localhost:8000/api/users/1
```

### Approval Requests API
```bash
# Get all approval requests (paginated)
curl http://localhost:8000/api/approval-requests

# Get approval requests with filters and pagination
curl "http://localhost:8000/api/approval-requests?status=pending&pageIndex=1&pageSize=10"

# Filter by requester
curl "http://localhost:8000/api/approval-requests?requesterId=1"

# Get specific approval request
curl http://localhost:8000/api/approval-requests/1

# Create approval request
curl -X POST http://localhost:8000/api/approval-requests \
  -H "Content-Type: application/json" \
  -d '{"title":"Budget Approval","description":"Q1 Marketing Budget","requesterId":1}'

# Update approval request status
curl -X PUT http://localhost:8000/api/approval-requests/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}'

# Delete approval request
curl -X DELETE http://localhost:8000/api/approval-requests/1
```

### API Features
- ✅ **OpenAPI 3.0** - Standard API specification
- ✅ **Type-safe validation** - Request/response validation with Zod
- ✅ **Interactive testing** - Test APIs directly in Swagger UI
- ✅ **Auto-generated docs** - Documentation updates automatically
- ✅ **Schema validation** - Runtime validation for all endpoints
- ✅ **Server-side pagination** - All list endpoints support pagination
- ✅ **Advanced filtering** - Status and requester filters for approval requests
- ✅ **Reusable utilities** - Consistent pagination across all APIs

### Pagination Features
- **Default pagination**: `pageIndex=1`, `pageSize=10`
- **Customizable page size**: Maximum 100 items per page
- **Rich metadata**: Total records, total pages, next/previous indicators
- **Query parameters**: `?pageIndex=2&pageSize=20`
- **Consistent format**: All paginated responses follow the same structure

## 🚢 Production Deployment

```bash
# Build all apps
pnpm build

# Frontend output: apps/backoffice/dist
# Backend output: apps/services/dist
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests: `pnpm test`
4. Build check: `pnpm build`
5. Submit PR

## 📄 License

MIT