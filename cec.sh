#!/bin/bash

# Cold Email CLI - Simple Launcher Script
# Makes it easy to run the CLI without remembering paths

# Function to display usage
show_usage() {
    echo "🌊 Cold Email CLI - Multi-Platform Automation Suite"
    echo ""
    echo "Usage: ./cec.sh [platform|command]"
    echo ""
    echo "🏢 Available Platforms:"
    echo "  smartlead    🌊 SmartLead Command Center"
    echo "  instantly    🚀 Instantly Automation Hub"
    echo "  apollo       ☀️ Apollo Sequence Center"
    echo "  salesforge   🔥 Salesforge AI Sequences"
    echo "  emailbison   ⚡ EmailBison Power Hub"
    echo "  amplemarket  💼 Amplemarket Intelligence"
    echo "  outreach     🏢 Outreach Enterprise"
    echo "  salesloft    🌟 Salesloft Cadences"
    echo "  lemlist      💖 lemlist Creative Studio"
    echo ""
    echo "📋 Other Commands:"
    echo "  platforms    List all available platforms"
    echo "  help         Show this help message"
    echo ""
    echo "✨ Examples:"
    echo "  ./cec.sh smartlead      # Launch SmartLead shell"
    echo "  ./cec.sh platforms      # List all platforms"
    echo "  ./cec.sh help          # Show help"
}

# Check if no arguments provided
if [ $# -eq 0 ]; then
    show_usage
    exit 0
fi

# Check for help
if [ "$1" = "help" ] || [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_usage
    exit 0
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Error: Bun is not installed. Please install Bun first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "src/cli.ts" ]; then
    echo "❌ Error: Please run this script from the cold-email-cli directory"
    exit 1
fi

# Run the CLI with the provided arguments
echo "🚀 Launching Cold Email CLI..."
exec bun run src/cli.ts "$@" 