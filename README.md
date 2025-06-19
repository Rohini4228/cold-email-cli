# ❄️ Cold Email CLI (CEC)

> **The Ultimate Multi-Platform Email Automation CLI** 🚀  
> **9 Active Platforms • 372+ Commands • Production Ready**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🎯 **What is Cold Email CLI?**

Cold Email CLI is the **most comprehensive multi-platform email automation tool** ever built. It provides a unified command-line interface to manage campaigns, leads, sequences, and analytics across **9 major email automation platforms**.

Built with **modern TypeScript**, **Bun performance**, and **enterprise-grade architecture** - this CLI transforms how sales teams manage their email outreach at scale.

## 🔥 **Active Platforms (Production Ready)**

### **🎯 SmartLead** (68 commands)
- **Focus**: Advanced campaign management & analytics
- **Categories**: Campaigns, Leads, Email Accounts, Sequences, Templates, Analytics
- **Highlights**: Complete CRUD operations, advanced analytics, multi-account management

### **⚡ Instantly** (45 commands)  
- **Focus**: High-volume email automation & deliverability
- **Categories**: Campaign automation, lead management, email accounts
- **Highlights**: Bulk operations, file uploads, deliverability optimization

### **🤖 Salesforge** (42 commands)
- **Focus**: AI-powered multi-channel sequences
- **Categories**: AI sequences, AI templates, multi-channel management
- **Highlights**: AI optimization, multi-channel outreach, intelligent automation

### **🎯 Apollo** (42 commands)
- **Focus**: Email sequences & outreach automation
- **Categories**: Email sequences, templates, contact management, email accounts
- **Highlights**: Sequence optimization, contact management, email account rotation

### **🦬 Email Bison** (32 commands)
- **Focus**: Power-driven email automation (Power Levels 1-10)
- **Categories**: Power campaigns, power leads, power sequences, automation rules
- **Highlights**: Power levels, AI segmentation, advanced automation, power warmup

### **📊 AmpleMarket** (15 commands)
- **Focus**: Sales intelligence & prospecting
- **Categories**: Account management, lead lists, contacts, sequences, tasks
- **Highlights**: Task management, lead list management, sales intelligence

### **🎯 Outreach** (55 commands)
- **Focus**: Enterprise sales engagement & sequence platform
- **Categories**: Sequences, prospects, mailboxes, templates, analytics, settings
- **Highlights**: Enterprise-grade sequences, CRM integration, team management

### **🔄 SalesLoft** (48 commands)
- **Focus**: Modern sales engagement & cadence platform
- **Categories**: Cadences, people, email, calls, analytics, admin
- **Highlights**: Modern interface, cadence management, multi-channel outreach

### **🎯 LemList** (25 commands) **✨ NEWLY ADDED**
- **Focus**: Creative email outreach & automation
- **Categories**: Campaigns, leads, sequences, templates, analytics, team
- **Highlights**: Creative personalization, visual templates, campaign analytics

## 📊 **Platform Statistics**

| Platform | Commands | API Methods | Categories | Status | Focus |
|----------|----------|-------------|------------|--------|-------|
| **SmartLead** | 68 | 25+ | 6 | ✅ Active | Campaign Analytics |
| **Instantly** | 45 | 15+ | 3 | ✅ Active | High-Volume Automation |
| **Salesforge** | 42 | 20+ | 3 | ✅ Active | AI-Powered Sequences |
| **Apollo** | 42 | 18+ | 4 | ✅ Active | Email Sequences |
| **Email Bison** | 32 | 25+ | 5 | ✅ Active | Power Automation |
| **AmpleMarket** | 15 | 12+ | 5 | ✅ Active | Sales Intelligence |
| **Outreach** | 55 | 25+ | 6 | ✅ Active | Enterprise Engagement |
| **SalesLoft** | 48 | 20+ | 6 | ✅ Active | Modern Cadences |
| **LemList** | 25 | 15+ | 6 | ✅ Active | Creative Outreach |
| **TOTAL ACTIVE** | **372** | **175+** | **41** | **9 Platforms** | **Complete Coverage** |



## 🚀 **Quick Start**

### **Install with Bun (Recommended)**

```bash
# Install Bun if you haven't already
curl -fsSL https://bun.sh/install | bash

# Clone the repository
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli

# Install dependencies
bun install

# Build the project
bun run build

# Install globally
bun install -g .
```

### **Development Mode**

