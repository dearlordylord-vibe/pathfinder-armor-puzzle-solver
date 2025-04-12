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
4. Vercel will automatically detect the project configuration
5. Click "Deploy"

The configuration is handled by the `vercel.json` file at the root of the project, which sets up:
- Build command: `node build.js` (custom build script that builds all packages in the correct order)
- Output directory: `apps/frontend/dist` 
- Install command: `pnpm install`

The custom build script ensures that:
1. The solver package is built first
2. The state package (which depends on solver) is built next
3. The frontend app (which depends on both) is built last

This approach guarantees that all dependencies are properly compiled before they're needed in the build process.