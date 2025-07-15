# 🚀 Google Play Store Release Guide

## Overview
This guide walks you through preparing Hydra Sprite for Google Play Store release, from code signing to store listing.

## Pre-Release Checklist

### ✅ **Technical Requirements**
- [x] Production signing keystore created
- [x] App bundle (AAB) generated
- [x] Release build tested thoroughly
- [ ] Performance optimized
- [ ] Permissions minimized
- [x] Privacy policy created
- [x] App icon and assets ready

### ✅ **Google Play Console Setup**
- [x] Developer account created ($25 one-time fee)
- [x] App listing created
- [x] Store assets uploaded
- [x] Content rating completed
- [x] Data safety form filled
- [x] Target audience selected

## Step 1: Generate Production Signing Key

### Create Release Keystore
```bash
# Navigate to android/app directory
cd android/app

# Generate keystore (replace with your details)
keytool -genkey -v -keystore hydra-sprite-release.keystore -alias hydra-sprite -keyalg RSA -keysize 2048 -validity 10000

# You'll be prompted for:
# - Keystore password (SAVE THIS!)
# - Key password (SAVE THIS!)
# - Your name and organization details
```

### Configure Secure Properties
The project uses a secure properties file to keep passwords out of Git. Set up your signing configuration:

```bash
# Run the setup script
./setup-secure-properties.sh

# Edit the secure properties file with your actual passwords
nano android/gradle.properties.secure
```

The `android/gradle.properties.secure` file should contain:
```properties
# Release signing configuration - REPLACE WITH YOUR ACTUAL VALUES
MYAPP_RELEASE_STORE_FILE=hydra-sprite-release.keystore
MYAPP_RELEASE_KEY_ALIAS=hydra-sprite
MYAPP_RELEASE_STORE_PASSWORD=your_actual_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_actual_key_password
```

**Important**: 
- The `gradle.properties.secure` file is excluded from Git
- Never commit your actual passwords to version control
- Keep a secure backup of your keystore and passwords

### Automatic Configuration
The build system automatically loads secure properties from `android/gradle.properties.secure`. The main `gradle.properties` file contains no sensitive information and is safe to commit to Git.

### Update build.gradle
The `android/app/build.gradle` file is already configured to use secure properties. The signing configuration automatically loads from `android/gradle.properties.secure`:

```gradle
// Load secure properties if the file exists
def securePropertiesFile = rootProject.file("gradle.properties.secure")
def secureProperties = new Properties()
if (securePropertiesFile.exists()) {
    secureProperties.load(new FileInputStream(securePropertiesFile))
}

android {
    ...
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (secureProperties.containsKey('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(secureProperties['MYAPP_RELEASE_STORE_FILE'])
                storePassword secureProperties['MYAPP_RELEASE_STORE_PASSWORD']
                keyAlias secureProperties['MYAPP_RELEASE_KEY_ALIAS']
                keyPassword secureProperties['MYAPP_RELEASE_KEY_PASSWORD']
            }
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

**No manual configuration needed** - the build system automatically handles secure properties loading.

## Step 2: Update App Information

### Version Management
Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.hydrasprite"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 1        // Increment for each release
    versionName "1.0.0"  // Semantic versioning
}
```

### App Name and Icon
1. **App Name**: Already set to "Hydra Sprite" in `strings.xml`
2. **App Icon**: Create app icons for different densities
3. **Launcher Icon**: Ensure `ic_launcher.png` is production-ready

## Step 3: Generate Release Build

### Build App Bundle (AAB)
```bash
# Use the automated release script (recommended)
./release-android.sh aab

# Or manually:
cd android && ./gradlew bundleRelease && cd ..
```

### Alternative: Build APK
```bash
# Use the automated release script
./release-android.sh apk

# Or manually:
cd android && ./gradlew assembleRelease && cd ..
```

### Full Release Build
```bash
# Build both AAB and APK with full automation
./release-android.sh all
```

The release script automatically:
- Checks for secure properties configuration
- Verifies keystore exists
- Cleans previous builds
- Generates both AAB and APK
- Shows build summary

**Build artifacts will be at:**
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

## Step 4: Test Release Build

