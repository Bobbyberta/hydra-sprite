# 💧 Hydra Sprite

An offline water tracking mobile app where you log your water intake to keep a virtual sprite alive and healthy! Available for Android and iOS.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.73-61dafb.svg)

## 🌟 Features

- **Virtual Sprite Companion**: Your water intake directly affects your sprite's health and happiness
- **Offline First**: Works completely offline - no internet required
- **Easy Water Logging**: Quick and intuitive interface to log water intake
- **Home Screen Widget**: Add your sprite to your home screen for quick access
- **Multiple Container Sizes**: Support for different glass/bottle sizes
- **Daily Statistics**: Track your hydration progress over time
- **Sprite Animations**: Watch your sprite react to your hydration habits
- **Cross Platform**: Works on both Android and iOS

## 📱 Screenshots

*Screenshots will be added as the app develops*

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
```bash
git clone https://github.com/bobyberta/hydra-sprite.git
cd hydra-sprite
```

2. Install dependencies
```bash
npm install
```

3. For iOS, install pods
```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler
```bash
npm start
```

5. Run on your platform
```bash
# Android
npm run android

# iOS
npm run ios
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sprite/         # Sprite character components
│   ├── WaterLogger/    # Water logging interface
│   └── Common/         # Common UI components
├── screens/            # App screens
│   ├── HomeScreen/     # Main screen with sprite
│   ├── StatsScreen/    # Water intake statistics
│   └── SettingsScreen/ # App settings
├── services/           # Business logic
│   ├── WaterTracker/   # Water intake management
│   ├── SpriteEngine/   # Sprite health calculations
│   └── Storage/        # Local data persistence
├── utils/              # Helper functions
├── types/              # TypeScript definitions
└── assets/             # Images, fonts, etc.
```

## 🎮 How It Works

1. **Log Water**: Tap the water logging interface to record your intake
2. **Watch Your Sprite**: Your sprite's health changes based on your hydration
3. **Stay Motivated**: Keep your sprite happy by maintaining good hydration habits
4. **Track Progress**: View your daily, weekly, and monthly water intake statistics

### Sprite Health States

- 🌟 **Thriving**: Excellent hydration (8+ glasses/day)
- 😊 **Happy**: Good hydration (6-7 glasses/day)
- 😐 **Okay**: Adequate hydration (4-5 glasses/day)
- 😟 **Concerned**: Low hydration (2-3 glasses/day)
- 😵 **Dehydrated**: Very low hydration (0-1 glasses/day)

## 🛠️ Development

### Tech Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe JavaScript
- **AsyncStorage**: Local data persistence
- **React Navigation**: App navigation
- **React Native Reanimated**: Smooth animations
- **React Native SVG**: Vector graphics for sprites

### Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the `.cursorrules` file for coding standards
- Write tests for new features
- Ensure offline functionality works
- Test on both Android and iOS
- Keep the sprite interactions engaging and responsive

## 📦 Building for Release

### Android

```bash
npm run build:android
```

The APK will be generated in `android/app/build/outputs/apk/release/`

### iOS

```bash
npm run build:ios
```

## 🔒 Privacy

Hydra Sprite is designed with privacy in mind:

- All data is stored locally on your device
- No personal information is collected or transmitted
- Works completely offline
- No analytics or tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- Create an [issue](https://github.com/bobyberta/hydra-sprite/issues) for bug reports
- Start a [discussion](https://github.com/bobbyberta/hydra-sprite/discussions) for feature requests

## 🙏 Acknowledgments

- Thanks to all contributors who help make Hydra Sprite better
- Inspired by the Tamagotchi and other virtual pet games
- Built with love for the health and wellness community

## 🗺️ Roadmap

- [ ] iOS home screen widget support
- [ ] Additional sprite characters
- [ ] Water intake reminders
- [ ] Integration with health apps
- [ ] Multi-language support
- [ ] Achievements and badges
- [ ] Social features (optional, privacy-first)

---

**Made with 💧 and ❤️ for better hydration habits** 