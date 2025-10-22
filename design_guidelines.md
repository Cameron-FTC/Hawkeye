# Design Guidelines: Workforce Management SaaS Platform

## Design Approach: Modern SaaS Productivity System

**Selected Approach:** Design System (Linear + Material Design principles)

**Justification:** This is a utility-focused, information-dense productivity application where efficiency, learnability, and data clarity are paramount. Drawing inspiration from Linear's clean aesthetics and Material Design's robust component patterns.

**Key Design Principles:**
- Clarity over decoration - every element serves a functional purpose
- Consistent interaction patterns across all role dashboards
- Mobile-first responsive design with touch-optimized controls
- Scannable information hierarchy for quick decision-making

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 250 85% 60% (vibrant blue for primary actions)
- Background: 0 0% 100% (pure white)
- Surface: 220 13% 97% (light gray for cards/panels)
- Text Primary: 220 13% 18% (near black)
- Text Secondary: 220 9% 46% (medium gray)
- Border: 220 13% 91% (subtle dividers)
- Success: 142 76% 36% (green for approvals/check-ins)
- Warning: 38 92% 50% (amber for pending items)
- Error: 0 84% 60% (red for conflicts/issues)

**Dark Mode:**
- Primary: 250 85% 65% (slightly lighter blue)
- Background: 222 47% 11% (deep navy-gray)
- Surface: 217 33% 17% (elevated navy-gray)
- Text Primary: 0 0% 98% (near white)
- Text Secondary: 220 9% 65% (light gray)
- Border: 217 19% 27% (subtle navy dividers)
- Success: 142 76% 45%
- Warning: 38 92% 60%
- Error: 0 84% 65%

### B. Typography

**Font Families:**
- Primary: 'Inter' (via Google Fonts) - all UI text, forms, tables
- Monospace: 'JetBrains Mono' (for time displays, asset IDs)

**Scale & Usage:**
- Headings (Dashboard titles): text-2xl font-semibold (24px)
- Section Headers: text-lg font-semibold (18px)
- Body Text: text-base font-normal (16px)
- Labels/Meta: text-sm font-medium (14px)
- Captions/Timestamps: text-xs font-normal (12px)
- Button Text: text-sm font-medium (14px)

### C. Layout System

**Spacing Units:** Use Tailwind units of **2, 4, 6, 8, 12, 16** consistently
- Component padding: p-4, p-6
- Section spacing: space-y-6, gap-8
- Card margins: mb-6, mt-8
- Dense lists: space-y-2
- Form fields: space-y-4

**Grid System:**
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Dashboard layouts: grid grid-cols-1 lg:grid-cols-12 gap-6
- Sidebar: col-span-3 (on desktop)
- Main content: col-span-9 (on desktop)
- Card grids: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4

### D. Component Library

**Navigation:**
- Top navbar: Fixed header with business switcher (multi-tenant), user menu, notifications
- Sidebar (desktop): Collapsible navigation with icons + labels, role-specific menu items
- Bottom tab bar (mobile): 4-5 primary actions with icons
- Breadcrumbs: For deep navigation (Jobs > Location > Details)

**Cards & Surfaces:**
- Standard card: Rounded corners (rounded-lg), subtle shadow (shadow-sm), border for light mode
- Stat cards: Large number display with label and trend indicator
- Asset cards: Thumbnail + title + status badge + QR scan button
- Job cards: Location name, date range, assigned employees (avatars), status

**Data Display:**
- Tables: Striped rows, sticky header, mobile-responsive (stack on small screens)
- Calendar view: Week grid for bulk assignment, day cells clickable
- Timeline: Vertical for asset issue/return history, clock-in/out events
- Lists: Avatar + name + meta info + action button pattern

**Forms & Inputs:**
- Text inputs: Outlined style with floating labels, dark mode compatible backgrounds
- Dropdowns: Native select styled consistently, searchable for long lists
- Date pickers: Calendar overlay for single/range selection
- Time pickers: Dropdown with 15-min increments or manual entry
- Toggle switches: For boolean settings (auto lunch break on/off)
- Checkboxes: Multi-select for bulk operations

**Action Components:**
- Primary buttons: Solid background (primary color), text-white, rounded-md, px-4 py-2
- Secondary buttons: Outlined (border-2), text matches primary color
- Icon buttons: Circular or square, for quick actions (edit, delete, scan)
- Floating action button (FAB - mobile): Bottom right for primary action (+ Add Employee, Clock In)
- Bulk action bar: Appears when items selected, sticky to bottom

**Status & Feedback:**
- Badges: Small rounded pills for status (Active, Pending, Completed)
- Avatars: Circular, 32px-40px, with initials fallback
- Toast notifications: Top-right corner, auto-dismiss
- Progress indicators: Linear for loading states, circular for scanning
- Empty states: Icon + message + CTA for new users

**Overlays:**
- Modal dialogs: Centered, max-w-lg, for forms and confirmations
- Slide-over panels: Right side for details/editing without losing context
- Bottom sheets (mobile): For action menus and quick forms
- Dropdown menus: Right-aligned for user menu, left-aligned for filters

### E. Animations

**Minimal & Purposeful:**
- Page transitions: Subtle fade (150ms) between views
- Modal/drawer entry: Slide + fade (200ms)
- Loading states: Pulse animation on skeleton screens
- Button feedback: Scale down slightly on click (transform: scale(0.98))
- No decorative animations - focus on functional feedback

---

## Role-Specific Layouts

**Manager Dashboard:**
- Top: Quick stats (Total Hours This Week, Pending Approvals, Active Jobs)
- Main grid: Weekly calendar view + Recent activity feed
- Quick actions: Assign Job, Approve Timesheet, Add Asset

**Employee Dashboard:**
- Prominent clock-in/out button with current job/location context
- Today's schedule card with to-do list
- Recent timesheet entries
- Assigned assets section

**Client Portal:**
- Location selector dropdown (if multiple)
- Current week schedule table (read-only)
- Actual vs scheduled hours comparison chart
- Export button for reports

---

## Mobile-First Considerations

- Bottom navigation bar (60px) for primary role actions
- Large touch targets (min 44px height)
- Swipe gestures for list actions (swipe-to-delete, swipe-to-approve)
- Camera integration: Full-screen QR/barcode scanner overlay
- Sticky headers on scrollable lists
- Collapsible sections to manage vertical space
- Single-column layouts with progressive disclosure

---

## Images

No hero images required for this utility application. Use **icons only** (Heroicons via CDN) for:
- Navigation menu items
- Action buttons
- Empty states
- Status indicators
- Feature illustrations in onboarding flow