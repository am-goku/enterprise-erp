# Northstar ERP — Frontend

A responsive ERP operations dashboard built with React and TypeScript. It is a frontend-only prototype: all dashboard content comes from typed local mock data, with a small async mock API boundary designed to be replaced by real service calls later.

## Features

- Business overview with revenue, order, customer, and inventory KPIs
- Revenue vs. expenses chart with a time range selector
- Recent activity feed and searchable order list
- Workspace navigation, notifications, date controls, and action feedback
- Responsive layout for desktop, tablet, and mobile
- Strict TypeScript, ES module imports, and separated UI, feature, type, data, and API layers

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL after startup. To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
frontend/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                    # Application shell and overview page
    ├── main.tsx                   # React entry point
    ├── styles.css                 # Design system and responsive styles
    ├── components/                # Shared navigation and top bar
    ├── data/dashboard.ts          # Sample business records
    ├── features/dashboard/        # Dashboard chart, activity, and orders
    ├── lib/mock-api.ts            # Async mock API methods
    └── types/erp.ts               # Shared domain types
```

## Mock API boundary

`src/lib/mock-api.ts` provides typed methods for metrics, revenue, orders, and activity. Replace those method bodies with `fetch` calls when backend endpoints are ready; the UI consumes the same TypeScript data contracts from `src/types/erp.ts`.

## Third-party libraries

| Library | Purpose | Type |
| --- | --- | --- |
| React | Component-based user interface | Runtime dependency |
| React DOM | Browser rendering | Runtime dependency |
| Lucide React | Consistent outline icon set | Runtime dependency |
| Vite | Development server and production bundler | Build/development dependency |
| TypeScript | Static typing and type checking | Build/development dependency |
| `@vitejs/plugin-react` | React support in Vite | Build/development dependency |
| `@types/react`, `@types/react-dom` | React type declarations | Build/development dependency |

Google Fonts (DM Sans and Manrope) are loaded by the HTML stylesheet link. The dashboard chart is built with CSS and uses no charting dependency.

## Notes

- No API server, authentication, database, or external service is connected.
- Sample dates and business figures are illustrative.
- The dashboard is a polished starting point; individual ERP sections can be added as separate features as the product scope is defined.
