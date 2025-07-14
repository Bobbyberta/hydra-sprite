# 📱 Android Development Guide for Mac
*Complete setup for React Native Android development and publishing without Android Studio IDE*

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [📦 Minimal Android SDK Setup](#-minimal-android-sdk-setup)
- [📱 Modern Wireless Development Setup](#-modern-wireless-development-setup)
- [🔧 Device Pairing Process](#-device-pairing-process)
- [🚀 Building and Running Apps](#-building-and-running-apps)
- [📊 Publishing to Google Play Store](#-publishing-to-google-play-store)
- [💡 Pro Tips & Workflows](#-pro-tips--workflows)
- [🐛 Comprehensive Troubleshooting](#-comprehensive-troubleshooting)

---

## 🎯 Overview

This guide covers the **minimal setup** required to develop and publish React Native apps for Android using macOS, **without needing the full Android Studio IDE**. You can develop wirelessly on physical devices and publish directly to Google Play Store.

### What You Need vs Don't Need

**✅ Required:**
- Android SDK (command line tools only)
- Android platform tools  
- Java Development Kit 17+
- Node.js 16+ & React Native CLI
- Physical Android device with Android 11+
- WiFi network (same for Mac and device)
- Google Play Console account ($25 one-time fee)

**❌ NOT Required:**
- Android Studio IDE (just need SDK)
- Android emulators
- Xcode or iOS tools
- Physical USB cables (after initial pairing)
- Windows or Linux setup

---

## 📦 Minimal Android SDK Setup

### Option 1: Automated Setup (Recommended)

```bash
# Use our enhanced setup script
./setup-android-wireless.sh setup
```

### Option 2: Manual Installation

#### Step 1: Install Prerequisites
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java JDK 17
brew install --cask zulu@17

# Verify Java installation
java -version
```

#### Step 2: Download Android SDK
```bash
# Create Android SDK directory
mkdir -p ~/android-sdk

# Download command line tools
cd ~/android-sdk
curl -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-mac-11076708_latest.zip

# Extract and organize
unzip cmdline-tools.zip
mkdir -p cmdline-tools/latest
mv cmdline-tools/* cmdline-tools/latest/
rm cmdline-tools.zip
```

#### Step 3: Setup Environment Variables
```bash
# Add to ~/.zshrc or ~/.bashrc
echo 'export ANDROID_HOME=$HOME/android-sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin' >> ~/.zshrc

# Reload shell configuration
source ~/.zshrc
```

#### Step 4: Install SDK Components
```bash
# Accept licenses and install components
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

---

## 📱 Modern Wireless Development Setup

### Android 11+ Wireless Debugging (Recommended)

This is the modern, secure method that doesn't require USB cable for daily development.

#### Prerequisites Check
```bash
# Verify installation
adb --version
java -version
node --version

# Should see:
# Android Debug Bridge version 1.0.41
# openjdk version "17.x.x"
# v16.x.x or higher
```

---

## 🔧 Device Pairing Process

### Step 1: Enable Developer Options (One-time)

**On your Android device:**
1. **Settings** → **About phone**
2. Tap **"Build number"** 7 times rapidly
3. You'll see **"You are now a developer!"**
4. **Settings** → **Developer options** (now visible)

### Step 2: Enable Wireless Debugging

**On your Android device:**
1. **Settings** → **Developer options**
2. Toggle **"Wireless debugging"** ON
3. Keep this screen open for pairing

### Step 3: Two-Part Connection Process

#### 🔗 Part A: Initial Pairing (One-time per device)

**📱 On your Android device:**
1. In **"Wireless debugging"** screen
2. Tap **"Pair device with pairing code"**
3. Note the **IP:PORT** and **6-digit code** displayed

**💻 On your Mac:**
```bash
# Use the pairing IP:PORT from your device
adb pair 100.100.1.100:10000
# Enter the 6-digit code when prompted
```

**Expected output:**
```
Enter pairing code: 123456
Successfully paired to 100.100.1.100:10000
```

#### 🔌 Part B: Connection for Development

**📱 On your Android device:**
1. Go back to main **"Wireless debugging"** screen
2. Note the **IP:PORT** displayed (different from pairing port)

**💻 On your Mac:**
```bash
# Use the connection IP:PORT from main screen
adb connect 100.100.1.100:10000
```

**Expected output:**
```
connected to 100.100.1.100:10000
```

#### ✅ Verify Connection
```bash
adb devices
# Should show:
# List of devices attached
# 100.100.1.100:10000    device
```

### Step 4: Save Connection Info
```bash
# Save IP for future use
echo "100.100.1.100:10000" > .android-device-ip

# Quick reconnect in the future
adb connect $(cat .android-device-ip)
```

---

## 🚀 Building and Running Apps

### Setup React Native Project Structure

If you're starting fresh or missing platform folders:

```bash
# Our script handles this automatically, but manual process:
npx @react-native-community/cli@latest init TempProject --skip-install
cp -r TempProject/android ./
cp -r TempProject/ios ./
rm -rf TempProject

# Update configuration for your app
# (See script for detailed configuration updates)
```

### Build and Deploy

```bash
# Build and install on connected device
npx react-native run-android

# First build takes 3-5 minutes
# Subsequent builds: 30-60 seconds
```

### Development Workflow

```bash
# Start development server (if not auto-started)
npm start

# Build variants
npx react-native run-android --variant=debug    # Development
npx react-native run-android --variant=release  # Production testing

# Clear cache if needed
npm start -- --reset-cache
```

---

## 📊 Publishing to Google Play Store

### Step 1: Generate Release APK

```bash
# Navigate to android directory
cd android

# Generate release APK
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### Step 2: Generate Signed APK (Required for Play Store)

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore hydra-sprite-release-key.keystore -alias hydra-sprite -keyalg RSA -keysize 2048 -validity 10000

# Add to android/gradle.properties
echo "MYAPP_RELEASE_STORE_FILE=hydra-sprite-release-key.keystore" >> gradle.properties
echo "MYAPP_RELEASE_KEY_ALIAS=hydra-sprite" >> gradle.properties
echo "MYAPP_RELEASE_STORE_PASSWORD=your_store_password" >> gradle.properties
echo "MYAPP_RELEASE_KEY_PASSWORD=your_key_password" >> gradle.properties
```

**Update android/app/build.gradle:**
```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... other config
        }
    }
}
```

### Step 3: Generate App Bundle (Recommended)

```bash
# Generate AAB file for Play Store
./gradlew bundleRelease

# Bundle location:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Step 4: Upload to Google Play Console

1. **Create Google Play Console account** ($25 one-time fee)
2. **Create new application**
3. **Upload app-release.aab**
4. **Fill out store listing:**
   - App name: "Hydra Sprite"
   - Short description: "Water tracking with virtual sprite companion"
   - Full description: Include features and benefits
   - Screenshots: Take from your device (required)
   - Feature graphic: 1024x500px banner
5. **Set pricing** (Free recommended for start)
6. **Review and publish**

---

## 💡 Pro Tips & Workflows

### Daily Development Routine

```bash
# Morning startup
./setup-android-wireless.sh connect  # Quick device connection
./setup-android-wireless.sh run      # Deploy latest code

# During development
# Files auto-reload via Fast Refresh
# Shake device for debug menu if needed

# Testing new features
npm start -- --reset-cache           # Clear Metro cache
npx react-native run-android         # Full rebuild
```

### Performance Optimization

```bash
# Test release performance
npx react-native run-android --variant=release

# Bundle size analysis
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/build/outputs/bundle.js --assets-dest android/app/build/outputs/res/

# Check APK size
ls -lh android/app/build/outputs/apk/release/
```

### Debug and Monitoring

```bash
# Real-time Android logs
adb logcat | grep -E "(ReactNative|HydraSprite|chromium)"

# React Native debug menu (shake device or):
adb shell input keyevent 82

# Device info
adb shell getprop ro.product.model
adb shell getprop ro.build.version.release
```

---

## 🐛 Comprehensive Troubleshooting

### Connection Issues

#### "adb: command not found"
```bash
# Environment not loaded
source ~/.zshrc

# Verify Android SDK path
echo $ANDROID_HOME
ls $ANDROID_HOME/platform-tools/adb
```

#### "No devices/emulators found"
```bash
# Check basic connection
adb devices

# If empty:
# 1. Ensure device and Mac on same WiFi
# 2. Restart wireless debugging on device
# 3. Generate new pairing code
# 4. Check firewall settings
```

#### "Connection refused" or "Offline"
```bash
# Reset wireless debugging
# On device: Turn OFF wireless debugging, then ON
# Generate new pairing code

# Network troubleshooting
ping [DEVICE_IP]                    # Test basic connectivity
adb kill-server && adb start-server # Restart ADB

# Check network configuration
ifconfig | grep "inet "             # Mac IP
adb shell ip route | grep wlan      # Device IP
```

### Build Issues

#### "Android project not found"
```bash
# Platform folders missing
./setup-android-wireless.sh setup  # Automated fix

# Manual fix:
npx @react-native-community/cli@latest init TempProject --skip-install
cp -r TempProject/android ./
rm -rf TempProject
```

#### "Package name conflicts"
```bash
# Update package name in:
# android/app/src/main/AndroidManifest.xml
# android/app/build.gradle
# android/app/src/main/java/com/*/MainActivity.kt

# Check current package name
grep -r "package com\." android/app/src/main/java/
```

#### "Gradle build failed"
```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Clear all caches
rm -rf node_modules
npm install
npm start -- --reset-cache

# Check Gradle version compatibility
cd android && ./gradlew --version
```

#### "Metro bundler issues"
```bash
# Kill existing Metro
lsof -ti:8081 | xargs kill -9

# Clear Metro cache
npx react-native start --reset-cache

# Clear React Native cache
npx react-native start --reset-cache --verbose
```

### Runtime Issues

#### "App crashes on startup"
```bash
# Check Android logs
adb logcat | grep -E "(AndroidRuntime|ReactNative)"

# Check JavaScript errors
adb logcat | grep -E "(ReactNativeJS|chromium)"

# Verify correct main component name
grep -r "registerComponent" index.js
grep -r "getMainComponentName" android/app/src/main/java/
```

#### "Cannot connect to development server"
```bash
# Check Metro server
curl http://localhost:8081/status

# Device network access
adb shell ping 8.8.8.8              # Internet connectivity
adb reverse tcp:8081 tcp:8081       # Port forwarding

# Alternative: Use device IP for Metro
npm start -- --host 0.0.0.0
```

### Performance Issues

#### "Slow build times"
```bash
# Enable Gradle daemon
echo "org.gradle.daemon=true" >> android/gradle.properties

# Parallel builds
echo "org.gradle.parallel=true" >> android/gradle.properties

# More memory for Gradle
echo "org.gradle.jvmargs=-Xmx4g -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8" >> android/gradle.properties
```

#### "App runs slowly on device"
```bash
# Test release build
npx react-native run-android --variant=release

# Enable Hermes (if not already)
# In android/app/build.gradle:
# project.ext.react = [
#     enableHermes: true
# ]
```

### Network & Firewall Issues

#### "Cannot pair device"
```bash
# Check same network
# Mac IP range:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Device should have similar IP range (e.g., 100.100.1.100)

# Disable VPN temporarily
# Check macOS firewall settings
# System Preferences → Security & Privacy → Firewall
```

#### "Pairing works but connection fails"
```bash
# Two different ports are normal:
# - Pairing port (e.g., :37045) - one-time use
# - Connection port (e.g., :33515) - for development

# Use connection port for development
adb connect [DEVICE_IP:CONNECTION_PORT]
```

### Google Play Store Issues

#### "Upload failed"
```bash
# Generate fresh signed bundle
cd android
./gradlew clean
./gradlew bundleRelease

# Check bundle size (<150MB limit)
ls -lh app/build/outputs/bundle/release/
```

#### "Signature verification failed"
```bash
# Verify keystore
keytool -list -v -keystore hydra-sprite-release-key.keystore

# Re-sign APK if needed
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore hydra-sprite-release-key.keystore app-release.apk hydra-sprite
```

---

## 📚 Additional Resources

- **Wireless Setup Guide:** [WIRELESS_SETUP_USAGE.md](./WIRELESS_SETUP_USAGE.md)
- **Project Documentation:** [README.md](./README.md)
- **Contributing Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **React Native Docs:** [reactnative.dev](https://reactnative.dev/)
- **Android Developer Docs:** [developer.android.com](https://developer.android.com/)

---

*Your Hydra Sprite app is ready for professional Android development and publishing! 🚀📱* 