#!/bin/bash

# Professional Cold Email CLI - Mac Installer Creator
# Sponsored by LeadMagic - https://leadmagic.io

set -e

echo "📦 Creating Mac Installer for Professional Cold Email CLI..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Cold Email CLI"
IDENTIFIER="io.leadmagic.cold-email-cli"
VERSION=$(node -p "require('./package.json').version")
BUILD_DIR="build"
PKG_DIR="$BUILD_DIR/installer"
APP_DIR="$BUILD_DIR/$APP_NAME.app"
PKG_NAME="Professional-Cold-Email-CLI-v$VERSION.pkg"

echo -e "${BLUE}📦 Version: $VERSION${NC}"
echo -e "${BLUE}🏗️  Building installer for: $APP_NAME${NC}"

# Build the Mac app first if it doesn't exist
if [ ! -d "$APP_DIR" ]; then
    echo -e "${YELLOW}🔨 Building Mac app first...${NC}"
    npm run build:mac
fi

# Create installer directory
echo -e "${YELLOW}📁 Creating installer directory...${NC}"
mkdir -p "$PKG_DIR"

# Create a distribution XML for the installer
echo -e "${BLUE}📝 Creating distribution definition...${NC}"
cat > "$PKG_DIR/distribution.xml" << EOF
<?xml version="1.0" encoding="utf-8"?>
<installer-gui-script minSpecVersion="2">
    <title>Professional Cold Email CLI v$VERSION</title>
    <organization>io.leadmagic</organization>
    <domains enable_localSystem="true"/>
    <options customize="never" require-scripts="false" hostArchitectures="x86_64,arm64"/>
    
    <welcome file="welcome.html"/>
    <readme file="readme.html"/>
    <license file="license.html"/>
    
    <pkg-ref id="$IDENTIFIER">
        <bundle-version>
            <bundle id="$IDENTIFIER" CFBundleVersion="$VERSION" path="Cold Email CLI.app"/>
        </bundle-version>
    </pkg-ref>
    
    <choices-outline>
        <line choice="default">
            <line choice="$IDENTIFIER"/>
        </line>
    </choices-outline>
    
    <choice id="default"/>
    <choice id="$IDENTIFIER" visible="false">
        <pkg-ref id="$IDENTIFIER"/>
    </choice>
    
    <pkg-ref id="$IDENTIFIER" version="$VERSION" onConclusion="none">ColdEmailCLI.pkg</pkg-ref>
</installer-gui-script>
EOF

