# 📱 Android Device Pairing Guide

This guide walks you through pairing your Android device with your Mac for wireless development.

## Prerequisites

- Mac with Android Studio/ADB installed
- Android device (Android 11+)
- Both devices on same WiFi network
- USB cable for initial setup

## Step 1: Enable Developer Options

1. Go to **Settings > About phone**
2. Tap **Build number** 7 times
3. Go back to **Settings > Developer options**
4. Enable **USB debugging**
5. Enable **Wireless debugging**

## Step 2: Initial USB Pairing

1. Connect your device via USB
2. On your Mac terminal:
   ```bash
   adb devices
   ```
3. Should show your device (authorize if prompted)

## Step 3: Wireless Pairing

### On Your Android Device:
1. Go to **Settings > Developer options**
2. Tap **Wireless debugging**
3. Tap **Pair device with pairing code**
4. A dialog appears showing:
   - **6-digit pairing code** (e.g., 123456)
   - **IP address and port** (e.g., YOUR_DEVICE_IP:37045)
5. **Keep this dialog open**

### On Your Mac Terminal:
```bash
# Use the pairing IP:PORT from the dialog
adb pair YOUR_DEVICE_IP:37045
```

**Enter the 6-digit code when prompted.**

**Success looks like:**
```bash
Successfully paired to YOUR_DEVICE_IP:37045
```

## Step 4: Connect to Device

### On Your Android Device:
1. Go back to **Wireless debugging** main screen
2. Note the **IP address and port** displayed
   - This is **different** from pairing port
   - Example: YOUR_DEVICE_IP:33515

**💻 On your Mac terminal:**
```bash
# Use the connection IP:PORT from main screen
adb connect YOUR_DEVICE_IP:33515
```

**Success looks like:**
```bash
connected to YOUR_DEVICE_IP:33515
```

## Step 5: Verify Connection

```bash
adb devices
```

**Should show:**
```
List of devices attached
YOUR_DEVICE_IP:33515    device
```

## Visual Guide

```
┌─────────────────────┐             ┌─────────────────────┐
│ Settings            │             │ $ adb pair          │
│ └── Developer opts  │             │   YOUR_DEVICE_IP:37045│
│     └── Wireless    │  ═══════>   │                     │
│         debugging   │             │ Enter code: 123456  │
│         └── Pair    │             │                     │
│             device  │             │ ✅ paired!          │
└─────────────────────┘             └─────────────────────┘

┌─────────────────────┐             ┌─────────────────────┐
│ Main IP shown:      │             │ $ adb connect       │
│ YOUR_DEVICE_IP:33515  │  ═══════>   │   YOUR_DEVICE_IP:33515│
│                     │             │ ✅ connected!       │
│ [Pair device...]    │             │                     │
└─────────────────────┘             └─────────────────────┘
```

## Network Requirements

Both devices must be on the same WiFi network:

### Check Mac Network:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Check Android Network:
- Settings > WiFi > Connected network details
- Check same network range (e.g., both 100.100.1.100)

## Troubleshooting

### Pairing Fails
- Ensure both devices on same WiFi
- Try disabling/enabling Wireless debugging
- Restart ADB: `adb kill-server && adb start-server`
- Check firewall settings on Mac

### Connection Drops
- Android may disable wireless debugging after inactivity
- Re-enable in Developer options
- Some devices require USB connection first

### Port Already in Use
- Kill existing ADB processes: `adb kill-server`
- Restart ADB: `adb start-server`
- Try different port if available

## Automation

### Save Device IP for Quick Access:
```bash
# Save device IP for quick reconnection
echo "YOUR_DEVICE_IP:33515" > .android-device-ip

# Quick connect script
adb connect $(cat .android-device-ip)
```

### Check Device Status:
```bash
# Target specific device
adb -s YOUR_DEVICE_IP:33515 shell getprop ro.product.model
```

### Disconnect When Done:
```bash
# Disconnect specific device
adb disconnect YOUR_DEVICE_IP:33515

# Disconnect all
adb disconnect

# Reconnect
adb connect YOUR_DEVICE_IP:33515
```

### Automated Connection Check
```bash
DEVICE_IP=$(cat .android-device-ip 2>/dev/null)
if [ -n "$DEVICE_IP" ]; then
    adb connect $DEVICE_IP
else
    echo "No saved device IP found"
fi
```

## Security Note

The `.android-device-ip` file contains your actual device IP address. This file is excluded from Git for security purposes.

To set up your device IP:
1. Copy `.android-device-ip.example` to `.android-device-ip`
2. Replace `YOUR_DEVICE_IP` with your actual device IP
3. This file will be ignored by Git automatically

## Next Steps

Once paired and connected:
1. Run `./test-app` for quick deployment
2. Use `./debug-logs.sh` for debugging
3. Your device will auto-reconnect on same network

## Common Issues

- **Device not showing**: Check same WiFi network
- **Pairing timeout**: Restart wireless debugging
- **Connection lost**: Android may disable after sleep
- **Permission denied**: Re-authorize USB debugging 