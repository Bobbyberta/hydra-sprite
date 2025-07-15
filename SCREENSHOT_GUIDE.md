# 📸 Play Store Screenshots Guide

## Overview
This guide walks you through taking high-quality screenshots for Google Play Store using screen grabs from the actual Hydra Sprite app.

## 📱 Screenshot Requirements

### Google Play Store Requirements
- **Phone Screenshots**: 2-8 screenshots required
- **Aspect Ratios**: 16:9 or 9:16 (portrait recommended)
- **Minimum Resolution**: 320px on shorter side
- **Maximum Resolution**: 3840px on shorter side
- **Format**: PNG or JPEG
- **File Size**: Max 8MB per screenshot

### Recommended Screenshots for Hydra Sprite
1. **Main Screen - Happy Sprite** (sprite in 😊 state with water logged)
2. **Main Screen - Thriving Sprite** (sprite in 🌟 state with goal reached)
3. **Water Logging Action** (showing the +1 and +2 glass buttons)
4. **Progress Tracking** (daily goal progress visible)
5. **Dehydrated State** (sprite in 😵 state to show contrast)

## 🚀 Taking Screenshots

### Step 1: Build and Install App
```bash
# Build and install the app with new icons
./test-app

# Or use release build for better quality
./release-android.sh test
```

### Step 2: Prepare App States
Before taking screenshots, set up different app states:

#### Screenshot 1: Thriving Sprite (Goal Reached)
1. Open the app
2. Tap "+1 Glass" button 8+ times to reach daily goal
3. Sprite should be in 🌟 thriving state
4. Take screenshot showing full screen

#### Screenshot 2: Happy Sprite (Good Progress)
1. Reset the app or start fresh day
2. Tap "+1 Glass" button 6-7 times
3. Sprite should be in 😊 happy state
4. Take screenshot

#### Screenshot 3: Water Logging Action
1. With sprite in any state, hover finger over "+1 Glass" button
2. Take screenshot showing the interactive buttons clearly
3. Make sure UI elements are visible and clean

#### Screenshot 4: Progress Tracking
1. Ensure you have some water logged (3-5 glasses)
2. Make sure daily goal progress is visible
3. Take screenshot showing progress indicators

#### Screenshot 5: Dehydrated State (Contrast)
1. Reset app or start with 0 water logged
2. Sprite should be in 😵 dehydrated state
3. Take screenshot to show the "before" state

### Step 3: Capture Screenshots

#### Method 1: Android Device (Recommended)
```bash
# Connect device and ensure it's detected
adb devices

# Take screenshot using ADB
adb shell screencap -p /sdcard/screenshot1.png
adb pull /sdcard/screenshot1.png play-store-assets/screenshots/

# Repeat for each screenshot with different filenames
```

#### Method 2: Device Built-in Screenshot
1. **Android**: Power + Volume Down (simultaneously)
2. **iOS**: Side Button + Volume Up (or Home + Power on older devices)
3. Transfer screenshots to computer
4. Copy to `play-store-assets/screenshots/` folder

#### Method 3: Android Studio (If using emulator)
1. Open Android Studio
2. Run app on emulator
3. Click camera icon in emulator controls
4. Save screenshots to `play-store-assets/screenshots/`

### Step 4: Organize Screenshots
```bash
# Rename screenshots descriptively
cd play-store-assets/screenshots/

# Example naming convention:
# 01-thriving-sprite-goal-reached.png
# 02-happy-sprite-good-progress.png
# 03-water-logging-buttons.png
# 04-progress-tracking.png
# 05-dehydrated-sprite-contrast.png
```

## 🎨 Screenshot Tips

### Composition
- **Keep it simple**: Focus on main app functionality
- **Show user benefit**: Demonstrate value proposition
- **Use contrast**: Show different sprite states
- **Highlight interactions**: Make buttons and UI clear

### Quality
- **Use real device**: Better quality than emulator
- **Clean screen**: No notifications or system UI distractions
- **Good lighting**: If photographing screen, use good lighting
- **Steady hands**: Avoid blur from camera shake

### Content
- **Show progression**: Screenshots should tell a story
- **Feature highlights**: Each screenshot should highlight a key feature
- **User journey**: Follow natural user flow through the app
- **Visual appeal**: Make sure sprites and UI look engaging

## 📋 Screenshot Checklist

Before uploading to Play Store, verify:

- [ ] **Resolution**: Screenshots are high quality and clear
- [ ] **Aspect Ratio**: 16:9 or 9:16 ratio maintained
- [ ] **File Size**: Under 8MB each
- [ ] **Format**: PNG or JPEG format
- [ ] **Content**: Shows key app features and benefits
- [ ] **Variety**: Different sprite states and interactions shown
- [ ] **Quality**: No blur, artifacts, or distortions
- [ ] **Branding**: App icon and colors are consistent
- [ ] **UI Clean**: No system notifications or distractions
- [ ] **Sequence**: Screenshots tell a coherent story

## 🚀 Quick Screenshot Script

Use this script for automated screenshot capture:

```bash
#!/bin/bash
# Quick screenshot capture script

echo "📸 Taking Hydra Sprite Screenshots"
echo "Make sure app is running on connected device"
echo ""

read -p "Press Enter when ready for Screenshot 1 (Thriving Sprite)..."
adb shell screencap -p /sdcard/screenshot1.png
adb pull /sdcard/screenshot1.png play-store-assets/screenshots/01-thriving-sprite.png

read -p "Press Enter when ready for Screenshot 2 (Happy Sprite)..."
adb shell screencap -p /sdcard/screenshot2.png
adb pull /sdcard/screenshot2.png play-store-assets/screenshots/02-happy-sprite.png

read -p "Press Enter when ready for Screenshot 3 (Water Logging)..."
adb shell screencap -p /sdcard/screenshot3.png
adb pull /sdcard/screenshot3.png play-store-assets/screenshots/03-water-logging.png

read -p "Press Enter when ready for Screenshot 4 (Progress)..."
adb shell screencap -p /sdcard/screenshot4.png
adb pull /sdcard/screenshot4.png play-store-assets/screenshots/04-progress.png

read -p "Press Enter when ready for Screenshot 5 (Dehydrated)..."
adb shell screencap -p /sdcard/screenshot5.png
adb pull /sdcard/screenshot5.png play-store-assets/screenshots/05-dehydrated.png

echo "✅ All screenshots captured!"
echo "Check play-store-assets/screenshots/ folder"
```

Save this as `take-screenshots.sh` and make it executable:
```bash
chmod +x take-screenshots.sh
./take-screenshots.sh
```

## 📱 Alternative: Screenshot Tools

### Android
- **Built-in**: Power + Volume Down
- **ADB**: `adb shell screencap`
- **Android Studio**: Emulator camera button
- **Third-party**: Screenshot apps from Play Store

### iOS
- **Built-in**: Side Button + Volume Up
- **Xcode**: Simulator > Device > Screenshot
- **QuickTime**: Screen recording then extract frames

## 🎯 Next Steps

After capturing screenshots:

1. **Review Quality**: Check all screenshots for clarity and composition
2. **Edit if Needed**: Basic cropping or brightness adjustment
3. **Organize Files**: Use descriptive filenames
4. **Upload to Play Console**: Add to your app listing
5. **Test on Different Devices**: Verify screenshots look good on various screen sizes

Remember: Great screenshots can significantly improve your app's download rate! Take time to make them compelling and representative of your app's value. 