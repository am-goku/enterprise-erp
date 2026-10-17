# Enterprise ERP

A portfolio project exploring a modular enterprise resource planning platform. The frontend is an interactive React + TypeScript dashboard prototype powered by local mock data; no backend or database is connected yet.

## Frontend

See [frontend/README.md](frontend/README.md) for the feature overview, architecture, dependency list, and local setup instructions.

```bash
cd frontend
npm install
npm run dev
```

## Current status

- Frontend: responsive business overview and mock API/data layer
- Backend: initial NestJS API gateway scaffold
- Infrastructure: Docker Compose configuration not set up yet

## Project layout

```text
backend/api-gateway/   NestJS API gateway scaffold
frontend/              React + TypeScript ERP dashboard
docker-compose.yml     Local services configuration (planned)
```

All displayed business names, dates, amounts, and activity are illustrative demo data.
