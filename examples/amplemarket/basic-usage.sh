#!/usr/bin/env bash
# Amplemarket CLI Examples

echo "💼 Amplemarket CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export AMPLEMARKET_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run amplemarket campaigns:list

echo "➕ Creating new campaign..."
bun run amplemarket campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run amplemarket analytics:overview

echo "✅ Amplemarket examples completed!"
