#!/usr/bin/env bash
# Salesforge CLI Examples

echo "🔥 Salesforge CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export SALESFORGE_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run salesforge campaigns:list

echo "➕ Creating new campaign..."
bun run salesforge campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run salesforge analytics:overview

echo "✅ Salesforge examples completed!"
