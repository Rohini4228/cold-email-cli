#!/usr/bin/env node

const { writeFileSync } = require('fs');

// Platform configuration with expected command counts
const platforms = {
  smartlead: { name: "SmartLead", emoji: "🌊", commands: 114, categories: 6 },
  instantly: { name: "Instantly", emoji: "🚀", commands: 45, categories: 3 },
  apollo: { name: "Apollo", emoji: "☀️", commands: 52, categories: 4 },
  salesforge: { name: "Salesforge", emoji: "⚡", commands: 38, categories: 3 },
  emailbison: { name: "EmailBison", emoji: "🦌", commands: 67, categories: 7 },
  amplemarket: { name: "Amplemarket", emoji: "🎯", commands: 55, categories: 5 },
  lemlist: { name: "lemlist", emoji: "💖", commands: 71, categories: 6 },
  outreach: { name: "Outreach", emoji: "📈", commands: 84, categories: 6 },
  quickmail: { name: "QuickMail", emoji: "⚡", commands: 42, categories: 6 },
  salesloft: { name: "Salesloft", emoji: "🎪", commands: 59, categories: 6 }
};

function generateReadme() {
  const totalCommands = Object.values(platforms).reduce((sum, p) => sum + p.commands, 0);
  const totalPlatforms = Object.keys(platforms).length;
  const currentDate = new Date().toISOString().split('T')[0];

  const readmeContent = `# ❄️ Cold Email CLI

> **Professional multi-platform cold email automation CLI with ${totalCommands}+ commands across ${totalPlatforms} major platforms**

[![CI](https://github.com/LeadMagic/cold-email-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/LeadMagic/cold-email-cli/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🚀 Quick Start

\`\`\`bash
# Install with Bun (recommended)
curl -fsSL https://bun.sh/install | bash
git clone https://github.com/LeadMagic/cold-email-cli.git
cd cold-email-cli
bun install

# Launch interactive menu
bun run menu

# Launch platform-specific shells with beautiful ASCII art
bun run smartlead    # 🌊 SmartLead Command Center
bun run instantly    # 🚀 Instantly Automation Hub  
bun run apollo       # ☀️ Apollo Sequence Center
bun run lemlist      # 💖 lemlist Creative Studio
\`\`\`

## 📚 Supported Platforms

<details>
<summary><strong>📊 All Platforms Overview (${totalPlatforms} platforms • ${totalCommands}+ commands)</strong></summary>

${Object.entries(platforms).map(([key, platform]) => `
### ${platform.emoji} ${platform.name}
**${platform.commands} commands** • Professional automation platform

**Quick Access:** \`bun run ${key}\`
`).join('\n')}

</details>

${Object.entries(platforms).map(([key, platform]) => `
<details>
<summary><strong>${platform.emoji} ${platform.name} (${platform.commands} commands)</strong></summary>

Professional ${platform.name.toLowerCase()} automation and campaign management platform.

**Features:**
- **${platform.commands} total commands** across **${platform.categories} categories**
- Campaign management and automation
- Lead generation and management
- Email sequences and templates
- Analytics and reporting
- Account management

**Usage:**
\`\`\`bash
bun run ${key}                    # Interactive shell
bun run exec ${key} campaigns:list  # Direct command
\`\`\`

**Documentation:** [${platform.name} Guide](docs/${key}.md)

</details>`).join('\n')}

## ⚙️ Configuration

### Environment Variables
\`\`\`bash
# Set API keys for any platform
export SMARTLEAD_API_KEY="your_key_here"
export INSTANTLY_API_KEY="your_key_here"
export APOLLO_API_KEY="your_key_here"
# ... (see config:env-example for all platforms)
\`\`\`

### Interactive Configuration
\`\`\`bash
# Configure platforms interactively
bun run config:set smartlead apiKey "your_api_key"
bun run config:list              # List all configurations
bun run config:validate          # Validate all platforms
\`\`\`

## 🎯 Key Features

- **${totalCommands}+ Commands** across ${totalPlatforms} major cold email platforms
- **Beautiful Interactive Shells** with React Ink UI and authentic platform branding
- **Comprehensive API Coverage** for all platforms
- **Type-Safe TypeScript** with full IntelliSense
- **Blazing Fast Performance** with Bun runtime
- **Cross-Platform Support** (macOS, Linux, Windows)
- **Environment & Config Management** with multiple sources
- **Extensive Documentation** and practical examples

## 🔧 Global Commands

\`\`\`bash
cec platforms           # List all available platforms  
cec health              # Check platform health status
cec search "campaign"   # Search commands across platforms
cec config:list         # Show configuration status
cec discord             # Join our Discord community
\`\`\`

## 🛠️ Development

\`\`\`bash
# Development setup
bun install
bun run dev              # Start development mode
bun run test             # Run comprehensive test suite
bun run lint             # Check code quality
bun run build            # Build for production

# Platform testing
bun run health           # Test all platform connections
bun test                 # Run platform validation tests
\`\`\`

## 📖 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[API Documentation](docs/)** - Complete API reference for all platforms
- **[Examples](examples/)** - Practical usage examples for every platform
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🤝 Community

- **[Discord](https://discord.gg/mB76X5QJ)** - Join our community
- **[GitHub Issues](https://github.com/LeadMagic/cold-email-cli/issues)** - Report bugs or request features
- **[Discussions](https://github.com/LeadMagic/cold-email-cli/discussions)** - Ask questions and share ideas

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

*Built with ❤️ by the Cold Email Community • Last updated: ${currentDate}*
`;

  writeFileSync('README.md', readmeContent);
  console.log('✅ README.md updated with current platform data');
  console.log(`📊 Total: ${totalCommands} commands across ${totalPlatforms} platforms`);
}

// Add script to package.json
function updatePackageJson() {
  try {
    const packageJson = require('../package.json');
    if (!packageJson.scripts['docs:generate']) {
      packageJson.scripts['docs:generate'] = 'node scripts/docs-generate.js';
      writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
      console.log('✅ Added docs:generate script to package.json');
    }
  } catch (error) {
    console.log('⚠️ Could not update package.json scripts');
  }
}

if (require.main === module) {
  generateReadme();
  updatePackageJson();
} 