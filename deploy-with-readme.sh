#!/bin/bash

# Correlation V2 - Smart Deploy Script with README Updates
# Usage: ./deploy-with-readme.sh "commit message"

set -e

echo "🔍 Checking for changes..."

# Check if there are any changes
if [[ -z $(git status -s) ]]; then
    echo "✅ No changes to deploy"
    exit 0
fi

# Show what changed
echo ""
echo "📝 Changed files:"
git status -s
echo ""

# Detect what type of changes were made
COMPONENTS_CHANGED=$(git status -s | grep -E "src/components/" | wc -l)
PAGES_CHANGED=$(git status -s | grep -E "src/pages/" | wc -l)
DATA_CHANGED=$(git status -s | grep -E "src/data/" | wc -l)
STYLES_CHANGED=$(git status -s | grep -E "src/index.css|tailwind.config.js" | wc -l)

# Generate suggested README update
SUGGESTED_UPDATE=""

if [ $COMPONENTS_CHANGED -gt 0 ]; then
    SUGGESTED_UPDATE="${SUGGESTED_UPDATE}\n- Component updates detected (${COMPONENTS_CHANGED} files)"
fi

if [ $PAGES_CHANGED -gt 0 ]; then
    SUGGESTED_UPDATE="${SUGGESTED_UPDATE}\n- Page structure changes detected (${PAGES_CHANGED} files)"
fi

if [ $DATA_CHANGED -gt 0 ]; then
    SUGGESTED_UPDATE="${SUGGESTED_UPDATE}\n- Mock data updates detected"
fi

if [ $STYLES_CHANGED -gt 0 ]; then
    SUGGESTED_UPDATE="${SUGGESTED_UPDATE}\n- Styling/theme changes detected"
fi

# Ask if README should be updated
if [ -n "$SUGGESTED_UPDATE" ]; then
    echo "💡 Detected changes that may need README documentation:"
    echo -e "$SUGGESTED_UPDATE"
    echo ""
    read -p "Would you like to update the README? (y/n): " UPDATE_README

    if [[ $UPDATE_README == "y" || $UPDATE_README == "Y" ]]; then
        echo ""
        echo "📄 Please describe the changes for the README:"
        read -p "Update description: " README_UPDATE

        # Backup current README
        cp README.md README.md.backup

        # Get current date
        CURRENT_DATE=$(date +"%Y-%m-%d")

        # Create temporary update
        cat > readme_update.tmp <<EOF

### Update - $CURRENT_DATE
$README_UPDATE

EOF

        # Insert after the "Recent Updates" header
        if grep -q "## ✨ Recent Updates" README.md; then
            # Insert after existing Recent Updates section
            awk '/## ✨ Recent Updates/{print; print ""; system("cat readme_update.tmp"); next}1' README.md > README.md.new
            mv README.md.new README.md
        else
            # Add new Recent Updates section after main description
            awk 'NR==4{print; print ""; print "## ✨ Recent Updates"; print ""; system("cat readme_update.tmp"); next}1' README.md > README.md.new
            mv README.md.new README.md
        fi

        # Clean up
        rm readme_update.tmp

        echo "✅ README.md updated successfully"
        echo ""
    fi
fi

# Get commit message
if [ -z "$1" ]; then
    read -p "Enter commit message: " COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

# Add all changes including README if it was modified
git add .

# Create commit
echo ""
echo "📦 Creating commit..."
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push

echo ""
echo "✅ Deployment complete!"
echo "🌐 Vercel will automatically deploy in ~1-2 minutes"
echo "📍 https://correlation-v2-noise-reduction.vercel.app"
echo ""

# Cleanup backup if exists
if [ -f "README.md.backup" ]; then
    rm README.md.backup
fi
