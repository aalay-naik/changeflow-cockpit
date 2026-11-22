# ChangeFlow Cockpit

[![CI](https://github.com/aalay-naik/changeflow-cockpit/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/aalay-naik/changeflow-cockpit/actions/workflows/ci.yml)

Change pipeline dashboard for a fictional automotive OEM, built on **synthetic data only**.

Stack: Python FastAPI + PostgreSQL (backend), Next.js TypeScript (frontend), Docker Compose, GitHub Actions.

## Quick start

Needs: Docker Desktop (running), [uv](https://docs.astral.sh/uv/), Node.js 26.

```bash
# 1. Secrets: copy the template, then set a real password in .env
cp .env.example .env

# 2. Database (PostgreSQL in Docker)
docker compose -f infra/docker-compose.yml up -d

# 3. Backend API -> http://localhost:8000/health
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000

# 4. Frontend (in a second Terminal tab) -> http://localhost:3000/health
cd frontend
npm install
npm run dev
```

## Checks (the same ones CI runs on every pull request)

```bash
# Backend
cd backend
uv run ruff check .          # lint
uv run ruff format --check . # formatting
uv run pytest                # tests

# Frontend
cd frontend
npm run lint
npm run typecheck
npm test
npm run build
```

## Project structure

```
changeflow-cockpit/
├── backend/                 # Python FastAPI app (Python 3.13, managed with uv)
│   ├── app/
│   │   ├── api/             # HTTP endpoints (routes), e.g. /health
│   │   └── schemas/         # request/response shapes (Pydantic)
│   └── tests/               # backend tests (pytest)
├── frontend/                # Next.js TypeScript app
│   ├── src/
│   │   ├── app/             # pages, e.g. /health
│   │   └── lib/             # API client and helpers
│   └── tests/               # frontend tests (Vitest)
├── infra/                   # Docker Compose (PostgreSQL + data volume)
├── docs/
│   └── decisions/           # Architecture Decision Records (ADRs), one file per decision
├── .github/workflows/       # CI pipeline: lint + tests on every pull request
├── .env.example             # list of required settings, with fake values
├── CLAUDE.md                # instructions for Claude Code
└── README.md
```

More folders (`models/`, `services/`, `data/`, `migrations/`, ...) are added in later phases,
following the structure in `CLAUDE.md`.

## Decisions

- [0001. Use PostgreSQL, run with Docker Compose](docs/decisions/0001-use-postgres.md)
