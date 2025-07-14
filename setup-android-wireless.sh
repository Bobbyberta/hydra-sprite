#!/bin/bash

# 📱 Hydra Sprite - Android Wireless Development Setup Script
# This script sets up Android development environment and runs the app wirelessly

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print with color
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE} $1 ${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

# Check if running on macOS
check_macos() {
    if [[ "$OSTYPE" != "darwin"* ]]; then
        print_error "This script is designed for macOS only"
        exit 1
    fi
}

# Check if Homebrew is installed
check_homebrew() {
    if ! command -v brew &> /dev/null; then
        print_error "Homebrew is not installed. Please install it first:"
        echo 'Run: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        exit 1
    fi
    print_success "Homebrew found"
}

# Install Java JDK if not present
install_java() {
    print_header "Checking Java Installation"
    
    if ! command -v java &> /dev/null; then
        print_status "Installing Java JDK 17..."
        brew install --cask zulu@17
    else
        print_success "Java is already installed"
    fi
}

# Set up environment variables
setup_environment() {
    print_header "Setting Up Environment Variables"
    
    # Check if variables are already in .zshrc
    if ! grep -q "ANDROID_HOME" ~/.zshrc 2>/dev/null; then
        print_status "Adding Android environment variables to ~/.zshrc"
        
        cat >> ~/.zshrc << 'EOF'

# Android Development Environment
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
EOF
    else
        print_success "Environment variables already configured"
    fi
    
    # Source the environment for current session
    export ANDROID_HOME=$HOME/android-sdk
    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
}

# Install Android SDK components
install_android_sdk() {
    print_header "Installing Android SDK Components"
    
    if [ ! -d "$ANDROID_HOME/platform-tools" ]; then
        print_status "Installing Android SDK components..."
        
        # Accept licenses first
        yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses 2>/dev/null || true
        
        # Install required components
        $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager \
            "platform-tools" \
            "platforms;android-34" \
            "build-tools;34.0.0" \
            "platforms;android-33" \
            "build-tools;33.0.0"
        
        print_success "Android SDK components installed"
    else
        print_success "Android SDK components already installed"
    fi
}

# Check Node.js and npm
check_node() {
    print_header "Checking Node.js Installation"
    
    if ! command -v node &> /dev/null; then
        print_status "Installing Node.js..."
        brew install node
    else
        print_success "Node.js found: $(node --version)"
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm not found"
        exit 1
    else
        print_success "npm found: $(npm --version)"
    fi
}

# Install project dependencies
install_dependencies() {
    print_header "Installing Project Dependencies"
    
    if [ ! -d "node_modules" ]; then
        print_status "Installing npm dependencies..."
        npm install
        print_success "Dependencies installed"
    else
        print_success "Dependencies already installed"
    fi
}

# Get device IP address
get_device_ip() {
    print_header "Android Device Connection Setup"
    
    echo -e "${YELLOW}📱 Please ensure your Android device is connected via USB first${NC}"
    echo -e "${YELLOW}📱 Make sure USB Debugging is enabled in Developer Options${NC}"
    echo ""
    
    # Check for connected devices
    if command -v adb &> /dev/null; then
        print_status "Checking for connected devices..."
        devices=$(adb devices | grep -v "List of devices" | grep "device$" | wc -l | xargs)
        
        if [ "$devices" -eq 0 ]; then
            print_warning "No devices found. Please:"
            echo "1. Connect your Android device via USB"
            echo "2. Enable Developer Options (tap Build Number 7 times)"
            echo "3. Enable USB Debugging in Developer Options"
            echo "4. Accept the debugging prompt on your device"
            echo ""
            read -p "Press Enter when your device is connected and ready..."
        fi
        
        # List connected devices
        print_status "Connected devices:"
        adb devices
    fi
    
    echo ""
    echo -e "${YELLOW}📱 To find your device's IP address:${NC}"
    echo "1. Go to Settings > About Phone > Status"
    echo "2. Look for 'IP Address' or 'Wi-Fi IP Address'"
    echo "3. Or go to Settings > Wi-Fi > Connected Network > Advanced"
    echo ""
    
    read -p "Enter your Android device's IP address: " device_ip
    
    if [[ ! $device_ip =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        print_error "Invalid IP address format"
        exit 1
    fi
    
    echo "$device_ip"
}

# Connect to device wirelessly
connect_wireless() {
    local device_ip=$1
    print_header "Setting Up Wireless Connection"
    
    print_status "Enabling TCP/IP mode on port 5555..."
    adb tcpip 5555
    
    sleep 2
    
    print_status "Connecting to device wirelessly at $device_ip:5555..."
    adb connect $device_ip:5555
    
    sleep 2
    
    print_status "Verifying wireless connection..."
    if adb devices | grep -q "$device_ip:5555"; then
        print_success "Successfully connected wirelessly to $device_ip:5555"
        echo ""
        print_success "🔌 You can now disconnect the USB cable!"
        echo ""
    else
        print_error "Failed to connect wirelessly"
        exit 1
    fi
}

# Start Metro bundler in background
start_metro() {
    print_header "Starting Metro Bundler"
    
    # Kill any existing Metro processes
    pkill -f "react-native start" 2>/dev/null || true
    pkill -f "metro" 2>/dev/null || true
    
    print_status "Starting Metro bundler in background..."
    npm start &
    METRO_PID=$!
    
    print_status "Waiting for Metro to start..."
    sleep 10
    
    print_success "Metro bundler started (PID: $METRO_PID)"
}

# Run the app on Android
run_app() {
    print_header "Running Hydra Sprite on Android"
    
    print_status "Building and installing app on device..."
    npm run android
    
    if [ $? -eq 0 ]; then
        print_success "🎉 Hydra Sprite is now running on your device!"
        echo ""
        echo -e "${GREEN}🌟 Your water tracking sprite is ready to help you stay hydrated!${NC}"
        echo ""
        echo "Next steps:"
        echo "• Shake your device to open the React Native debug menu"
        echo "• Press 'j' in this terminal to open React DevTools"
        echo "• Start logging water to keep your sprite happy!"
    else
        print_error "Failed to run the app"
        exit 1
    fi
}

# Save connection info for future use
save_connection() {
    local device_ip=$1
    cat > .android-device-ip << EOF
# Last used Android device IP
DEVICE_IP=$device_ip
# To reconnect: adb connect $device_ip:5555
EOF
    print_success "Device IP saved to .android-device-ip for future use"
}

# Quick reconnect function
quick_reconnect() {
    if [ -f ".android-device-ip" ]; then
        source .android-device-ip
        print_status "Attempting to reconnect to last used device: $DEVICE_IP"
        adb connect $DEVICE_IP:5555
        
        if adb devices | grep -q "$DEVICE_IP:5555"; then
            print_success "Reconnected to $DEVICE_IP:5555"
            return 0
        else
            print_warning "Failed to reconnect to $DEVICE_IP:5555"
            return 1
        fi
    fi
    return 1
}

# Main setup function
main_setup() {
    print_header "🚀 Hydra Sprite Android Wireless Setup"
    
    check_macos
    check_homebrew
    install_java
    setup_environment
    install_android_sdk
    check_node
    install_dependencies
    
    print_success "✅ Environment setup complete!"
}

# Main run function
main_run() {
    print_header "📱 Running Hydra Sprite Wirelessly"
    
    # Try quick reconnect first
    if ! quick_reconnect; then
        device_ip=$(get_device_ip)
        connect_wireless "$device_ip"
        save_connection "$device_ip"
    fi
    
    start_metro
    run_app
}

# Cleanup function
cleanup() {
    if [ ! -z "$METRO_PID" ]; then
        print_status "Stopping Metro bundler..."
        kill $METRO_PID 2>/dev/null || true
    fi
}

# Trap cleanup on script exit
trap cleanup EXIT

# Command line options
case "${1:-setup}" in
    "setup")
        main_setup
        ;;
    "run")
        main_run
        ;;
    "full")
        main_setup
        main_run
        ;;
    "connect")
        if [ -f ".android-device-ip" ]; then
            source .android-device-ip
            adb connect $DEVICE_IP:5555
        else
            device_ip=$(get_device_ip)
            connect_wireless "$device_ip"
            save_connection "$device_ip"
        fi
        ;;
    "disconnect")
        if [ -f ".android-device-ip" ]; then
            source .android-device-ip
            adb disconnect $DEVICE_IP:5555
            print_success "Disconnected from $DEVICE_IP:5555"
        fi
        ;;
    *)
        echo "Usage: $0 [setup|run|full|connect|disconnect]"
        echo ""
        echo "Commands:"
        echo "  setup      - Set up Android development environment"
        echo "  run        - Connect to device and run the app"
        echo "  full       - Complete setup and run (default)"
        echo "  connect    - Connect to Android device wirelessly"
        echo "  disconnect - Disconnect from Android device"
        echo ""
        echo "Examples:"
        echo "  $0           # Full setup and run"
        echo "  $0 setup     # Just setup environment"
        echo "  $0 run       # Just run the app (after setup)"
        echo "  $0 connect   # Just connect to device"
        ;;
esac 