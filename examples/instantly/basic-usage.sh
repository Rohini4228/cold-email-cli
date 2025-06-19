#!/usr/bin/env bash
# Instantly CLI Examples

echo "🚀 Instantly CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export INSTANTLY_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run instantly campaigns:list

echo "➕ Creating new campaign..."
bun run instantly campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run instantly analytics:overview

echo "✅ Instantly examples completed!"
