# Cold Email CLI

[![npm version](https://badge.fury.io/js/cold-email-cli.svg)](https://badge.fury.io/js/cold-email-cli)
[![GitHub stars](https://img.shields.io/github/stars/LeadMagic/cold-email-cli.svg)](https://github.com/LeadMagic/cold-email-cli/stargazers)
[![GitHub downloads](https://img.shields.io/npm/dm/cold-email-cli.svg)](https://npmjs.org/package/cold-email-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![React Ink](https://img.shields.io/badge/Built%20with-React%20Ink-61dafb.svg)](https://github.com/vadimdemedes/ink)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)

Professional command-line interface for cold email automation platforms. Manage campaigns, leads, analytics, and more across multiple platforms from a single unified CLI.

```
   ██████╗ ██████╗ ██╗     ██████╗     ███████╗███╗   ███╗ █████╗ ██╗██╗          ██████╗██╗     ██╗
  ██╔════╝██╔═══██╗██║     ██╔══██╗    ██╔════╝████╗ ████║██╔══██╗██║██║         ██╔════╝██║     ██║
  ██║     ██║   ██║██║     ██║  ██║    █████╗  ██╔████╔██║███████║██║██║         ██║     ██║     ██║
  ██║     ██║   ██║██║     ██║  ██║    ██╔══╝  ██║╚██╔╝██║██╔══██║██║██║         ██║     ██║     ██║
  ╚██████╗╚██████╔╝███████╗██████╔╝    ███████╗██║ ╚═╝ ██║██║  ██║██║███████╗    ╚██████╗███████╗██║
   ╚═════╝ ╚═════╝ ╚══════╝╚═════╝     ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝     ╚═════╝╚══════╝╚═╝
```

## 🚀 Features

### **Multi-Platform Support**
- **SmartLead.ai** (68 commands) - Advanced Campaign Management & Analytics
- **Instantly.ai** (35 commands) - High-Volume Automation & Deliverability  
- **Salesforge.ai** (42 commands) - AI-Powered Multi-Channel Sequences
- **Apollo.io** (42 commands) - Email Sequences & Outreach Automation

### **Core Capabilities**
- 📧 **Campaign Management** - Create, manage, and optimize email campaigns
- 👥 **Lead Management** - Import, segment, and track prospect interactions
- 📊 **Analytics & Reporting** - Real-time performance metrics and insights
- 🤖 **AI-Powered Features** - Smart optimization and personalization
- 📱 **Multi-Channel** - Email, LinkedIn, phone, and SMS sequences
- 🎯 **Deliverability** - Advanced email warmup and reputation management

## 📦 Installation

### NPM Global Install
```bash
npm install -g cold-email-cli
```

### Quick Start
```bash
# Run the CLI
cold-email-cli

# Or use the short alias
cec

# Get help for a specific platform
cold-email-cli smartlead.ai --help
cec instantly.ai campaigns:list
```

### Local Development
```bash
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli
npm install
npm run build
npm run dev
```

## 🎯 Platform Commands

### SmartLead.ai (68 Commands)
Advanced campaign management with enterprise-grade analytics.

```bash
# Campaign Management
cec smartlead.ai campaigns:list --status active
cec smartlead.ai campaigns:create --name "Enterprise Q1" --daily-limit 200
cec smartlead.ai campaigns:analytics --id campaign_12345 --period 30d

# Lead Management  
cec smartlead.ai leads:create --email john@company.com --enrich-profile
cec smartlead.ai leads:bulk-create --file leads.csv --validate-emails
cec smartlead.ai leads:score --campaign campaign_12345 --update-scores

# Email Account Management
cec smartlead.ai accounts:list --include-health --deliverability-scores
cec smartlead.ai accounts:warmup-start --email sender@company.com --duration 30d
```

### Instantly.ai (35 Commands) 
High-volume automation with industry-leading deliverability.

```bash
# Campaign Management
cec instantly.ai campaigns:create --name "Q1 Outreach" --track-opens true
cec instantly.ai campaigns:launch --id campaign_12345 --schedule-time "2025-01-15T09:00:00Z"

# Lead Management
cec instantly.ai leads:add --email john@company.com --campaign campaign_12345
cec instantly.ai leads:bulk-add --file leads.csv --campaign campaign_12345

# Inbox Management (Unibox)
cec instantly.ai unibox:conversations --status new --limit 50
cec instantly.ai unibox:reply --id conversation_12345 --message "Thank you"
```

### Salesforge.ai (42 Commands)
AI-powered multi-channel sequences with smart personalization.

```bash
# AI Campaign Management
cec salesforge.ai campaigns:create --name "AI Outreach" --ai-optimization enabled
cec salesforge.ai campaigns:optimize --id campaign_12345 --goal reply-rate

# AI Sequences
cec salesforge.ai sequences:create --name "AI Sequence" --persona "VP Sales" --industry SaaS
cec salesforge.ai sequences:generate --brief "SaaS cold outreach" --target-persona "CTOs"

# AI Templates
cec salesforge.ai templates:generate --persona "Enterprise VP" --tone professional
cec salesforge.ai templates:optimize --id template_12345 --goal open-rate
```

### Apollo.io (42 Commands)
Professional email sequences with contact enrichment.

```bash
# Email Sequences
cec apollo.io sequences:create --name "Enterprise Outreach" --steps 5 --delay-days 3
cec apollo.io sequences:start --id sequence_12345 --schedule-time "09:00"

# Contact Management
cec apollo.io contacts:add-to-sequence --sequence sequence_12345 --contacts contact_1,contact_2
cec apollo.io contacts:bulk-add --sequence sequence_12345 --file contacts.csv

# Email Templates
cec apollo.io templates:create --name "Follow-up Template" --subject "Quick follow-up"
cec apollo.io templates:performance --id template_12345 --metrics "open,click,reply"
```

## 🛠️ Technology Stack

### **Built with React Ink**
This CLI leverages [React Ink](https://github.com/vadimdemedes/ink) for building interactive command-line applications with React components. React Ink provides:

- **Component-based architecture** for modular CLI design
- **Interactive elements** like selectors and prompts  
- **Real-time updates** and dynamic content rendering
- **Familiar React patterns** for developers

### **Core Technologies**
- **TypeScript** - Type-safe development and better DX
- **React Ink** - Interactive CLI components and layouts
- **Node.js 18+** - Modern JavaScript runtime
- **Jest** - Comprehensive testing framework
- **ESLint + Prettier** - Code quality and formatting

## 📋 Available Commands by Category

### Campaign Management
| Platform | Commands | Key Features |
|----------|----------|--------------|
| SmartLead | 15 | Advanced analytics, A/B testing, automation |
| Instantly | 8 | High-volume sending, deliverability optimization |
| Salesforge | 10 | AI optimization, predictive analytics |
| Apollo | 12 | Sequence management, performance tracking |

### Lead Management  
| Platform | Commands | Key Features |
|----------|----------|--------------|
| SmartLead | 18 | Enrichment, scoring, lifecycle management |
| Instantly | 12 | Bulk operations, segmentation, blacklist management |
| Salesforge | 6 | AI scoring, personalization, prediction |
| Apollo | 8 | Sequence assignment, status tracking, history |

### Analytics & Reporting
| Platform | Commands | Key Features |
|----------|----------|--------------|
| SmartLead | 10 | Real-time dashboards, ROI tracking, trends |
| Instantly | 4 | Performance metrics, deliverability insights |
| Salesforge | 6 | AI insights, predictive analytics, optimization |
| Apollo | 5 | Sequence performance, account summaries, deliverability |

## ⚙️ Configuration

### API Keys Setup
```bash
# Configure API keys for each platform
export SMARTLEAD_API_KEY="your_smartlead_api_key"
export INSTANTLY_API_KEY="your_instantly_api_key"  
export SALESFORGE_API_KEY="your_salesforge_api_key"
export APOLLO_API_KEY="your_apollo_api_key"

# Or set them via config files
~/.cold-email-cli/config.json
```

### Environment Configuration
```bash
# Copy and customize the environment template
cp config/environment.example .env

# Edit with your API credentials and preferences
```

## 🧪 Development & Testing

### Development Setup
```bash
# Install dependencies
npm install

# Start development mode with hot reload
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Building & Packaging
```bash
# Build for production
npm run build

# Install globally from local build
npm run install

# Create distributable packages
npm run package

# Build platform-specific installers
npm run build:mac
npm run build:linux
npm run build:windows
```

### Testing Commands
```bash
# Test the CLI locally
./dist/bin/cold-email-cli --help
./dist/bin/cec smartlead.ai campaigns:list

# Test specific module
npm run test src/modules/smartlead/
npm run test src/modules/instantly/
```

## 📖 API Documentation

### Platform API References
- **SmartLead API**: [https://server.smartlead.ai](https://server.smartlead.ai)
- **Instantly API**: [https://api.instantly.ai](https://api.instantly.ai)  
- **Salesforge API**: [https://api.salesforge.ai/public/v2/swagger/index.html](https://api.salesforge.ai/public/v2/swagger/index.html)
- **Apollo API**: [https://docs.apollo.io](https://docs.apollo.io)

### Command Structure
```
cold-email-cli <platform> <command> [options]

Examples:
  cold-email-cli smartlead.ai campaigns:list --status active
  cec instantly.ai leads:add --email john@company.com --campaign campaign_123
  cold-email-cli salesforge.ai templates:generate --persona "VP Sales"
```

## 🔧 Advanced Usage

### Batch Operations
```bash
# Bulk lead import with validation
cec smartlead.ai leads:bulk-create --file leads.csv --validate-emails --enrich-data

# Export comprehensive analytics
cec instantly.ai analytics:export --type campaign --format xlsx --date-range 90d

# AI-powered optimization
cec salesforge.ai campaigns:optimize --id campaign_12345 --auto-apply
```

### Automation Scripts
```bash
#!/bin/bash
# Daily campaign monitoring script

echo "📊 Daily Campaign Report"
cec smartlead.ai analytics:dashboard --period 24h
cec instantly.ai analytics:summary --date-range 1d
cec salesforge.ai analytics:ai-insights --recommendations detailed
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Special Thanks

- **LeadMagic** - Project sponsor and cold email expertise
- **React Ink Community** - Interactive CLI framework
- **Cold Email Community** - Testing, feedback, and feature requests

---

**Professional Cold Email Automation** • Built with ❤️ and TypeScript 