# 💧 Hydra Sprite - React Native Water Tracking App

<div align="center">

**Keep your virtual sprite alive by staying hydrated!**

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://typescriptlang.org/)
[![Android](https://img.shields.io/badge/Android-11%2B-green.svg)](https://developer.android.com/)
[![iOS](https://img.shields.io/badge/iOS-13%2B-blue.svg)](https://developer.apple.com/ios/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## 🎯 Overview

Hydra Sprite is a privacy-first, offline water tracking mobile app built with React Native. Your hydration journey becomes a fun experience as you care for a virtual sprite character whose health depends on your water intake. The app runs entirely offline, storing all data locally on your device for maximum privacy.

## ✨ Features

### 🧚 **Virtual Sprite Companion**
- **5 Dynamic Health States**: From dehydrated (😵) to thriving (🌟)
- **Responsive Character**: Sprite reacts to your hydration level in real-time
- **Smooth Animations**: Beautiful transitions between emotional states
- **Motivational Feedback**: Encouraging messages based on your progress

### 💧 **Simple Water Logging**
- **Quick Actions**: One-tap +1 Glass and +2 Glasses buttons
- **Instant Feedback**: Immediate sprite reaction to water intake
- **Daily Goal Tracking**: Default 8-glass target with progress visualization
- **Manual Reset**: Start fresh anytime or reset for new day

### 🏆 **Progress Tracking**
- **Daily Statistics**: Monitor your hydration progress throughout the day
- **Goal Achievement**: Visual indicators when you reach your daily target
- **Streak Tracking**: Keep your sprite happy day after day
- **Historical Data**: Review past hydration patterns (coming soon)

### 🔒 **Privacy & Security**
- **100% Offline**: No internet connection required
- **Local Storage**: All data stays on your device using AsyncStorage
- **No Tracking**: Zero analytics, telemetry, or data collection
- **No Accounts**: No registration, login, or personal information required

### 📱 **Cross-Platform**
- **Android Support**: Optimized for Android 11+ devices
- **iOS Ready**: Full iOS 13+ compatibility (coming soon)
- **Responsive Design**: Works on phones and tablets
- **Platform-Specific**: Native look and feel on each platform

### 🚀 **Developer Experience**
- **Wireless Development**: Advanced Android wireless debugging setup
- **One-Command Testing**: Deploy to device with `./test-app`
- **Comprehensive Scripts**: Automated build, debug, and release workflows
- **Security-First**: IP address privacy and secure development practices

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+ recommended)
- **React Native CLI** (`npm install -g react-native-cli`)
- **Android Studio** or command-line tools (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation
```bash
# Clone the repository
git clone https://github.com/bobbyberta/hydra-sprite.git
cd hydra-sprite

# Install dependencies
npm install

# Set up Android wireless development (optional but recommended)
cp .android-device-ip.example .android-device-ip
# Edit .android-device-ip with your device IP (see setup guides)
```

### Running the App

#### Android (Recommended: Wireless Development)
```bash
# One-command deployment (after wireless setup)
./test-app

# Or traditional USB development
npm run android
```

#### iOS
```bash
# Run on iOS simulator or device
npm run ios
```

### First-Time Android Setup
For the best development experience with wireless debugging:

1. **Follow our setup guide**: [Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md)
2. **Pair your device**: [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)
3. **Start testing**: [Easy Testing Guide](EASY_TESTING.md)

## 🎮 How to Use

### Getting Started
1. **Launch the app** and meet your sprite companion
2. **Set your daily goal** (default: 8 glasses of water)
3. **Log water intake** using the +1 Glass or +2 Glasses buttons
4. **Watch your sprite's mood** change as you stay hydrated

### Understanding Your Sprite
Your sprite's health reflects your hydration level:
- **😵 Dehydrated** (0-1 glasses): Sprite needs water urgently
- **😟 Concerned** (2-3 glasses): Sprite is worried about hydration
- **😐 Okay** (4-5 glasses): Sprite is doing alright
- **😊 Happy** (6-7 glasses): Sprite is pleased with your progress
- **🌟 Thriving** (8+ glasses): Sprite is absolutely glowing with health!

### Daily Routine
1. **Start your day** with the sprite in neutral state
2. **Log water** throughout the day as you drink
3. **Watch progress** toward your daily goal
4. **Keep your sprite happy** by staying consistently hydrated
5. **Reset for new day** when ready to start fresh

## 🛠️ Development

### Project Structure
```
hydra-sprite/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components and navigation
│   ├── services/          # Business logic and data management
│   ├── utils/             # Helper functions and utilities
│   ├── types/             # TypeScript type definitions
│   ├── assets/            # Images, fonts, and static assets
│   └── store/             # State management utilities
├── android/               # Android-specific code and build files
├── ios/                   # iOS-specific code and build files
├── scripts/               # Development and build automation
└── docs/                  # Documentation and guides
```

### Development Commands
```bash
# Start Metro bundler
npm start

# Run tests
npm test

# Build for production
npm run build

# Android development
./test-app              # Quick wireless deployment
./debug-logs.sh         # Real-time debugging
./setup-android-wireless.sh  # Complete wireless setup

# iOS development
npm run ios
```

### Available Scripts
- **`./test-app`** - One-command Android deployment
- **`./debug-logs.sh`** - Real-time log monitoring
- **`./setup-android-wireless.sh`** - Complete wireless development setup
- **`./release-android.sh`** - Production build automation
- **`./update-cursorrules.sh`** - Documentation updates

## 📚 Documentation

### Development Guides
- **[Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md)** - Complete Android workflow
- **[Easy Testing Guide](EASY_TESTING.md)** - One-command deployment
- **[Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)** - Wireless debugging setup
- **[Wireless Setup Usage](WIRELESS_SETUP_USAGE.md)** - Detailed wireless configuration

### Troubleshooting & Support
- **[Debugging Guide](DEBUGGING_GUIDE.md)** - Troubleshooting common issues
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project

### Release & Distribution
- **[Google Play Release Guide](GOOGLE_PLAY_RELEASE_GUIDE.md)** - Complete store release process

## 🔒 Privacy & Security

### Privacy-First Design
- **No Data Collection**: App never collects personal information
- **Offline Only**: All functionality works without internet
- **Local Storage**: Data stored exclusively on your device
- **No Analytics**: Zero tracking, telemetry, or usage monitoring
- **No Accounts**: No registration, login, or cloud synchronization

### Security Features
- **Open Source**: Code is transparent and auditable
- **No Network Requests**: App makes no external connections
- **Secure Local Storage**: Uses platform-standard secure storage
- **No Permissions**: Minimal app permissions required

## 🔐 Secure Properties Setup

This project uses secure properties to keep sensitive information (like keystore passwords) out of Git. 

### Initial Setup
```bash
# Run the setup script to configure secure properties
./setup-secure-properties.sh

# Edit the secure properties file with your actual passwords
nano android/gradle.properties.secure
```

### What's Protected
- **Keystore passwords** - Stored in `android/gradle.properties.secure`
- **Release keystore** - Stored in `android/app/hydra-sprite-release.keystore`
- **Device IP** - Stored in `.android-device-ip`

### Security Files
- `android/gradle.properties.secure` - Contains actual passwords (excluded from Git)
- `android/gradle.properties.secure.example` - Template file (safe to commit)
- `.android-device-ip` - Your device's IP address (excluded from Git)
- `.android-device-ip.example` - Template for device IP (safe to commit)

### Build Process
The build system automatically:
1. Loads secure properties from `gradle.properties.secure`
2. Uses them for release signing
3. Falls back to project properties if secure file doesn't exist

**Never commit actual passwords to Git!** The secure files are already excluded in `.gitignore`. 

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Code style guidelines
- Development workflow
- Testing requirements
- Pull request process

### Quick Contributing Steps
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

## 🐛 Troubleshooting

### Common Issues & Solutions
- **App crashes on startup**: Check [Debugging Guide](DEBUGGING_GUIDE.md)
- **Device connection fails**: See [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)
- **Build errors**: Review [Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md)
- **Wireless debugging issues**: Check [Wireless Setup Usage](WIRELESS_SETUP_USAGE.md)

### Getting Help
1. **Check our documentation** (guides linked above)
2. **Review existing issues** on GitHub
3. **Create a new issue** with:
   - Device and OS information
   - Steps to reproduce the problem
   - Error messages and logs
   - Expected vs actual behavior

## 🎯 Roadmap

### Current Version (1.0.0)
- ✅ Basic water tracking functionality
- ✅ Virtual sprite with 5 emotional states
- ✅ Daily goal tracking
- ✅ Offline-first architecture
- ✅ Android wireless development setup

### Planned Features
- 🔮 **Enhanced Sprite System**: More animations and reactions
- 📊 **Advanced Statistics**: Weekly and monthly tracking
- 🎨 **Customization**: Multiple sprite characters and themes
- 🏆 **Achievement System**: Rewards for consistent hydration
- 🌙 **Dark Mode**: Optional dark theme support
- 📱 **Widget Support**: Home screen widget for quick logging

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **React Native Team** for the amazing cross-platform framework
- **Android Team** for wireless debugging capabilities
- **Open Source Community** for inspiration and tools
- **Hydration Enthusiasts** who keep their sprites happy! 💧

---

<div align="center">

**Stay hydrated and keep your sprite thriving! 💧🧚‍♀️**

*Made with ❤️ for healthier hydration habits*

</div> 