#!/bin/bash

# Professional Cold Email CLI - Mac Build Script
# Sponsored by LeadMagic - https://leadmagic.io

set -e

echo "🍎 Building Professional Cold Email CLI for macOS..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Cold Email CLI"
CLI_NAME="cold-email-cli"
VERSION=$(node -p "require('./package.json').version")
BUILD_DIR="build"
APP_DIR="$BUILD_DIR/$APP_NAME.app"
CONTENTS_DIR="$APP_DIR/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"

echo -e "${BLUE}📦 Version: $VERSION${NC}"

# Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
mkdir -p "$MACOS_DIR"
mkdir -p "$RESOURCES_DIR"

# Build the TypeScript project first
echo -e "${BLUE}🔨 Building TypeScript project...${NC}"
npm run build

# Create Info.plist
echo -e "${BLUE}📝 Creating Info.plist...${NC}"
cat > "$CONTENTS_DIR/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>cold-email-cli</string>
    <key>CFBundleIdentifier</key>
    <string>io.leadmagic.cold-email-cli</string>
    <key>CFBundleName</key>
    <string>Cold Email CLI</string>
    <key>CFBundleDisplayName</key>
    <string>Professional Cold Email CLI</string>
    <key>CFBundleVersion</key>
    <string>$VERSION</string>
    <key>CFBundleShortVersionString</key>
    <string>$VERSION</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>LMCE</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.15</string>
    <key>LSApplicationCategoryType</key>
    <string>public.app-category.developer-tools</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSUIElement</key>
    <true/>
</dict>
</plist>
EOF

# Create the executable script
echo -e "${BLUE}🚀 Creating executable script...${NC}"
cat > "$MACOS_DIR/cold-email-cli" << 'EOF'
#!/bin/bash

# Professional Cold Email CLI Launcher
# Sponsored by LeadMagic

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
APP_DIR="$(dirname "$SCRIPT_DIR")"
RESOURCES_DIR="$APP_DIR/Resources"

# Add Node.js to PATH if it exists in common locations
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    osascript -e 'display dialog "Node.js is required to run Cold Email CLI. Please install Node.js from https://nodejs.org" buttons {"OK"} default button "OK"'
    exit 1
fi

# Check if we're in Terminal or need to open one
if [ -t 0 ]; then
    # Already in terminal
    exec node "$RESOURCES_DIR/dist/core/index.js" "$@"
else
    # Open in Terminal
    osascript << 'APPLESCRIPT'
tell application "Terminal"
    activate
    do script "cd '" & (POSIX path of (path to me)) & "' && node Resources/dist/core/index.js"
end tell
APPLESCRIPT
fi
EOF

chmod +x "$MACOS_DIR/cold-email-cli"

# Copy the built application
echo -e "${BLUE}📁 Copying application files...${NC}"
cp -r dist "$RESOURCES_DIR/"
cp -r node_modules "$RESOURCES_DIR/"
cp package.json "$RESOURCES_DIR/"

# Create README for the app
cat > "$RESOURCES_DIR/README.txt" << EOF
Professional Cold Email CLI v$VERSION
Sponsored by LeadMagic - https://leadmagic.io

🚀 Advanced Cold Email Automation Platform

This application provides command-line access to:
- SmartLead (82+ commands)
- Instantly (35+ commands) 
- SalesForge (82+ commands)

Requirements:
- Node.js 16.0.0 or higher
- macOS 10.15 or higher

To use from command line:
1. Add to PATH: echo 'export PATH="/Applications/Cold Email CLI.app/Contents/Resources:$PATH"' >> ~/.zshrc
2. Restart terminal
3. Run: cold-email-cli

Support: https://github.com/LeadMagic/cold-email-cli
EOF

# Create a Terminal launcher script in Resources
cat > "$RESOURCES_DIR/cold-email-cli" << 'EOF'
#!/bin/bash
exec node "$(dirname "$0")/dist/core/index.js" "$@"
EOF
chmod +x "$RESOURCES_DIR/cold-email-cli"

# Create an icon (simple text-based icon for now)
echo -e "${BLUE}🎨 Creating application icon...${NC}"
cat > "$RESOURCES_DIR/icon.icns" << 'EOF'
# Simple placeholder - in production you'd want a proper .icns file
# This creates a basic icon representation
EOF

echo -e "${GREEN}✅ Mac app bundle created successfully!${NC}"
echo -e "${BLUE}📍 Location: $APP_DIR${NC}"
echo ""
echo -e "${YELLOW}🎯 Next steps:${NC}"
echo -e "  1. Move to Applications: ${BLUE}mv '$APP_DIR' /Applications/${NC}"
echo -e "  2. Add to PATH: ${BLUE}echo 'export PATH=\"/Applications/Cold Email CLI.app/Contents/Resources:\$PATH\"' >> ~/.zshrc${NC}"
echo -e "  3. Restart terminal and run: ${BLUE}cold-email-cli${NC}"
echo ""
echo -e "${GREEN}🍎 Mac build completed successfully!${NC}" 