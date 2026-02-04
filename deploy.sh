#!/bin/bash

# Deployment script for bruegger.dev
# Usage: ./deploy.sh [staging|production]

set -e

# Configuration
BUILD_DIR="dist"
REMOTE_HOST="bruegger.dev"
REMOTE_USER="root"
REMOTE_PATH="/var/www/bruegger.dev"

# Parse arguments
ENVIRONMENT=${1:-production}
SSH_KEY=""

echo "🚀 Starting deployment to $ENVIRONMENT..."

# Build the site
echo "📦 Building the site..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy based on environment
if [ "$ENVIRONMENT" = "staging" ]; then
    echo "🧪 Deploying to staging..."
    rsync -avz --delete "$BUILD_DIR/" "$REMOTE_USER@$REMOTE_HOST:/var/www/bruegger.dev-staging/"
elif [ "$ENVIRONMENT" = "production" ]; then
    echo "🌟 Deploying to production..."
    rsync -avz --delete "$BUILD_DIR/" "$REMOTE_USER@$REMOTE_HOST:/var/www/bruegger.dev/"
else
    echo "❌ Unknown environment: $ENVIRONMENT"
    echo "Usage: ./deploy.sh [staging|production]"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your site is now live at $ENVIRONMENT"