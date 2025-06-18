# 🚀 SmartLead CLI

[![npm version](https://badge.fury.io/js/smartlead-cli.svg)](https://badge.fury.io/js/smartlead-cli)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The most powerful and beautiful command-line interface for SmartLead API management**

Transform your SmartLead email campaigns with an intuitive, feature-rich CLI that brings enterprise-grade functionality to your terminal. Built with TypeScript, featuring responsive design, full-screen shell mode, and comprehensive filtering capabilities.

![SmartLead CLI Demo](https://via.placeholder.com/800x400/6366F1/FFFFFF?text=SmartLead+CLI+Demo)

## ✨ Features

### 🎨 **Beautiful & Responsive Interface**
- **4 Stunning Themes**: SmartLead brand, Neon, Matrix, and Default
- **Responsive Design**: Auto-adapts to terminal size (60-200+ columns)
- **Rich ANSI Effects**: Progress bars, gradients, animations, and visual indicators
- **Smart Typography**: Auto-sizing fonts and intelligent text wrapping

### 💻 **Full-Screen Shell Mode**
- **Interactive Terminal**: Type SmartLead commands directly in a dedicated shell
- **Auto-complete Support**: Smart command and parameter completion
- **Real-time Status**: Live dashboard with campaign metrics
- **Command History**: Navigate through previous commands

### 🔍 **Advanced Filtering & Search**
- **Campaign Filters**: Status, date ranges, limits, sorting, advanced stats
- **Lead Filters**: Status, company, extended info, intelligent sorting  
- **Email Account Filters**: Health status, warmup state, provider filtering
- **Smart Search**: Partial matching, intelligent suggestions

### 📊 **Comprehensive Data Management**
- **Campaign Operations**: Create, manage, start/stop, analytics, sequences
- **Lead Management**: Import, search, categorize, bulk operations
- **Email Account Control**: Warmup management, health monitoring, deliverability
- **Real-time Analytics**: Live metrics, progress tracking, performance insights

### 🛡️ **Production-Ready Features**
- **Type Safety**: Full TypeScript implementation with comprehensive types
- **Error Handling**: Intelligent error recovery and user guidance
- **Rate Limiting**: Built-in API rate limiting (10 requests/2 seconds)
- **Logging**: Comprehensive activity logging and debugging
- **Configuration**: Persistent settings with validation

## 📦 Installation

### NPM (Recommended)
```bash
npm install -g smartlead-cli
```

### Yarn
```bash
yarn global add smartlead-cli
```

### From Source
```bash
git clone https://github.com/your-username/smartlead-cli.git
cd smartlead-cli
npm install
npm run build
npm link
```

## 🚀 Quick Start

### 1. Configure Your API Key
```bash
# Set your SmartLead API key
smartlead config set --api-key=your-api-key-here

# Verify configuration
smartlead config show
```

### 2. Test Connection
```bash
# Test API connectivity
smartlead campaigns list --limit=5
```

### 3. Launch Interactive Mode
```bash
# Start the beautiful interactive interface
smartlead interactive

# Or launch the full-screen shell
smartlead shell
```

## 📚 Usage Examples

### Campaign Management
```bash
# List campaigns with advanced filtering
smartlead campaigns list --status=active --sort=newest --limit=25

# Create a new campaign
smartlead campaigns create --name="Q4 Outreach" --leads=100 --ai-esp

# View detailed campaign analytics
smartlead campaigns analytics 123 --extended

# Control campaign status
smartlead campaigns start 123
smartlead campaigns pause 123
```

### Lead Operations
```bash
# List leads with intelligent filtering
smartlead leads list --campaign=123 --status=replied --sort=recent

# Search for specific leads
smartlead leads search --email=john@company.com

# Add leads with validation
smartlead leads add --campaign=123 --file=leads.csv

# Bulk operations
smartlead leads export --campaign=123 --format=csv
```

### Email Account Management
```bash
# List email accounts with health filtering
smartlead emails list --status=healthy --warmup=enabled

# Monitor warmup statistics
smartlead emails warmup 456 --detailed

# Health monitoring
smartlead emails health --provider=gmail --alerts
```

### Advanced Analytics
```bash
# Comprehensive campaign analytics
smartlead analytics campaign 123 --date-range=30d --charts

# Export detailed reports
smartlead analytics export --format=json --campaigns=all

# Real-time dashboard
smartlead analytics dashboard --live --refresh=30s
```

## 🎨 Themes & Customization

### Available Themes
```bash
# SmartLead brand theme (default)
smartlead theme set smartlead

# Electric neon theme
smartlead theme set neon

# Matrix-style green theme
smartlead theme set matrix

# Classic terminal theme
smartlead theme set default
```

### Theme Preview
```bash
# Preview all themes
smartlead theme preview

# Live theme switching in interactive mode
smartlead interactive --theme-studio
```

## 🔧 Configuration

### Configuration File Location
- **Linux/macOS**: `~/.smartlead-cli/config.json`
- **Windows**: `%USERPROFILE%\.smartlead-cli\config.json`

### Configuration Options
```json
{
  "apiKey": "your-api-key",
  "baseUrl": "https://server.smartlead.ai/api/v1",
  "theme": "smartlead",
  "lastUsed": "2024-01-01T00:00:00.000Z"
}
```

### Environment Variables
```bash
export SMARTLEAD_API_KEY="your-api-key"
export SMARTLEAD_BASE_URL="https://server.smartlead.ai/api/v1"
export SMARTLEAD_THEME="smartlead"
```

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm 7+ or yarn 1.22+
- TypeScript 4.5+

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/your-username/smartlead-cli.git
cd smartlead-cli

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Project Structure
```
smartlead-cli/
├── src/
│   ├── api/           # API client and services
│   ├── commands/      # Command implementations
│   ├── config/        # Configuration management
│   ├── types/         # TypeScript definitions
│   ├── ui/           # Visual utilities and components
│   ├── utils/        # Helper functions
│   └── index.ts      # Main entry point
├── dist/             # Compiled JavaScript
├── docs/             # Documentation
└── tests/            # Test files
```

### Building from Source
```bash
# Clean build
npm run clean

# Compile TypeScript
npm run build

# Create distribution package
npm run package

# Publish to npm (maintainers only)
npm publish
```

## 📋 Commands Reference

### Global Commands
| Command | Description | Example |
|---------|-------------|---------|
| `interactive` | Launch interactive mode | `smartlead interactive` |
| `shell` | Full-screen shell mode | `smartlead shell` |
| `config` | Configuration management | `smartlead config show` |
| `theme` | Theme management | `smartlead theme set neon` |
| `help` | Show help information | `smartlead help campaigns` |

### Campaign Commands
| Command | Description | Filters |
|---------|-------------|---------|
| `campaigns list` | List all campaigns | `--status`, `--sort`, `--limit` |
| `campaigns create` | Create new campaign | `--name`, `--leads`, `--ai-esp` |
| `campaigns analytics` | Campaign analytics | `--extended`, `--date-range` |
| `campaigns start/pause/stop` | Control campaigns | Campaign ID required |

### Lead Commands
| Command | Description | Filters |
|---------|-------------|---------|
| `leads list` | List campaign leads | `--campaign`, `--status`, `--sort` |
| `leads search` | Search leads | `--email`, `--company`, `--name` |
| `leads add` | Add new leads | `--campaign`, `--file`, `--format` |
| `leads export` | Export lead data | `--format`, `--filters` |

### Email Commands
| Command | Description | Filters |
|---------|-------------|---------|
| `emails list` | List email accounts | `--status`, `--warmup`, `--provider` |
| `emails warmup` | Warmup management | Account ID, `--detailed` |
| `emails health` | Health monitoring | `--domain`, `--alerts` |

## 🔐 Authentication

### Getting Your API Key
1. Log in to [SmartLead](https://smartlead.ai)
2. Navigate to Settings → API
3. Click "Activate API" 
4. Copy your API key
5. Configure: `smartlead config set --api-key=YOUR_KEY`

### Security Best Practices
- Store API keys securely using environment variables
- Use different API keys for development and production
- Regularly rotate API keys
- Monitor API usage and rate limits

## 🚨 Error Handling

### Common Issues

**API Key Not Found**
```bash
❌ No valid API key found
Solution: smartlead config set --api-key=your-key
```

**Rate Limit Exceeded**
```bash
⚠️  Rate limit exceeded (10 requests/2 seconds)
Solution: CLI automatically handles rate limiting
```

**Network Connection Issues**
```bash
❌ Network error: Unable to reach SmartLead API
Solution: Check internet connection and API status
```

**Invalid Campaign ID**
```bash
❌ Campaign not found: Invalid campaign_id
Solution: Use 'smartlead campaigns list' to find valid IDs
```

### Debugging
```bash
# Enable verbose logging
export DEBUG=smartlead:*

# Check log files
cat ~/.smartlead-cli/smartlead-cli.log

# Test API connectivity
smartlead config test-connection
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Use conventional commit messages
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SmartLead](https://smartlead.ai) for the amazing email platform
- [Chalk](https://github.com/chalk/chalk) for beautiful terminal styling
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) for interactive prompts
- [Commander](https://github.com/tj/commander.js) for command-line parsing
- [Figlet](https://github.com/patorjk/figlet.js) for ASCII art

## 📞 Support

- 📖 **Documentation**: [Full API Docs](https://docs.smartlead-cli.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/smartlead-cli/issues)
- 💬 **Community**: [Discord Server](https://discord.gg/smartlead-cli)
- 📧 **Email**: support@smartlead-cli.com
- 🌐 **Website**: [smartlead-cli.com](https://smartlead-cli.com)

---

**Made with ❤️ for the SmartLead community**

*Transform your email campaigns with the power of the command line.* 