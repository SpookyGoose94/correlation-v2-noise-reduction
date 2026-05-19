#!/bin/bash

# Correlation V2 - Automated Deploy with README Generation
# Usage: ./auto-deploy.sh "commit message"
# This script automatically updates README based on git changes

set -e

# Check if there are any changes
if [[ -z $(git status -s) ]]; then
    echo "✅ No changes to deploy"
    exit 0
fi

# Get commit message
if [ -z "$1" ]; then
    echo "Usage: ./auto-deploy.sh \"commit message\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🔍 Analyzing changes..."
echo ""

# Detect file changes
CHANGED_FILES=$(git status -s)

# Generate automatic README update based on changes
AUTO_UPDATE=""
UPDATE_NEEDED=false

# Check for component changes
if echo "$CHANGED_FILES" | grep -q "src/components/.*Cards"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Updated card components for improved layout and visual hierarchy"
    UPDATE_NEEDED=true
fi

if echo "$CHANGED_FILES" | grep -q "src/components/.*Table"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Refined table components for better data presentation"
    UPDATE_NEEDED=true
fi

if echo "$CHANGED_FILES" | grep -q "src/components/ui/badge"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Enhanced badge styling and accessibility"
    UPDATE_NEEDED=true
fi

# Check for theme/styling changes
if echo "$CHANGED_FILES" | grep -q "src/index.css\|tailwind.config.js"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Theme and styling improvements"
    UPDATE_NEEDED=true
fi

# Check for data changes
if echo "$CHANGED_FILES" | grep -q "src/data/mockData.js"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Updated mock data with more realistic patterns"
    UPDATE_NEEDED=true
fi

# Check for page changes
if echo "$CHANGED_FILES" | grep -q "src/pages/"; then
    AUTO_UPDATE="${AUTO_UPDATE}\n- Page structure and layout updates"
    UPDATE_NEEDED=true
fi

# Update README if changes detected
if [ "$UPDATE_NEEDED" = true ]; then
    echo "📝 Auto-generating README update..."

    CURRENT_DATE=$(date +"%Y-%m-%d")

    # Create update content
    cat > readme_update.tmp <<EOF

### Update - $CURRENT_DATE
**Commit**: $COMMIT_MSG

Changes:
${AUTO_UPDATE}

EOF

    # Insert into README
    if grep -q "## ✨ Recent Updates" README.md; then
        # Find the line after "## ✨ Recent Updates" and insert there
        awk '/## ✨ Recent Updates/{print; getline; print; system("cat readme_update.tmp"); next}1' README.md > README.md.new
        mv README.md.new README.md
    else
        # Add Recent Updates section
        awk 'NR==4{print; print ""; print "## ✨ Recent Updates"; system("cat readme_update.tmp"); next}1' README.md > README.md.new
        mv README.md.new README.md
    fi

    rm readme_update.tmp

    echo "✅ README automatically updated"
    echo ""
fi

# Stage all changes
echo "📦 Staging changes..."
git add .

# Commit with co-author
echo "💾 Creating commit..."
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Push
echo "🚀 Pushing to GitHub..."
git push

echo ""
echo "✅ Deployment complete!"
echo "🌐 Vercel: https://correlation-v2-noise-reduction.vercel.app"
echo "📝 README was automatically updated with changes"
echo ""
