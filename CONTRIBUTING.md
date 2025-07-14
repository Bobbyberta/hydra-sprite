# 🤝 Contributing to Hydra Sprite

Thank you for your interest in contributing to Hydra Sprite! We're excited to have you join our community of developers working to create a privacy-first, offline water tracking app that makes hydration fun and engaging.

## 🌟 How to Contribute

We welcome contributions of all kinds:
- 🐛 **Bug reports** and fixes
- ✨ **Feature requests** and implementations
- 📚 **Documentation** improvements
- 🧪 **Testing** and quality assurance
- 🎨 **UI/UX** enhancements
- 📱 **Platform-specific** optimizations

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **React Native CLI** (`npm install -g react-native-cli`)
- **Android Studio** or command-line tools (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Git** for version control

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/hydra-sprite.git
   cd hydra-sprite
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up Android wireless development** (optional but recommended):
   ```bash
   cp .android-device-ip.example .android-device-ip
   # Edit .android-device-ip with your device IP (see Device Pairing Guide)
   ```

5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running the App

#### Android Development
```bash
# Quick wireless deployment (recommended)
./test-app

# Traditional USB development
npm run android

# Debug logs
./debug-logs.sh
```

#### iOS Development
```bash
# Run on iOS simulator or device
npm run ios
```

### Development Scripts

We provide several helpful scripts for development:

- **`./test-app`** - One-command Android deployment
- **`./debug-logs.sh`** - Real-time log monitoring
- **`./setup-android-wireless.sh`** - Complete wireless development setup
- **`./release-android.sh`** - Production build automation
- **`./update-cursorrules.sh`** - Documentation updates

## 📋 Development Guidelines

### Code Standards

#### TypeScript & JavaScript
- **Use TypeScript** for all new code
- **Follow strict TypeScript** rules and fix all warnings
- **Use meaningful** variable and function names
- **Prefer `const`** over `let`, avoid `var`
- **Add proper JSDoc comments** for functions and components

#### React Native Best Practices
- **Use functional components** with hooks
- **Implement proper error boundaries**
- **Follow React Native performance** guidelines
- **Use platform-specific code** when necessary (`Platform.OS`)
- **Optimize for offline functionality**

#### Code Organization
- **Components**: Reusable UI components in `/src/components/`
- **Screens**: Screen components in `/src/screens/`
- **Services**: Business logic and data management in `/src/services/`
- **Utils**: Helper functions in `/src/utils/`
- **Types**: TypeScript definitions in `/src/types/`
- **Store**: State management utilities in `/src/store/`

### File Structure Guidelines

```
hydra-sprite/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button/         # Component with test files
│   │   ├── WaterLogger/    # Feature-specific components
│   │   └── SpriteDisplay/  # Sprite-related components
│   ├── screens/           # Screen components
│   │   ├── HomeScreen/    # Main application screen
│   │   └── StatsScreen/   # Statistics and history
│   ├── services/          # Business logic
│   │   ├── WaterService/  # Water tracking logic
│   │   └── StorageService/ # Local storage management
│   ├── utils/             # Helper functions
│   │   ├── dateUtils/     # Date manipulation
│   │   └── spriteUtils/   # Sprite state calculations
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Exported types
│   ├── assets/            # Static assets
│   │   ├── images/        # Image assets
│   │   └── fonts/         # Font files
│   └── store/             # State management
│       └── AsyncStorage/  # Local storage utilities
```

### Mobile-Specific Guidelines

#### Offline-First Development
- **Always consider offline functionality** first
- **Use AsyncStorage** for all local data persistence
- **Implement proper error handling** for storage operations
- **Test offline scenarios** thoroughly

#### Performance Optimization
- **Use FlatList** for large lists
- **Optimize images** and assets
- **Implement proper loading states**
- **Use React.memo** and useCallback for performance
- **Test on lower-end devices**

#### Platform Considerations
- **Test on both Android and iOS**
- **Use platform-specific designs** when appropriate
- **Consider different screen sizes** and orientations
- **Implement proper accessibility** features

### Water Tracking Features

#### Sprite Character System
- **Maintain 5 sprite states**: dehydrated (😵), concerned (😟), okay (😐), happy (😊), thriving (🌟)
- **Implement smooth transitions** between states
- **Provide visual feedback** for water logging
- **Use React Native animations** for smooth experiences

#### Data Management
- **Store all data locally** using AsyncStorage
- **Implement proper error handling** for storage operations
- **Support different container sizes** and measurements
- **Maintain daily goal tracking** (default: 8 glasses)
- **Provide reset functionality** for daily/manual resets

### Security & Privacy Guidelines

#### Privacy-First Design
- **Store all data locally** (offline-first)
- **No data collection** beyond water intake
- **No analytics** or tracking
- **No user accounts** or registration
- **All data stays on device**

#### Development Security
- **Never commit sensitive information** (IP addresses, passwords, keystores)
- **Use `.android-device-ip`** for local development (excluded from Git)
- **Follow secure coding practices**
- **Keep dependencies updated** for security patches

## 🧪 Testing Guidelines

### Unit Testing
- **Write tests** for utility functions and services
- **Test edge cases** and error conditions
- **Mock external dependencies** properly
- **Maintain high test coverage**

### Integration Testing
- **Test complete user flows**
- **Test offline functionality**
- **Test data persistence**
- **Test sprite state transitions**

### Manual Testing
- **Test on physical devices** (both Android and iOS)
- **Test different data states** (empty, partial, full)
- **Test edge cases** (app backgrounding, device rotation)
- **Test wireless development setup**
- **Test release builds** before publishing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 UI/UX Guidelines

### Design Principles
- **Follow platform guidelines** (Material Design for Android, Human Interface Guidelines for iOS)
- **Ensure intuitive navigation**
- **Use consistent spacing** and typography
- **Implement proper feedback** for user actions
- **Make water logging frictionless**

### Accessibility
- **Add accessibility labels** to all interactive elements
- **Ensure proper color contrast**
- **Support screen readers** (TalkBack, VoiceOver)
- **Test with accessibility tools**
- **Follow WCAG guidelines**

### Visual Design
- **Use blue theme** (#2196F3) for consistency
- **Clean, minimalist design** approach
- **Sprite should be central** and engaging
- **Consistent iconography** throughout the app

## 📝 Documentation

### Code Documentation
- **Add JSDoc comments** for all functions and components
- **Document complex logic** with inline comments
- **Update TypeScript types** as needed
- **Keep comments up-to-date** with code changes

### Project Documentation
- **Update relevant markdown files** when making changes
- **Include screenshots** for UI changes
- **Document new features** and changes
- **Update setup guides** if development process changes

## 🔄 Git Workflow

### Branch Strategy
- **Main branch**: Production-ready code
- **Feature branches**: New features and bug fixes
- **Release branches**: Preparation for releases

### Commit Guidelines
- **Use descriptive commit messages**
- **Keep commits atomic** and focused
- **Reference issues** when applicable
- **Use conventional commit format**:
  ```
  feat: add sprite animation system
  fix: resolve AsyncStorage crash on Android
  docs: update wireless setup guide
  test: add water logging service tests
  ```

### Pull Request Process
1. **Create a feature branch** from main
2. **Make your changes** and test thoroughly
3. **Update documentation** as needed
4. **Write descriptive PR description**
5. **Include screenshots** for UI changes
6. **Reference related issues**
7. **Ensure all tests pass**
8. **Request review** from maintainers

## 🐛 Bug Reports

### Before Reporting
- **Check existing issues** to avoid duplicates
- **Review our documentation** for solutions
- **Test on multiple devices** if possible

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Device Information**
- Device: [e.g., Samsung Galaxy S21]
- OS Version: [e.g., Android 13]
- App Version: [e.g., 1.0.0]

**Additional Context**
Screenshots, logs, or other relevant information.
```

## 💡 Feature Requests

### Feature Request Guidelines
- **Check existing requests** first
- **Provide clear use case** and benefits
- **Consider privacy implications**
- **Align with app's offline-first philosophy**
- **Include mockups** or examples if helpful

### Feature Request Template
```markdown
**Feature Description**
Clear description of the requested feature.

**Use Case**
Why this feature would be valuable.

**Proposed Implementation**
How you envision it working.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

## 📚 Learning Resources

### React Native
- [React Native Documentation](https://reactnative.dev/)
- [React Native Best Practices](https://github.com/react-native-community/best-practices)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)

### Mobile Development
- [Android Developer Guide](https://developer.android.com/guide)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Our Documentation
- [Android Development Guide](ANDROID_DEVELOPMENT_GUIDE.md)
- [Device Pairing Guide](DEVICE_PAIRING_GUIDE.md)
- [Easy Testing Guide](EASY_TESTING.md)
- [Debugging Guide](DEBUGGING_GUIDE.md)

## 🎉 Recognition

We value all contributions and will recognize contributors in:
- **Release notes** for significant contributions
- **README acknowledgments** for ongoing contributors
- **Special mentions** for exceptional contributions

## 💬 Questions & Support

### Getting Help
- **Check our documentation** first
- **Search existing issues** and discussions
- **Join our community** discussions
- **Ask questions** in issues or discussions

### Community Guidelines
- **Be respectful** and constructive
- **Help others** when you can
- **Follow our code of conduct**
- **Keep discussions relevant**

---

**Thank you for contributing to Hydra Sprite!** 

Together, we're building a privacy-first app that makes hydration fun and engaging. Every contribution, no matter how small, helps create a better experience for users worldwide.

*Stay hydrated and happy coding! 💧❤️* 