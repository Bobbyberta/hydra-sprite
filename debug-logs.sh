#!/bin/bash

echo "🐛 Hydra Sprite Debug Logs Helper"
echo "================================="
echo ""

# Check if device is connected
DEVICE=$(cat .android-device-ip 2>/dev/null || echo "YOUR_DEVICE_IP:33515")
if ! adb devices | grep -q "$DEVICE"; then
    echo "❌ Device not connected. Run ./test-app first."
    echo "💡 Create .android-device-ip file with your device IP (see .android-device-ip.example)"
    exit 1
fi

echo "📱 Device: $DEVICE"
echo ""

echo "Choose log monitoring option:"
echo "1. Monitor ALL crash logs (FATAL, AndroidRuntime errors)"
echo "2. Monitor React Native JS errors only"
echo "3. Monitor Hydra Sprite app logs only"
echo "4. Monitor Metro bundler logs"
echo "5. Show last 50 lines of all logs"
echo "6. Clear logs and start fresh"
echo ""

read -p "Enter option (1-6): " choice

case $choice in
    1)
        echo "🔍 Monitoring ALL crash logs (Press Ctrl+C to stop)..."
        adb -s $DEVICE logcat | grep -E "(FATAL|AndroidRuntime|CRASH|E/)"
        ;;
    2)
        echo "🔍 Monitoring React Native JS errors (Press Ctrl+C to stop)..."
        adb -s $DEVICE logcat | grep -E "(ReactNativeJS|RN_ERROR|JS_ERROR)"
        ;;
    3)
        echo "🔍 Monitoring Hydra Sprite app logs (Press Ctrl+C to stop)..."
        adb -s $DEVICE logcat | grep -E "(com.hydrasprite|HydraSprite)"
        ;;
    4)
        echo "🔍 Monitoring Metro bundler logs..."
        echo "Metro logs are shown in the terminal where you ran 'npx react-native start'"
        echo "Or check the terminal where you ran ./test-app"
        ;;
    5)
        echo "📄 Last 50 lines of logs:"
        adb -s $DEVICE logcat -t 50
        ;;
    6)
        echo "🧹 Clearing logs..."
        adb -s $DEVICE logcat -c
        echo "✅ Logs cleared. Now reproduce the crash and run option 1 or 2."
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac 