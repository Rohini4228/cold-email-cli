#!/usr/bin/env bash
# EmailBison CLI Examples

echo "⚡ EmailBison CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export EMAILBISON_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run emailbison campaigns:list

echo "➕ Creating new campaign..."
bun run emailbison campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run emailbison analytics:overview

echo "✅ EmailBison examples completed!"
