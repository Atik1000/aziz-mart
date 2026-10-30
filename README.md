# Aziz Mart — Monorepo

Family-focused B2C e-commerce for Bangladesh (Dhaka first). Built from the design handoff in the
parent folder: storefront (Next.js), admin panel (Next.js) and API (NestJS) in one pnpm + Turborepo
workspace.

## Layout

| Path | What | Port |
|---|---|---|
| `apps/web` | Customer storefront — animated landing page (Three.js hero), listings, product details, cart, COD checkout, order confirmation, help & bulk orders | 3000 |
| `apps/admin` | Admin panel — sign-in with RBAC, dashboard with live sales charts, products, orders pipeline, marketing, delivery zones | 3001 |
| `apps/api` | NestJS REST API — auth/RBAC, catalog, coupons, orders (stock decrement, validated status transitions), stats. Contract in `apps/api/openapi.yaml` | 4000 |
| `packages/shared` | Design tokens, TypeScript types and the seed catalog from the handoff — single source of truth for all three apps | — |
| `postman/` | Git-native Postman collection: 13-request contract-test suite + local environment (run in CI by `.github/workflows/api-contract.yml`) | — |

## Run it

```bash
pnpm install
pnpm dev          # turbo: builds shared, then runs api + web + admin together
```

or individually: `pnpm dev:api`, `pnpm dev:web`, `pnpm dev:admin`.

- Storefront → http://localhost:3000
- Admin → http://localhost:3001
- API → http://localhost:4000/api/v1/health

The storefront falls back to the bundled seed data if the API is down (checkout then disables); the
admin requires the API. Set `NEXT_PUBLIC_API_URL` to point either app at a different API origin.

## Admin access (demo accounts)

Sign in at http://localhost:3001/login. Passwords follow the pattern `azizmart-<role>`; the login
page can prefill them. Sessions are Bearer tokens enforced by the API, not just hidden UI.

| Email | Role | Can |
|---|---|---|
| `owner@azizmart.test` | owner | everything |
| `manager@azizmart.test` | manager | move orders, everything operational |
| `support@azizmart.test` | support | read-only (the API returns 403 on writes) |

## API contract tests

```bash
postman collection run "postman/collections/aziz mart api" -e postman/environments/local.yaml
```

13 requests / 24 assertions against a running local API: health, catalog shape, the strict
category-scope rule, coupon maths, auth + role enforcement, order placement (phone normalisation,
SKU snapshots, totals), per-field validation errors, and status-transition guards. The GitHub
Actions workflow runs the same suite on every PR.

## Design fidelity

Colours, type (Bricolage Grotesque / Hanken Grotesk), radii, spacing and copy follow the handoff
README exactly (`packages/shared/src/tokens.ts`). Product imagery is temporary Unsplash stock, as in
the handoff — replace with owned photography. Category scope is strict: no Kitchen & Dining, Home &
Living, or Stationery anywhere.

## Demo-build shortcuts (replace for production)

- **Storage** is in-memory in the API (seeded with 30 days of plausible order history so the
  dashboard has data). Swap `StoreService` for PostgreSQL + Prisma with row-locked stock decrements;
  the REST contract (`openapi.yaml`) stays the same.
- **Auth is demo-grade** — in-memory users with plain-text demo passwords and random session tokens.
  Production needs hashed passwords, a session store and per-customer order scoping (order detail is
  public here so confirmation pages work for guests). Storefront customer accounts are still to come.
- Bestsellers in the admin rank by real seeded sales; the storefront still labels its grid
  "Staff picks · curated" until real sales history exists, per the brief.
- Delivery fees, coupon rules and returns copy are the handoff placeholders — confirm with the
  business.
