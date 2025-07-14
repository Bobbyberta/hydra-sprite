#!/bin/bash

# 📱 Hydra Sprite - Android Wireless Development Setup Script
# Enhanced with complete pairing process and error handling

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
ANDROID_SDK_DIR="$HOME/android-sdk"
DEVICE_IP_FILE=".android-device-ip"
LAST_DEVICE_FILE=".last-android-device"
APP_NAME="HydraSprite"

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

print_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

print_instruction() {
    echo -e "${CYAN}[INSTRUCTION]${NC} $1"
}

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE} $1 ${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

# Enhanced error handling
handle_error() {
    local exit_code=$?
    local line_number=$1
    print_error "An error occurred on line $line_number. Exit code: $exit_code"
    print_error "Check the troubleshooting section in WIRELESS_SETUP_USAGE.md"
    exit $exit_code
}

# Set up error trap
trap 'handle_error $LINENO' ERR

# Check if running on macOS
check_macos() {
    if [[ "$OSTYPE" != "darwin"* ]]; then
        print_error "This script is designed for macOS only"
        print_error "Current OS: $OSTYPE"
        exit 1
    fi
    print_success "macOS detected"
}

# Check if Homebrew is installed
check_homebrew() {
    if ! command -v brew &> /dev/null; then
        print_error "Homebrew is not installed. Please install it first:"
        echo -e "${CYAN}Run: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"${NC}"
        exit 1
    fi
    print_success "Homebrew found"
}

# Check and install Java
setup_java() {
    if java -version 2>&1 | grep -q "openjdk version \"17"; then
        print_success "Java JDK 17 is already installed"
    else
        print_status "Installing Java JDK 17..."
        brew install --cask zulu@17 || {
            print_error "Failed to install Java JDK 17"
            print_error "Please install manually: brew install --cask zulu@17"
            exit 1
        }
        print_success "Java JDK 17 installed"
    fi
}

# Setup environment variables
setup_environment() {
    print_header "Setting Up Environment Variables"
    
    local shell_config=""
    if [[ "$SHELL" == */zsh ]]; then
        shell_config="$HOME/.zshrc"
    elif [[ "$SHELL" == */bash ]]; then
        shell_config="$HOME/.bashrc"
    else
        print_warning "Unknown shell: $SHELL. Using .zshrc"
        shell_config="$HOME/.zshrc"
    fi

    # Check if Android environment is already configured
    if grep -q "ANDROID_HOME" "$shell_config" 2>/dev/null; then
        print_success "Environment variables already configured"
    else
        print_status "Adding Android environment variables to $shell_config"
        {
            echo ""
            echo "# Android Development Environment"
            echo "export ANDROID_HOME=\$HOME/android-sdk"
            echo "export PATH=\$PATH:\$ANDROID_HOME/tools:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/cmdline-tools/latest/bin"
        } >> "$shell_config"
        print_success "Environment variables added"
        print_instruction "Run 'source $shell_config' to reload environment"
    fi

    # Source the configuration
    export ANDROID_HOME="$ANDROID_SDK_DIR"
    export PATH="$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"
}

# Setup Android SDK
setup_android_sdk() {
    print_header "Installing Android SDK Components"
    
    if [[ ! -d "$ANDROID_SDK_DIR" ]]; then
        print_status "Creating Android SDK directory..."
        mkdir -p "$ANDROID_SDK_DIR"
    fi

    # Download and install command line tools if not present
    if [[ ! -d "$ANDROID_SDK_DIR/cmdline-tools" ]]; then
        print_status "Downloading Android command line tools..."
        local tools_url="https://dl.google.com/android/repository/commandlinetools-mac-11076708_latest.zip"
        curl -o /tmp/android-tools.zip "$tools_url" || {
            print_error "Failed to download Android command line tools"
            exit 1
        }
        
        unzip -q /tmp/android-tools.zip -d /tmp/
        mkdir -p "$ANDROID_SDK_DIR/cmdline-tools"
        mv /tmp/cmdline-tools "$ANDROID_SDK_DIR/cmdline-tools/latest"
        rm /tmp/android-tools.zip
        print_success "Android command line tools installed"
    fi

    # Install Android SDK components
    if command -v sdkmanager &> /dev/null || [[ -f "$ANDROID_SDK_DIR/cmdline-tools/latest/bin/sdkmanager" ]]; then
        print_status "Installing Android SDK components..."
        yes | "$ANDROID_SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --licenses >/dev/null 2>&1 || true
        "$ANDROID_SDK_DIR/cmdline-tools/latest/bin/sdkmanager" \
            "platform-tools" \
            "platforms;android-34" \
            "build-tools;34.0.0" \
            >/dev/null 2>&1 || {
            print_error "Failed to install Android SDK components"
            exit 1
        }
        print_success "Android SDK components installed"
    else
        print_error "sdkmanager not found. Please check Android SDK installation"
        exit 1
    fi
}

# Check Node.js and npm
check_node() {
    print_header "Checking Node.js Installation"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install it first:"
        print_error "Visit: https://nodejs.org/ or use: brew install node"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js with npm"
        exit 1
    fi
    
    local node_version=$(node --version)
    local npm_version=$(npm --version)
    print_success "Node.js found: $node_version"
    print_success "npm found: $npm_version"
    
    # Check minimum Node.js version (v16+)
    local node_major=$(echo "$node_version" | cut -d. -f1 | tr -d 'v')
    if [[ $node_major -lt 16 ]]; then
        print_warning "Node.js version $node_version detected. React Native requires Node.js 16+"
        print_warning "Consider upgrading: brew upgrade node"
    fi
}

# Install dependencies
install_dependencies() {
    print_header "Installing Project Dependencies"
    
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Are you in the Hydra Sprite project directory?"
        exit 1
    fi
    
    if [[ -d "node_modules" ]] && [[ -f "package-lock.json" ]]; then
        print_success "Dependencies already installed"
    else
        print_status "Installing npm dependencies..."
        npm install || {
            print_error "Failed to install dependencies"
            print_error "Try: rm -rf node_modules package-lock.json && npm install"
            exit 1
        }
        print_success "Dependencies installed"
    fi
}

# Setup React Native platform folders
setup_platform_folders() {
    print_header "Setting Up Platform Folders"
    
    # Check if android folder exists
    if [[ -d "android" ]] && [[ -d "ios" ]]; then
        print_success "Platform folders already exist"
        return
    fi
    
    print_status "Creating React Native platform folders..."
    
    # Create temporary project to get platform folders
    local temp_dir="/tmp/hydra-temp-$(date +%s)"
    print_status "Creating temporary React Native project..."
    
    npx @react-native-community/cli@latest init TempHydraProject --skip-install --directory="$temp_dir" || {
        print_error "Failed to create temporary React Native project"
        exit 1
    }
    
    # Copy platform folders
    if [[ -d "$temp_dir/android" ]]; then
        cp -r "$temp_dir/android" ./
        print_success "Android platform folder copied"
    fi
    
    if [[ -d "$temp_dir/ios" ]]; then
        cp -r "$temp_dir/ios" ./
        print_success "iOS platform folder copied"
    fi
    
    # Clean up
    rm -rf "$temp_dir"
    
    # Update Android configuration
    update_android_config
}

# Update Android configuration for our app
update_android_config() {
    print_status "Updating Android configuration..."
    
    # Update settings.gradle
    if [[ -f "android/settings.gradle" ]]; then
        sed -i.bak "s/rootProject.name = 'TempHydraProject'/rootProject.name = 'HydraSprite'/" android/settings.gradle
        rm -f android/settings.gradle.bak
    fi
    
    # Update app name in strings.xml
    if [[ -f "android/app/src/main/res/values/strings.xml" ]]; then
        sed -i.bak 's|<string name="app_name">TempHydraProject</string>|<string name="app_name">Hydra Sprite</string>|' android/app/src/main/res/values/strings.xml
        rm -f android/app/src/main/res/values/strings.xml.bak
    fi
    
    # Update MainActivity component name
    local main_activity_file
    main_activity_file=$(find android/app/src/main/java -name "MainActivity.kt" 2>/dev/null | head -1)
    if [[ -n "$main_activity_file" ]]; then
        sed -i.bak 's/override fun getMainComponentName(): String = "TempHydraProject"/override fun getMainComponentName(): String = "hydra-sprite"/' "$main_activity_file"
        rm -f "${main_activity_file}.bak"
    fi
    
    print_success "Android configuration updated"
}

# Auto-detect devices on network
scan_for_devices() {
    print_status "Scanning for Android devices on network..."
    
    # Get local network range
    local network_range
    network_range=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}' | cut -d. -f1-3)
    
    if [[ -n "$network_range" ]]; then
        echo -e "${CYAN}Looking for devices on ${network_range}.0/24...${NC}"
        
        # Quick network scan for common Android debug ports
        local found_devices=()
        for i in {2..254}; do
            local ip="${network_range}.${i}"
            # Check common Android wireless debug ports
            for port in 5555 33515 37045 35751; do
                if timeout 0.1 bash -c "</dev/tcp/$ip/$port" 2>/dev/null; then
                    found_devices+=("$ip:$port")
                fi
            done &
        done
        wait
        
        if [[ ${#found_devices[@]} -gt 0 ]]; then
            echo -e "${GREEN}Found potential Android devices:${NC}"
            for device in "${found_devices[@]}"; do
                echo -e "  • ${YELLOW}$device${NC}"
            done
            return 0
        fi
    fi
    
    return 1
}

# Smart device connection with auto-detection
smart_connect_device() {
    print_header "🔍 Smart Device Connection"
    
    # Check if adb is available
    if ! command -v adb &> /dev/null; then
        print_error "adb not found. Running setup first..."
        main_setup
    fi
    
    # Check for already connected devices
    local connected_devices
    connected_devices=$(adb devices | grep -v "List of devices attached" | grep "device" | wc -l)
    
    if [[ $connected_devices -gt 0 ]]; then
        print_success "Device already connected!"
        adb devices | grep "device"
        return 0
    fi
    
    # Try saved device IP first
    if [[ -f "$DEVICE_IP_FILE" ]]; then
        local saved_ip
        saved_ip=$(cat "$DEVICE_IP_FILE" 2>/dev/null || true)
        if [[ -n "$saved_ip" ]]; then
            print_status "Trying saved device: $saved_ip"
            if adb connect "$saved_ip" >/dev/null 2>&1; then
                print_success "Connected to saved device: $saved_ip"
                return 0
            else
                print_warning "Saved device not responding"
            fi
        fi
    fi
    
    # Auto-scan for devices
    echo -e "${CYAN}🔍 Auto-detecting Android devices...${NC}"
    if scan_for_devices; then
        echo -e "\n${CYAN}Tip: If you see your device above, try connecting to it${NC}"
    fi
    
    # Interactive connection
    interactive_device_connect
}

# Interactive device connection with smart prompts
interactive_device_connect() {
    echo -e "\n${YELLOW}📱 Device Connection Setup${NC}\n"
    
    # Check if they need pairing instructions
    echo -e "${CYAN}Have you enabled wireless debugging on your Android device?${NC}"
    read -p "$(echo -e "${YELLOW}[y/N]: ${NC}") " -n 1 -r enable_wireless
    echo
    
    if [[ ! $enable_wireless =~ ^[Yy]$ ]]; then
        show_quick_pairing_guide
        echo -e "\n${CYAN}Press Enter when wireless debugging is enabled...${NC}"
        read
    fi
    
    # Manual connection process
    local device_ip=""
    while [[ -z "$device_ip" ]]; do
        read -p "Enter your device's connection IP:PORT (e.g., YOUR_DEVICE_IP:33515): " device_ip
        
        if [[ -z "$device_ip" ]]; then
            print_warning "Please enter a valid IP address and port"
            continue
        fi
        
        # Validate IP format
        if [[ ! "$device_ip" =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]+$ ]]; then
            print_warning "Invalid format. Use format: IP_ADDRESS:PORT (e.g., 100.100.1.100:10000)"
            device_ip=""
            continue
        fi
        
        # Test connection
        echo -e "${CYAN}Testing connection to $device_ip...${NC}"
        if adb connect "$device_ip" >/dev/null 2>&1; then
            print_success "Connected to $device_ip"
            
            # Save for future use
            echo "$device_ip" > "$DEVICE_IP_FILE"
            print_success "Device IP saved for future use"
            break
        else
            print_error "Failed to connect to $device_ip"
            print_info "Make sure:"
            print_info "  • Device is on same WiFi network"
            print_info "  • Wireless debugging is enabled"
            print_info "  • Using connection IP (not pairing IP)"
            echo ""
            device_ip=""
        fi
    done
    
    # Attempt connection
    print_status "Connecting to $device_ip..."
    
    if adb connect "$device_ip" >/dev/null 2>&1; then
        print_success "✅ Connected to $device_ip"
        echo "$device_ip" > "$DEVICE_IP_FILE"
        
        # Save device info for future reference
        local device_name
        device_name=$(adb -s "$device_ip" shell getprop ro.product.model 2>/dev/null || echo "Unknown Device")
        echo "$device_name|$device_ip" > "$LAST_DEVICE_FILE"
        
        print_success "Device info saved for quick reconnection"
        return 0
    else
        print_error "❌ Failed to connect to $device_ip"
        echo -e "${CYAN}Need help with pairing?${NC}"
        read -p "$(echo -e "${YELLOW}Show pairing guide? [y/N]: ${NC}") " -n 1 -r show_guide
        echo
        
        if [[ $show_guide =~ ^[Yy]$ ]]; then
            show_detailed_pairing_guide
        fi
        return 1
    fi
}

# Quick pairing guide
show_quick_pairing_guide() {
    echo -e "\n${PURPLE}📱 Quick Wireless Setup:${NC}\n"
    echo -e "${YELLOW}1.${NC} Settings → About phone → Tap 'Build number' 7 times"
    echo -e "${YELLOW}2.${NC} Settings → Developer options → Turn ON 'Wireless debugging'"
    echo -e "${YELLOW}3.${NC} If first time: Tap 'Pair device with pairing code'"
    echo -e "${YELLOW}4.${NC} Note the IP:PORT from the main wireless debugging screen"
}

# Detailed pairing guide
show_detailed_pairing_guide() {
    echo -e "\n${PURPLE}🔧 Detailed Pairing Process:${NC}\n"
    
    echo -e "${YELLOW}If this is your first time pairing:${NC}"
    echo -e "1. In wireless debugging, tap ${CYAN}'Pair device with pairing code'${NC}"
    echo -e "2. Note the pairing IP:PORT and 6-digit code"
    echo -e "3. Run: ${PURPLE}adb pair [PAIRING_IP:PORT]${NC}"
    echo -e "4. Enter the 6-digit code when prompted\n"
    
    echo -e "${YELLOW}For daily development:${NC}"
    echo -e "1. Use the IP:PORT from main wireless debugging screen"
    echo -e "2. Run: ${PURPLE}adb connect [CONNECTION_IP:PORT]${NC}\n"
    
    echo -e "${CYAN}Troubleshooting:${NC}"
    echo -e "• Ensure device and Mac are on same WiFi"
    echo -e "• Try turning wireless debugging OFF then ON"
    echo -e "• Check IP address matches your device's current IP"
    echo -e "\nSee ${YELLOW}DEVICE_PAIRING_GUIDE.md${NC} for complete instructions"
}

# Smart app deployment
smart_run_app() {
    print_header "🚀 Smart App Deployment"
    
    # Check if device is connected
    local connected_devices
    connected_devices=$(adb devices | grep -v "List of devices attached" | grep "device" | wc -l)
    
    if [[ $connected_devices -eq 0 ]]; then
        print_warning "No device connected. Connecting first..."
        if ! smart_connect_device; then
            print_error "Cannot deploy without device connection"
            return 1
        fi
    fi
    
    # Check if platform folders exist
    if [[ ! -d "android" ]]; then
        print_warning "Android platform folder missing. Setting up..."
        setup_platform_folders
    fi
    
    # Check Metro server
    local metro_running=false
    if lsof -ti:8081 >/dev/null 2>&1; then
        metro_running=true
        print_success "Metro bundler already running"
    else
        print_status "Starting Metro bundler..."
        npm start &
        sleep 3
        metro_running=true
    fi
    
    # Build and deploy
    print_status "Building and deploying Hydra Sprite..."
    echo -e "${CYAN}This may take a few minutes on first build...${NC}\n"
    
    # Show device info
    local device_ip
    device_ip=$(adb devices | grep "device" | head -1 | awk '{print $1}')
    if [[ -f "$LAST_DEVICE_FILE" ]]; then
        local device_info
        device_info=$(cat "$LAST_DEVICE_FILE" | cut -d'|' -f1)
        print_status "Deploying to: $device_info ($device_ip)"
    else
        print_status "Deploying to: $device_ip"
    fi
    
    # Deploy app
    if npx react-native run-android; then
        print_success "🎉 Hydra Sprite deployed successfully!"
        show_test_success_info
        return 0
    else
        print_error "❌ Deployment failed"
        show_deployment_troubleshooting
        return 1
    fi
}

# Show success info after deployment
show_test_success_info() {
    echo -e "\n${GREEN}✅ App is now running on your device!${NC}\n"
    
    echo -e "${CYAN}Quick Test Checklist:${NC}"
    echo -e "• ${YELLOW}Check sprite appears${NC} on home screen"
    echo -e "• ${YELLOW}Log some water${NC} using the + buttons"
    echo -e "• ${YELLOW}Watch sprite animation${NC} change"
    echo -e "• ${YELLOW}Navigate to Stats${NC} tab to see data"
    echo -e "• ${YELLOW}Shake device${NC} to open debug menu if needed\n"
    
    echo -e "${PURPLE}Next time, just run:${NC} ${YELLOW}./setup-android-wireless.sh test${NC}"
}

# Show troubleshooting for deployment failures
show_deployment_troubleshooting() {
    echo -e "\n${YELLOW}🔧 Common Solutions:${NC}\n"
    
    echo -e "${CYAN}Try these commands:${NC}"
    echo -e "• ${PURPLE}npm start -- --reset-cache${NC} (clear Metro cache)"
    echo -e "• ${PURPLE}cd android && ./gradlew clean && cd ..${NC} (clean build)"
    echo -e "• ${PURPLE}adb devices${NC} (verify device connection)"
    echo -e "• ${PURPLE}./setup-android-wireless.sh connect${NC} (reconnect device)\n"
    
    echo -e "${CYAN}Check device:${NC}"
    echo -e "• Device screen is unlocked"
    echo -e "• USB debugging permissions granted"
    echo -e "• Same WiFi network as Mac"
    echo -e "\nSee ${YELLOW}WIRELESS_SETUP_USAGE.md${NC} for detailed troubleshooting"
}

# Main test function - the easy UX command
test_app() {
    print_header "📱 Hydra Sprite Quick Test"
    
    # Environment check
    local needs_setup=false
    
    # Check basic requirements
    if ! command -v adb &> /dev/null; then
        print_warning "Android SDK not found"
        needs_setup=true
    elif [[ ! -d "node_modules" ]]; then
        print_warning "Dependencies not installed"
        needs_setup=true
    elif [[ ! -d "android" ]]; then
        print_warning "Android platform not set up"
        needs_setup=true
    fi
    
    # Run setup if needed
    if $needs_setup; then
        echo -e "${CYAN}First time setup required...${NC}"
        read -p "$(echo -e "${YELLOW}Run automatic setup? [Y/n]: ${NC}") " -n 1 -r run_setup
        echo
        
        if [[ ! $run_setup =~ ^[Nn]$ ]]; then
            main_setup
            echo -e "\n${GREEN}✅ Setup complete! Continuing with device connection...${NC}\n"
        else
            print_error "Setup required for testing"
            exit 1
        fi
    else
        print_success "Environment ready ✅"
    fi
    
    # Smart device connection
    if ! smart_connect_device; then
        print_error "Device connection required for testing"
        exit 1
    fi
    
    # Deploy and test
    smart_run_app
}

# Enhanced device pairing instructions
show_pairing_instructions() {
    print_header "📱 Device Pairing Instructions"
    
    echo -e "${CYAN}Please complete these steps on your Android device:${NC}\n"
    
    echo -e "${YELLOW}1. Enable Developer Options:${NC}"
    echo -e "   • Settings → About phone"
    echo -e "   • Tap \"Build number\" 7 times\n"
    
    echo -e "${YELLOW}2. Enable Wireless Debugging:${NC}"
    echo -e "   • Settings → Developer options"
    echo -e "   • Turn on \"Wireless debugging\"\n"
    
    echo -e "${YELLOW}3. Pair Your Device:${NC}"
    echo -e "   • Tap \"Pair device with pairing code\""
    echo -e "   • Note the ${PURPLE}IP:PORT${NC} and ${PURPLE}6-digit code${NC}\n"
    
    read -p "Press Enter when your device is ready for pairing..."
    
    echo -e "\n${CYAN}Now run the pairing command on your Mac:${NC}"
    echo -e "${PURPLE}adb pair [YOUR_PAIRING_IP:PORT]${NC}"
    echo -e "${CYAN}Example: ${PURPLE}adb pair 100.100.1.100:10000${NC}\n"
    
    echo -e "${CYAN}After pairing, get your connection IP from the main \"Wireless debugging\" screen${NC}"
    echo -e "${CYAN}Then run: ${PURPLE}adb connect [YOUR_CONNECTION_IP:PORT]${NC}\n"
}

# Smart device connection with saved IP
smart_device_connection() {
    print_section "Smart Device Connection"
    
    local device_ip=""
    
    # Try to load saved device IP
    if [[ -f "$DEVICE_IP_FILE" ]]; then
        device_ip=$(cat "$DEVICE_IP_FILE" 2>/dev/null)
        if [[ -n "$device_ip" ]]; then
            echo -e "${GREEN}Found saved device IP: ${PURPLE}$device_ip${NC}"
            
            # Test connection
            if adb connect "$device_ip" >/dev/null 2>&1; then
                print_success "Connected to saved device: $device_ip"
                return 0
            else
                print_warning "Saved device IP not reachable, will ask for new one"
                device_ip=""
            fi
        fi
    fi
    
    echo -e "${CYAN}Please complete device pairing first if you haven't already:${NC}\n"
    echo -e "${CYAN}1. Enable \"Wireless debugging\" on your Android device${NC}"
    echo -e "${CYAN}2. Tap \"Pair device with pairing code\"${NC}"
    echo -e "${CYAN}3. Run: ${PURPLE}adb pair YOUR_DEVICE_IP:PAIRING_PORT${NC}"
    echo -e "${CYAN}4. Enter the 6-digit code when prompted${NC}\n"
    
    read -p "Press Enter when your device is ready for pairing..."
    
    echo -e "\n${CYAN}Now run the pairing command on your Mac:${NC}"
    echo -e "${PURPLE}adb pair [YOUR_PAIRING_IP:PORT]${NC}"
    echo -e "${CYAN}Example: ${PURPLE}adb pair YOUR_DEVICE_IP:37045${NC}\n"
    
    echo -e "${CYAN}After pairing, get your connection IP from the main \"Wireless debugging\" screen${NC}"
    echo -e "${CYAN}Then run: ${PURPLE}adb connect [YOUR_CONNECTION_IP:PORT]${NC}\n"
}

# Verify device connection
verify_device_connection() {
    print_status "Verifying device connection..."
    
    local connected_devices
    connected_devices=$(adb devices | grep -v "List of devices attached" | grep "device" | wc -l)
    
    if [[ $connected_devices -eq 0 ]]; then
        print_error "No devices connected"
        print_instruction "Please ensure device pairing was successful"
        exit 1
    fi
    
    print_success "Device connection verified ($connected_devices device(s) connected)"
    
    # Show connected devices
    print_status "Connected devices:"
    adb devices | grep -v "List of devices attached" | grep "device"
}

# Enhanced app building and running
run_app() {
    print_header "🚀 Building and Running Hydra Sprite"
    
    # Verify platform folders exist
    if [[ ! -d "android" ]]; then
        print_error "Android platform folder not found"
        print_instruction "Run: ./setup-android-wireless.sh setup"
        exit 1
    fi
    
    # Verify device connection
    if ! adb devices | grep -q "device"; then
        print_error "No Android devices connected"
        print_instruction "Run: ./setup-android-wireless.sh connect"
        exit 1
    fi
    
    # Check if Metro is running
    if lsof -ti:8081 >/dev/null 2>&1; then
        print_status "Metro bundler is already running on port 8081"
    else
        print_status "Starting Metro bundler..."
        npm start &
        sleep 3
    fi
    
    # Build and install app
    print_status "Building and installing app on device..."
    print_instruction "This may take a few minutes on first build..."
    
    npx react-native run-android || {
        print_error "Failed to build and run the app"
        print_instruction "Common solutions:"
        print_instruction "• Clean build: cd android && ./gradlew clean && cd .."
        print_instruction "• Reset Metro: npm start -- --reset-cache"
        print_instruction "• Check device connection: adb devices"
        exit 1
    }
    
    print_success "🎉 Hydra Sprite is now running on your device!"
    print_success "🌟 Your water tracking sprite is ready!"
    
    show_next_steps
}

# Show next steps after successful deployment
show_next_steps() {
    print_header "📱 Next Steps"
    
    echo -e "${GREEN}✅ App Successfully Deployed!${NC}\n"
    
    echo -e "${CYAN}Development Tips:${NC}"
    echo -e "• ${YELLOW}Shake device${NC} to open React Native debug menu"
    echo -e "• ${YELLOW}Cmd+R${NC} or shake → Reload to refresh app"
    echo -e "• ${YELLOW}npm start -- --reset-cache${NC} to clear Metro cache"
    echo -e "• ${YELLOW}./setup-android-wireless.sh test${NC} for quick testing\n"
    
    echo -e "${CYAN}App Features to Test:${NC}"
    echo -e "• ${YELLOW}Log water intake${NC} to keep your sprite happy"
    echo -e "• ${YELLOW}Check sprite animations${NC} as hydration changes"
    echo -e "• ${YELLOW}View weekly stats${NC} in the Stats tab"
    echo -e "• ${YELLOW}Adjust settings${NC} in the Settings tab\n"
    
    echo -e "${CYAN}Troubleshooting:${NC}"
    echo -e "• Check ${YELLOW}WIRELESS_SETUP_USAGE.md${NC} for detailed help"
    echo -e "• Use ${YELLOW}adb logcat${NC} for Android debug logs"
    echo -e "• Visit ${YELLOW}ANDROID_DEVELOPMENT_GUIDE.md${NC} for more info\n"
}

# Disconnect from device
disconnect_device() {
    print_header "🔌 Disconnecting from Device"
    
    if [[ -f "$DEVICE_IP_FILE" ]]; then
        local saved_ip
        saved_ip=$(cat "$DEVICE_IP_FILE")
        if [[ -n "$saved_ip" ]]; then
            adb disconnect "$saved_ip" >/dev/null 2>&1 || true
            print_success "Disconnected from $saved_ip"
        fi
    fi
    
    # Disconnect all devices
    adb disconnect >/dev/null 2>&1 || true
    print_success "All wireless connections closed"
}

# Main setup function
main_setup() {
    print_header "🚀 Hydra Sprite Android Wireless Setup"
    
    check_macos
    check_homebrew
    setup_java
    setup_environment
    setup_android_sdk
    check_node
    install_dependencies
    setup_platform_folders
    
    print_success "✅ Environment setup complete!"
    print_instruction "Run './setup-android-wireless.sh test' for easy testing"
}

# Usage information
show_usage() {
    echo -e "${BLUE}📱 Hydra Sprite Android Wireless Setup${NC}\n"
    echo -e "${CYAN}Usage:${NC}"
    echo -e "  $0 [command]\n"
    echo -e "${CYAN}Commands:${NC}"
    echo -e "  ${YELLOW}test${NC}        🌟 Smart testing (checks everything, minimal typing)"
    echo -e "  ${YELLOW}setup${NC}       Setup development environment"
    echo -e "  ${YELLOW}connect${NC}     Pair and connect to Android device"
    echo -e "  ${YELLOW}run${NC}         Build and run app on connected device"
    echo -e "  ${YELLOW}disconnect${NC}  Disconnect from device"
    echo -e "  ${YELLOW}full${NC}        Complete setup + connect + run"
    echo -e "  ${YELLOW}help${NC}        Show this help message\n"
    echo -e "${CYAN}Examples:${NC}"
    echo -e "  $0 test          # 🌟 Easy testing (recommended)"
    echo -e "  $0 full          # Complete first-time setup"
    echo -e "  $0 setup         # Just setup environment"
    echo -e "  $0 connect       # Just pair device"
    echo -e "  $0 run           # Just run app\n"
    echo -e "${PURPLE}💡 Pro Tip:${NC} Use ${YELLOW}'test'${NC} command for the easiest experience!"
}

# Main script logic
case "${1:-test}" in
    "test")
        test_app
        ;;
    "setup")
        main_setup
        ;;
    "connect")
        smart_device_connection
        ;;
    "run")
        run_app
        ;;
    "disconnect")
        disconnect_device
        ;;
    "full")
        main_setup
        smart_device_connection
        run_app
        ;;
    "help"|"-h"|"--help")
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac 