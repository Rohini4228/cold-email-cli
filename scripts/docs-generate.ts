#!/usr/bin/env bun

import { writeFileSync, readFileSync } from 'fs';
import { initializePlatforms, getAvailableModules } from '../src/core/module-selector';
import { platformRegistry } from '../src/core/registry';

interface PlatformInfo {
  name: string;
  displayName: string;
  description: string;
  totalCommands: number;
  categories: Array<{
    name: string;
    description: string;
    commands: number;
  }>;
  emoji: string;
  color: string;
}

const platformConfig: Record<string, { displayName: string; emoji: string; color: string; description: string }> = {
  smartlead: {
    displayName: "SmartLead",
    emoji: "🌊",
    color: "blue",
    description: "Advanced campaign management & analytics platform"
  },
  instantly: {
    displayName: "Instantly",
    emoji: "🚀",
    color: "purple", 
    description: "High-volume email automation & deliverability"
  },
  apollo: {
    displayName: "Apollo",
    emoji: "☀️",
    color: "amber",
    description: "Professional email sequences & outreach automation"
  },
  salesforge: {
    displayName: "Salesforge",
    emoji: "⚡",
    color: "orange",
    description: "AI-powered email generation & optimization"
  },
  emailbison: {
    displayName: "EmailBison",
    emoji: "🦌",
    color: "brown",
    description: "Enterprise email marketing & automation"
  },
  amplemarket: {
    displayName: "Amplemarket",
    emoji: "🎯",
    color: "blue",
    description: "AI-powered sales platform & email automation"
  },
  lemlist: {
    displayName: "lemlist",
    emoji: "💖",
    color: "pink",
    description: "Creative email outreach & automation platform"
  },
  outreach: {
    displayName: "Outreach",
    emoji: "📈",
    color: "blue",
    description: "Enterprise sales engagement platform"
  },
  quickmail: {
    displayName: "QuickMail",
    emoji: "⚡",
    color: "cyan",
    description: "Lightning-fast email automation & outreach"
  },
  salesloft: {
    displayName: "Salesloft",
    emoji: "🎪",
    color: "indigo",
    description: "Modern sales engagement platform"
  }
};

async function generateDocs() {
  console.log("🚀 Generating documentation...");

  // Initialize platforms
  await initializePlatforms();
  
  // Collect platform information
  const platforms: PlatformInfo[] = [];
  let totalCommands = 0;

  for (const [name, module] of platformRegistry.getAll()) {
    const config = platformConfig[name] || {
      displayName: name,
      emoji: "🔧",
      color: "gray",
      description: "Platform automation & management"
    };

    const platformInfo: PlatformInfo = {
      name,
      displayName: config.displayName,
      description: config.description,
      totalCommands: module.platform.totalCommands,
      categories: module.platform.categories,
      emoji: config.emoji,
      color: config.color
    };

    platforms.push(platformInfo);
    totalCommands += module.platform.totalCommands;
  }

  // Sort platforms by name for consistency
  platforms.sort((a, b) => a.name.localeCompare(b.name));

  // Generate README content
  const readmeContent = generateReadmeContent(platforms, totalCommands);
  
  // Write README
  writeFileSync('README.md', readmeContent);

  // Generate individual platform docs
  for (const platform of platforms) {
    const platformDoc = generatePlatformDoc(platform);
    writeFileSync(`docs/${platform.name}.md`, platformDoc);
  }

  console.log(`✅ Documentation generated for ${platforms.length} platforms`);
  console.log(`📊 Total commands: ${totalCommands}`);
}

