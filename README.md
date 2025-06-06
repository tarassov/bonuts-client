# Bonuts.ru Client v2

## Project Overview
Bonuts.ru is a React-based web application built with TypeScript, Vite, and Material UI.

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
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

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

### `yarn lint`
Checks for linting errors.

### `yarn lint:fix`
Fixes linting errors automatically when possible.

### `yarn prettier`
Checks code formatting.

### `yarn prettier:fix`
Fixes code formatting issues.

### `yarn deploy`
Deploys the application to GitHub Pages.
