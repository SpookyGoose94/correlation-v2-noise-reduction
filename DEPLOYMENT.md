# Deployment Guide

This project includes multiple deployment scripts to make pushing changes and updating documentation easier.

## 🚀 Deployment Scripts

### 1. `deploy.sh` - Basic Quick Deploy
**Use when**: You just want to quickly push changes without README updates

```bash
./deploy.sh "Your commit message"
```

or without a message (uses timestamp):

```bash
./deploy.sh
```

**What it does**:
- Adds all changes
- Creates commit with your message
- Pushes to GitHub
- Triggers Vercel deployment

---

### 2. `deploy-with-readme.sh` - Interactive Deploy with README Prompts
**Use when**: You want to be prompted about README updates

```bash
./deploy-with-readme.sh "Your commit message"
```

**What it does**:
1. Analyzes what files changed (components, pages, styles, data)
2. Suggests whether README needs updating
3. Prompts you to describe changes if needed
4. Automatically inserts update into README with current date
5. Commits everything and pushes to GitHub

**Features**:
- ✅ Detects component changes
- ✅ Detects page structure changes
- ✅ Detects data/mock updates
- ✅ Detects theme/styling changes
- ✅ Smart insertion into "Recent Updates" section
- ✅ Creates backup before modifying README
- ✅ Adds co-author attribution automatically

---

### 3. `auto-deploy.sh` - Fully Automated README Updates
**Use when**: You want README automatically updated based on file changes

```bash
./auto-deploy.sh "Your commit message"
```

**What it does**:
1. Automatically detects what changed
2. Generates appropriate README update based on changes:
   - Card components → "Updated card components for improved layout"
   - Table components → "Refined table components for better data presentation"
   - Badge styling → "Enhanced badge styling and accessibility"
   - Theme/CSS → "Theme and styling improvements"
   - Mock data → "Updated mock data with more realistic patterns"
   - Pages → "Page structure and layout updates"
3. Inserts update into README with date and commit message
4. Commits and pushes everything automatically

**Best for**: Quick iterations where you trust the automated README generation

---

## 📋 Comparison

| Script | README Update | User Input | Best For |
|--------|---------------|------------|----------|
| `deploy.sh` | ❌ None | Commit message only | Quick fixes, minor changes |
| `deploy-with-readme.sh` | 🤔 Prompted | Asks if you want to update | When you need control over documentation |
| `auto-deploy.sh` | ✅ Automatic | Commit message only | Fast iterations, automated workflows |

---

## 🎯 Recommended Workflow

**For feature development**:
```bash
# Make your changes...
./deploy-with-readme.sh "Add new metrics dashboard section"
# Follow prompts to describe changes
```

**For quick bug fixes**:
```bash
# Fix the bug...
./deploy.sh "Fix badge contrast in light mode"
```

**For rapid prototyping**:
```bash
# Make changes...
./auto-deploy.sh "Redesign card layout with compact spacing"
# README auto-updates, everything pushes automatically
```

---

## 🌐 Deployment URL

After pushing, Vercel automatically deploys in ~1-2 minutes:

**Production**: https://correlation-v2-noise-reduction.vercel.app

---

## 📝 README Structure

All scripts insert updates into the **"Recent Updates"** section at the top of README.md with:
- Current date
- Commit message (for `auto-deploy.sh`)
- Your custom description (for `deploy-with-readme.sh`)
- Bullet points of detected changes

Example output:
```markdown
### Update - 2026-05-18
**Commit**: Redesign card layout with compact spacing

Changes:
- Updated card components for improved layout and visual hierarchy
- Enhanced badge styling and accessibility
- Updated mock data with more realistic patterns
```

---

## 🛡️ Safety Features

- **Backup creation**: `deploy-with-readme.sh` creates `README.md.backup` before changes
- **Change detection**: All scripts show what files changed before committing
- **No force pushes**: Safe, standard git push operations
- **Co-author attribution**: Automatically adds Claude co-author line to commits

---

## ⚙️ Customization

Edit the scripts to customize:
- Change detection patterns (line ~30-50 in each script)
- README update templates (line ~60-80)
- Commit message format (line ~100-110)

---

## 🐛 Troubleshooting

**Script won't run**: Make sure it's executable
```bash
chmod +x deploy.sh deploy-with-readme.sh auto-deploy.sh
```

**README formatting broken**: Restore from backup
```bash
cp README.md.backup README.md
```

**Vercel not deploying**: Check your Vercel dashboard and ensure GitHub integration is active
