# 0001. Use PostgreSQL, run with Docker Compose

- Status: Accepted
- Date: 2026-11-22

## Context

ChangeFlow Cockpit stores change requests, their pipeline steps and their history for a
fictional automotive OEM. The data is relational: a change has many steps, approvals and
affected parts, and we need reliable queries and reporting across them. The same database
must run on a laptop, in CI and later in a deployed environment.

## Decision

- Use **PostgreSQL** (version 18) as the only database.
- Run it locally with **Docker Compose** (`infra/docker-compose.yml`), not installed on the Mac.
- Keep its data in a **named Docker volume** (`postgres-data`), so data survives container restarts.
- Read the credentials from `.env` (not in Git); `.env.example` lists the keys with fake values.
- Expose the port on `127.0.0.1` only, so the database is not reachable from the network.

## Alternatives considered

- **SQLite:** simplest to start, but weaker for concurrent users and different from what runs in production.
- **MySQL:** a solid choice, but PostgreSQL has better JSON support, strong typing and full-text search, and it is the most common choice with FastAPI and SQLAlchemy.
- **A hosted database (e.g. a cloud service):** adds cost and an account for local development; can be used later for deployment.

## Consequences

- Docker must be running to work on the project.
- One command starts the database: `docker compose -f infra/docker-compose.yml up -d`.
- Deleting the volume (`docker compose ... down -v`) deletes all local data. That's fine,
  since all data is synthetic and can be regenerated.
- Schema changes will be managed with Alembic migrations (from the phase where tables are added).
