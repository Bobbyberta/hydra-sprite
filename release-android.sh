#!/bin/bash

# 🚀 Android Release Build Script for Hydra Sprite
# This script automates the process of building a release-ready Android app

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE} $1 ${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Update .cursorrules with current project state
update_cursorrules() {
    print_info "Updating .cursorrules with current project state..."
    
    if [ -f "update-cursorrules.sh" ]; then
        ./update-cursorrules.sh
        print_success ".cursorrules updated"
    else
        print_warning "update-cursorrules.sh not found, skipping auto-update"
    fi
}

# Check if gradle.properties exists
check_gradle_properties() {
    if [ ! -f "android/gradle.properties" ]; then
        print_error "gradle.properties not found!"
        print_info "Create android/gradle.properties with your signing configuration:"
        echo ""
        echo "MYAPP_RELEASE_STORE_FILE=hydra-sprite-release.keystore"
        echo "MYAPP_RELEASE_KEY_ALIAS=hydra-sprite"
        echo "MYAPP_RELEASE_STORE_PASSWORD=your_store_password"
        echo "MYAPP_RELEASE_KEY_PASSWORD=your_key_password"
        echo ""
        print_info "See GOOGLE_PLAY_RELEASE_GUIDE.md for detailed instructions"
        exit 1
    fi
}

# Check if keystore exists
check_keystore() {
    local keystore_file=$(grep "MYAPP_RELEASE_STORE_FILE=" android/gradle.properties | cut -d'=' -f2)
    if [ ! -f "android/app/$keystore_file" ]; then
        print_error "Release keystore not found: android/app/$keystore_file"
        print_info "Generate a keystore first:"
        echo ""
        echo "cd android/app"
        echo "keytool -genkey -v -keystore $keystore_file -alias hydra-sprite -keyalg RSA -keysize 2048 -validity 10000"
        echo ""
        print_info "See GOOGLE_PLAY_RELEASE_GUIDE.md for detailed instructions"
        exit 1
    fi
}

# Clean previous builds
clean_builds() {
    print_header "🧹 Cleaning Previous Builds"
    
    print_info "Cleaning Android build files..."
    cd android
    ./gradlew clean
    cd ..
    
    print_info "Cleaning Metro cache..."
    npx react-native start --reset-cache &
    sleep 5
    kill %1 2>/dev/null || true
    
    print_success "Build files cleaned"
}

# Build AAB (App Bundle)
build_aab() {
    print_header "📦 Building App Bundle (AAB)"
    
    print_info "Building release AAB..."
    cd android
    ./gradlew bundleRelease
    cd ..
    
    local aab_path="android/app/build/outputs/bundle/release/app-release.aab"
    
    if [ -f "$aab_path" ]; then
        print_success "AAB built successfully!"
        print_info "Location: $aab_path"
        
        # Get file size
        local size=$(ls -lh "$aab_path" | awk '{print $5}')
        print_info "Size: $size"
    else
        print_error "Failed to build AAB"
        exit 1
    fi
}

# Build APK (alternative to AAB)
build_apk() {
    print_header "📱 Building APK"
    
    print_info "Building release APK..."
    cd android
    ./gradlew assembleRelease
    cd ..
    
    local apk_path="android/app/build/outputs/apk/release/app-release.apk"
    
    if [ -f "$apk_path" ]; then
        print_success "APK built successfully!"
        print_info "Location: $apk_path"
        
        # Get file size
        local size=$(ls -lh "$apk_path" | awk '{print $5}')
        print_info "Size: $size"
    else
        print_error "Failed to build APK"
        exit 1
    fi
}

# Test release build
test_release() {
    print_header "🧪 Testing Release Build"
    
    local apk_path="android/app/build/outputs/apk/release/app-release.apk"
    
    if [ ! -f "$apk_path" ]; then
        print_warning "No APK found. Building APK for testing..."
        build_apk
    fi
    
    print_info "Installing release APK on device..."
    
    # Check if device is connected
    if ! adb devices | grep -q "device$"; then
        print_warning "No device connected. Please connect your device and try again."
        return 1
    fi
    
    # Install APK
    if adb install -r "$apk_path"; then
        print_success "Release APK installed successfully!"
        print_info "Please test the app thoroughly on your device"
    else
        print_error "Failed to install APK"
        return 1
    fi
}

# Show build summary
show_summary() {
    print_header "📋 Build Summary"
    
    local aab_path="android/app/build/outputs/bundle/release/app-release.aab"
    local apk_path="android/app/build/outputs/apk/release/app-release.apk"
    
    echo "Build artifacts created:"
    echo ""
    
    if [ -f "$aab_path" ]; then
        local aab_size=$(ls -lh "$aab_path" | awk '{print $5}')
        print_success "App Bundle (AAB): $aab_path ($aab_size)"
        print_info "Use AAB for Google Play Store upload"
    fi
    
    if [ -f "$apk_path" ]; then
        local apk_size=$(ls -lh "$apk_path" | awk '{print $5}')
        print_success "APK: $apk_path ($apk_size)"
        print_info "Use APK for testing or alternative distribution"
    fi
    
    echo ""
    print_info "Next steps:"
    echo "1. Test the release build thoroughly"
    echo "2. Upload AAB to Google Play Console"
    echo "3. Complete store listing"
    echo "4. Submit for review"
    echo ""
    print_info "See GOOGLE_PLAY_RELEASE_GUIDE.md for complete instructions"
}

# Main script execution
main() {
    print_header "🚀 Hydra Sprite - Android Release Build"
    
    # Update .cursorrules first
    update_cursorrules
    
    # Parse command line arguments
    case "${1:-all}" in
        "clean")
            clean_builds
            ;;
        "aab")
            check_gradle_properties
            check_keystore
            build_aab
            ;;
        "apk")
            check_gradle_properties
            check_keystore
            build_apk
            ;;
        "test")
            test_release
            ;;
        "all")
            check_gradle_properties
            check_keystore
            clean_builds
            build_aab
            build_apk
            show_summary
            ;;
        "help")
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  all     - Full release build (default)"
            echo "  clean   - Clean previous builds"
            echo "  aab     - Build App Bundle only"
            echo "  apk     - Build APK only"
            echo "  test    - Install and test release APK"
            echo "  help    - Show this help"
            echo ""
            echo "Examples:"
            echo "  $0              # Full release build"
            echo "  $0 aab          # Build AAB for Play Store"
            echo "  $0 test         # Install and test"
            echo ""
            echo "Note: .cursorrules is automatically updated on each build"
            exit 0
            ;;
        *)
            print_error "Unknown command: $1"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 