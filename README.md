# 💧 Hydra Sprite - React Native Water Tracking App

An offline water tracking mobile app where you log your water intake to keep a virtual sprite character alive and healthy. Built with React Native for Android and iOS platforms.

## ✨ Features

- **🧚 Virtual Sprite Character**: Your hydration buddy with different emotional states
- **💧 Simple Water Logging**: Quick +1 and +2 glass buttons
- **📊 Daily Progress**: Track against your 8-glass daily goal
- **💾 Offline Storage**: All data stored locally on your device
- **📱 Cross-Platform**: Works on Android and iOS
- **🏃 Fast Development**: Wireless Android development setup

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/hydra-sprite.git
cd hydra-sprite

# Install dependencies
npm install

# Set up your device IP (Android wireless development)
cp .android-device-ip.example .android-device-ip
# Edit .android-device-ip with your actual device IP (see setup guide)

# Quick test on Android
./test-app
```

## 📱 Android Wireless Development Setup

For the best development experience, set up wireless Android development:

### 1. Device IP Configuration
```bash
# Copy the template
cp .android-device-ip.example .android-device-ip

# Edit with your actual device IP
# Example: 100.100.1.100:10000
```

**Important**: The `.android-device-ip` file contains your actual device IP and is automatically excluded from Git for security.

### 2. One-Command Testing
```bash
# Test app on your device
./test-app

# Debug logs
./debug-logs.sh
```

### 3. Full Setup Guide
See our comprehensive guides:
- [**Easy Testing Guide**](EASY_TESTING.md) - One-command deployment
- [**Device Pairing Guide**](DEVICE_PAIRING_GUIDE.md) - Step-by-step wireless setup
- [**Android Development Guide**](ANDROID_DEVELOPMENT_GUIDE.md) - Complete development workflow

## 🎮 How to Play

1. **Meet Your Sprite**: Your hydration companion starts in a neutral state
2. **Log Your Water**: Tap +1 Glass or +2 Glasses when you drink water
3. **Watch Your Sprite**: See your sprite's mood change based on hydration:
   - 😵 Dehydrated (0-1 glasses)
   - 😟 Concerned (2-3 glasses)  
   - 😐 Okay (4-5 glasses)
   - 😊 Happy (6-7 glasses)
   - 🌟 Thriving (8+ glasses)
4. **Daily Goal**: Aim for 8 glasses of water per day
5. **Reset**: Start fresh each day or reset manually

## 🛠️ Development

### Running the App

#### Android
```bash
# Wireless development (recommended)
./test-app

# Or traditional USB development
npm run android
```

#### iOS
```bash
npm run ios
```

### Development Scripts
```bash
# Start Metro bundler
npm start

# Run tests
npm test

# Debug logs (Android)
./debug-logs.sh

# Android setup
./setup-android-wireless.sh
```

### Project Structure
```
hydra-sprite/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── types/          # TypeScript definitions
├── android/            # Android-specific code
├── ios/                # iOS-specific code
└── docs/               # Documentation
```

## 📁 Key Files

### Configuration
- `.android-device-ip` - Your device IP (not in Git)
- `.android-device-ip.example` - Template for device IP setup
- `package.json` - Project dependencies and scripts

### Scripts
- `./test-app` - One-command app deployment
- `./debug-logs.sh` - Debug log viewer
- `./setup-android-wireless.sh` - Android wireless setup

### Documentation
- `EASY_TESTING.md` - Quick testing guide
- `DEVICE_PAIRING_GUIDE.md` - Device pairing instructions
- `ANDROID_DEVELOPMENT_GUIDE.md` - Complete workflow
- `DEBUGGING_GUIDE.md` - Troubleshooting help
- `SECURITY_REVIEW.md` - Security considerations

## 🔒 Security & Privacy

### Privacy-First Design
- **No Data Collection**: App doesn't collect personal information
- **Offline Only**: All data stored locally on your device
- **No Analytics**: No tracking or analytics
- **No Accounts**: No user registration or login required

### Development Security
- **IP Address Privacy**: Device IPs stored in local files excluded from Git
- **No Hardcoded Secrets**: No API keys or sensitive data in source code
- **Standard Practices**: Follows React Native security best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Test on both Android and iOS
- Consider offline functionality

## 📚 Documentation

- [**Easy Testing**](EASY_TESTING.md) - One-command deployment
- [**Device Pairing**](DEVICE_PAIRING_GUIDE.md) - Wireless setup
- [**Android Development**](ANDROID_DEVELOPMENT_GUIDE.md) - Complete workflow
- [**Debugging**](DEBUGGING_GUIDE.md) - Troubleshooting help
- [**Security Review**](SECURITY_REVIEW.md) - Security practices

## 🐛 Troubleshooting

### Common Issues
- **App crashes on startup**: Check [Debugging Guide](DEBUGGING_GUIDE.md)
- **Device connection fails**: See [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)
- **Build errors**: Check [Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md)

### Getting Help
1. Check our [Debugging Guide](DEBUGGING_GUIDE.md)
2. Review [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)
3. Search existing issues
4. Create a new issue with:
   - Device/OS information
   - Steps to reproduce
   - Error messages
   - Debug logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- React Native team for the amazing framework
- Android team for wireless debugging capabilities
- The open source community for inspiration and tools

---

**Stay hydrated and keep your sprite happy! 💧🧚‍♀️** 