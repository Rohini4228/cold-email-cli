#!/bin/bash

# Professional Cold Email CLI - Mac Installation Script
# Sponsored by LeadMagic - https://leadmagic.io

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}🚀 Professional Cold Email CLI - Mac Installation${NC}"
echo -e "${PURPLE}   Sponsored by LeadMagic - https://leadmagic.io${NC}"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    echo -e "${YELLOW}📥 Please install Node.js from: https://nodejs.org${NC}"
    echo -e "${BLUE}   Recommended: Node.js 18+ LTS${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js detected: $NODE_VERSION${NC}"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is required but not installed.${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm detected: v$NPM_VERSION${NC}"

echo ""
echo -e "${BLUE}📦 Installing Professional Cold Email CLI globally...${NC}"

# Install the package globally
npm install -g professional-cold-email-cli

echo ""
echo -e "${GREEN}✅ Installation completed successfully!${NC}"
echo ""
echo -e "${YELLOW}🎯 Available Commands:${NC}"
echo -e "  ${BLUE}cold-email-cli${NC}  - Start the interactive CLI"
echo -e "  ${BLUE}ce${NC}              - Short form command"
echo ""
echo -e "${YELLOW}🚀 Quick Start:${NC}"
echo -e "  1. Run: ${BLUE}cold-email-cli${NC}"
echo -e "  2. Select your platform (SmartLead, Instantly, or SalesForge)"
echo -e "  3. Configure your API keys"
echo -e "  4. Start automating your cold email campaigns!"
echo ""
echo -e "${YELLOW}📚 Resources:${NC}"
echo -e "  Documentation: ${BLUE}https://github.com/LeadMagic/cold-email-cli${NC}"
echo -e "  Issues: ${BLUE}https://github.com/LeadMagic/cold-email-cli/issues${NC}"
echo -e "  LeadMagic: ${BLUE}https://leadmagic.io${NC}"
echo ""
echo -e "${GREEN}🎉 Ready to revolutionize your cold email campaigns!${NC}"
echo ""

# Test the installation
echo -e "${BLUE}🔍 Testing installation...${NC}"
if command -v cold-email-cli &> /dev/null; then
    echo -e "${GREEN}✅ CLI successfully installed and available${NC}"
    echo ""
    echo -e "${YELLOW}ℹ️  Run 'cold-email-cli --version' to verify the installation${NC}"
else
    echo -e "${RED}❌ Installation verification failed${NC}"
    echo -e "${YELLOW}💡 You may need to restart your terminal or add npm global bin to your PATH${NC}"
    echo -e "${BLUE}   PATH location: $(npm config get prefix)/bin${NC}"
fi

echo "" 