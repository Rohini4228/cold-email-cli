#!/usr/bin/env bash
# Apollo CLI Examples

echo "☀️ Apollo CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export APOLLO_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run apollo campaigns:list

echo "➕ Creating new campaign..."
bun run apollo campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run apollo analytics:overview

echo "✅ Apollo examples completed!"
