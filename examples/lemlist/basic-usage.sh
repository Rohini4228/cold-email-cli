#!/usr/bin/env bash
# lemlist CLI Examples

echo "💖 lemlist CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export LEMLIST_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run lemlist campaigns:list

echo "➕ Creating new campaign..."
bun run lemlist campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run lemlist analytics:overview

echo "✅ lemlist examples completed!"
