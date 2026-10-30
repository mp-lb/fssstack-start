# Fssstack Start 🏃‍♂️

Configurator for Fssstack projects. This repository is a pnpm workspace with a React/Vite frontend in `apps/frontend` and the publishable `@mp-lb/fssstack-cli` package in `packages/fssstack-cli`.

## Prerequisites

- Node.js 22.13 or newer
- pnpm 11
- Zapper (`zap`) for local service orchestration

## Install

Install workspace dependencies from the repository root:

```bash
pnpm install
```

If the project uses private packages or external services, make sure the required secrets are available in `.env`. Non-secret local defaults live in `.env.local`.

## Run Locally

Start the local services with Zapper:

```bash
zap up
```

Open the configured homepage:

```bash
zap o
```

Run a single package or app directly with pnpm filters when you need to work outside the full service set:

```bash
pnpm --filter <package-name> dev
```

## Validate

Use the same checks before handing off work:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The Zapper task wrapper also runs the standard lint and typecheck flow:

```bash
zap task check
```

## Audit

Ask a coding agent to follow [audit.md](audit.md) to compare this project with a
committed, verified HelloWorld reference in the resolved Stackforge checkout. The audit prioritizes root configuration and
folder structure, distinguishes justified differences from drift, and writes
its findings to `docs/audits/YYYY-MM-DD-fssstack.md` in an isolated worktree for project-owner integration, without applying fixes.

## Workspace

- `apps/frontend` contains the React/Vite frontend.
- `packages/fssstack-cli` contains the `fssstack` shell command.
- `etc/` contains shared TypeScript, Vitest, and tooling configuration.
- `docs/` contains project implementation guidance. Read shared standards directly from Forum with `fm read <file>.md --store mp-lb/dev`.
- `zap.yaml` defines local services, ports, and common development tasks.

## Development Notes

- Keep non-secret local configuration in `.env.local`.
- Keep secrets in `.env`; do not commit them.
- Use workspace package names with `pnpm --filter` for focused commands.
- Check service logs and port assignments through Zapper while debugging local runs.
- Update the docs in `docs/` when changing project conventions or release behavior.

## Tool versions

Use the exact Node version in `.node-version` and the pnpm version in
`package.json#packageManager`. `engines.node` declares the minimum supported
Node version; it is not a development pin. CI reads `.node-version`.

With mise installed, run `mise trust`, then `mise install`. Use an activated
mise shell or `mise exec -- <command>` so Zapper inherits these tools.
For nvm, run `nvm install "$(cat .node-version)"` and
`nvm use "$(cat .node-version)"`. Dependency policy lives in
`pnpm-workspace.yaml`; use `workspace:*` for internal dependencies.
