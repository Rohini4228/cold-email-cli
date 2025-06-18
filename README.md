# ❄️ Cold Email CLI (CEC)

> **Professional CLI for cold email automation across multiple platforms**  
> Built with React Ink • Powered by TypeScript • 197+ Commands

[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?color=7289da&label=Discord&logo=discord&logoColor=white)](https://discord.gg/mB76X5QJ)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](package.json)

## 🚀 Quick Start

```bash
# Install globally
npm install -g cold-email-cli

# Launch interactive menu
cec

# Platform-specific shells  
cec smartlead    # Campaign Management & Analytics (68 commands)
cec instantly    # High-Volume Automation (45 commands) 
cec salesforge   # AI-Powered Sequences (42 commands)
cec apollo       # Email Outreach (42 commands)
```

## 🌟 Supported Platforms

### ✅ Available Now

- **⚡ SmartLead** - Advanced Campaign Management & Analytics (68 commands)
- **🚀 Instantly** - High-Volume Automation & Deliverability (45 commands) 
- **🤖 Salesforge** - AI-Powered Multi-Channel Sequences (42 commands)
- **🎯 Apollo** - Email Sequence & Outreach Automation (42 commands)

### 🚧 Coming Soon

- **📧 Email Bison** - Advanced email automation platform
- **📈 AmpleMarket** - Sales intelligence platform
- **📩 Lemlist** - Personalization at scale
- **🎯 Outreach** - Sales engagement platform
- **💼 SalesLoft** - Revenue intelligence

*Want to contribute? Join our [Discord](https://discord.gg/mB76X5QJ) and help build integrations!*

## 🔧 Environment Setup

Add your API keys to `~/.bashrc` or `~/.zshrc`:

```bash
export SMARTLEAD_API_KEY="your_smartlead_api_key"
export INSTANTLY_API_KEY="your_instantly_api_key"  
export SALESFORGE_API_KEY="your_salesforge_api_key"
export APOLLO_API_KEY="your_apollo_api_key"
```

## 📚 Platform Commands

### SmartLead (68 commands)
```bash
# Campaign Management
cec exec smartlead campaigns:list --args '{"limit":10}'
cec exec smartlead campaigns:create --args '{"name":"Enterprise Outreach"}'
cec exec smartlead campaigns:start --args '{"id":"campaign_123"}'

# Lead Management  
cec exec smartlead leads:add-bulk --args '{"campaign_id":"123","leads":[...]}'
cec exec smartlead leads:list --args '{"campaign_id":"123"}'

# Analytics
cec exec smartlead analytics:campaign --args '{"campaign_id":"123"}'
cec exec smartlead analytics:account --args '{"email":"user@domain.com"}'

# Email Accounts
cec exec smartlead accounts:list
cec exec smartlead accounts:warmup --args '{"email":"user@domain.com","action":"start"}'
```

### Instantly (45 commands)
```bash
# Account Management
cec exec instantly accounts:list
cec exec instantly accounts:warmup --args '{"email":"user@domain.com","status":"start"}'

# Campaign Management
cec exec instantly campaigns:list
cec exec instantly campaigns:create --args '{"name":"New Campaign"}'
cec exec instantly campaigns:launch --args '{"id":"123"}'

# Lead Management
cec exec instantly leads:add --args '{"campaign_id":"123","leads":[...]}'
cec exec instantly leads:verify --args '{"campaign_id":"123"}'

# Analytics
cec exec instantly analytics:campaign --args '{"id":"123","period":"30d"}'
```

### Salesforge (42 commands)
```bash
# AI Campaigns
cec exec salesforge campaigns:create --args '{"name":"AI Campaign","ai_optimization":true}'
cec exec salesforge campaigns:optimize --args '{"id":"123","goal":"reply_rate"}'

# AI Sequences
cec exec salesforge sequences:create --args '{"name":"AI Sequence","persona":"decision_maker"}'
cec exec salesforge sequences:generate --args '{"brief":"VP Sales outreach","persona":"enterprise"}'

# AI Templates
cec exec salesforge templates:generate --args '{"persona":"decision_maker","tone":"professional"}'
cec exec salesforge templates:optimize --args '{"id":"template_123","goal":"reply_rate"}'

# AI Analytics
cec exec salesforge analytics:ai-insights --args '{"campaign_id":"123"}'
cec exec salesforge analytics:predictions --args '{"campaign_id":"123","forecast_days":30}'
```

### Apollo (42 commands)
```bash
# Sequence Management
cec exec apollo sequences:list
cec exec apollo sequences:create --args '{"name":"Outreach Sequence","steps":5}'
cec exec apollo sequences:start --args '{"id":"123"}'

# Contact Management
cec exec apollo contacts:search --args '{"keywords":"VP Sales","company_size":"50-200"}'
cec exec apollo contacts:enrich --args '{"id":"contact_123"}'

# Templates
cec exec apollo templates:list
cec exec apollo templates:create --args '{"name":"Follow-up Template"}'
```

## 🏗️ Architecture

```
src/
├── cli.ts              # Main CLI entry point
├── components/         # React Ink UI components
├── modules/           # Platform integrations
│   ├── smartlead/     # SmartLead integration
│   │   ├── api.ts     # API client
│   │   ├── commands/  # Modular command files
│   │   ├── shell.tsx  # Interactive shell
│   │   └── types.ts   # TypeScript definitions
│   ├── instantly/     # Instantly integration  
│   ├── salesforge/    # Salesforge integration
│   ├── apollo/        # Apollo integration
│   └── [coming-soon]/ # Future platforms
├── types/             # Global schemas & types
└── core/              # Core utilities
```

## 💻 Development

```bash
# Clone repository
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli

# Install dependencies
npm install

# Development mode
npm run dev

# Build & test
npm run build:fast
npm test

# Link globally for testing
npm run link
```

## 🎨 MCP Integrations

Configure Model Context Protocol servers for AI assistants:

```bash
# Update MCP servers with clean @cec namespace
cat > ~/.config/mcp/servers.json << EOF
{
  "mcpServers": {
    "smartlead": {
      "command": "@cec/smartlead/mcp-server",
      "args": ["--query-param-auth"]
    },
    "instantly": {
      "command": "@cec/instantly/mcp-server" 
    },
    "salesforge": {
      "command": "@cec/salesforge/mcp-server"
    },
    "apollo": {
      "command": "@cec/apollo/mcp-server"
    }
  }
}
EOF
```

## 🆘 Help & Support

```bash
cec --help           # Show all commands
cec platforms        # List available platforms  
cec discord          # Open Discord community
cec <platform> --help # Platform-specific help
```

## 🌐 Community

- **Discord**: [Join our community](https://discord.gg/mB76X5QJ) - Get help, share tips, contribute
- **Issues**: [Report bugs](https://github.com/LeadMagic/cold-email-cli/issues)
- **Contributing**: We welcome platform integrations and feature contributions

## 📄 License

MIT License - Built by the community for the community

---

**Ready to automate your cold email campaigns?** 🎯  
[Get started now](https://discord.gg/mB76X5QJ) • [Join Discord](https://discord.gg/mB76X5QJ) • [Contribute](https://github.com/LeadMagic/cold-email-cli) 