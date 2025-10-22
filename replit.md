# WorkForce Pro - Workforce Management Platform

## Overview

WorkForce Pro is a multi-tenant SaaS platform designed for workforce management across construction, maintenance, and service industries. The application provides role-based dashboards for administrators, managers, employees, and clients to handle scheduling, time tracking, job assignments, asset management, and invoicing.

The platform enables businesses to manage their workforce efficiently through features like employee management, job scheduling, timesheet approval, asset tracking with QR code scanning, and automated invoice generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **UI Components:** shadcn/ui component library built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design system based on Linear/Material Design principles

**Design Approach:**
The application follows a utility-focused design system prioritizing clarity, consistency, and data density. The design implements:
- Light and dark mode support via ThemeProvider
- Mobile-first responsive design with touch-optimized controls
- Custom color palette with HSL values for semantic colors (primary, secondary, destructive, etc.)
- Typography using Inter font for UI and JetBrains Mono for monospace elements
- Hover and active elevation states for interactive elements

**Component Architecture:**
- Reusable UI components in `client/src/components/ui/` following shadcn conventions
- Feature-specific components (JobCard, AssetCard, TimesheetEntry, etc.) for business logic
- Role-based dashboard pages (AdminDashboard, ManagerDashboard, EmployeeDashboard, ClientDashboard)
- Sidebar navigation with AppSidebar component adapting to user roles

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL via Neon serverless with WebSocket support
- **ORM:** Drizzle ORM for type-safe database operations
- **Authentication:** Session-based authentication (connect-pg-simple for session storage)
- **Password Hashing:** bcryptjs for secure password storage

**API Design:**
RESTful API structure with endpoints organized by resource:
- `/api/employees` - Employee CRUD operations
- `/api/clients` - Client management
- `/api/jobs` - Job scheduling and assignments
- `/api/timesheets` - Time tracking and approval
- `/api/invoices` - Invoice generation and management
- `/api/assets` - Asset tracking and scanning

**Storage Layer:**
The `server/storage.ts` module implements the repository pattern with an `IStorage` interface, providing abstraction over database operations. This enables:
- Centralized data access logic
- Type-safe database queries using Drizzle ORM
- Easy mocking for testing
- Consistent error handling

### Database Schema

**Multi-Tenancy Model:**
The application uses a shared database with tenant isolation through `businessId` foreign keys:

**Core Tables:**
- `users` - Authentication and user accounts
- `businesses` - Tenant/organization records
- `employees` - Workforce members linked to businesses and users
- `clients` - Customer organizations
- `locations` - Job site locations
- `jobs` - Work assignments and projects
- `jobAssignments` - Many-to-many relationship between jobs and employees
- `todos` - Task lists for jobs
- `timesheets` - Time tracking entries with approval workflow
- `invoices` - Billing records linked to jobs
- `assets` - Equipment and resources tracking
- `assetScans` - QR code scan history for asset check-in/out

**Schema Validation:**
Uses Drizzle-Zod integration (`createInsertSchema`) to generate Zod schemas from database tables, ensuring type safety across the application stack.

### Authentication & Authorization

**Authentication:**
- Session-based authentication with secure session storage in PostgreSQL
- Password hashing using bcryptjs with salt rounds
- User credentials stored in `users` table

**Authorization:**
Role-based access control (RBAC) with four roles:
- **Admin:** Full system access, user management, multi-business oversight
- **Manager:** Business-level access, employee management, job scheduling, timesheet approval
- **Employee:** Self-service access, time tracking, job viewing, todo management
- **Client:** Read-only access to assigned jobs and schedules

Role enforcement happens through:
- Frontend route rendering based on user role
- Backend endpoint access control (to be implemented based on businessId filtering)

### Development Environment

**Build & Development:**
- Development: `tsx` for TypeScript execution with hot reload
- Production: esbuild for server bundling, Vite for client bundling
- Type checking: Standalone TypeScript compiler (`tsc --noEmit`)

**Path Aliases:**
Configured in both `tsconfig.json` and `vite.config.ts`:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

**Code Organization:**
- `client/` - Frontend React application
- `server/` - Backend Express application
- `shared/` - Shared TypeScript types and schemas
- `migrations/` - Database migration files (Drizzle Kit)

## External Dependencies

### Database
- **Neon Serverless PostgreSQL:** Cloud-hosted PostgreSQL with WebSocket support for serverless environments
- **Connection:** Via `@neondatabase/serverless` package with connection pooling
- **Configuration:** `DATABASE_URL` environment variable required

### UI Component Libraries
- **Radix UI:** Headless accessible component primitives (@radix-ui/* packages)
- **shadcn/ui:** Pre-built component library using Radix UI with Tailwind styling
- **Lucide React:** Icon library for consistent iconography

### State Management & Data Fetching
- **TanStack Query (React Query):** Server state management with caching, automatic refetching, and optimistic updates
- **Query Client Configuration:** Custom query function in `lib/queryClient.ts` with credential handling

### Styling & Design
- **Tailwind CSS:** Utility-first CSS framework
- **PostCSS & Autoprefixer:** CSS processing pipeline
- **Google Fonts:** Inter (UI text) and JetBrains Mono (monospace)

### Form Management
- **React Hook Form:** Form state management and validation
- **@hookform/resolvers:** Integration with Zod for schema validation
- **Zod:** TypeScript-first schema validation library

### Session Management
- **connect-pg-simple:** PostgreSQL session store for Express sessions
- **express-session:** (Implied dependency) Session middleware

### Development Tools
- **Replit Plugins:** Development environment integration for Replit deployment
  - `@replit/vite-plugin-runtime-error-modal` - Error overlay
  - `@replit/vite-plugin-cartographer` - Development tooling
  - `@replit/vite-plugin-dev-banner` - Development banner

### Migration & Database Tools
- **Drizzle Kit:** Database migration tool and schema management
- **drizzle-orm:** Type-safe ORM with PostgreSQL dialect support