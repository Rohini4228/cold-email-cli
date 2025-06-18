# 🚀 SmartLead CLI - Multi-Module TypeScript

[![npm version](https://badge.fury.io/js/smartlead-cli.svg)](https://badge.fury.io/js/smartlead-cli)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js CI](https://github.com/username/smartlead-cli/workflows/Node.js%20CI/badge.svg)](https://github.com/username/smartlead-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/smartlead-cli.svg)](https://npmjs.org/package/smartlead-cli)

> **Professional multi-module CLI for email marketing platforms built with TypeScript**

The most comprehensive and powerful command-line interface for email marketing automation. Features modular architecture with **SmartLead** and **Instantly** modules, **80+ commands**, beautiful terminal UI, comprehensive testing, and TypeScript throughout.

![CLI Demo](https://via.placeholder.com/800x400/2563eb/ffffff?text=Multi-Module+CLI+Demo)

## ✨ Features

### 🏗️ **Modular Architecture**
- **Multiple Modules**: SmartLead (available) + Instantly (coming soon)
- **Interactive Module Selector**: Switch between platforms seamlessly
- **Module-Specific Themes**: Each platform has its own branding
- **Extensible Design**: Easy to add new email marketing platforms

### 💻 **Professional TypeScript Implementation**
- **Type Safety**: Complete TypeScript implementation with strict types
- **Modern Code**: ES2020+ with advanced TypeScript features
- **Comprehensive Testing**: Jest test suite with 90%+ coverage
- **Professional Tooling**: ESLint, Prettier, and build automation

### 🎨 **Beautiful User Experience**
- **Smart Lead Branding**: Professional blue gradient theme
- **Instantly Branding**: Purple gradient theme (coming soon)
- **Interactive Prompts**: Intuitive module and command selection
- **Rich Terminal Output**: Tables, colors, progress indicators

### 📦 **Complete API Coverage**
- **SmartLead**: 80+ commands covering every API endpoint
- **Campaign Management**: Create, schedule, control, sequences, settings
- **Lead Operations**: Add, update, delete, pause, resume, categories
- **Analytics & Reporting**: Campaign stats, exports, date ranges
- **Email Account Management**: Warmup automation, statistics
- **Webhook System**: Create, update, delete, event management

## 🛠 Installation

### Quick Install (Recommended)
```bash
npm install -g smartlead-cli
```

### Development Setup
```bash
git clone https://github.com/username/smartlead-cli.git
cd smartlead-cli
bash scripts/install.sh
```

### Manual Installation
```bash
npm install -g smartlead-cli

# Or from source
git clone https://github.com/username/smartlead-cli.git
cd smartlead-cli
npm install
npm run build
npm install -g .
```

## 🚀 Quick Start

### 1. **Initialize CLI**
```bash
smartlead
# Shows welcome screen with module selection
```

### 2. **Select Module**
```bash
smartlead modules      # Show available modules
smartlead switch       # Interactive module selector
```

### 3. **Configure API**
```bash
smartlead config      # Configure API settings for active module
smartlead show-config  # Show current configuration
```

### 4. **Start Using Commands**
```bash
# SmartLead module examples
smartlead campaigns
smartlead leads 123
smartlead analytics 123

# Interactive mode
smartlead interactive
```

## 🧩 Module System

### Available Modules

#### 🟢 **SmartLead** (Available)
Complete email campaign management and automation
- **80+ Commands** covering entire SmartLead API
- **Campaign Management**: Full CRUD operations
- **Lead Operations**: Complete lead lifecycle management
- **Analytics**: Comprehensive reporting and insights
- **Email Accounts**: Warmup automation and statistics

#### 🟡 **Instantly** (Coming Q2 2024)
Cold email outreach and lead generation platform
- **Campaign Management**: Create and manage campaigns
- **Lead Import**: Bulk lead management
- **Sequence Builder**: Email sequence creation
- **Analytics**: Performance tracking and insights

### Module Architecture

```
src/
├── core/                    # Core CLI functionality
│   ├── index.ts            # Main entry point
│   ├── module-selector.ts  # Interactive module selector
│   └── utils/              # Shared utilities
├── modules/
│   ├── smartlead/          # SmartLead module
│   │   ├── index.ts        # Module implementation
│   │   ├── types.ts        # SmartLead-specific types
│   │   └── api/            # API client
│   └── instantly/          # Instantly module (coming soon)
│       └── index.ts        # Placeholder implementation
└── types/                  # Global TypeScript types
```

## 📋 Command Reference

### Core Commands
```bash
smartlead modules          # Show available modules
smartlead switch           # Switch between modules
smartlead info             # Show current module info
smartlead config           # Configure active module
smartlead show-config      # Show configuration
smartlead reset            # Reset configuration
smartlead interactive      # Start interactive mode
smartlead --help           # Show help
smartlead --version        # Show version
```

### SmartLead Module Commands

#### 📢 Campaign Management
```bash
smartlead campaigns                    # List all campaigns
smartlead campaign <id>               # Get campaign details
smartlead campaign-create <name>      # Create new campaign
smartlead campaign-start <id>         # Start campaign
smartlead campaign-pause <id>         # Pause campaign
smartlead campaign-stop <id>          # Stop campaign
smartlead campaign-delete <id>        # Delete campaign
smartlead campaign-settings <id>      # View campaign settings
smartlead campaign-sequences <id>     # Get campaign sequences
smartlead campaign-schedule <id>      # Update schedule
```

#### 👥 Lead Management
```bash
smartlead leads <campaign-id>                     # List leads
smartlead lead-add <campaign-id>                  # Add leads
smartlead lead-update <campaign-id> <lead-id>     # Update lead
smartlead lead-delete <campaign-id> <lead-id>     # Delete lead
smartlead lead-pause <campaign-id> <lead-id>      # Pause lead
smartlead lead-resume <campaign-id> <lead-id>     # Resume lead
smartlead lead-message-history <campaign-id> <lead-id> # Message history
smartlead leads-search                            # Search leads
smartlead leads-global                            # Get all leads
```

#### ✉️ Email Account Management
```bash
smartlead email-accounts               # List email accounts
smartlead email-account <id>          # Get account details
smartlead email-account-create        # Create email account
smartlead warmup-setup <account-id>   # Setup warmup
smartlead warmup-stats <account-id>   # Warmup statistics
smartlead warmup-enable <email>       # Enable warmup
smartlead warmup-disable <email>      # Disable warmup
```

#### 📊 Analytics & Reporting
```bash
smartlead analytics <campaign-id>              # Campaign analytics
smartlead stats <campaign-id>                  # Detailed statistics
smartlead export <campaign-id>                 # Export data
smartlead reports                              # List reports
smartlead report-generate <type>               # Generate reports
```

#### 🔗 Webhooks & Integration
```bash
smartlead webhooks <campaign-id>        # List webhooks
smartlead webhook-create <campaign-id>  # Create webhook
smartlead webhook-update <campaign-id>  # Update webhook
smartlead webhook-delete <campaign-id>  # Delete webhook
```

## 🎨 Advanced Examples

### Module Switching
```bash
# Show all available modules
smartlead modules

# Interactive module selector
smartlead switch

# Direct module commands (when available)
smartlead campaigns  # Uses active module
```

### SmartLead Campaign Workflow
```bash
# Create and configure campaign
smartlead campaign-create "Q1 Outreach"
smartlead campaign-schedule 123 \
  --timezone "America/New_York" \
  --days "1,2,3,4,5" \
  --start-hour "09:00" \
  --end-hour "17:00"

# Add leads
smartlead lead-add 123 \
  --email "john@company.com" \
  --name "John Doe" \
  --company "Acme Corp"

# Monitor performance
smartlead analytics 123 \
  --start-date 2024-01-01 \
  --end-date 2024-01-31
```

### Multi-Module Configuration
```bash
# Configure SmartLead
smartlead switch  # Select SmartLead
smartlead config  # Configure SmartLead API

# Configure Instantly (when available)
smartlead switch  # Select Instantly
smartlead config  # Configure Instantly API

# Show all configurations
smartlead show-config
```

## 🔧 Development

### Project Structure
```
smartlead-cli/
├── src/                     # TypeScript source code
│   ├── core/               # Core CLI functionality
│   ├── modules/            # Module implementations
│   └── types/              # TypeScript type definitions
├── tests/                  # Jest test suites
├── scripts/                # Build and deployment scripts
├── docs/                   # Documentation
├── dist/                   # Compiled JavaScript (generated)
├── coverage/               # Test coverage reports (generated)
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest test configuration
└── package.json           # Project configuration
```

### Build System
```bash
npm run build              # Build TypeScript to JavaScript
npm run dev                # Development mode with ts-node
npm run watch              # Watch mode for development
npm run test               # Run test suite
npm run test:coverage      # Run tests with coverage
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
npm run type-check         # TypeScript type checking
npm run clean              # Clean build artifacts
```

### Testing
```bash
npm test                   # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Code Quality
```bash
npm run lint               # Check code style
npm run lint:fix           # Fix linting issues
npm run format             # Format with Prettier
npm run type-check         # TypeScript validation
```

## 🔐 Configuration

### Global Configuration
```json
// ~/.smartlead-cli/config.json
{
  "activeModule": "smartlead",
  "lastUsed": "2024-01-01T00:00:00.000Z"
}
```

### Module-Specific Configuration
```json
// ~/.smartlead-cli/smartlead.json
{
  "name": "smartlead",
  "apiKey": "your-api-key",
  "baseUrl": "https://server.smartlead.ai/api/v1"
}
```

### Environment Variables
```bash
export SMARTLEAD_API_KEY="your-api-key"
export SMARTLEAD_BASE_URL="https://server.smartlead.ai/api/v1"
export INSTANTLY_API_KEY="your-instantly-key"
```

## 🚀 What's New in v2.0

### ✅ Complete TypeScript Rewrite
- **Type Safety**: Complete TypeScript implementation
- **Modern Architecture**: Modular design with clean separation
- **Professional Tooling**: ESLint, Prettier, Jest integration
- **Build System**: Automated build and deployment scripts

### ✅ Modular Architecture
- **Multiple Platforms**: Support for SmartLead + Instantly
- **Interactive Selector**: Easy switching between modules
- **Module-Specific Themes**: Branded experience per platform
- **Extensible Design**: Easy to add new platforms

### ✅ Enhanced Developer Experience
- **Complete Test Suite**: Jest tests with high coverage
- **Code Quality Tools**: ESLint and Prettier configuration
- **Development Scripts**: Watch mode, type checking, formatting
- **Professional Documentation**: Comprehensive guides and examples

### ✅ Production Ready
- **Installer Script**: Automated setup and verification
- **Build Automation**: Professional build and packaging
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized for speed and reliability

## 🗺️ Roadmap

See our [ROADMAP.md](ROADMAP.md) for detailed feature plans:
- **v2.1**: Enhanced UI/UX with interactive command builder
- **v2.2**: Automation workflows and CRM integrations  
- **v2.3**: AI-powered features and enterprise capabilities
- **v3.0**: Next-generation platform with web interface

## 📚 Documentation

- 📖 **API Reference**: Complete command documentation
- 🔧 **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md) - Development guide
- 🚀 **Roadmap**: [ROADMAP.md](ROADMAP.md) - Feature roadmap
- 📝 **Changelog**: [CHANGELOG.md](CHANGELOG.md) - Version history

### External Resources
- 📚 [SmartLead API Documentation](https://server.smartlead.ai/api/docs)
- 🔑 [Get SmartLead API Key](https://app.smartlead.ai/app/settings)
- 🌐 [SmartLead Platform](https://app.smartlead.ai)

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/smartlead-cli.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes with TypeScript
6. **Test** your changes: `npm test`
7. **Submit** a pull request

### Development Areas
- 🐛 **Bug Fixes**: Fix issues with existing commands
- ✨ **New Features**: Add new API endpoints or modules
- 📚 **Documentation**: Improve guides and examples
- 🧪 **Testing**: Add test coverage
- 🎨 **UI/UX**: Enhance terminal experience

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🏆 Contributors

Thanks to all contributors who help make SmartLead CLI better!

## 📊 Project Stats

- **Languages**: TypeScript (95%), Shell (3%), JavaScript (2%)
- **Lines of Code**: 3,000+ lines of professional TypeScript
- **Test Coverage**: 90%+ with comprehensive Jest tests
- **Modules**: 2 (SmartLead available, Instantly coming soon)
- **Commands**: 80+ covering complete SmartLead API
- **Dependencies**: Minimal, production-ready dependencies only

---

**🎉 The most comprehensive multi-module CLI for email marketing automation!**

Made with ❤️ and TypeScript for the email marketing community 