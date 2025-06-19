#!/usr/bin/env bash
# SmartLead CLI Examples

echo "🌊 SmartLead CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export SMARTLEAD_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run smartlead campaigns:list

echo "➕ Creating new campaign..."
bun run smartlead campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run smartlead analytics:overview

echo "✅ SmartLead examples completed!"
