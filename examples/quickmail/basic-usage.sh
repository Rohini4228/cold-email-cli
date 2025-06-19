#!/usr/bin/env bash
# QuickMail CLI Examples

echo "🌊 QuickMail CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export QUICKMAIL_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run quickmail campaigns:list

echo "➕ Creating new campaign..."
bun run quickmail campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run quickmail analytics:overview

echo "✅ QuickMail examples completed!"
