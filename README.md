# 340B Checker

A small MVP for looking up **340B ceiling pricing**, **manufacturer contract-pharmacy
restrictions**, and **covered-entity contract pharmacy networks**. Built with Next.js
(App Router) + Prisma + PostgreSQL.

> Educational/planning MVP only. Pricing figures are estimates and must not be used for
> actual claims adjudication. Always verify with your TPA and HRSA's OPAIS system.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Prisma 6** ORM + **PostgreSQL**
- **Tailwind CSS 3**

## Data model

| Table                       | Purpose                                            |
| --------------------------- | -------------------------------------------------- |
| `medications`               | NDC, brand/generic, dosage, estimated AMP / URA    |
| `covered_entities`          | 340B-registered entities (DSH / FQHC / PED …)      |
| `contract_pharmacies`       | Pharmacies that dispense 340B drugs                |
| `hrsa_contracts`            | Entity ⇄ pharmacy registrations (with term dates)  |
| `manufacturer_restrictions` | Restrictions keyed by NDC prefix                   |

## API

| Route                       | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `GET /api/medications?q=`   | Search meds; each result includes computed pricing + restrictions |
| `GET /api/medications/:ndc` | Single medication detail                                       |
| `GET /api/entities?q=`      | Search covered entities (with active contract counts)          |
| `GET /api/entities/:id`     | Entity detail with active contract pharmacies                  |
| `GET /api/restrictions`     | All manufacturer restrictions                                  |

## Getting started

```bash
npm install
cp .env.example .env        # then set DATABASE_URL to your Postgres instance
npm run db:push             # create tables
npm run db:seed             # load the illustrative dataset
npm run dev                 # http://localhost:3000
```

### Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm start` — production build & serve
- `npm run lint` — ESLint (next lint)
- `npm run db:push` — push the Prisma schema to the database
- `npm run db:seed` — seed the illustrative dataset
- `npm run db:reset` — reset the DB and reseed