```bash
# Start development with hot reload
bun run dev

# Run specific platform
bun run dev smartlead

# Type checking
bun run type-check

# Code quality check
bun run quality
```

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env` file in the root directory:

```bash
# Platform API Keys
SMARTLEAD_API_KEY=your_smartlead_api_key
INSTANTLY_API_KEY=your_instantly_api_key
SALESFORGE_API_KEY=your_salesforge_api_key
APOLLO_API_KEY=your_apollo_api_key
EMAILBISON_API_KEY=your_emailbison_api_key
AMPLEMARKET_API_KEY=your_amplemarket_api_key
OUTREACH_API_KEY=your_outreach_api_key
SALESLOFT_API_KEY=your_salesloft_api_key
LEMLIST_API_KEY=your_lemlist_api_key

# Optional: Rate limiting and debug
DEBUG=false
RATE_LIMIT=100
```

### **Quick Platform Setup**

```bash
# SmartLead setup
cold-email-cli smartlead campaigns:list

# Instantly setup  
cold-email-cli instantly accounts:list

# Salesforge setup
cold-email-cli salesforge sequences:list

# Apollo setup
cold-email-cli apollo sequences:list

# Email Bison setup
cold-email-cli emailbison campaigns:list --power-level 5

# AmpleMarket setup
cold-email-cli amplemarket account:info

# Outreach setup
cold-email-cli outreach sequences:list

# SalesLoft setup
cold-email-cli salesloft cadences:list

# LemList setup
cold-email-cli lemlist campaigns:list
```

## 💻 **Usage Examples**

### **SmartLead - Campaign Management**

```bash
# List all campaigns
cec smartlead campaigns:list

# Create new campaign
cec smartlead campaigns:create --name "Q4 Outreach" --daily-limit 100

# Get campaign analytics
cec smartlead analytics:campaign --id camp_123 --period 30d
```

### **Instantly - High-Volume Automation**

```bash
# List campaigns
cec instantly campaigns:list

# Upload leads from CSV
cec instantly leads:upload --campaign-id camp_456 --file leads.csv

# Check account health
cec instantly accounts:warmup-status --email user@domain.com
```

### **Email Bison - Power Automation**

```bash
# Create power campaign
cec emailbison campaigns:create --name "Power Campaign" --power-level 8

# AI-powered lead segmentation
cec emailbison leads:power-segment --campaign-id camp_789 --criteria '{"industry":"tech"}'

# Power boost campaign
cec emailbison campaigns:power-boost --id camp_789 --power-level 10
```

### **LemList - Creative Outreach**

```bash
# List campaigns
cec lemlist campaigns:list

# Create creative campaign
cec lemlist campaigns:create --name "Creative Outreach Q4"

# Add leads to campaign
cec lemlist leads:add --campaign_id camp_123 --email john@company.com --firstName John --lastName Doe

# Get campaign analytics
cec lemlist analytics:campaign --id camp_123
```

## 🏗️ **Architecture & Standards**

### **🔥 Built with Modern Tech Stack**

- **⚡ Bun**: Lightning-fast package management and runtime
- **🛡️ TypeScript**: Full type safety with zero compilation errors
- **✨ Biome**: Modern linting and formatting
- **🎨 React Ink**: Beautiful terminal UI components
- **📊 Zod**: Runtime schema validation for all APIs
- **🔄 Axios**: Robust HTTP client with error handling

### **📁 Clean Architecture**

```
src/
├── modules/
│   ├── {platform}/
│   │   ├── api.ts              # Complete API client
│   │   ├── index.ts            # Platform module export
│   │   ├── shell.tsx           # React Ink interface
│   │   ├── mcp/               # MCP configurations
│   │   │   └── {platform}-mcp.json
│   │   └── commands/
│   │       ├── campaigns.ts    # Campaign commands
│   │       ├── leads.ts        # Lead commands
│   │       ├── accounts.ts     # Account commands
│   │       ├── sequences.ts    # Sequence commands
│   │       ├── templates.ts    # Template commands
│   │       └── analytics.ts    # Analytics commands
│   │
│   ├── smartlead/     ✅ Complete (68 commands)
│   ├── instantly/     ✅ Complete (45 commands)
│   ├── salesforge/    ✅ Complete (42 commands)
│   ├── apollo/        ✅ Complete (42 commands)
│   ├── emailbison/    ✅ Complete (32 commands)
│   ├── amplemarket/   ✅ Complete (15 commands)
│   ├── outreach/      ✅ Complete (55 commands)
│   ├── salesloft/     ✅ Complete (48 commands)
│   └── lemlist/       ✅ Complete (25 commands)
│
├── core/              # Core CLI functionality
├── types/             # TypeScript schemas
└── cli.ts            # Main entry point
```

### **✅ Enterprise Features**

- **Type Safety**: Comprehensive Zod validation for all API operations
- **Error Handling**: Standardized error patterns with detailed messages
- **Rate Limiting**: Built-in rate limiting for all API clients
- **Authentication**: Secure API key management with environment variables
- **Logging**: Structured JSON output for monitoring and automation
- **Performance**: Optimized for speed with Bun runtime

## 🎨 **Command Structure**

All platforms follow consistent command patterns:

```bash
# Pattern: platform category:action
cec {platform} {category}:{action} [options]

