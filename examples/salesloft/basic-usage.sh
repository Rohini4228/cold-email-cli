#!/usr/bin/env bash
# Salesloft CLI Examples

echo "🌟 Salesloft CLI Examples"
echo "=================================="

# Set API key (replace with your actual key)
export SALESLOFT_API_KEY="your_api_key_here"

echo "📋 Listing campaigns..."
bun run salesloft campaigns:list

echo "➕ Creating new campaign..."
bun run salesloft campaigns:create --name "Example Campaign" --description "Test campaign"

echo "📊 Getting analytics..."
bun run salesloft analytics:overview

echo "✅ Salesloft examples completed!"
