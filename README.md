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