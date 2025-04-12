// Simple build script for Vercel deployment
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Build solver package
console.log('Building solver package...');
execSync('pnpm build', { 
  cwd: join(__dirname, 'packages/solver'),
  stdio: 'inherit'
});

// Build state package
console.log('Building state package...');
execSync('pnpm build', { 
  cwd: join(__dirname, 'packages/state'),
  stdio: 'inherit'
});

// Build frontend app
console.log('Building frontend app...');
execSync('pnpm build', { 
  cwd: join(__dirname, 'apps/frontend'),
  stdio: 'inherit'
});

console.log('Build completed successfully!');