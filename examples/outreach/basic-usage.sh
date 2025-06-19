#!/usr/bin/env bash
# Outreach CLI Examples

echo "🏢 Outreach CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export OUTREACH_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run outreach campaigns:list

echo "➕ Creating new campaign..."
bun run outreach campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run outreach analytics:overview

echo "✅ Outreach examples completed!"
