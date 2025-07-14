# 🐛 Hydra Sprite Debugging Guide

## 🎯 Quick Reference

### Emergency Debug Commands
```bash
# Check if app is running
adb shell "ps | grep hydrasprite"

# Monitor crash logs in real-time
./debug-logs.sh

# Force restart everything
./test-app --reset
```

### Common Issues Quick Fix
| Issue | Quick Fix |
|-------|-----------|
| App crashes on launch | `./debug-logs.sh` → Select option 1 |
| Device not connecting | `adb connect $(cat .android-device-ip)` |
| Build errors | `cd android && ./gradlew clean && cd ..` |
| Metro bundler issues | `pkill -f "node.*metro"` |

## 🔧 Debug Scripts

### Our Debug Script
```bash
./debug-logs.sh
```

**Available Options:**
1. **All crash logs** - Monitor FATAL, ERROR, and CRASH events
2. **React Native JS errors** - JavaScript and React Native specific errors
3. **App-specific logs** - Only logs from com.hydrasprite
4. **Real-time logs** - Live log streaming with timestamps
5. **Recent logs** - Last 50 relevant log entries
6. **Clear logs** - Fresh start for debugging

### Script Usage Examples
```bash
# Start monitoring in background
./debug-logs.sh &

# Then test your app
./test-app

# Or run specific monitoring
./debug-logs.sh --crashes  # Monitor crashes only
./debug-logs.sh --js       # Monitor JavaScript errors
./debug-logs.sh --recent   # Show recent logs
```

## 🚨 App Crash Types

### 1. Force Close/Native Crash
**Symptoms**: App immediately closes, returns to home screen

**Debug Steps**:
```bash
# 1. Clear logs and start monitoring
adb logcat -c
./debug-logs.sh

# 2. Launch app
adb shell "am start -n com.hydrasprite/.MainActivity"

# 3. Look for these patterns
grep -E "(FATAL|AndroidRuntime|CRASH|SIGSEGV)" 
```

**Common Causes**:
- Native module crashes
- Memory issues (OutOfMemoryError)
- Missing dependencies
- Incorrect package names

### 2. JavaScript/React Native Errors
**Symptoms**: Red error screen with stack trace

**Debug Steps**:
```bash
# Monitor React Native specific errors
./debug-logs.sh
# Select option 2 (React Native JS errors)

# Or manually
adb logcat | grep -E "(ReactNativeJS|RN_ERROR|JS_ERROR)"
```

**Common Causes**:
- Undefined variables or functions
- Import/export errors
- Component rendering issues
- State management problems

### 3. White/Blank Screen
**Symptoms**: App opens but shows white/blank screen

**Debug Steps**:
```bash
# Check if bundle loads
curl -s http://localhost:8081/index.bundle?platform=android | head -5

# Check Metro bundler
curl -s http://localhost:8081/status

# Monitor bundle loading
./debug-logs.sh
# Select option 4 (Real-time logs)
```

**Common Causes**:
- Bundle loading failures
- Metro bundler not running
- Network connectivity issues
- Initial component errors

### 4. Won't Launch
**Symptoms**: App icon doesn't respond when tapped

**Debug Steps**:
```bash
# Check if app is installed
adb shell "pm list packages | grep hydrasprite"

# Check app permissions
adb shell "dumpsys package com.hydrasprite | grep permission"

# Check MainActivity
adb shell "dumpsys activity activities | grep -i hydra"
```

**Common Causes**:
- App not properly installed
- Missing MainActivity
- Permission issues
- Package name conflicts

## 🔍 Advanced Debugging

### Device Information
```bash
# Get device details
adb shell "getprop | grep -E '(model|version|manufacturer)'"

# Check available memory
adb shell "cat /proc/meminfo | grep -E '(MemTotal|MemFree|MemAvailable)'"

# Check storage space
adb shell "df -h /data"
```

### App State Investigation
```bash
# Check app process details
adb shell "ps -A | grep hydrasprite"

# Monitor app memory usage
adb shell "dumpsys meminfo com.hydrasprite"

# Check app activity stack
adb shell "dumpsys activity activities | grep -A 10 -B 10 hydra"
```

### Network and Bundle Debugging
```bash
# Test Metro bundler connection
curl -v http://localhost:8081/status

# Download bundle for inspection
curl -o bundle.js http://localhost:8081/index.bundle?platform=android

# Check bundle size
ls -lh bundle.js

# Search for specific code in bundle
grep -n "WaterLogger" bundle.js
```

## 🛠️ Environment Debugging

### Node.js and Dependencies
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check React Native CLI
npx react-native --version

# Check project dependencies
npm list --depth=0
```

### Android Environment
```bash
# Check Android SDK
echo $ANDROID_HOME

# Check Java version
java -version

# Check ADB version
adb --version

# List installed Android platforms
ls $ANDROID_HOME/platforms/
```

### Build System
```bash
# Check Gradle version
cd android && ./gradlew --version

# Check build configuration
./gradlew properties | grep -E "(android|java|kotlin)"

# Clean build system
./gradlew clean
```

## 📱 Device-Specific Debugging

### Connection Issues
```bash
# Check device connectivity
ping $(cat .android-device-ip | cut -d':' -f1)

# Check ADB connection
adb devices -l

# Reconnect device
adb disconnect && adb connect $(cat .android-device-ip)

# Check wireless debugging status
adb shell "dumpsys activity service com.android.server.adb.AdbDebuggingService"
```

### Device Logs
```bash
# Filter by device-specific logs
adb logcat | grep -E "($(cat .android-device-ip | cut -d':' -f1)|wireless|debugging)"

