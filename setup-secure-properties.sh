#!/bin/bash

# Setup Secure Properties for Hydra Sprite
# This script helps you configure the secure gradle properties file

echo "🔐 Setting up secure properties for Hydra Sprite"
echo "================================================"

# Check if secure properties file already exists
if [ -f "android/gradle.properties.secure" ]; then
    echo "⚠️  Warning: android/gradle.properties.secure already exists!"
    echo "   This will overwrite the existing file."
    read -p "   Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Copy the example file
cp android/gradle.properties.secure.example android/gradle.properties.secure

echo "✅ Created android/gradle.properties.secure"
echo ""
echo "📝 Please edit android/gradle.properties.secure and replace the placeholder values:"
echo "   - YOUR_ACTUAL_STORE_PASSWORD_HERE"
echo "   - YOUR_ACTUAL_KEY_PASSWORD_HERE"
echo ""
echo "🔒 The file is already added to .gitignore and will not be committed to Git."
echo ""
echo "💡 You can use any text editor to modify the file:"
echo "   nano android/gradle.properties.secure"
echo "   vim android/gradle.properties.secure"
echo "   code android/gradle.properties.secure"
echo ""
echo "🚀 After editing, you can test the build with: ./test-app" 