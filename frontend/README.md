# Northstar ERP — Frontend

A responsive ERP workspace built with React and TypeScript. It includes overview, sales, inventory, purchasing, people, finance, reports, activity, settings, and help screens. This frontend-only prototype uses typed local mock data and async mock API boundaries designed to be replaced by real service calls later.

## Features

- Business overview with revenue, order, customer, and inventory KPIs
- Sales operations, pipeline, and searchable orders
- Inventory, purchasing, people, and invoice management tables
- Reports, activity audit feed, workspace settings, and searchable help FAQs
- Revenue vs. expenses chart with a working time range selector
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
    ├── App.tsx                         # Application shell and overview
    ├── main.tsx                        # React entry point
    ├── styles.css                      # Design system and responsive styles
    ├── components/                     # Sidebar and top bar
    ├── data/                           # Typed dashboard and module fixtures
    ├── features/
    │   ├── dashboard/                  # Overview chart, activity, and orders
    │   └── modules/                    # ERP workspace screens
    ├── lib/                            # Async mock API methods
    └── types/                          # Shared ERP domain contracts
```

## Mock API boundary

`src/lib/mock-api.ts` provides typed methods for dashboard metrics, revenue, orders, and activity. `src/lib/module-api.ts` supplies mock route methods for inventory, purchasing, people, invoices, and saved reports. Replace those method bodies with `fetch` calls when backend endpoints are ready; the UI consumes the same TypeScript data contracts from `src/types/erp.ts`.

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

Google Fonts (DM Sans and Manrope) are loaded by the HTML stylesheet link. Charts are built with CSS and use no charting dependency.

## Notes

- No API server, authentication, database, or external service is connected.
- Sample dates and business figures are illustrative. Module actions provide local UI feedback and are not persisted.
- Forms, exports, filters, and other actions are local prototype interactions; records are not persisted.
