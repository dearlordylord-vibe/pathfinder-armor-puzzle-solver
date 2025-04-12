FROM node:18-alpine as builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all workspace files
COPY packages ./packages
COPY apps ./apps

# Install dependencies
RUN pnpm install

# Build packages
RUN pnpm --filter @app/solver build
RUN pnpm --filter @app/state build 
RUN pnpm --filter frontend build

# Create a directory for the app output
RUN mkdir -p /app/public

# Copy frontend build to public directory
RUN cp -r /app/apps/frontend/dist/* /app/public/

# Production image
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]