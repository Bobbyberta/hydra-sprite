#!/bin/bash

# 📱 Tablet Screenshot Generator for Hydra Sprite
# This script helps you create tablet screenshots without emulators

echo "📱 Tablet Screenshot Generator"
echo "=============================="
echo ""

# Check if phone screenshots exist
if [ ! -f "play-store-assets/screenshots/01-thriving-sprite-goal-reached.png" ]; then
    echo "❌ Phone screenshots not found!"
    echo "Please run ./take-screenshots.sh first to capture phone screenshots."
    exit 1
fi

# Create tablet directories
echo "📁 Creating tablet screenshot directories..."
mkdir -p play-store-assets/screenshots/tablet-7inch
mkdir -p play-store-assets/screenshots/tablet-10inch

echo "✅ Directories created:"
echo "   - play-store-assets/screenshots/tablet-7inch/"
echo "   - play-store-assets/screenshots/tablet-10inch/"
echo ""

echo "📋 Tablet Screenshot Generation Options:"
echo ""
echo "🎯 OPTION 1: Online Resizer (Recommended)"
echo "   1. Go to: https://www.resizeimage.net/"
echo "   2. Upload your phone screenshots"
echo "   3. Resize to tablet dimensions:"
echo "      - 7-inch: 800x1280 pixels"
echo "      - 10-inch: 1200x1920 pixels"
echo "   4. Download and save to tablet directories"
echo ""
echo "🎯 OPTION 2: Android Studio Layout Editor"
echo "   1. Open android/app/src/main/res/layout/activity_main.xml"
echo "   2. Use device selector to preview tablet sizes"
echo "   3. Take screenshots from preview"
echo ""
echo "🎯 OPTION 3: Browser Developer Tools"
echo "   1. Open Chrome/Firefox Developer Tools (F12)"
echo "   2. Click device toggle (mobile icon)"
echo "   3. Select tablet sizes (iPad, iPad Pro)"
echo "   4. Take screenshots"
echo ""

echo "📱 Required Tablet Screenshots:"
echo "================================"
echo ""
echo "7-inch Tablet (800x1280):"
echo "   play-store-assets/screenshots/tablet-7inch/"
echo "   ├── 01-thriving-sprite-7inch.png"
echo "   ├── 02-happy-sprite-7inch.png"
echo "   ├── 03-water-logging-7inch.png"
echo "   ├── 04-progress-tracking-7inch.png"
echo "   └── 05-dehydrated-sprite-7inch.png"
echo ""
echo "10-inch Tablet (1200x1920):"
echo "   play-store-assets/screenshots/tablet-10inch/"
echo "   ├── 01-thriving-sprite-10inch.png"
echo "   ├── 02-happy-sprite-10inch.png"
echo "   ├── 03-water-logging-10inch.png"
echo "   ├── 04-progress-tracking-10inch.png"
echo "   └── 05-dehydrated-sprite-10inch.png"
echo ""

echo "💡 Pro Tips:"
echo "============"
echo "• Use the same app states as phone screenshots"
echo "• Ensure UI elements are properly sized for tablets"
echo "• Focus on touch-friendly interactions"
echo "• Tablet screenshots are optional but recommended"
echo "• You can start with just 7-inch tablet screenshots"
echo ""

echo "🚀 Quick Commands:"
echo "=================="
echo "# Take phone screenshots first:"
echo "./take-screenshots.sh"
echo ""
echo "# Open tablet directories:"
echo "open play-store-assets/screenshots/tablet-7inch/"
echo "open play-store-assets/screenshots/tablet-10inch/"
echo ""
echo "# View all assets:"
echo "ls -la play-store-assets/screenshots/"
echo ""

echo "✅ Ready to generate tablet screenshots!"
echo "Choose your preferred method above and get started." 