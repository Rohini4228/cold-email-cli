#!/bin/bash

# Cold Email CLI (CEC) Installation Script
# Installs the fastest cold email automation CLI built with React Ink

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "  ██████╗███████╗ ██████╗"
echo "██╔════╝██╔════╝██╔════╝"
echo "██║     █████╗  ██║     "
echo "██║     ██╔══╝  ██║     "
echo "╚██████╗███████╗╚██████╗"
echo " ╚═════╝╚══════╝ ╚═════╝"
echo "                        "
echo "Cold Email CLI v2.0.0   "
echo -e "${NC}"

echo -e "${CYAN}🚀 Installing Cold Email CLI (CEC)...${NC}"
echo -e "${YELLOW}Platform support: SmartLead • Instantly • Salesforge • Apollo${NC}"
echo ""

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${YELLOW}⚡ Installing Bun (fastest runtime)...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc
    echo -e "${GREEN}✅ Bun installed successfully!${NC}"
else
    echo -e "${GREEN}✅ Bun already installed${NC}"
fi

# Install dependencies
echo -e "${CYAN}📦 Installing dependencies...${NC}"
bun install

# Build the project
echo -e "${CYAN}🏗️  Building CEC with Bun...${NC}"
bun run build

# Create global symlink
echo -e "${CYAN}🔗 Creating global 'cec' command...${NC}"
bun link

# Set executable permissions
chmod +x dist/cli.js

echo ""
echo -e "${GREEN}🎉 Cold Email CLI (CEC) installed successfully!${NC}"
echo ""
echo -e "${CYAN}Quick Start:${NC}"
echo -e "  ${YELLOW}cec${NC}              # Launch interactive menu"
echo -e "  ${YELLOW}cec smartlead${NC}    # SmartLead platform shell"
echo -e "  ${YELLOW}cec instantly${NC}    # Instantly platform shell"
echo -e "  ${YELLOW}cec salesforge${NC}   # Salesforge platform shell"
echo -e "  ${YELLOW}cec apollo${NC}       # Apollo platform shell"
echo ""
echo -e "${CYAN}Environment Setup:${NC}"
echo -e "  Add your API keys to ${YELLOW}~/.bashrc${NC} or ${YELLOW}~/.zshrc${NC}:"
echo -e "  ${YELLOW}export SMARTLEAD_API_KEY=\"your_key\"${NC}"
echo -e "  ${YELLOW}export INSTANTLY_API_KEY=\"your_key\"${NC}"
echo -e "  ${YELLOW}export SALESFORGE_API_KEY=\"your_key\"${NC}"
echo -e "  ${YELLOW}export APOLLO_API_KEY=\"your_key\"${NC}"
echo ""
echo -e "${CYAN}Community:${NC}"
echo -e "  🌐 Discord: ${YELLOW}https://discord.gg/mB76X5QJ${NC}"
echo -e "  📚 Docs: ${YELLOW}https://github.com/LeadMagic/cold-email-cli${NC}"
echo ""
echo -e "${GREEN}Happy cold emailing! 🎯${NC}" 