function generateReadmeContent(platforms: PlatformInfo[], totalCommands: number): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `# ❄️ Cold Email CLI

> **Professional multi-platform cold email automation CLI with ${totalCommands}+ commands across ${platforms.length} major platforms**

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

# Launch platform-specific shells
bun run smartlead    # ${platformConfig.smartlead.emoji} SmartLead Command Center
bun run instantly    # ${platformConfig.instantly.emoji} Instantly Automation Hub  
bun run apollo       # ${platformConfig.apollo.emoji} Apollo Sequence Center
bun run lemlist      # ${platformConfig.lemlist.emoji} lemlist Creative Studio
\`\`\`

## 📚 Supported Platforms

<details>
<summary><strong>📊 All Platforms Overview (${platforms.length} platforms • ${totalCommands}+ commands)</strong></summary>

${platforms.map(platform => `
### ${platform.emoji} ${platform.displayName}
**${platform.totalCommands} commands** • ${platform.description}

**Command Categories:**
${platform.categories.map(cat => `- ${cat.name}: **${cat.commands} commands**`).join('\n')}

**Quick Access:** \`bun run ${platform.name}\`
`).join('\n')}

</details>

${platforms.map(platform => `
<details>
<summary><strong>${platform.emoji} ${platform.displayName} (${platform.totalCommands} commands)</strong></summary>

${platform.description}

**Command Breakdown:**
${platform.categories.map(cat => `- ${cat.name}: **${cat.commands} commands**`).join('\n')}

**Usage:**
\`\`\`bash
bun run ${platform.name}          # Interactive shell
bun run exec ${platform.name} campaigns:list  # Direct command
\`\`\`

**Documentation:** [${platform.displayName} Guide](docs/${platform.name}.md)

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

- **${totalCommands}+ Commands** across ${platforms.length} major cold email platforms
- **Beautiful Interactive Shells** with React Ink UI
- **Comprehensive API Coverage** for all platforms
- **Type-Safe TypeScript** with full IntelliSense
- **Blazing Fast Performance** with Bun runtime
- **Cross-Platform Support** (macOS, Linux, Windows)
- **Environment & Config Management** with multiple sources
- **Extensive Documentation** and examples

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
bun run test             # Run test suite
bun run lint             # Check code quality
bun run build            # Build for production

# Platform testing
bun run health           # Test all platform connections
bun test                 # Run comprehensive test suite
\`\`\`

## 📖 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[API Documentation](docs/)** - Complete API reference for all platforms
- **[Examples](examples/)** - Practical usage examples
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
}

function generatePlatformDoc(platform: PlatformInfo): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `# ${platform.emoji} ${platform.displayName}

> ${platform.description}

## Overview

${platform.displayName} provides **${platform.totalCommands} commands** across **${platform.categories.length} categories** for comprehensive email automation and campaign management.

## Quick Start

\`\`\`bash
# Interactive shell
bun run ${platform.name}

# Direct command execution
bun run exec ${platform.name} <command> --args '{"key":"value"}'

# Configuration
bun run config:set ${platform.name} apiKey "your_api_key"
\`\`\`

## Command Categories

${platform.categories.map(category => `
### ${category.name}
**${category.commands} commands available**

${category.description || 'Core functionality for ' + category.name.replace(/[^\w\s]/g, '').trim()}

`).join('')}

## Configuration

### Environment Variables
\`\`\`bash
export ${platform.name.toUpperCase()}_API_KEY="your_api_key"
export ${platform.name.toUpperCase()}_BASE_URL="https://api.${platform.name}.com"
\`\`\`

### Interactive Setup
\`\`\`bash
bun run config:set ${platform.name} apiKey "your_key"
bun run config:validate ${platform.name}
\`\`\`

## Examples

### Basic Usage
\`\`\`bash
# List campaigns
bun run exec ${platform.name} campaigns:list

# Get campaign details
bun run exec ${platform.name} campaigns:get --args '{"id":"campaign_id"}'
\`\`\`

See [examples/${platform.name}/](../examples/${platform.name}/) for more comprehensive examples.

---

*Documentation generated on ${currentDate}*
`;
}

// Run the script
if (import.meta.main) {
  generateDocs().catch(console.error);
}

export { generateDocs }; 