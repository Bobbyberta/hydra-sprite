# 🐛 Hydra Sprite Debugging Guide

## Quick Debug Commands

### 1. Check if App is Actually Running
```bash
# Check if app process is running
adb -s YOUR_DEVICE_IP:33515 shell "ps | grep hydrasprite"

# Check app activity status
adb -s YOUR_DEVICE_IP:33515 shell "dumpsys activity activities | grep -i hydra"
```

### 2. Monitor Real-Time Crash Logs
```bash
# Monitor all crash logs (run this in a separate terminal)
adb -s YOUR_DEVICE_IP:33515 logcat | grep -E "(FATAL|AndroidRuntime|CRASH|E/)"

# Monitor React Native JS errors specifically
adb -s YOUR_DEVICE_IP:33515 logcat | grep -E "(ReactNativeJS|RN_ERROR|JS_ERROR)"

# Monitor your app specifically
adb -s YOUR_DEVICE_IP:33515 logcat | grep -E "com.hydrasprite"
```

### 3. Check Metro Bundler Status
```bash
# Check if Metro is running
curl -s http://localhost:8081/status

# Check if bundle can be loaded
curl -s http://localhost:8081/index.bundle | head -10
```

### 4. Debug Steps to Reproduce Crash

1. **Clear logs and force stop app:**
   ```bash
   adb -s YOUR_DEVICE_IP:33515 logcat -c
   adb -s YOUR_DEVICE_IP:33515 shell "am force-stop com.hydrasprite"
   ```

2. **Start monitoring logs in background:**
   ```bash
   ./debug-logs.sh
   # Select option 1 for all crash logs
   ```

3. **Launch app and watch for errors:**
   ```bash
   adb -s YOUR_DEVICE_IP:33515 shell "am start -n com.hydrasprite/.MainActivity"
   ```

4. **Check recent logs:**
   ```bash
   adb -s YOUR_DEVICE_IP:33515 logcat -t 50 | grep -E "(FATAL|ERROR|CRASH|ReactNativeJS)"
   ```

### 5. Common React Native Issues to Check

#### JavaScript Bundle Issues
```bash
# Check if bundle loads successfully
curl -s http://localhost:8081/index.bundle?platform=android | head -5
```

#### Native Module Issues
```bash
# Check for native module errors
adb -s YOUR_DEVICE_IP:33515 logcat | grep -E "(NativeModule|RN_ERROR)"
```

#### Memory Issues
```bash
# Check for memory-related crashes
adb -s YOUR_DEVICE_IP:33515 logcat | grep -E "(OutOfMemoryError|OOM|SIGSEGV)"
```

### 6. Specific Error Types to Look For

#### Red Screen Errors (JavaScript)
- Check Metro bundler terminal for JavaScript errors
- Look for `ReactNativeJS` in logcat

#### App Force Closes (Native Crash)
- Look for `FATAL EXCEPTION` in logcat
- Check for `AndroidRuntime` errors

#### White Screen / Blank Screen
- Bundle loading issues
- Check Metro bundler connection
- Look for network errors

#### App Won't Launch
- Check if app is installed: `adb -s YOUR_DEVICE_IP:33515 shell "pm list packages | grep hydrasprite"`
- Check permissions
- Check if MainActivity exists

### 7. Advanced Debugging

#### Enable Chrome DevTools
1. Open app
2. Shake device or press Cmd+M
3. Select "Debug JS Remotely"
4. Open Chrome DevTools to see JavaScript errors

#### Check App Installation
```bash
# Check if app is properly installed
adb -s YOUR_DEVICE_IP:33515 shell "pm list packages | grep hydrasprite"

# Check app info
adb -s YOUR_DEVICE_IP:33515 shell "dumpsys package com.hydrasprite"
```

### 8. Get Full Crash Report
```bash
# Get comprehensive crash info
adb -s YOUR_DEVICE_IP:33515 logcat -b all -v time | grep -E "(FATAL|CRASH|ERROR|com.hydrasprite)" | tail -50
```

## What to Do When App "Crashes"

**Please clarify what you mean by "crashes":**

1. **Force Close/Exit:** App immediately closes and returns to home screen
2. **Red Screen:** Shows error screen with stack trace
3. **White/Blank Screen:** App opens but shows nothing
4. **Won't Launch:** App icon doesn't respond when tapped
5. **Freezes:** App opens but becomes unresponsive

Each type requires different debugging approaches!

## Quick Fix Commands

### Restart Everything
```bash
# Kill all processes and restart
adb -s YOUR_DEVICE_IP:33515 shell "am force-stop com.hydrasprite"
pkill -f "node.*metro" || true
cd /Users/bobbieallsop/Development/hydra-sprite
./test-app
```

### Clean Build
```bash
# Clean everything and rebuild
cd android && ./gradlew clean && cd ..
rm -rf node_modules
npm install
./test-app
```

### Check Device Connection
```bash
# Make sure device is properly connected
adb devices
ping YOUR_DEVICE_IP
```

## Using the Debug Script

I've created a `debug-logs.sh` script for you:

```bash
chmod +x debug-logs.sh
./debug-logs.sh
```

Select:
- Option 1: Monitor all crash logs
- Option 2: Monitor React Native JS errors
- Option 5: Show recent logs
- Option 6: Clear logs and start fresh

## Getting Help

When asking for help, provide:
1. What type of crash (force close, red screen, white screen, etc.)
2. The output of the crash monitoring commands above
3. Any error messages from Metro bundler terminal
4. Steps to reproduce the issue 