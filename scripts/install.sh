#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 SmartLead CLI Installer"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if ! node -e "
const [reqMajor, reqMinor, reqPatch] = '$REQUIRED_VERSION'.split('.').map(Number);
const [curMajor, curMinor, curPatch] = '$NODE_VERSION'.split('.').map(Number);
const isValid = curMajor > reqMajor || 
                (curMajor === reqMajor && curMinor > reqMinor) || 
                (curMajor === reqMajor && curMinor === reqMinor && curPatch >= reqPatch);
process.exit(isValid ? 0 : 1);
"; then
    echo "❌ Node.js version $NODE_VERSION is not supported."
    echo "Please install Node.js 16.0.0 or higher."
    exit 1
fi

echo "✅ Node.js $NODE_VERSION detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "Please install npm."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm $NPM_VERSION detected"

cd "$PROJECT_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Install globally
echo "🌍 Installing globally..."
npm install -g .

# Verify installation
echo "🔍 Verifying installation..."
if command -v smartlead &> /dev/null; then
    INSTALLED_VERSION=$(smartlead --version)
    echo "✅ SmartLead CLI v$INSTALLED_VERSION installed successfully!"
else
    echo "❌ Installation verification failed."
    exit 1
fi

echo ""
echo "🎉 Installation Complete!"
echo "======================="
echo ""
echo "🎯 Quick Start:"
echo "  smartlead           - Show welcome screen"
echo "  smartlead modules   - Show available modules"
echo "  smartlead config    - Configure API settings"
echo "  smartlead switch    - Switch between modules"
echo "  smartlead --help    - Show help"
echo ""
echo "📚 Documentation:"
echo "  README: $PROJECT_DIR/docs/README.md"
echo "  Contributing: $PROJECT_DIR/docs/CONTRIBUTING.md"
echo "  Roadmap: $PROJECT_DIR/docs/ROADMAP.md"
echo ""
echo "🔧 Troubleshooting:"
echo "  If you encounter issues, try:"
echo "  - smartlead reset"
echo "  - npm uninstall -g smartlead-cli && npm install -g ."
echo "" 