# Examples across platforms:
cec smartlead campaigns:list
cec instantly leads:upload --file data.csv
cec salesforge sequences:optimize --id seq_123
cec apollo templates:create --name "Follow-up"
cec emailbison campaigns:power-boost --id camp_456 --power-level 9
cec amplemarket contacts:search --company "TechCorp"
cec outreach sequences:create --name "Q4 Outreach"
cec salesloft cadences:create --name "New Cadence"
cec lemlist campaigns:create --name "Creative Campaign"

# Short aliases available:
cec smartlead c:list        # campaigns:list
cec instantly l:upload      # leads:upload
cec emailbison c:boost      # campaigns:power-boost
cec lemlist camp:create     # campaigns:create
```

## 📚 **Documentation**

- **[API Completion Summary](docs/API_COMPLETION_SUMMARY.md)** - Complete API implementation details
- **[Module Framework](docs/MODULE_FRAMEWORK.md)** - Standards for adding new platforms
- **[Complete Platform Summary](docs/COMPLETE_PLATFORM_SUMMARY.md)** - Full feature overview
- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute
- **[Changelog](docs/CHANGELOG.md)** - Release history

## 🤝 **Contributing**

We welcome contributions! This project follows a **modular architecture** that makes adding new platforms straightforward.

### **Adding a New Platform**

1. **Create platform directory**: `src/modules/{platform}/`
2. **Implement API client**: Follow existing patterns in `api.ts`
3. **Add Zod schemas**: Define types in `src/types/schemas.ts`
4. **Create commands**: Implement command modules in `commands/`
5. **Update module selector**: Register platform in `src/core/module-selector.ts`
6. **Add MCP config**: Create MCP configuration in `mcp/`

See [MODULE_FRAMEWORK.md](docs/MODULE_FRAMEWORK.md) for detailed guidelines.

### **Development Workflow**

```bash
# Setup development environment
bun install
bun run dev

# Quality checks
bun run type-check    # TypeScript compilation
bun run lint          # Biome linting
bun run format        # Code formatting
bun run quality       # Complete quality check

# Testing
bun test              # Run tests
bun test --watch      # Watch mode
```

## 📈 **Performance & Scale**

- **🚀 Fast Startup**: Bun runtime provides 2x faster startup than Node.js
- **⚡ Quick Builds**: TypeScript compilation optimized for speed
- **🔄 Hot Reload**: Instant feedback during development
- **📊 Efficient Memory**: Optimized module loading and API clients
- **🛡️ Error Recovery**: Robust error handling with automatic retries

## 🏆 **Production Ready**

### **✅ Enterprise Grade**

- **Zero TypeScript Errors**: Clean, type-safe codebase
- **Comprehensive API Coverage**: 175+ API methods across 9 platforms
- **Standardized Error Handling**: Consistent error patterns
- **Environment Variable Support**: Secure configuration management
- **Rate Limiting**: Built-in protection against API limits
- **Comprehensive Logging**: Structured output for monitoring

### **🚀 Deployment Options**

- **Global Install**: `bun install -g .`
- **Binary Build**: Standalone executables
- **Docker Ready**: Can be containerized
- **CI/CD Compatible**: Supports automated deployment

## 🔗 **Platform Links**

- **[SmartLead](https://smartlead.ai)** - Advanced email campaigns
- **[Instantly](https://instantly.ai)** - High-volume email automation  
- **[Salesforge](https://salesforge.ai)** - AI-powered sequences
- **[Apollo](https://apollo.io)** - Sales engagement platform
- **[Email Bison](https://emailbison.com)** - Power-driven automation
- **[AmpleMarket](https://amplemarket.com)** - Sales intelligence platform
- **[Outreach](https://outreach.io)** - Enterprise sales engagement
- **[SalesLoft](https://salesloft.com)** - Modern sales engagement
- **[LemList](https://lemlist.com)** - Creative email outreach

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Issues**: [GitHub Issues](https://github.com/LeadMagic/cold-email-cli/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LeadMagic/cold-email-cli/discussions)
- **Discord**: [Community Discord](https://discord.gg/mB76X5QJ)

---

**Built with ❤️ by the community • Powered by Bun ⚡ • Enhanced with AI 🤖**

> **Transform your email automation workflow with the most comprehensive CLI tool ever created for cold email campaigns.** 🚀 