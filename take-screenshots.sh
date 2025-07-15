#!/bin/bash

# 📸 Automated Screenshot Capture for Hydra Sprite
# This script helps capture high-quality screenshots for Google Play Store

echo "📸 Taking Hydra Sprite Screenshots for Play Store"
echo "================================================"
echo ""
echo "Prerequisites:"
echo "1. Device connected via ADB"
echo "2. Hydra Sprite app installed and running"
echo "3. Set up different app states as prompted"
echo ""

# Check if device is connected
if ! adb devices | grep -q "device$"; then
    echo "❌ No device connected. Please connect your device and try again."
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p play-store-assets/screenshots

echo "📱 Device connected. Ready to capture screenshots!"
echo ""

# Screenshot 1: Thriving Sprite
echo "Screenshot 1: Thriving Sprite (🌟 Goal Reached)"
echo "Instructions:"
echo "- Open Hydra Sprite app"
echo "- Tap '+1 Glass' button 8+ times to reach daily goal"
echo "- Sprite should be in 🌟 thriving state"
read -p "Press Enter when ready..."
adb shell screencap -p /sdcard/screenshot1.png
adb pull /sdcard/screenshot1.png play-store-assets/screenshots/01-thriving-sprite-goal-reached.png
echo "✅ Screenshot 1 saved"
echo ""

# Screenshot 2: Happy Sprite
echo "Screenshot 2: Happy Sprite (😊 Good Progress)"
echo "Instructions:"
echo "- Reset app or start fresh"
echo "- Tap '+1 Glass' button 6-7 times"
echo "- Sprite should be in 😊 happy state"
read -p "Press Enter when ready..."
adb shell screencap -p /sdcard/screenshot2.png
adb pull /sdcard/screenshot2.png play-store-assets/screenshots/02-happy-sprite-progress.png
echo "✅ Screenshot 2 saved"
echo ""

# Screenshot 3: Water Logging Action
echo "Screenshot 3: Water Logging Interface"
echo "Instructions:"
echo "- Show the main screen with water logging buttons visible"
echo "- Make sure '+1 Glass' and '+2 Glasses' buttons are prominent"
echo "- Clean interface, no obstructions"
read -p "Press Enter when ready..."
adb shell screencap -p /sdcard/screenshot3.png
adb pull /sdcard/screenshot3.png play-store-assets/screenshots/03-water-logging-interface.png
echo "✅ Screenshot 3 saved"
echo ""

# Screenshot 4: Progress Tracking
echo "Screenshot 4: Progress Tracking"
echo "Instructions:"
echo "- Show partial progress (3-5 glasses logged)"
echo "- Daily goal progress should be visible"
echo "- Demonstrate tracking functionality"
read -p "Press Enter when ready..."
adb shell screencap -p /sdcard/screenshot4.png
adb pull /sdcard/screenshot4.png play-store-assets/screenshots/04-progress-tracking.png
echo "✅ Screenshot 4 saved"
echo ""

# Screenshot 5: Dehydrated State
echo "Screenshot 5: Dehydrated Sprite (😵 Contrast)"
echo "Instructions:"
echo "- Reset app or start with 0 water logged"
echo "- Sprite should be in 😵 dehydrated state"
echo "- Shows the 'before' state for contrast"
read -p "Press Enter when ready..."
adb shell screencap -p /sdcard/screenshot5.png
adb pull /sdcard/screenshot5.png play-store-assets/screenshots/05-dehydrated-sprite-before.png
echo "✅ Screenshot 5 saved"
echo ""

# Clean up device screenshots
adb shell rm /sdcard/screenshot*.png

echo "🎉 All screenshots captured successfully!"
echo ""
echo "Screenshots saved to: play-store-assets/screenshots/"
echo ""
echo "Files created:"
echo "- 01-thriving-sprite-goal-reached.png"
echo "- 02-happy-sprite-progress.png" 
echo "- 03-water-logging-interface.png"
echo "- 04-progress-tracking.png"
echo "- 05-dehydrated-sprite-before.png"
echo ""
echo "Next steps:"
echo "1. Review screenshots for quality and composition"
echo "2. Upload to Google Play Console"
echo "3. Add compelling descriptions for each screenshot"
echo ""
echo "Tip: Screenshots should tell the story of user progression!" 