# 📱 Android Development Guide for Mac
*Complete setup for React Native Android development and publishing without Android Studio IDE*

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [📦 Minimal Android SDK Setup](#-minimal-android-sdk-setup)
- [📱 Wireless Development Setup](#-wireless-development-setup)
- [🚀 Publishing to Google Play Store](#-publishing-to-google-play-store)
- [📋 Complete Development Workflow](#-complete-development-workflow)
- [💡 Pro Tips](#-pro-tips)
- [🐛 Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

This guide covers the **minimal setup** required to develop and publish React Native apps for Android using macOS, **without needing the full Android Studio IDE**. You can develop wirelessly on physical devices and publish directly to Google Play Store.

### What You Need vs Don't Need

**✅ Required:**
- Android SDK (command line tools)
- Android platform tools  
- Java Development Kit
- Node.js & React Native CLI
- Physical Android device
- WiFi network
- Google Play Console account ($25 one-time fee)

**❌ NOT Required:**
- Android Studio IDE (just need SDK)
- Android emulators
- Xcode or iOS tools
- Physical USB cables (after initial setup)

---

## 📦 Minimal Android SDK Setup

### Option 1: Command Line Tools Only (Minimal)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java JDK
brew install --cask zulu@17

# Create Android SDK directory
mkdir -p ~/android-sdk/cmdline-tools
cd ~/android-sdk/cmdline-tools

# Download Android command line tools (using curl, which is pre-installed on macOS)
curl -O https://dl.google.com/android/repository/commandlinetools-mac-10406996_latest.zip
unzip commandlinetools-mac-*_latest.zip
mv cmdline-tools latest

# Set up environment variables
echo 'export ANDROID_HOME=$HOME/android-sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home' >> ~/.zshrc

# Reload shell configuration
source ~/.zshrc

# Install required SDK components
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

### Option 2: Install Android Studio but Skip IDE (Recommended)

```bash
# Install Android Studio (we'll only use it for SDK management)
brew install --cask android-studio

# Set up environment variables
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home' >> ~/.zshrc

# Reload shell configuration
source ~/.zshrc
```

### Verify Installation

```bash
# Check Java installation
java -version

# Check Android SDK
adb version

# Check environment variables
echo $ANDROID_HOME
echo $JAVA_HOME
```

---

## 📱 Wireless Development Setup

### Enable Developer Options on Android Device

1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings** → **Developer Options**
4. Enable **USB Debugging**
5. Enable **Wireless Debugging** (Android 11+)

### Set Up Wireless Connection

```bash
# 1. Connect device via USB initially
adb devices

# 2. Enable TCP/IP mode on port 5555
adb tcpip 5555

# 3. Find your device's IP address
# Android: Settings > About Phone > Status > IP Address
# Or use: adb shell ip route

# 4. Connect wirelessly (replace with your device IP)
adb connect 192.168.1.100:5555

# 5. Verify wireless connection
adb devices
# Should show: 192.168.1.100:5555 device

# 6. Disconnect USB cable - you're now wireless!
```

### Run Your App Wirelessly

```bash
# Navigate to your project
cd hydra-sprite

# Start Metro bundler
npm start

# Run on wirelessly connected device
npm run android
```

### Reconnect After Device Restart

```bash
# If device restarts, quickly reconnect
adb connect YOUR_DEVICE_IP:5555
```

---

## 🚀 Publishing to Google Play Store

### Step 1: Generate Release Signing Key

```bash
# Navigate to your project
cd hydra-sprite

# Generate a keystore file (KEEP THIS SAFE!)
keytool -genkeypair -v -storetype PKCS12 \
  -keystore hydra-sprite-release-key.keystore \
  -alias hydra-sprite-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000

# You'll be prompted for passwords - remember them!
# Store the keystore file in a secure location
```

**⚠️ IMPORTANT:** Back up your keystore file and passwords! You need them for ALL future app updates.

### Step 2: Configure Release Build

Create `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=hydra-sprite-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=hydra-sprite-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

Update `android/app/build.gradle`:
```gradle
android {
    ...
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
            ...
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### Step 3: Build Release Files

```bash
# Build release APK (for testing)
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk

# Build App Bundle (for Play Store - recommended)
./gradlew bundleRelease

# AAB location: android/app/build/outputs/bundle/release/app-release.aab
```

### Step 4: Upload to Google Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Complete store listing (description, screenshots, etc.)
4. Upload the `.aab` file from `android/app/build/outputs/bundle/release/`
5. Complete content rating and pricing
6. Submit for review

---

## 📋 Complete Development Workflow

### Daily Development

```bash
# 1. Start development server
npm start

# 2. Connect to device wirelessly (if needed)
adb connect YOUR_DEVICE_IP:5555

# 3. Run app on device
npm run android

# 4. Debug wirelessly
# Shake device → Dev Menu → Open React DevTools
```

### Testing Builds

```bash
# Test release build performance
npm run android -- --variant=release

# Install specific APK
adb install android/app/build/outputs/apk/release/app-release.apk

# Clear app data for fresh testing
adb shell pm clear com.hydrasprite
```

### Version Updates

```bash
# 1. Update version in android/app/build.gradle
android {
    defaultConfig {
        versionCode 2
        versionName "1.1.0"
    }
}

# 2. Build new release
cd android && ./gradlew bundleRelease

# 3. Upload to Google Play Console
```

---

## 💡 Pro Tips

### Performance Optimization

```bash
# Enable fast refresh for development
echo 'export FAST_REFRESH=true' >> ~/.zshrc

# Test with Hermes engine (already enabled in RN 0.75+)
# Check android/app/build.gradle:
# enableHermes: true

# Monitor app performance
adb shell dumpsys meminfo com.hydrasprite
```

### Device Management

```bash
# List all connected devices
adb devices

# Connect multiple devices
adb connect 192.168.1.100:5555
adb connect 192.168.1.101:5555

# Run on specific device
adb -s 192.168.1.100:5555 install app-release.apk
```

### Debugging Without IDE

```bash
# View React Native logs
adb logcat | grep "ReactNativeJS"

# View all app logs
adb logcat | grep "hydrasprite"

# Monitor device resources
adb shell top | grep com.hydrasprite

# Take screenshots
adb shell screencap -p > screenshot.png
```

### Build Optimization

```bash
# Clean builds when having issues
cd android && ./gradlew clean

# Build with specific architecture (smaller APK)
./gradlew assembleRelease -PTargetABI=arm64-v8a

# Analyze bundle size
./gradlew bundleRelease --scan
```

---

## 🐛 Troubleshooting

### Common Issues

**Metro bundler won't start:**
```bash
npx react-native start --reset-cache
npm start -- --reset-cache
```

**Device connection lost:**
```bash
# Restart ADB
adb kill-server
adb start-server

# Reconnect wirelessly
adb connect YOUR_DEVICE_IP:5555
```

**Build failures:**
```bash
# Clean everything
cd android && ./gradlew clean && cd ..
rm -rf node_modules && npm install

# Reset Metro cache
npx react-native start --reset-cache
```

**Signing errors:**
```bash
# Verify keystore
keytool -list -v -keystore hydra-sprite-release-key.keystore

# Check gradle.properties paths
cat android/gradle.properties
```

### Environment Verification

```bash
# Check all required tools
node --version
npm --version
java -version
adb version

# Verify environment variables
echo $ANDROID_HOME
echo $JAVA_HOME
echo $PATH | grep android
```

### Device Debugging

```bash
# Check device info
adb shell getprop ro.build.version.release  # Android version
adb shell getprop ro.product.cpu.abi        # Architecture
adb shell pm list packages | grep hydra     # Installed app

# Force stop app
adb shell am force-stop com.hydrasprite

# Launch app manually
adb shell am start -n com.hydrasprite/.MainActivity
```

---

## 📚 Additional Resources

- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
- [Google Play Console](https://play.google.com/console)
- [Android Developer Documentation](https://developer.android.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

*Last updated: January 2025 for React Native 0.75+* 