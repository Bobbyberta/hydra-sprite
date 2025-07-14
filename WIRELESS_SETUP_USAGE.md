# 📱 Wireless Android Setup Script Usage Guide

## 🚀 Quick Start

Your `setup-android-wireless.sh` script handles everything automatically! Here's how to use it:

### **First Time Setup (Complete)**
```bash
# Run everything: setup environment + connect device + run app
./setup-android-wireless.sh
# or
./setup-android-wireless.sh full
```

### **Individual Commands**
```bash
# Just setup development environment (one-time)
./setup-android-wireless.sh setup

# Just connect and run app (after setup is done)
./setup-android-wireless.sh run

# Just connect to device wirelessly
./setup-android-wireless.sh connect

# Disconnect from device
./setup-android-wireless.sh disconnect
```

---

## 📋 What the Script Does

### ✅ **Setup Phase:**
- Checks for macOS compatibility
- Installs Java JDK 17 (if needed)
- Sets up Android SDK environment variables
- Installs Android SDK components
- Installs React Native dependencies
- Configures your development environment

### 📱 **Connection Phase:**
- Guides you through finding your device IP
- Connects to your Android device wirelessly
- Saves connection info for future use
- Enables you to disconnect USB cable

### 🚀 **Run Phase:**
- Starts Metro bundler in background
- Builds and installs Hydra Sprite on your device
- Launches the app wirelessly

---

## 📱 Android Device Preparation

**Before running the script, prepare your Android device:**

1. **Enable Developer Options:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Developer Options will appear in Settings

2. **Enable USB Debugging:**
   - Go to Settings → Developer Options
   - Turn on "USB Debugging"
   - Turn on "Wireless Debugging" (Android 11+)

3. **Connect USB Initially:**
   - Connect your device via USB cable
   - Accept the debugging authorization popup

4. **Find Your IP Address:**
   - Settings → About Phone → Status → IP Address
   - Or Settings → Wi-Fi → [Your Network] → Advanced

---

## 🔄 Daily Development Workflow

### **First Time (Complete Setup):**
```bash
./setup-android-wireless.sh
```

### **Subsequent Runs:**
```bash
# Quick connect and run (script remembers your device IP)
./setup-android-wireless.sh run
```

### **If Connection Lost:**
```bash
# Reconnect to your device
./setup-android-wireless.sh connect
```

---

## 🎯 Example Usage Session

```bash
# First time setup
$ ./setup-android-wireless.sh

🚀 Hydra Sprite Android Wireless Setup
========================================

[INFO] Homebrew found
[INFO] Installing Java JDK 17...
[SUCCESS] Java is already installed
[INFO] Adding Android environment variables to ~/.zshrc
[INFO] Installing Android SDK components...
[SUCCESS] Android SDK components installed
[SUCCESS] Node.js found: v18.17.0
[SUCCESS] npm found: 9.6.7
[INFO] Installing npm dependencies...
[SUCCESS] Dependencies installed
✅ Environment setup complete!

📱 Android Device Connection Setup
========================================

📱 Please ensure your Android device is connected via USB first
📱 Make sure USB Debugging is enabled in Developer Options

[INFO] Checking for connected devices...
[INFO] Connected devices:
List of devices attached
1A2B3C4D5E	device

📱 To find your device's IP address:
1. Go to Settings > About Phone > Status
2. Look for 'IP Address' or 'Wi-Fi IP Address'
3. Or go to Settings > Wi-Fi > Connected Network > Advanced

Enter your Android device's IP address: 192.168.1.100

[INFO] Enabling TCP/IP mode on port 5555...
[INFO] Connecting to device wirelessly at 192.168.1.100:5555...
[SUCCESS] Successfully connected wirelessly to 192.168.1.100:5555

🔌 You can now disconnect the USB cable!

[INFO] Starting Metro bundler in background...
[SUCCESS] Metro bundler started (PID: 12345)
[INFO] Building and installing app on device...
[SUCCESS] 🎉 Hydra Sprite is now running on your device!

🌟 Your water tracking sprite is ready to help you stay hydrated!

Next steps:
• Shake your device to open the React Native debug menu
• Press 'j' in this terminal to open React DevTools
• Start logging water to keep your sprite happy!
```

---

## 🐛 Troubleshooting

### **Script Won't Run:**
```bash
# Make sure it's executable
chmod +x setup-android-wireless.sh
```

### **Device Not Found:**
```bash
# Check USB connection first
adb devices

# Restart adb if needed
adb kill-server
adb start-server
```

### **Wireless Connection Lost:**
```bash
# Reconnect using saved IP
./setup-android-wireless.sh connect

# Or manually reconnect
adb connect YOUR_DEVICE_IP:5555
```

### **App Won't Install:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Clean build
cd android && ./gradlew clean && cd ..
```

---

## 📁 Generated Files

The script creates these files for convenience:

- **`.android-device-ip`** - Saves your device IP for quick reconnection
- **`~/.zshrc`** - Updated with Android environment variables

---

## 🎉 Success Indicators

**✅ Setup Complete When You See:**
- "Environment setup complete!"
- "Successfully connected wirelessly"
- "Hydra Sprite is now running on your device!"

**✅ You're Ready When:**
- USB cable is disconnected
- App launches on your Android device
- You can shake device to see React Native debug menu
- Water logging buttons work in the app

---

## 💡 Pro Tips

1. **Save Time:** After first setup, just use `./setup-android-wireless.sh run`
2. **Multiple Devices:** Script can connect to different devices by IP
3. **Debug Mode:** Shake device → "Open React DevTools" for debugging
4. **Performance:** Test with `npm run android -- --variant=release`
5. **Updates:** When you update app code, just run the script again

---

*Your Hydra Sprite app is now ready for wireless development! 💧📱✨* 