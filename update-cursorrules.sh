#!/bin/bash

# 🔄 Auto-update .cursorrules script for Hydra Sprite
# This script updates .cursorrules with current project state

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Get project statistics
get_project_stats() {
    local src_files=$(find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l)
    local total_files=$(find . -type f -not -path "./node_modules/*" -not -path "./.git/*" | wc -l)
    local package_version=$(node -p "require('./package.json').version" 2>/dev/null || echo "unknown")
    
    echo "src_files:$src_files"
    echo "total_files:$total_files"
    echo "package_version:$package_version"
    echo "last_updated:$(date '+%Y-%m-%d %H:%M:%S')"
}

# Get current dependencies
get_dependencies() {
    node -p "Object.keys(require('./package.json').dependencies || {}).join(', ')" 2>/dev/null || echo "No dependencies found"
}

# Get current dev dependencies
get_dev_dependencies() {
    node -p "Object.keys(require('./package.json').devDependencies || {}).join(', ')" 2>/dev/null || echo "No dev dependencies found"
}

# Update .cursorrules with current project state
update_cursorrules() {
    local stats=$(get_project_stats)
    local src_files=$(echo "$stats" | grep "src_files:" | cut -d':' -f2)
    local total_files=$(echo "$stats" | grep "total_files:" | cut -d':' -f2)
    local package_version=$(echo "$stats" | grep "package_version:" | cut -d':' -f2)
    local last_updated=$(echo "$stats" | grep "last_updated:" | cut -d':' -f2-)
    
    local dependencies=$(get_dependencies)
    local dev_dependencies=$(get_dev_dependencies)
    
    # Check if git is available and get latest commit
    local git_hash=""
    if command -v git &> /dev/null; then
        git_hash=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    fi
    
    # Create updated .cursorrules
    cat > .cursorrules << EOF
# Hydra Sprite - React Native Water Tracking App

## Project Overview
This is an offline water tracking mobile app built with React Native. Users log water intake to keep a virtual sprite character alive and healthy. The app supports Android and iOS platforms with a focus on privacy, security, and ease of development.

## Project Statistics (Auto-updated)
- **Version**: $package_version
- **Last Updated**: $last_updated
- **Source Files**: $src_files
- **Total Files**: $total_files
- **Git Commit**: $git_hash

## Current Project Structure
\`\`\`
hydra-sprite/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components  
│   ├── services/          # Business logic and data management
│   ├── utils/             # Helper functions and utilities
│   ├── types/             # TypeScript type definitions
│   ├── assets/            # Images, fonts, and other static assets
│   └── store/             # State management (AsyncStorage utilities)
├── android/               # Android-specific code and build files
├── ios/                   # iOS-specific code and build files
├── scripts/               # Build and development scripts
├── docs/                  # Documentation files
├── .android-device-ip     # Private device IP (not in Git)
├── .android-device-ip.example # Template for device IP setup
├── test-app               # Quick testing script
├── debug-logs.sh          # Debug log viewer
├── release-android.sh     # Release build automation
├── setup-android-wireless.sh # Wireless development setup
├── update-cursorrules.sh  # Auto-update this file
├── privacy-policy.html    # Privacy policy for app stores
└── GOOGLE_PLAY_RELEASE_GUIDE.md # Complete release guide
\`\`\`

## Dependencies
- **Production**: $dependencies
- **Development**: $dev_dependencies

## Development Guidelines

### Code Style & Standards
- Use TypeScript for all new code
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error boundaries
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
- Prefer const over let, avoid var
- Use meaningful variable and function names
- Add proper JSDoc comments for functions and components

### File Structure Guidelines
- \`/src/components/\` - Reusable UI components (Button, Input, Card, etc.)
- \`/src/screens/\` - Screen components (HomeScreen, StatsScreen, etc.)
- \`/src/services/\` - Business logic and data management
- \`/src/utils/\` - Helper functions and utilities
- \`/src/types/\` - TypeScript type definitions
- \`/src/assets/\` - Images, fonts, and other static assets
- \`/src/store/\` - State management (AsyncStorage utilities)

### Mobile-Specific Guidelines
- **Offline-First**: Always consider offline functionality first
- **Local Storage**: Use AsyncStorage for local data persistence
- **Error Handling**: Implement proper loading states and error handling
- **Responsive Design**: Consider different screen sizes and orientations
- **Platform-Specific**: Use platform-specific code when necessary (Platform.OS)
- **Performance**: Optimize for performance (use FlatList for large lists, optimize images)

### Water Tracking Features
- Store water intake data locally using AsyncStorage
- Implement sprite health system based on hydration levels (5 states: 😵😟😐😊🌟)
- Create intuitive water logging UI with quick actions (+1, +2 glasses)
- Support for different container sizes and measurements
- Daily goal tracking (default: 8 glasses)
- Sprite animation states based on hydration level
- Reset functionality for daily/manual resets

### Sprite Character System
- Sprite states: dehydrated (😵), concerned (😟), okay (😐), happy (😊), thriving (🌟)
- Smooth transitions between states
- Visual feedback when water is logged
- Character should be the central focus of the main screen
- Use React Native animations for smooth transitions
- Motivational messages based on hydration level

### Wireless Android Development
- **Device Pairing**: Use ADB wireless debugging for development
- **IP Configuration**: Store device IP in \`.android-device-ip\` (excluded from Git)
- **Quick Testing**: Use \`./test-app\` for one-command deployment
- **Debug Logs**: Use \`./debug-logs.sh\` for real-time debugging
- **Setup Script**: Use \`./setup-android-wireless.sh\` for complete wireless setup

### Security & Privacy Guidelines
- **Privacy-First**: Store all data locally (offline-first)
- **No Data Collection**: Don't collect personal data beyond water intake
- **No Analytics**: No tracking, analytics, or external services
- **No User Accounts**: No registration or login required
- **Local Only**: All data stays on the user's device
- **IP Privacy**: Never commit actual IP addresses to Git
- **Keystore Security**: Keep release keystores and passwords secure

### Development Scripts
- **\`./test-app\`** - Quick app deployment and testing
- **\`./debug-logs.sh\`** - Real-time debug log monitoring
- **\`./setup-android-wireless.sh\`** - Complete wireless development setup
- **\`./release-android.sh\`** - Automated release build process
- **\`./update-cursorrules.sh\`** - Auto-update this file
- **\`npm start\`** - Start Metro bundler
- **\`npm test\`** - Run tests
- **\`npm run android\`** - Run on Android (traditional USB)
- **\`npm run ios\`** - Run on iOS

### Code Quality
- Write unit tests for utility functions
- Use proper error handling and try-catch blocks
- Implement proper loading states
- Add accessibility labels for screen readers
- Validate user inputs
- Use proper TypeScript types
- Follow ESLint rules and fix warnings

### Performance
- Minimize re-renders with useMemo and useCallback
- Optimize images and assets
- Use lazy loading where appropriate
- Monitor memory usage
- Test on both debug and release builds
- Profile performance regularly

### Dependencies
- Avoid adding unnecessary dependencies
- Keep dependencies up to date
- Use native modules sparingly
- Prefer pure JavaScript solutions when possible
- Review security of third-party packages

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new functionality
- Keep commits atomic and focused
- Write clear pull request descriptions
- Never commit sensitive files (keystores, passwords, device IPs)

### Testing
- Test on both Android and iOS
- Test offline functionality thoroughly
- Test with different data states (empty, partial, full)
- Test edge cases (app backgrounding, device rotation)
- Performance test with large datasets
- Test wireless development setup
- Test release builds before publishing

### Release Process
- **Production Build**: Use \`./release-android.sh\` for automated release builds
- **Keystore Management**: Generate and secure production keystore
- **App Store Assets**: Prepare screenshots, descriptions, and privacy policy
- **Google Play Store**: Follow Play Store guidelines and policies
- **Version Management**: Increment versionCode and versionName properly
- **Testing**: Thoroughly test release builds on physical devices
- **Gradual Rollout**: Use staged rollout (5% → 100%)

### Documentation Files
- **README.md** - Project overview and quick start
- **GOOGLE_PLAY_RELEASE_GUIDE.md** - Complete Play Store release guide
- **ANDROID_DEVELOPMENT_GUIDE.md** - Android development workflow
- **WIRELESS_SETUP_USAGE.md** - Wireless development setup
- **DEVICE_PAIRING_GUIDE.md** - Device pairing instructions
- **EASY_TESTING.md** - One-command testing guide
- **DEBUGGING_GUIDE.md** - Debugging and troubleshooting
- **CONTRIBUTING.md** - Contribution guidelines
- **LICENSE** - MIT license

### UI/UX Guidelines
- Follow platform-specific design guidelines (Material Design for Android, Human Interface Guidelines for iOS)
- Ensure intuitive navigation
- Use consistent spacing and typography
- Implement proper feedback for user actions
- Make water logging as frictionless as possible
- Sprite should be visually appealing and engaging
- Use blue theme (#2196F3) for consistency
- Clean, minimalist design approach

### Configuration Files
- **\`.android-device-ip\`** - Your actual device IP (excluded from Git)
- **\`.android-device-ip.example\`** - Template for device IP setup
- **\`android/gradle.properties\`** - Release signing configuration (excluded from Git)
- **\`privacy-policy.html\`** - Privacy policy for app stores
- **\`package.json\`** - Project dependencies and scripts
- **\`tsconfig.json\`** - TypeScript configuration
- **\`babel.config.js\`** - Babel configuration
- **\`metro.config.js\`** - Metro bundler configuration
- **\`jest.config.js\`** - Jest testing configuration

### Development Workflow
1. **Start Development**: \`./test-app\` for quick testing
2. **Make Changes**: Edit code with hot reload
3. **Debug Issues**: Use \`./debug-logs.sh\` for real-time logs
4. **Test Thoroughly**: Test on physical devices
5. **Commit Changes**: Follow Git workflow guidelines
6. **Release**: Use \`./release-android.sh\` for production builds

### Privacy & Store Compliance
- **Privacy Policy**: Complete privacy policy included
- **Data Safety**: No data collection or sharing
- **Content Rating**: Suitable for all ages
- **Permissions**: Minimal permissions (only INTERNET for React Native framework)
- **Store Assets**: Privacy-focused descriptions and screenshots

### Error Handling
- Implement proper try-catch blocks for async operations
- Handle AsyncStorage errors gracefully
- Provide user-friendly error messages
- Log errors appropriately for debugging
- Never crash the app due to data issues

### Accessibility
- Add accessibility labels to all interactive elements
- Ensure proper color contrast
- Support screen readers
- Test with TalkBack (Android) and VoiceOver (iOS)
- Follow accessibility guidelines

### Performance Monitoring
- Monitor app startup time
- Track memory usage
- Optimize bundle size
- Profile React Native performance
- Test on lower-end devices

### Security Practices
- Never hardcode sensitive information
- Use secure storage practices
- Validate all user inputs
- Follow React Native security guidelines
- Keep dependencies updated for security patches

### Build & Release
- **Debug Build**: For development and testing
- **Release Build**: For production deployment
- **Keystore**: Secure production signing
- **Bundle Format**: Use AAB for Play Store
- **Version Management**: Semantic versioning ($package_version)
- **Testing**: Thorough testing before release

### Environment Setup
- Node.js 16+ required
- React Native CLI installed
- Android Studio for Android development
- Xcode for iOS development (macOS only)
- ADB for wireless debugging
- Git for version control

### Troubleshooting Resources
- **Debug Guide**: DEBUGGING_GUIDE.md
- **Device Pairing**: DEVICE_PAIRING_GUIDE.md
- **Wireless Setup**: WIRELESS_SETUP_USAGE.md
- **Release Issues**: GOOGLE_PLAY_RELEASE_GUIDE.md
- **Scripts Help**: Run scripts with \`help\` parameter

### Current App State
- **Version**: $package_version
- **Platform**: Android (iOS support ready)
- **Architecture**: Single-screen water tracking
- **Features**: Sprite character, water logging, daily goals
- **Storage**: AsyncStorage for local data
- **Security**: Privacy-first, no data collection
- **Development**: Wireless Android setup complete
- **Release**: Production build scripts ready

### Future Enhancements
- Home screen widget
- Weekly/monthly statistics
- Multiple sprite characters
- Custom water goals
- Export functionality
- Dark mode support
- Additional animations

Remember: This is a privacy-focused, offline-first app. All development should prioritize user privacy and data security.

---
*This file was automatically updated on $last_updated*
EOF
}

# Main execution
main() {
    print_info "Updating .cursorrules with current project state..."
    
    # Check if we're in a React Native project
    if [ ! -f "package.json" ]; then
        print_warning "No package.json found. Make sure you're in the project root."
        exit 1
    fi
    
    # Update .cursorrules
    update_cursorrules
    
    print_success ".cursorrules updated successfully!"
    print_info "File includes current project statistics and dependencies"
}

# Run main function
main "$@" 