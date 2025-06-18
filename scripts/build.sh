#!/bin/bash

set -e

echo "🚀 Building SmartLead CLI..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
rm -rf coverage/

# Type checking
echo "🔍 Running TypeScript type checking..."
npx tsc --noEmit

# Build TypeScript
echo "📦 Compiling TypeScript..."
npx tsc

# Copy package.json to dist for version reading
echo "📋 Copying package.json..."
cp package.json dist/

# Make the main file executable
echo "🔧 Making CLI executable..."
chmod +x dist/core/index.js

# Create symlinks for bin commands
echo "🔗 Creating bin symlinks..."
mkdir -p dist/bin
cat > dist/bin/smartlead << 'EOF'
#!/usr/bin/env node
require('../core/index.js');
EOF

cat > dist/bin/sl << 'EOF'
#!/usr/bin/env node
require('../core/index.js');
EOF

chmod +x dist/bin/smartlead
chmod +x dist/bin/sl

echo "✅ Build completed successfully!"
echo "📁 Built files are in ./dist/"
echo ""
echo "🎯 Next steps:"
echo "  npm run test    - Run tests"
echo "  npm run install - Install globally"
echo "  npm run package - Create package" 