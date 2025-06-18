# ❄️ LeadMagic Professional Cold Email CLI

```
  ██████╗ ██████╗ ██╗     ██████╗     ███████╗███╗   ███╗ █████╗ ██╗██╗      ██████╗██╗     ██╗
 ██╔════╝██╔═══██╗██║     ██╔══██╗    ██╔════╝████╗ ████║██╔══██╗██║██║     ██╔════╝██║     ██║
 ██║     ██║   ██║██║     ██║  ██║    █████╗  ██╔████╔██║███████║██║██║     ██║     ██║     ██║
 ██║     ██║   ██║██║     ██║  ██║    ██╔══╝  ██║╚██╔╝██║██╔══██║██║██║     ██║     ██║     ██║
 ╚██████╗╚██████╔╝███████╗██████╔╝    ███████╗██║ ╚═╝ ██║██║  ██║██║███████╗╚██████╗███████╗██║
  ╚═════╝ ╚═════╝ ╚══════╝╚═════╝     ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝
                                                                                                  
                     🚀 PROFESSIONAL MULTI-PLATFORM AUTOMATION SUITE 🚀
```

[![GitHub Release](https://img.shields.io/github/v/release/LeadMagic/cold-email-cli?style=for-the-badge)](https://github.com/LeadMagic/cold-email-cli/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

---

## 🚀 **Multi-Platform Integration**

Connect and automate across all major cold email platforms with unified command-line interface:

| Platform | Status | Commands | Focus Area | API Documentation |
|----------|---------|----------|------------|-------------------|
| **🎯 [smartlead.ai](https://smartlead.ai)** | ✅ Available | 82+ | Scale, Analytics, Infrastructure | [📖 API Docs](https://docs.smartlead.ai/) |
| **⚡ [instantly.ai](https://instantly.ai)** | ✅ Available | 35+ | Volume, Deliverability, Automation | [📖 API Docs](https://developer.instantly.ai/) |
| **🤖 [salesforge.ai](https://salesforge.ai)** | ✅ Available | 12+ | AI, Multi-Channel, Personalization | [📖 API Docs](https://api.salesforge.ai/public/v2/swagger/index.html) |
| **📧 [apollo.io](https://apollo.io)** | ✅ Available | 6+ | Email Sequences, Contact Management | [📖 API Docs](https://docs.apollo.io/) |

**Total: 135+ Commands** across all major cold email platforms.

---

## ⚡ **Quick Installation**

### 🎯 **One-Line Install** (Recommended)
```bash
curl -fsSL https://raw.githubusercontent.com/LeadMagic/cold-email-cli/main/scripts/install.sh | bash
```

### 📦 **NPM Installation**
```bash
npm install -g leadmagic-cold-email-cli
leadmagic-cli
```

### 🍎 **macOS Users**
```bash
# Download latest .dmg from releases
open https://github.com/LeadMagic/cold-email-cli/releases

# Or build locally
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli
npm install && npm run build:mac
```

---

## 🎯 **Quick Start Guide**

### 1️⃣ **Launch the CLI**
```bash
leadmagic-cli
```

### 2️⃣ **Select Your Platform**
```
❄️ LeadMagic Professional Cold Email CLI

🎯 Professional Multi-Platform Cold Email Automation Suite
   Professional-grade CLI for scaling cold outreach campaigns

◆ Choose your cold email platform:
│ ● smartlead.ai v2.0.0 (Advanced Campaign Management & Analytics • 82 commands)
│ ○ instantly.ai v2.0.0 (High-Volume Automation & Deliverability • 35 commands)  
│ ○ salesforge.ai v1.0.0 (AI-Powered Cold Email Automation • 12 commands)
│ ○ apollo.io v1.0.0 (Email Sequencing & Outreach • 6 commands)
└
```

### 3️⃣ **Configure API Credentials**
```bash
# Platform-specific setup
config:smartlead --api-key YOUR_SMARTLEAD_KEY
config:instantly --api-key YOUR_INSTANTLY_KEY  
config:salesforge --api-key YOUR_SALESFORGE_KEY
config:apollo --api-key YOUR_APOLLO_KEY
```

### 4️⃣ **Start Automating**
```bash
# List all available commands
help

# Platform-specific examples
campaigns:create --name "Enterprise Outreach" --type email
leads:import --file prospects.csv --validate-emails
sequences:create --name "AI Sequence" --persona "VP Sales"
```

---

## 🛠️ **Platform-Specific Commands**

<details>
<summary><strong>🎯 smartlead.ai Commands (82+)</strong></summary>

### Campaign Management
```bash
campaigns:create --name "Q1 Outreach" --warmup-enabled
campaigns:list --status active --analytics detailed
campaigns:analytics --id cam_123 --metrics all
campaigns:pause --id cam_123 --reason "weekend"
```

### Lead Management  
```bash
leads:import --file prospects.csv --validate-emails
leads:search --filters "title:VP,CEO" --company-size 500+
leads:segment --criteria "opened_emails>3" --name "Hot Prospects"
leads:enrich --fields "phone,linkedin,company_info"
```

### Email Account Management
```bash
accounts:connect --email sales@company.com --warmup-auto
accounts:health --domain company.com --reputation-check
accounts:deliverability --account acc_123 --detailed-report
accounts:warmup-stats --account acc_123 --period 30d
```

### Advanced Analytics
```bash
analytics:forecast --model advanced --horizon 90d
analytics:cohort --segment enterprise --metric reply-rate
analytics:dashboard --date-range 30d --format pdf
analytics:compare --campaigns cam_1,cam_2 --metric reply-rate
```

**📖 [Complete smartlead.ai API Documentation](https://docs.smartlead.ai/)**

</details>

<details>
<summary><strong>⚡ instantly.ai Commands (35+)</strong></summary>

### High-Volume Automation
```bash
campaigns:launch --id cam_12345 --volume high --daily-limit 500
campaigns:analytics --id cam_123 --timeframe 30d
campaigns:clone --id cam_123 --name "Cloned Campaign"
```

### Lead Management
```bash
leads:import --file leads.csv --verify-emails --enrich-data
leads:export --campaign cam_123 --status replied --format csv
leads:blacklist --domain competitor.com --reason "competitor"
leads:bulk-create --file leads.csv --campaign cam_123
```

### Deliverability & Automation
```bash
deliverability:monitor --accounts all --alerts enabled
deliverability:check --domain company.com --detailed-report
automation:setup --triggers "no-reply:3d,opened:1d" --actions follow-up
unibox:conversations --status unread --priority high
```

### Account Management
```bash
accounts:warmup-start --email john@company.com
accounts:list --status connected --health-check
spam:test --content "Your email content here"
```

**📖 [Complete instantly.ai API Documentation](https://developer.instantly.ai/)**

</details>

<details>
<summary><strong>🤖 salesforge.ai Commands (12+)</strong></summary>

### AI-Powered Campaigns
```bash
campaigns:create --name "AI Outreach" --ai-optimization enabled
campaigns:analytics --id cam_123 --ai-insights true
```

### AI Sequences & Templates
```bash
sequences:create --persona "Enterprise VP" --ai-generate true
sequences:optimize --id seq_123 --goal reply-rate --ai-suggestions
templates:generate --tone professional --industry SaaS
templates:optimize --id tmpl_123 --goal open-rate
```

### Lead Scoring & Management
```bash
leads:import --file leads.csv --enrich-ai true
leads:score --criteria "title,company_size,industry" --ai-model advanced
```

### Multi-Channel Automation
```bash
multichannel:create --channels "email,linkedin,phone" --sequence-ai
analytics:ai-insights --campaign cam_123 --recommendations enabled
```

**📖 [Complete salesforge.ai API Documentation](https://api.salesforge.ai/public/v2/swagger/index.html)**

</details>

<details>
<summary><strong>📧 apollo.io Commands (6+)</strong></summary>

### Email Sequences
```bash
sequences:list --active true --performance-metrics
sequences:create --name "Professional Outreach" --max-steps 5
sequences:analytics --id seq_123 --date-range 30d
```

### Contact & Template Management
```bash
contacts:add-to-sequence --sequence seq_123 --contacts contact_1,contact_2
templates:create --name "Follow-up" --subject "Re: Partnership Discussion"
```

**📖 [Complete apollo.io API Documentation](https://docs.apollo.io/)**

</details>

---

## 🤝 **Join Our Community**

### 🌟 **Become a Contributor**

We're actively looking for contributors! Here's how you can help:

#### **🚀 How to Contribute**
1. **Fork the repository** - Click the fork button above
2. **Clone your fork** - `git clone https://github.com/YOUR_USERNAME/cold-email-cli.git`
3. **Create a branch** - `git checkout -b feature/awesome-feature`
4. **Make changes** - Add your awesome improvements
5. **Test thoroughly** - `npm test && npm run build`
6. **Submit PR** - Create a pull request with detailed description

#### **🎯 What We Need Help With**
- **🔧 Platform Integrations** - Add new cold email platforms
- **📖 Documentation** - Improve guides and API docs
- **🧪 Testing** - Write tests for new features
- **🎨 UI/UX** - Enhance the CLI interface
- **🐛 Bug Fixes** - Fix issues and improve stability
- **🌍 Translations** - Localize for different languages

#### **💡 Feature Requests & Ideas**
Have ideas for new features? We'd love to hear them!
- **💬 [Start a Discussion](https://github.com/LeadMagic/cold-email-cli/discussions)**
- **📝 [Submit Feature Request](https://github.com/LeadMagic/cold-email-cli/issues/new?template=feature_request.md)**

### 🐛 **Bug Reports**

Found a bug? Help us fix it!

1. **🔍 [Search existing issues](https://github.com/LeadMagic/cold-email-cli/issues)** first
2. **📝 [Create new issue](https://github.com/LeadMagic/cold-email-cli/issues/new?template=bug_report.md)** with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node.js version, CLI version)
   - Screenshots/logs if applicable

---

## 🛠️ **Development Setup**

### **Prerequisites**
- **Node.js** 18.0.0+ ([Download](https://nodejs.org/))
- **npm** 8.0.0+ or **yarn** 1.22.0+
- **Git** ([Download](https://git-scm.com/))

### **Local Development**
```bash
# 1. Clone the repository
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Run locally
node dist/core/index.js

# 5. Run tests
npm test

# 6. Watch mode for development
npm run dev
```

### **Build Scripts**
```bash
npm run build            # Build for all platforms
npm run build:mac        # Build Mac app bundle  
npm run build:installer  # Create Mac installer (.pkg)
npm run test             # Run test suite
npm run test:coverage    # Run tests with coverage
npm run lint             # Lint TypeScript code
npm run format           # Format code with Prettier
```

### **Project Structure**
```
cold-email-cli/
├── src/
│   ├── core/           # CLI core functionality
│   ├── modules/        # Platform implementations
│   │   ├── smartlead/  # smartlead.ai integration
│   │   ├── instantly/  # instantly.ai integration  
│   │   ├── salesforge/ # salesforge.ai integration
│   │   └── apollo/     # apollo.io integration
│   └── types/          # TypeScript definitions
├── tests/              # Test files
├── scripts/            # Build and deployment scripts
└── docs/               # Documentation
```

---

## 📚 **Documentation & Resources**

### **📖 Official Documentation**
- **[Getting Started Guide](docs/getting-started.md)** - Complete setup walkthrough
- **[API Reference](docs/api-reference.md)** - All commands and parameters
- **[Configuration Guide](docs/configuration.md)** - Environment setup
- **[Troubleshooting](docs/troubleshooting.md)** - Common issues and solutions

### **🔗 Platform Resources**
- **[smartlead.ai Documentation](https://docs.smartlead.ai/)** - Complete API reference
- **[instantly.ai Documentation](https://developer.instantly.ai/)** - Developer resources
- **[salesforge.ai Documentation](https://api.salesforge.ai/public/v2/swagger/index.html)** - Swagger API docs
- **[apollo.io Documentation](https://docs.apollo.io/)** - Platform API guide

### **📞 Community Support**
- **💬 [GitHub Discussions](https://github.com/LeadMagic/cold-email-cli/discussions)** - Community Q&A
- **🐛 [Issue Tracker](https://github.com/LeadMagic/cold-email-cli/issues)** - Bug reports & feature requests
- **📧 [Email Support](mailto:support@leadmagic.com)** - Direct support contact

---

## 📊 **System Requirements**

### **Minimum Requirements**
- **Operating System**: macOS 10.15+, Ubuntu 18.04+, Windows 10+
- **Node.js**: v18.0.0 or higher
- **Memory**: 512MB RAM available
- **Storage**: 100MB free space
- **Network**: Internet connection for API calls

### **Recommended**
- **Operating System**: macOS 12+, Ubuntu 20.04+, Windows 11+
- **Node.js**: v20.0.0 LTS
- **Memory**: 1GB RAM available
- **Storage**: 500MB free space
- **Terminal**: Modern terminal with color support

---

## 🔒 **Security & Privacy**

### **🛡️ Security Features**
- **Local Credential Storage** - API keys stored securely on your machine
- **No Data Collection** - Your campaign data stays with your chosen platforms
- **Open Source Transparency** - Full source code available for security review
- **Regular Security Updates** - Automated dependency vulnerability scanning

### **🔐 Privacy Policy**
- **No Telemetry** - We don't track your usage or collect analytics
- **No Data Transmission** - Your data goes directly to your chosen platforms
- **Local Configuration** - All settings stored locally on your machine
- **MIT Licensed** - Commercial and personal use permitted

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Copyright © 2024 LeadMagic**

### **Commercial Use**
✅ **Permitted** - Use in commercial projects  
✅ **Permitted** - Modify and distribute  
✅ **Permitted** - Private use  
✅ **Permitted** - Include in proprietary software  

---

## 🙏 **Acknowledgments**

### **🚀 Core Team**
- **[LeadMagic Team](https://leadmagic.io)** - Primary development support
- **Open Source Contributors** - Community developers and maintainers

### **🤝 Platform Partners**
- **[smartlead.ai](https://smartlead.ai)** - Advanced campaign management platform
- **[instantly.ai](https://instantly.ai)** - High-volume email automation
- **[salesforge.ai](https://salesforge.ai)** - AI-powered multi-channel sequences  
- **[apollo.io](https://apollo.io)** - Professional email sequencing

### **🛠️ Technology Stack**
- **[TypeScript](https://typescriptlang.org/)** - Type-safe development
- **[Node.js](https://nodejs.org/)** - Runtime environment
- **[@clack/prompts](https://github.com/natemoo-re/clack)** - Beautiful CLI prompts
- **[chalk](https://github.com/chalk/chalk)** - Terminal styling

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                🎯 Ready to revolutionize your cold email campaigns? 🎯       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

[![Get Started](https://img.shields.io/badge/🚀%20Get%20Started-FF6B35?style=for-the-badge)](https://github.com/LeadMagic/cold-email-cli/releases)
[![Contribute](https://img.shields.io/badge/🤝%20Contribute-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

**LeadMagic Professional Cold Email CLI** • **Built with ❤️ by the Community**

</div> 