# 🚀 Easy Testing Guide

## Overview
This guide shows you how to test your Hydra Sprite app with **one simple command**.

## Prerequisites
- Android device paired and configured (see [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md))
- Device IP saved in `.android-device-ip` file

## One-Command Testing

### The Magic Command
```bash
./test-app
```

That's it! This command:
1. ✅ Checks your development environment
2. 📱 Connects to your Android device
3. 🚀 Builds and deploys the app
4. 🎉 Launches the app on your device

## What You'll See

### Typical Output
```bash
🚀 Starting Hydra Sprite quick test...

========================================
 📱 Hydra Sprite Quick Test 
========================================

[SUCCESS] Environment ready ✅

========================================
 🔍 Smart Device Connection 
========================================

Use saved device IP: YOUR_DEVICE_IP:33515?
[Y/n]: ← Press Enter

✅ Connected to saved device: YOUR_DEVICE_IP:33515

========================================
 🚀 Smart App Deployment 
========================================

Deploying to: Samsung Galaxy S21 (YOUR_DEVICE_IP:33515)
[INFO] Building and deploying Hydra Sprite...

BUILD SUCCESSFUL in 2m 15s
[SUCCESS] 🎉 Hydra Sprite deployed successfully!
```

## Setup Requirements

### First Time Setup
1. **Pair your device** (one-time):
   ```bash
   # Follow the device pairing guide
   open DEVICE_PAIRING_GUIDE.md
   ```

2. **Create device IP file**:
   ```bash
   # Copy template
   cp .android-device-ip.example .android-device-ip
   
   # Edit with your actual device IP
   # Example: 100.100.1.100:10000
   ```

3. **Test connection**:
   ```bash
   ./test-app
   ```

### File Structure
```
hydra-sprite/
├── .android-device-ip        # Your device IP (not in Git)
├── .android-device-ip.example # Template file
├── test-app                  # Quick test script
└── setup-android-wireless.sh # Full setup script
```

## Advanced Usage

### Debug Mode
```bash
# Run with debug logs
./debug-logs.sh

# Then in another terminal
./test-app
```

### Manual Steps (if needed)
```bash
# 1. Connect device
adb connect $(cat .android-device-ip)

# 2. Deploy app
npx react-native run-android

# 3. Check logs
./debug-logs.sh
```

## Troubleshooting

### Common Issues

#### "Device not connected"
```bash
# Check device connection
adb devices

# Reconnect device
adb connect $(cat .android-device-ip)
```

#### "Metro bundler not running"
```bash
# Start Metro manually
npm start

# Then run test in another terminal
./test-app
```

#### "Build failed"
```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Try again
./test-app
```

## Tips for Smooth Testing

### Daily Workflow
1. **Start of day**: `./test-app` (connects and deploys)
2. **During development**: Code changes auto-reload
3. **Debug issues**: `./debug-logs.sh`
4. **End of day**: `adb disconnect` (optional)

### Performance
- First build: ~3-5 minutes
- Subsequent builds: ~30-60 seconds
- Code changes: Instant reload

### Network Tips
- Stay on same WiFi network
- Keep device awake during development
- Restart wireless debugging if connection drops

## Security Note

The `.android-device-ip` file contains your actual device IP address and is automatically excluded from Git for security purposes.

## Related Documentation

- [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md) - Initial setup
- [Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md) - Complete workflow
- [Debugging Guide](DEBUGGING_GUIDE.md) - Troubleshooting help

---

**Happy testing! 🎉📱** 