### Install and Test
```bash
# Use the automated test script
./release-android.sh test

# Or manually install APK on device
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Test Thoroughly
- [ ] All app functionality works
- [ ] Performance is acceptable
- [ ] Offline capabilities work
- [ ] Different screen sizes display correctly
- [ ] App lifecycle (background/foreground) works
- [ ] No crashes or errors
- [ ] Sprite animations work properly
- [ ] Water logging functions correctly

## Step 5: Create Google Play Console Account

### Developer Account Setup
1. Go to [Google Play Console](https://play.google.com/console)
2. Pay $25 one-time registration fee
3. Complete identity verification
4. Accept agreements

### Create App Listing
1. Click "Create app"
2. Fill in basic details:
   - **App name**: Hydra Sprite
   - **Default language**: English (US)
   - **App or game**: App
   - **Free or paid**: Free

## Step 6: Complete Store Listing

### App Details
- **Short description** (80 chars):
  "Track water intake with your virtual hydration buddy sprite"

- **Full description** (4000 chars):
  ```
  💧 Hydra Sprite - Your Personal Hydration Companion
  
  Keep yourself hydrated with the help of your virtual sprite character! Hydra Sprite is a simple, offline water tracking app that makes staying hydrated fun and engaging.
  
  🌟 KEY FEATURES:
  • Virtual sprite character that reacts to your hydration level
  • Simple one-tap water logging (+1 or +2 glasses)
  • Daily goal tracking (8 glasses recommended)
  • Offline functionality - no internet required
  • Clean, minimalist design
  • No ads, no tracking, no data collection
  
  🧚 YOUR HYDRATION BUDDY:
  Watch your sprite's mood change based on your water intake:
  • 😵 Dehydrated (0-1 glasses)
  • 😟 Concerned (2-3 glasses)
  • 😐 Okay (4-5 glasses)
  • 😊 Happy (6-7 glasses)
  • 🌟 Thriving (8+ glasses)
  
  🔒 PRIVACY FOCUSED:
  • All data stored locally on your device
  • No user accounts or registration required
  • No internet connection needed
  • No personal data collected
  
  Perfect for anyone looking to improve their hydration habits with a fun, gamified approach!
  ```

### Store Assets Required
1. **App Icon**: 512x512 PNG
2. **Feature Graphic**: 1024x500 PNG
3. **Screenshots**: 
   - Phone: 2-8 screenshots (16:9 or 9:16)
   - Tablet: 1-8 screenshots (optional)
4. **Privacy Policy**: Required URL

## Step 7: Privacy Policy

### Create Privacy Policy
Since your app is privacy-focused, create a simple privacy policy:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hydra Sprite Privacy Policy</title>
</head>
<body>
    <h1>Privacy Policy for Hydra Sprite</h1>
    <p><strong>Last updated:</strong> [Date]</p>
    
    <h2>Data Collection</h2>
    <p>Hydra Sprite does not collect, store, or transmit any personal data. All water intake data is stored locally on your device and never leaves your device.</p>
    
    <h2>Data Storage</h2>
    <p>The app stores your water intake logs locally using your device's storage. This data is only accessible by the app and is not shared with any third parties.</p>
    
    <h2>Internet Connection</h2>
    <p>While the app requests internet permission for React Native framework requirements, it operates entirely offline and does not make any network requests.</p>
    
    <h2>Contact</h2>
    <p>For questions about this privacy policy, contact: [your-email@example.com]</p>
</body>
</html>
```

Host this on GitHub Pages or your website.

## Step 8: App Content Rating

### Content Rating Questionnaire
1. In Play Console, go to "Content rating"
2. Complete questionnaire:
   - **Category**: Utility
   - **Content**: No inappropriate content
   - **Rating**: Everyone

## Step 9: Data Safety

### Data Safety Form
Fill out the Data Safety section:
- **Data collection**: No data collected
- **Data sharing**: No data shared
- **Data security**: All data stored locally
- **Data deletion**: Users can reset app data

## Step 10: Target Audience

### Age and Country Targeting
1. **Target age**: 13+ (or Everyone)
2. **Countries**: Select your target countries
3. **Device categories**: Phone and Tablet

## Step 11: Upload and Review

### Upload App Bundle
1. Go to "Release" > "Production"
2. Click "Create new release"
3. Upload your AAB file
4. Add release notes:
   ```
   🌟 Initial Release - Version 1.0.0
   • Virtual sprite hydration companion
   • Simple water intake tracking
   • Daily goal monitoring
   • Offline functionality
   • Privacy-focused design
   ```

### Pre-launch Report
- Google will test your app automatically
- Review any issues found
- Fix critical issues before publishing

## Step 12: Publish

### Release Types
1. **Internal Testing**: Test with your team
2. **Closed Testing**: Test with limited users
3. **Open Testing**: Public beta testing
4. **Production**: Full release

### Gradual Rollout
- Start with 5% of users
- Monitor for crashes/issues
- Increase to 10%, 50%, 100%

## Post-Release Checklist

### ✅ **After Publishing**
- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Track download metrics
- [ ] Plan feature updates
- [ ] Maintain app store listing

### ✅ **Updates**
- [ ] Increment `versionCode` for each update
- [ ] Update `versionName` semantically
- [ ] Test thoroughly before releasing
- [ ] Write clear release notes

## Important Security Notes

### 🔒 **Keep Secure**
- **Never commit keystore**: Add to `.gitignore`
- **Backup keystore**: Store in multiple secure locations
- **Password security**: Use strong, unique passwords
- **Gradle properties**: Add to `.gitignore`

### 🚨 **Critical Files to Protect**
```bash
# Add to .gitignore
android/app/hydra-sprite-release.keystore
android/gradle.properties
release-passwords.txt
```

## Estimated Timeline

- **Initial Setup**: 1-2 hours
- **Store Listing**: 2-3 hours
- **Testing**: 1-2 days
- **Review Process**: 1-3 days
- **Total Time**: 1 week

## Resources

### Useful Links
- [Google Play Console](https://play.google.com/console)
- [React Native Signed APK](https://reactnative.dev/docs/signed-apk-android)
- [Play Store Policies](https://play.google.com/about/developer-policy/)
- [App Bundle Guide](https://developer.android.com/guide/app-bundle)

### Support
- [Play Console Help](https://support.google.com/googleplay/android-developer/)
- [React Native Community](https://reactnative.dev/community/support)

---

**Ready to share Hydra Sprite with the world! 🌟📱** 