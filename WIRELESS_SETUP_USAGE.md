# 📱 Wireless Android Setup Guide
*Complete guide for running Hydra Sprite on Android devices without USB cables*

## 🚀 Quick Start

### **First Time Setup (Recommended)**
```bash
# Complete setup: environment + device pairing + app deployment
./setup-android-wireless.sh full
```

### **Individual Commands**
```bash
# Setup development environment only
./setup-android-wireless.sh setup

# Pair and connect to device
./setup-android-wireless.sh connect

# Build and run app (after connection)
./setup-android-wireless.sh run

# Disconnect from device
./setup-android-wireless.sh disconnect
```

---

## 📋 Complete Setup Process

### **Step 1: Environment Setup**
The script automatically handles:
- ✅ Java JDK 17 installation
- ✅ Android SDK components
- ✅ Environment variables
- ✅ React Native dependencies
- ✅ Android platform folders setup

### **Step 2: Device Preparation**

#### **Enable Developer Options (One-time)**
1. **Settings** → **About phone** 
2. Tap **"Build number"** 7 times
3. You'll see **"You are now a developer!"**

#### **Enable Wireless Debugging (Android 11+)**
1. **Settings** → **Developer options**
2. Turn on **"Wireless debugging"**
3. Keep this screen open for pairing

### **Step 3: Device Pairing Process**

#### **🔄 Two-Step Connection Process:**

**📱 On Your Android Device:**
1. In **Developer options** → **Wireless debugging**
2. Tap **"Pair device with pairing code"**
3. Note the **6-digit pairing code** and **IP:PORT** shown

**💻 On Your Mac:**
1. Run the pairing command:
   ```bash
   adb pair [PAIRING_IP:PAIRING_PORT]
   ```
2. Enter the **6-digit code** when prompted
3. You should see **"Successfully paired"**

**🔗 Connect for Development:**
1. Back in **Wireless debugging** main screen, note the **IP:PORT**
2. Connect using:
   ```bash
   adb connect [DEVICE_IP:CONNECTION_PORT]
   ```

#### **📝 Example Session:**
```bash
# Device shows: "Pair device with pairing code"
# IP: 100.100.1.100:10000, Code: 123456
$ adb pair 100.100.1.100:10000
Enter pairing code: 123456
Successfully paired to 100.100.1.100:10000

# Device shows: "Wireless debugging" main screen
# IP: 100.100.1.100:10000
$ adb connect 100.100.1.100:10000
connected to 100.100.1.100:10000

# Verify connection
$ adb devices
List of devices attached
100.100.1.100:10000    device
```

### **Step 4: Run the App**
```bash
# Deploy to connected device
npx react-native run-android
```

---

## 🎯 Automated Script Usage

### **Complete First-Time Setup:**
```bash
$ ./setup-android-wireless.sh

🚀 Hydra Sprite Android Wireless Setup
========================================

✅ Environment Setup:
[SUCCESS] Java JDK 17 installed
[SUCCESS] Android SDK configured
[SUCCESS] Dependencies installed
[SUCCESS] Platform folders ready

📱 Device Pairing Instructions:
========================================

Please complete these steps on your Android device:

1. Enable Developer Options:
   • Settings → About phone
   • Tap "Build number" 7 times

2. Enable Wireless Debugging:
   • Settings → Developer options
   • Turn on "Wireless debugging"

3. Pair Your Device:
   • Tap "Pair device with pairing code"
   • Note the IP:PORT and 6-digit code

Press Enter when ready to pair...

[PAIRING] Please run: adb pair [YOUR_PAIRING_IP:PORT]
[PAIRING] Enter the 6-digit code when prompted

Connection established! 🎉
[SUCCESS] Device connected wirelessly
[SUCCESS] App deployed successfully
[SUCCESS] Hydra Sprite is running on your device!
```

---

## 🔧 Troubleshooting & Error Handling

### **🚨 Common Issues & Solutions**

#### **"adb: command not found"**
```bash
# Reload environment variables
source ~/.zshrc

# Verify installation
adb --version
```

#### **"No devices/emulators found"**
```bash
# Check device connection
adb devices

# If empty, ensure:
• Device has Developer Options enabled
• Wireless debugging is ON
• Device and Mac are on same WiFi network
```

#### **"Pairing failed" or "Connection refused"**
```bash
# Reset wireless debugging
• Turn OFF wireless debugging
• Turn ON wireless debugging
• Generate new pairing code
• Try pairing again

# Check network connectivity
ping [DEVICE_IP]
```

#### **"Android project not found"**
```bash
# The script handles this automatically by:
# 1. Creating temporary React Native project
# 2. Copying android/ and ios/ folders
# 3. Updating configuration files
# 4. Setting correct app name

# Manual fix if needed:
npx @react-native-community/cli@latest init TempProject --skip-install
cp -r TempProject/android ./
cp -r TempProject/ios ./
rm -rf TempProject
```

#### **"Build failed" or Gradle errors**
```bash
# Clear caches
npm start -- --reset-cache
cd android && ./gradlew clean && cd ..

# Restart Metro
npm start
```

#### **"Metro server already running"**
```bash
# Kill existing Metro
npx react-native start --reset-cache
# or
lsof -ti:8081 | xargs kill -9
```

### **🔍 Advanced Debugging**

#### **Check Connection Status:**
```bash
# List connected devices
adb devices -l

# Check device details
adb shell getprop ro.product.model
adb shell ip route | grep wlan
```

#### **Network Troubleshooting:**
```bash
# Check same network
# Mac IP:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Device IP should have similar prefix (e.g., 100.100.1.100)
```

#### **Build Diagnostics:**
```bash
# Verbose build output
npx react-native run-android --verbose

# Check Android logs
adb logcat | grep -E "(ReactNative|HydraSprite)"
```
```

---

## ✅ Success Indicators

**🎉 You're Ready When:**
- ✅ `adb devices` shows your device connected
- ✅ USB cable can be disconnected
- ✅ App launches on Android device
- ✅ You can shake device for debug menu
- ✅ Water logging buttons work in app
- ✅ Sprite responds to water intake

**📁 Files Created:**
- `.android-device-ip` - Saved connection info
- `android/` - Android platform project
- `ios/` - iOS platform project (for future use)

---

## 💡 Development Workflow

### **Daily Development:**
```bash
# Quick connect (if device IP saved)
./setup-android-wireless.sh connect

# Run app
./setup-android-wireless.sh run
```

### **Code Changes:**
```bash
# Auto-reload is enabled
# Just save your files and see changes instantly!

# For major changes, rebuild:
npx react-native run-android
```

### **Testing & Debugging:**
```bash
# Open debug menu: Shake device
# Enable Fast Refresh: Cmd+R or Debug menu
# Inspect element: Debug menu → "Toggle Inspector"
# Remote debugging: Debug menu → "Open React DevTools"
```

---

## 🚀 Next Steps

1. **Start developing:** Edit files in `src/` directory
2. **Test features:** Log water intake, check sprite animations
3. **Debug:** Use React DevTools and device debugging
4. **Deploy:** Follow Google Play Store publishing guide
5. **Iterate:** Use wireless development for rapid testing

---

*Your Hydra Sprite app is now ready for wireless development! 🌊📱✨*

**Need help?** Check the [Android Development Guide](./ANDROID_DEVELOPMENT_GUIDE.md) for detailed setup instructions. 