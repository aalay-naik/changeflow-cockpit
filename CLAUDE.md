# ChangeFlow Cockpit

Change pipeline dashboard for a fictional automotive OEM, built on synthetic data.
Stack: Python FastAPI + PostgreSQL backend, Next.js TypeScript frontend, Docker Compose, GitHub Actions.
Pin the backend to Python 3.12 or 3.13 with `uv` (the Mac has Homebrew Python 3.15).

## Working with me

- I'm a beginner developer learning to build production-ready, secure AI apps. Explain each step briefly and simply, with a small example when a concept is new.
- Let me run the Git commands myself (branch, commit, push, pull request) and tell me what each one does.
- Ask before pushing anything to GitHub.

## Manual steps: guide me, don't do them for me

I want to learn GitHub, CI/CD and Docker by doing them by hand. For these, give me numbered step-by-step instructions and wait for me to do them. Don't run them yourself unless I say "you do it".

- **Git:** `git init`, creating branches, `git add`, `git commit`, `git push`, merging
- **GitHub:** creating the repo, opening a pull request, reading the CI checks, reviewing and merging, branch protection, GitHub Secrets, Dependabot and other settings
- **CI/CD:** I trigger and watch the GitHub Actions runs myself; explain what each step in the pipeline does and how to read a failed run
- **Docker:** `docker compose up`, `down`, `logs`, `ps`, rebuilding images, checking volumes

For each step:
1. Say what we're about to do and why, in one or two sentences.
2. Give the exact command, or the exact clicks on the GitHub website (menu names, button labels).
3. Say what I should expect to see if it worked.
4. Wait for me to paste the result, then explain anything unusual and continue.

You can still write the code and config files (Dockerfile, docker-compose.yml, workflow YAML) yourself, but explain the important lines in them.
After I've done a step type several times confidently, ask once whether I want to keep doing it manually.

## Learnings file

Keep my learnings notes up to date: `/Users/aalaynaik/Projects/Learnings/dev-learnings.md`

- Whenever a new concept, tool, command, error fix or "lesson learned" comes up, add it to that file in the same session, without asking first.
- Read the file before editing. Add to the matching section (Terminal basics, Homebrew, Python versions, Docker, Git, GitHub and the GitHub CLI, Project folders, Claude Code), or create a new `##` section for a new topic (e.g. FastAPI, PostgreSQL, Next.js, GitHub Actions, uv).
- Write in plain, simple English as short bullets, with commands in code blocks. Don't repeat what's already there; update the existing line instead.
- Never put secrets (API keys, passwords, tokens) in the file.
- At the end of a session, tell me in one line what you added.

## Folder structure (follow strictly)

```
changeflow-cockpit/
├── backend/                  # Python FastAPI app
│   ├── app/
│   │   ├── api/              # HTTP endpoints (routes)
│   │   ├── models/           # database tables (SQLAlchemy)
│   │   ├── schemas/          # request/response shapes (Pydantic)
│   │   ├── services/         # business logic
│   │   ├── ai/               # AI tools, prompts, agent code (from Phase 4)
│   │   └── core/             # config, settings, security
│   ├── migrations/           # database schema changes (Alembic)
│   ├── tests/
│   ├── pyproject.toml
│   └── Dockerfile
├── frontend/                 # Next.js TypeScript app
│   ├── src/
│   │   ├── app/              # pages
│   │   ├── components/       # reusable UI pieces
│   │   └── lib/              # API client, helpers
│   ├── tests/
│   ├── package.json
│   └── Dockerfile
├── data/
│   ├── generator/            # code that creates the synthetic OEM data
│   ├── seed/                 # small, hand-checked sample data (in Git)
│   └── generated/            # big generated output (NOT in Git)
├── infra/
│   ├── docker-compose.yml
│   └── keycloak/             # login config (Phase 3)
├── docs/
│   ├── architecture.md
│   └── decisions/            # one short file per important decision (ADR), e.g. 0001-use-postgres.md
├── .github/workflows/        # CI/CD pipelines
├── .env.example
├── .gitignore
├── CLAUDE.md
└── README.md
```

Rules:
- Put every file in the folder above that matches its purpose. Never create a new top-level folder without asking me first.
- Naming: folders and frontend files in `kebab-case`, Python files in `snake_case`, no spaces, no capitals in file names (except README.md, CLAUDE.md).
- Data: generator code is in Git; generated data and database contents are not. Never commit real or client data — only synthetic data.
- Secrets only in `.env` (never in Git); `.env.example` lists the keys with fake values.
- When you add a folder, add a one-line note about it in README.md under "Project structure".
- Record important decisions (tool choices, design trade-offs) as a short file in `docs/decisions/`.
