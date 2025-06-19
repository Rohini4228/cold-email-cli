#!/bin/bash

set -e

echo "🚀 Building Cold Email CLI..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
rm -rf coverage/

# Type checking
echo "🔍 Running TypeScript type checking..."
bun x tsc --noEmit

# Build with Bun
echo "📦 Compiling with Bun..."
bun build src/cli.ts --outdir dist --target node --format esm

# Copy package.json to dist for version reading
echo "📋 Copying package.json..."
cp package.json dist/

# Make the main file executable
echo "🔧 Making CLI executable..."
chmod +x dist/cli.js

# Create symlinks for bin commands
echo "🔗 Creating bin symlinks..."
mkdir -p dist/bin

cat > dist/bin/cec << 'EOF'
#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const { spawn } = require('child_process');

const cliPath = path.join(__dirname, '..', 'cli.js');
spawn('node', [cliPath, ...process.argv.slice(2)], { stdio: 'inherit' });
EOF

cat > dist/bin/cold-email-cli << 'EOF'
#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const { spawn } = require('child_process');

const cliPath = path.join(__dirname, '..', 'cli.js');
spawn('node', [cliPath, ...process.argv.slice(2)], { stdio: 'inherit' });
EOF

chmod +x dist/bin/cec
chmod +x dist/bin/cold-email-cli

echo "✅ Build completed successfully!"
echo "📁 Built files are in ./dist/"
echo ""
echo "🎯 Next steps:"
echo "  bun test        - Run tests"
echo "  bun run install - Install globally"
echo "  bun run package - Create package" 