# Check device developer options
adb shell "settings get global development_settings_enabled"

# Check USB debugging status
adb shell "settings get global adb_enabled"
```

## 🔧 React Native Specific Debugging

### Metro Bundler Issues
```bash
# Reset Metro cache
npx react-native start --reset-cache

# Check Metro config
cat metro.config.js

# Kill Metro processes
pkill -f "node.*metro"

# Start Metro manually
npx react-native start
```

### JavaScript Debugging
```bash
# Enable Chrome DevTools
# 1. Shake device or press Cmd+M
# 2. Select "Debug JS Remotely"
# 3. Opens Chrome DevTools

# Check JavaScript console
# Look for errors in Chrome DevTools console

# Enable network inspect
# Monitor network requests in DevTools
```

### Performance Debugging
```bash
# Enable performance monitoring
adb shell "am start -n com.hydrasprite/.MainActivity --ez performance true"

# Monitor frame rates
adb shell "dumpsys gfxinfo com.hydrasprite"

# Check memory usage
adb shell "dumpsys meminfo com.hydrasprite"
```

## 📊 Debugging Workflows

### New Issue Debugging
1. **Reproduce** the issue consistently
2. **Collect logs** using `./debug-logs.sh`
3. **Identify type** of crash/error
4. **Check environment** (Node.js, Android SDK)
5. **Test on clean build** (`./gradlew clean`)
6. **Document findings** for future reference

### Performance Issue Debugging
1. **Profile the app** using React Native DevTools
2. **Monitor memory usage** with `dumpsys meminfo`
3. **Check bundle size** and loading times
4. **Test on different devices** and Android versions
5. **Optimize based on findings**

### Build Issue Debugging
1. **Clean everything**: `./gradlew clean && rm -rf node_modules`
2. **Reinstall dependencies**: `npm install`
3. **Check environment variables**
4. **Verify Android SDK** components
5. **Test incremental build** vs full build

## 🎯 Specific Error Solutions

### Common Error Patterns

#### "Unable to load script"
```bash
# Check Metro bundler
curl http://localhost:8081/status

# Restart Metro
pkill -f "node.*metro" && npm start
```

#### "Could not connect to development server"
```bash
# Check device connection
adb devices

# Reconnect device
adb connect $(cat .android-device-ip)

# Check firewall/network
ping $(cat .android-device-ip | cut -d':' -f1)
```

#### "Build failed with an exception"
```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Check Java version
java -version

# Check Android SDK
echo $ANDROID_HOME
```

#### "App crashes with no error message"
```bash
# Enable verbose logging
adb shell "setprop log.tag.ReactNativeJS VERBOSE"

# Monitor with full verbosity
adb logcat -v time | grep -E "(FATAL|ERROR|CRASH|ReactNativeJS)"
```

## 🧪 Testing and Validation

### Automated Testing
```bash
# Run unit tests
npm test

# Run specific test file
npm test -- WaterService.test.js

# Run tests with coverage
npm run test:coverage
```

### Manual Testing Checklist
- [ ] App launches successfully
- [ ] Water logging works correctly
- [ ] Sprite states change appropriately
- [ ] Data persists between app restarts
- [ ] Performance is acceptable
- [ ] No memory leaks during extended use

### Device Testing
```bash
# Test on different Android versions
adb shell "getprop ro.build.version.release"

# Test with different screen densities
adb shell "wm density"

# Test with different screen sizes
adb shell "wm size"
```

## 📚 Debug Resources

### Log Analysis Tools
```bash
# Search logs for specific patterns
adb logcat | grep -E "your_pattern"

# Save logs to file
adb logcat > debug_logs.txt

# Filter by priority
adb logcat *:E  # Only errors
adb logcat *:W  # Warnings and above
```

### External Tools
- **Flipper**: React Native debugging platform
- **React Native Debugger**: Standalone debugging app
- **Chrome DevTools**: JavaScript debugging
- **Android Studio**: Advanced Android debugging

### Documentation References
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Android Debugging](https://developer.android.com/studio/debug)
- [ADB Documentation](https://developer.android.com/studio/command-line/adb)

## 🆘 Getting Help

### Before Asking for Help
1. **Check this guide** thoroughly
2. **Review existing issues** on GitHub
3. **Test on clean environment**
4. **Collect relevant logs** and information

### When Creating Issues
Include:
- **Device information** (model, Android version)
- **Environment details** (Node.js, React Native versions)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Relevant logs** and error messages
- **Screenshots** or recordings if applicable

### Issue Template
```markdown
**Environment**
- Device: [Samsung Galaxy S21]
- Android Version: [13]
- Node.js Version: [18.17.0]
- React Native Version: [0.72.0]

**Issue Description**
[Clear description of the problem]

**Steps to Reproduce**
1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior**
[What should happen]

**Actual Behavior**
[What actually happens]

**Debug Information**
[Relevant logs, error messages, screenshots]

**Additional Context**
[Any other relevant information]
```

## 🎉 Success Indicators

### You'll know debugging is working when:
- ✅ **Logs are clear** and informative
- ✅ **Issues are reproducible** consistently
- ✅ **Root causes** are identifiable
- ✅ **Fixes are verifiable** through testing
- ✅ **Development workflow** is smooth

---

**Happy debugging! 🐛🔍**

*Remember: Every bug is an opportunity to understand the system better.* 