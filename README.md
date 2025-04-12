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

The deployment is configured to work optimally with Vercel:

1. The build script in package.json handles the entire build process:
   - Builds the solver package first
   - Builds the state package next (which depends on solver)
   - Builds the frontend app last (which depends on both)
   - Copies the frontend build output to the root directory for Vercel to find

2. The vercel.json file handles SPA routing with a simple rewrite rule.

This ensures that the build output is placed where Vercel expects to find it, and that client-side routing works correctly.