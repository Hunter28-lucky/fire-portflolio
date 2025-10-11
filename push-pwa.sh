#!/bin/bash
# Git push script for PWA implementation

cd /Users/krishyogi/Desktop/fire-portflorio

echo "================================"
echo "PWA Implementation - Git Push"
echo "================================"
echo ""

echo "📊 Checking current status..."
git status

echo ""
echo "📝 Committing changes..."
git commit -m "Add PWA Support - Portfolio now installable as app on all devices"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin master

echo ""
echo "✅ Done! Check status..."
git status

echo ""
echo "================================"
echo "✨ PWA Successfully Pushed!"
echo "================================"
