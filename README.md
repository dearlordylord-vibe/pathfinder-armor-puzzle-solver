# DISCLAIMER

## This solution was fully vibe coded; apply your own judgement.

# Pathfinder Puzzle 1 Armor Solver

A TypeScript monorepo using pnpm workspaces with a solver library and React frontend.

## Project Structure

- `packages/solver`: Core solver library
- `apps/frontend`: React frontend application

## Setup

```bash
pnpm install
```

## Scripts

### Root
- `pnpm build` - Build all packages and apps
- `pnpm test` - Run tests for all packages
- `pnpm dev:frontend` - Start the frontend development server

### Solver Library
- `pnpm --filter @app/solver build` - Build the solver library
- `pnpm --filter @app/solver test` - Run the solver library tests

### Frontend
- `pnpm --filter frontend dev` - Start the frontend development server
- `pnpm --filter frontend build` - Build the frontend for production
- `pnpm --filter frontend preview` - Preview the production build

## The Game

The game consists of 6 boolean values (tiles), each with associated "moves" that toggle specific tiles. The goal is to make all tiles either ON or OFF. The frontend application provides:

- Interactive game board
- Custom setup mode to set initial conditions
- Game completion detection
- Reset functionality

## Solver

The solver library uses breadth-first search to find optimal solutions to any game configuration.

## Deployment

### Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and create a new project
3. Import your repository
4. Configure the project with the following settings:
   - Build Command: `npm run build` (this will use the deploy.sh script)
   - Output Directory: `public`
5. Click "Deploy"

The deployment process uses a custom deploy.sh script that:
1. Builds each package in the correct dependency order
2. Creates a public directory with the frontend app's build output
3. Places all static assets where Vercel expects to find them

### Docker

This project also includes a Dockerfile for containerization:

```bash
# Build the Docker image
docker build -t pathfinder-puzzle .

# Run the container
docker run -p 8080:80 pathfinder-puzzle
```

The Docker build process:
1. Uses a multi-stage build approach
2. Builds all packages in the correct order
3. Serves the app using Nginx