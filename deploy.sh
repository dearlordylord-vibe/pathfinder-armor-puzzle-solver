#!/bin/bash

# Build all packages in the correct order
echo "Building solver package..."
pnpm --filter @app/solver build

echo "Building state package..."
pnpm --filter @app/state build

echo "Building frontend app..."
pnpm --filter frontend build

# Create public directory for Vercel
echo "Preparing for Vercel deployment..."
mkdir -p public
cp -r apps/frontend/dist/* public/

echo "Build completed successfully!"