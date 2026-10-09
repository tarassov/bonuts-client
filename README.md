# Bonuts.ru Client v2

## Project Overview
Bonuts.ru is a React-based web application built with TypeScript, Vite, and Material UI.

## Code Style

Code-style rules live as Claude Code skills in `.claude/skills/` (FSD, styling, TypeScript, localization, Storybook, testing, dev runbook). See [docs/code-style.md](docs/code-style.md) for the index, and [AGENTS.md](AGENTS.md) for product context and task framing.

## Environment Configuration

The application uses different environment configurations:

- `.env`: Default environment variables
- `.env.local`: Local overrides (not committed to repository)
- `.env.production`: Production environment variables
- `.env.staging`: Staging environment variables

Key environment variables:

- `VITE_API_URL`: API endpoint URL
- `VITE_API_LOCAL_URL`: Local API URL for development
- `VITE_USE_LOCAL_HOST`: Flag to use localhost for development

To set up your local environment, copy `.env.local.example` to `.env.local` and adjust as needed.

## Available Scripts

In the project directory, you can run:

### `yarn install`
Installs all dependencies required for the project.

### `yarn start` or `yarn dev`
Runs the app in development mode using Vite.
Open [https://localhost:3002](https://localhost:3002) to view it in the browser.

## Running With Docker

Start the app with Docker Compose:

```bash
docker compose up
```

For detached mode, run:

```bash
docker compose up -d
```

The app will be available at [https://localhost:3002](https://localhost:3002).

To view logs or stop the container:

```bash
docker compose logs -f client
docker compose down
```

The first run installs dependencies into a Docker volume, so it can take a few minutes. Because the Vite dev server uses a local HTTPS certificate, your browser may show a certificate warning.

## Running Storybook

Start the Docker container first:

```bash
docker compose up -d
```

If the container was already running before Storybook support was added, recreate it so port `6006` is exposed:

```bash
docker compose up -d --force-recreate
```

Then run Storybook inside the container:

```bash
docker compose exec client yarn storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

To build the static Storybook output, run:

```bash
docker compose exec client yarn build-storybook
```

### `yarn build`
Builds the app for production to the `dist` folder.

### `yarn build-staging`
Builds the app for staging environment.

### `yarn serve`
Previews the built app locally.

### `yarn test`
Runs tests in watch mode using Vitest.

### `yarn test:withoutWatch`
Runs tests once without watch mode.

### `yarn generate-api`
Generates API code from OpenAPI specification.

### `yarn cypress:open`
Opens Cypress Test Runner for interactive end-to-end testing.

### `yarn cypress:run`
Runs all Cypress end-to-end tests in headless mode. Starts and stops the dedicated e2e dev server (`yarn dev:e2e`, port 4173) automatically.

### `yarn cypress:run:login`
Runs only the login page Cypress test.

### `yarn lint`
Runs the full gate: `yarn typecheck` (tsc --noEmit), Biome checks, and the FSD boundary checker.

### `yarn lint:fix`
Same as `yarn lint`, with Biome applying fixes.

### `yarn typecheck`
Type-checks without emitting.

### `yarn biome` / `yarn biome:fix`
Runs Biome alone (linting and formatting). This project uses Biome, not ESLint/Prettier.

### `yarn fsd:check` and friends
Validates Feature-Sliced Design import boundaries. See `scripts/fsd-boundaries/README.md`.

### `yarn deploy`
Builds and deploys the application to GitHub Pages (`gh-pages -d dist -t`). The target is the `homepage` set in `package.json`.

## Running Cypress tests

For headless tests, run:

```bash
yarn cypress:run
```

For interactive mode, start the normal development server in a separate terminal:

```bash
yarn dev:e2e
```

Then open Cypress:

```bash
yarn cypress:open
```

The first test is located at `cypress/e2e/login.cy.ts` and verifies that the login page renders email/password fields and a submit button.
