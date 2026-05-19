#!/bin/bash

# Deployment script for Vercel via GitHub
# Usage: ./deploy.sh "Your commit message"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get commit message from argument or use default
if [ -z "$1" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

echo -e "${BLUE}📦 Starting deployment...${NC}"
echo ""

# Add all changes
echo "Adding changes..."
git add .

# Commit with message
echo "Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push to GitHub
echo "Pushing to GitHub..."
git push

echo ""
echo -e "${GREEN}✅ Pushed to GitHub!${NC}"
echo ""
echo "🚀 Vercel will automatically deploy in ~1-2 minutes"
echo "📍 URL: https://correlation-v2-noise-reduction.vercel.app"
echo ""
echo "Check deployment status at: https://vercel.com/dashboard"