# Create welcome message
echo -e "${BLUE}📄 Creating welcome message...${NC}"
cat > "$PKG_DIR/welcome.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto; }
        .header { color: #007AFF; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        .sponsor { color: #FF6B35; font-weight: bold; }
        .features { margin: 20px 0; }
        .feature { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="header">🚀 Professional Cold Email CLI</div>
    
    <p>Welcome to the most advanced cold email automation platform for developers and sales teams.</p>
    
    <p><span class="sponsor">Sponsored by LeadMagic</span> - Advanced B2B lead generation platform</p>
    
    <div class="features">
        <div class="feature">📧 <strong>SmartLead Integration</strong> - 82+ commands for advanced campaign management</div>
        <div class="feature">⚡ <strong>Instantly Integration</strong> - 35+ commands for high-volume automation</div>
        <div class="feature">🤖 <strong>SalesForge Integration</strong> - 82+ commands for AI-powered sequences</div>
        <div class="feature">🎯 <strong>200+ Total Commands</strong> - Complete cold email workflow automation</div>
        <div class="feature">💻 <strong>Beautiful CLI</strong> - Professional interface with platform-specific themes</div>
    </div>
    
    <p><strong>Requirements:</strong></p>
    <ul>
        <li>macOS 10.15 or higher</li>
        <li>Node.js 16.0.0 or higher</li>
    </ul>
    
    <p>After installation, you can access the CLI from Terminal using <code>cold-email-cli</code> or <code>ce</code> commands.</p>
</body>
</html>
EOF

# Create README
echo -e "${BLUE}📖 Creating README...${NC}"
cat > "$PKG_DIR/readme.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>README</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto; line-height: 1.6; }
        .header { color: #007AFF; font-size: 20px; font-weight: bold; }
        code { background: #f1f1f1; padding: 2px 4px; border-radius: 3px; }
        .command { background: #000; color: #00ff00; padding: 10px; border-radius: 5px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="header">🚀 Installation Complete!</div>
    
    <h3>Getting Started</h3>
    <ol>
        <li>Open Terminal</li>
        <li>Run: <div class="command">cold-email-cli</div></li>
        <li>Select your cold email platform (SmartLead, Instantly, or SalesForge)</li>
        <li>Configure your API keys</li>
        <li>Start automating your cold email campaigns!</li>
    </ol>
    
    <h3>Quick Commands</h3>
    <ul>
        <li><code>cold-email-cli</code> - Start the interactive CLI</li>
        <li><code>ce</code> - Short form command</li>
        <li><code>cold-email-cli --help</code> - Show help information</li>
        <li><code>cold-email-cli --version</code> - Show version information</li>
    </ul>
    
    <h3>Support & Documentation</h3>
    <p>📚 Full documentation: <a href="https://github.com/LeadMagic/cold-email-cli">github.com/LeadMagic/cold-email-cli</a></p>
    <p>🐛 Report issues: <a href="https://github.com/LeadMagic/cold-email-cli/issues">GitHub Issues</a></p>
    <p>💡 Feature requests: <a href="https://github.com/LeadMagic/cold-email-cli/discussions">GitHub Discussions</a></p>
    
    <h3>Sponsorship</h3>
    <p>This project is sponsored by <strong>LeadMagic</strong> - Advanced B2B lead generation and cold email automation platform.</p>
    <p>🌐 Visit: <a href="https://leadmagic.io">leadmagic.io</a></p>
</body>
</html>
EOF

# Create license
echo -e "${BLUE}⚖️  Creating license...${NC}"
cat > "$PKG_DIR/license.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>License</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto; line-height: 1.6; }
        .header { color: #007AFF; font-size: 20px; font-weight: bold; }
        .license { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">📄 MIT License</div>
    
    <div class="license">
        <p><strong>Professional Cold Email CLI</strong><br>
        Copyright (c) 2024 LeadMagic</p>
        
        <p>Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:</p>
        
        <p>The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.</p>
        
        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.</p>
    </div>
    
    <p><strong>Sponsored by LeadMagic</strong> - <a href="https://leadmagic.io">leadmagic.io</a></p>
</body>
</html>
EOF

# Build the component package
echo -e "${BLUE}🔧 Building component package...${NC}"
pkgbuild --root "$BUILD_DIR" \
         --identifier "$IDENTIFIER" \
         --version "$VERSION" \
         --install-location "/Applications" \
         "$PKG_DIR/ColdEmailCLI.pkg"

# Build the final installer
echo -e "${BLUE}📦 Building final installer...${NC}"
productbuild --distribution "$PKG_DIR/distribution.xml" \
             --resources "$PKG_DIR" \
             --package-path "$PKG_DIR" \
             "$BUILD_DIR/$PKG_NAME"

# Create a DMG for distribution
echo -e "${BLUE}💿 Creating DMG for distribution...${NC}"
DMG_NAME="Professional-Cold-Email-CLI-v$VERSION.dmg"
hdiutil create -srcfolder "$BUILD_DIR/$PKG_NAME" -format UDZO -volname "Cold Email CLI v$VERSION" "$BUILD_DIR/$DMG_NAME"

echo -e "${GREEN}✅ Mac installer created successfully!${NC}"
echo ""
echo -e "${YELLOW}📦 Installer Files:${NC}"
echo -e "  PKG: ${BLUE}$BUILD_DIR/$PKG_NAME${NC}"
echo -e "  DMG: ${BLUE}$BUILD_DIR/$DMG_NAME${NC}"
echo ""
echo -e "${YELLOW}🚀 Distribution:${NC}"
echo -e "  1. Share the DMG file for easy distribution"
echo -e "  2. Users can mount the DMG and run the PKG installer"
echo -e "  3. The app will be installed to /Applications/"
echo ""
echo -e "${GREEN}🍎 Mac installer build completed!${NC}" 