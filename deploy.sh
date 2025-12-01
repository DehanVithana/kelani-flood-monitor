#!/bin/bash

# Kelani Flood Monitor - Deployment Script
# This script helps you deploy to GitHub and Vercel without GitHub Desktop

echo "🌊 Kelani River Flood Monitor - Deployment Script"
echo "================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "Adding files to Git..."
git add .

# Commit
echo "Creating commit..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update flood monitoring system"
fi
git commit -m "$commit_msg"

# Ask for remote URL if not set
if ! git remote | grep -q 'origin'; then
    echo ""
    echo "GitHub repository not connected."
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/kelani-flood-monitor.git): " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository: kelani-flood-monitor"
echo "4. Vercel will auto-detect Vite and deploy"
echo "5. Your site will be live in ~2 minutes!"
echo ""
