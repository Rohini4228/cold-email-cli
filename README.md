# ❄️ Cold Email CLI - Professional Multi-Platform Automation

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Bun](https://img.shields.io/badge/bun-%3E%3D1.0.0-orange.svg)
![Platforms](https://img.shields.io/badge/platforms-9-purple.svg)
![Commands](https://img.shields.io/badge/commands-372%2B-red.svg)

*Professional command-line interface for cold email automation across 9 major platforms*

[📚 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🌐 Platforms](#-supported-platforms) • [💬 Community](https://discord.gg/mB76X5QJ)

</div>

---

## 📊 Platform Statistics

<table>
<tr>
<td>

**🎯 Platforms Supported**
- ✅ **9 Active Platforms**
- 🔧 **372+ Commands**
- 📊 **41 Categories** 
- 🎨 **Interactive Shells**

</td>
<td>

**⚡ Performance**
- 🚀 **Bun-Powered** (~2x faster)
- 🔒 **Type-Safe** (Zod validation)
- 🌈 **Branded Themes**
- 📱 **Interactive UI**

</td>
</tr>
</table>

---

## 🌐 Supported Platforms

<details>
<summary>📈 <strong>Platform Distribution Chart</strong></summary>

```
SmartLead     ████████████████████ 68 commands (18.3%)
Outreach      ███████████████      55 commands (14.8%) 
SalesLoft     █████████████        48 commands (12.9%)
Instantly     ████████████         45 commands (12.1%)
Salesforge    ████████████         42 commands (11.3%)
Apollo        ████████████         42 commands (11.3%)
Email Bison   █████████            32 commands (8.6%)
LemList       ███████              25 commands (6.7%)
AmpleMarket   ████                 15 commands (4.0%)
```

</details>

### 🎨 Platform Overview

| Platform | Logo | Commands | Categories | Status | Theme | Specialty |
|----------|------|----------|------------|--------|-------|-----------|
| [**SmartLead**](https://smartlead.ai) | 🌊 | **68** | 6 | ✅ Active | Ocean Blue | Enterprise Analytics |
| [**Outreach**](https://outreach.io) | 🏢 | **55** | 6 | ✅ Active | Enterprise Blue | Sales Engagement |
| [**SalesLoft**](https://salesloft.com) | 🌟 | **48** | 6 | ✅ Active | Modern Indigo | Cadence Management |
| [**Instantly**](https://instantly.ai) | 🚀 | **45** | 3 | ✅ Active | Royal Purple | High-Volume Automation |
| [**Salesforge**](https://salesforge.ai) | 🔥 | **42** | 1 | ✅ Active | Vibrant Orange | AI-Powered Sequences |
| [**Apollo**](https://apollo.io) | ☀️ | **42** | 4 | ✅ Active | Amber Gold | Professional Outreach |
| [**Email Bison**](https://emailbison.com) | ⚡ | **32** | 7 | ✅ Active | Rich Brown | Power Automation |
| [**LemList**](https://lemlist.com) | 🌈 | **25** | 6 | ✅ Active | Creative Pink | Visual Templates |
| [**AmpleMarket**](https://amplemarket.com) | 💼 | **15** | 5 | ✅ Active | Professional Blue | Sales Intelligence |

---

## 🏗️ Project Architecture

<details>
<summary>📁 <strong>Directory Structure</strong></summary>

```
smartlead-cli-ink/
├── 📁 src/
│   ├── 🎯 cli.ts                    # Main CLI entry point
│   ├── 📁 components/
│   │   └── MainMenu.tsx             # Interactive platform selector
│   ├── 📁 core/
│   │   ├── index.ts                 # Core functionality
│   │   ├── module-selector.ts       # Platform management
│   │   └── 📁 utils/
│   │       ├── config.ts           # Configuration utilities
│   │       └── theme.ts            # Branded theming system
│   ├── 📁 modules/                  # Platform implementations
│   │   ├── 📁 smartlead/           # SmartLead integration
│   │   │   ├── api.ts              # API client
│   │   │   ├── ascii.ts            # ASCII art branding
│   │   │   ├── index.ts            # Module exports
│   │   │   ├── shell.tsx           # Interactive shell
│   │   │   ├── 📁 commands/        # Command implementations
│   │   │   │   ├── accounts.ts     # Email account management
│   │   │   │   ├── analytics.ts    # Campaign analytics
│   │   │   │   ├── campaigns.ts    # Campaign operations
│   │   │   │   ├── leads.ts        # Lead management
│   │   │   │   ├── sequences.ts    # Email sequences
│   │   │   │   └── templates.ts    # Template management
│   │   │   └── 📁 mcp/
│   │   │       └── smartlead-mcp.json  # MCP configuration
│   │   ├── 📁 instantly/           # Instantly integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── types.ts
│   │   │   ├── 📁 commands/
│   │   │   │   ├── accounts.ts
│   │   │   │   ├── campaigns.ts
│   │   │   │   └── leads.ts
│   │   │   └── 📁 mcp/
│   │   │       └── instantly-mcp.json
│   │   ├── 📁 salesforge/          # Salesforge integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── types.ts
│   │   │   ├── 📁 commands/
│   │   │   │   └── sequences.ts
│   │   │   └── 📁 mcp/
│   │   │       └── salesforge-mcp.json
│   │   ├── 📁 apollo/              # Apollo integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── types.ts
│   │   │   ├── 📁 commands/
│   │   │   │   ├── accounts.ts
│   │   │   │   ├── contacts.ts
│   │   │   │   ├── sequences.ts
│   │   │   │   └── templates.ts
│   │   │   └── 📁 mcp/
│   │   │       └── apollo-mcp.json
│   │   ├── 📁 emailbison/          # Email Bison integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── 📁 commands/
│   │   │   │   ├── accounts.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── automation.ts
│   │   │   │   ├── campaigns.ts
│   │   │   │   ├── leads.ts
│   │   │   │   ├── sequences.ts
│   │   │   │   └── templates.ts
│   │   │   └── 📁 mcp/
│   │   │       └── emailbison-mcp.json
│   │   ├── 📁 amplemarket/         # AmpleMarket integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── 📁 commands/
│   │   │   │   ├── account.ts
│   │   │   │   ├── contacts.ts
│   │   │   │   ├── leadlists.ts
│   │   │   │   ├── sequences.ts
│   │   │   │   └── tasks.ts
│   │   │   └── 📁 mcp/
│   │   │       └── amplemarket-mcp.json
│   │   ├── 📁 outreach/            # Outreach integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── 📁 commands/
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── mailboxes.ts
│   │   │   │   ├── prospects.ts
│   │   │   │   ├── sequences.ts
│   │   │   │   ├── settings.ts
│   │   │   │   └── templates.ts
│   │   │   └── 📁 mcp/
│   │   │       └── outreach-mcp.json
│   │   ├── 📁 salesloft/           # SalesLoft integration
│   │   │   ├── api.ts
│   │   │   ├── ascii.ts
│   │   │   ├── index.ts
│   │   │   ├── shell.tsx
│   │   │   ├── 📁 commands/
│   │   │   │   ├── admin.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── cadences.ts
│   │   │   │   ├── calls.ts
│   │   │   │   ├── email.ts
│   │   │   │   └── people.ts
│   │   │   └── 📁 mcp/
│   │   │       └── salesloft-mcp.json
│   │   └── 📁 lemlist/             # LemList integration
│   │       ├── api.ts
│   │       ├── ascii.ts
│   │       ├── index.ts
│   │       ├── shell.tsx
│   │       ├── 📁 commands/
│   │       │   ├── analytics.ts
│   │       │   ├── campaigns.ts
│   │       │   ├── leads.ts
│   │       │   ├── sequences.ts
│   │       │   ├── team.ts
│   │       │   └── templates.ts
│   │       └── 📁 mcp/
│   │           └── lemlist-mcp.json
│   └── 📁 types/
│       ├── global.ts               # Global type definitions
│       ├── instantly.ts            # Instantly-specific types
│       └── schemas.ts              # Zod validation schemas
├── 📁 config/
│   └── environment.example         # Environment configuration template
├── 📁 docs/                        # Documentation
├── 📁 examples/                    # Usage examples
├── 📁 mcp/                         # MCP configurations
├── 📁 scripts/                     # Build and deployment scripts
└── 📁 tests/                       # Test suites
```

</details>

---

## 📋 Commands by Platform

<details>
<summary>🌊 <strong>SmartLead Commands (68 total)</strong></summary>

### 📊 Analytics (12 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `analytics:campaign` | Get campaign analytics | `cec smartlead analytics:campaign --id camp_123` |
| `analytics:leads` | Analyze lead performance | `cec smartlead analytics:leads --campaign camp_123` |
| `analytics:sequences` | Sequence performance metrics | `cec smartlead analytics:sequences --id seq_456` |
| `analytics:accounts` | Email account performance | `cec smartlead analytics:accounts --status active` |
| `analytics:overview` | Complete analytics dashboard | `cec smartlead analytics:overview --period 30d` |
| `analytics:export` | Export analytics data | `cec smartlead analytics:export --format csv` |
| `analytics:real-time` | Real-time campaign metrics | `cec smartlead analytics:real-time --campaign camp_123` |
| `analytics:deliverability` | Email deliverability report | `cec smartlead analytics:deliverability --account acc_789` |
| `analytics:engagement` | Engagement tracking | `cec smartlead analytics:engagement --period 7d` |
| `analytics:roi` | ROI and conversion metrics | `cec smartlead analytics:roi --campaign camp_123` |
| `analytics:compare` | Compare campaign performance | `cec smartlead analytics:compare --campaigns camp_1,camp_2` |
| `analytics:forecast` | Performance forecasting | `cec smartlead analytics:forecast --days 30` |

### 🎯 Campaigns (15 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `campaigns:list` | List all campaigns | `cec smartlead campaigns:list --status active` |
| `campaigns:create` | Create new campaign | `cec smartlead campaigns:create --name "Q1 Outreach"` |
| `campaigns:update` | Update campaign settings | `cec smartlead campaigns:update --id camp_123 --status paused` |
| `campaigns:delete` | Delete campaign | `cec smartlead campaigns:delete --id camp_123` |
| `campaigns:start` | Start campaign | `cec smartlead campaigns:start --id camp_123` |
| `campaigns:pause` | Pause campaign | `cec smartlead campaigns:pause --id camp_123` |
| `campaigns:clone` | Clone existing campaign | `cec smartlead campaigns:clone --id camp_123 --name "Q2 Clone"` |
| `campaigns:settings` | Get campaign settings | `cec smartlead campaigns:settings --id camp_123` |
| `campaigns:limits` | View sending limits | `cec smartlead campaigns:limits --id camp_123` |
| `campaigns:schedule` | Schedule campaign | `cec smartlead campaigns:schedule --id camp_123 --time "2024-01-15T09:00:00Z"` |
| `campaigns:bulk-update` | Bulk update campaigns | `cec smartlead campaigns:bulk-update --status paused` |
| `campaigns:export` | Export campaign data | `cec smartlead campaigns:export --id camp_123 --format json` |
| `campaigns:duplicate` | Duplicate campaign structure | `cec smartlead campaigns:duplicate --id camp_123` |
| `campaigns:archive` | Archive old campaign | `cec smartlead campaigns:archive --id camp_123` |
| `campaigns:restore` | Restore archived campaign | `cec smartlead campaigns:restore --id camp_123` |

### 👥 Leads (18 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `leads:list` | List campaign leads | `cec smartlead leads:list --campaign camp_123` |
| `leads:add` | Add new lead | `cec smartlead leads:add --email john@company.com --name "John Doe"` |
| `leads:update` | Update lead information | `cec smartlead leads:update --id lead_456 --status active` |
| `leads:delete` | Remove lead | `cec smartlead leads:delete --id lead_456` |
| `leads:import` | Import leads from file | `cec smartlead leads:import --file leads.csv --campaign camp_123` |
| `leads:export` | Export leads data | `cec smartlead leads:export --campaign camp_123 --format csv` |
| `leads:search` | Search leads | `cec smartlead leads:search --query "john@company.com"` |
| `leads:bulk-add` | Add multiple leads | `cec smartlead leads:bulk-add --file bulk_leads.json` |
| `leads:bulk-update` | Update multiple leads | `cec smartlead leads:bulk-update --status paused --campaign camp_123` |
| `leads:bulk-delete` | Delete multiple leads | `cec smartlead leads:bulk-delete --campaign camp_123 --status bounced` |
| `leads:segment` | Segment leads | `cec smartlead leads:segment --criteria engagement:high` |
| `leads:tag` | Tag leads | `cec smartlead leads:tag --ids lead_1,lead_2 --tag "priority"` |
| `leads:untag` | Remove tags from leads | `cec smartlead leads:untag --ids lead_1,lead_2 --tag "priority"` |
| `leads:merge` | Merge duplicate leads | `cec smartlead leads:merge --primary lead_1 --duplicate lead_2` |
| `leads:activity` | View lead activity | `cec smartlead leads:activity --id lead_456` |
| `leads:score` | Get lead scores | `cec smartlead leads:score --campaign camp_123` |
| `leads:validate` | Validate email addresses | `cec smartlead leads:validate --emails john@company.com,jane@corp.com` |
| `leads:enrich` | Enrich lead data | `cec smartlead leads:enrich --id lead_456` |

### 📧 Email Accounts (12 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `accounts:list` | List email accounts | `cec smartlead accounts:list --status connected` |
| `accounts:add` | Add email account | `cec smartlead accounts:add --email john@company.com --provider gmail` |
| `accounts:update` | Update account settings | `cec smartlead accounts:update --id acc_789 --daily-limit 50` |
| `accounts:delete` | Remove email account | `cec smartlead accounts:delete --id acc_789` |
| `accounts:test` | Test account connection | `cec smartlead accounts:test --id acc_789` |
| `accounts:warmup` | Enable/disable warmup | `cec smartlead accounts:warmup --id acc_789 --enable true` |
| `accounts:limits` | View sending limits | `cec smartlead accounts:limits --id acc_789` |
| `accounts:health` | Check account health | `cec smartlead accounts:health --id acc_789` |
| `accounts:sync` | Sync account status | `cec smartlead accounts:sync --id acc_789` |
| `accounts:deliverability` | Check deliverability score | `cec smartlead accounts:deliverability --id acc_789` |
| `accounts:reputation` | View sender reputation | `cec smartlead accounts:reputation --id acc_789` |
| `accounts:rotate` | Rotate sending accounts | `cec smartlead accounts:rotate --campaign camp_123` |

### 🔄 Sequences (8 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `sequences:list` | List email sequences | `cec smartlead sequences:list --campaign camp_123` |
| `sequences:create` | Create new sequence | `cec smartlead sequences:create --name "Follow-up Series"` |
| `sequences:update` | Update sequence | `cec smartlead sequences:update --id seq_456 --name "Updated Series"` |
| `sequences:delete` | Delete sequence | `cec smartlead sequences:delete --id seq_456` |
| `sequences:steps` | Manage sequence steps | `cec smartlead sequences:steps --id seq_456 --action list` |
| `sequences:test` | Test sequence flow | `cec smartlead sequences:test --id seq_456 --email test@example.com` |
| `sequences:clone` | Clone sequence | `cec smartlead sequences:clone --id seq_456 --name "Cloned Series"` |
| `sequences:analytics` | Sequence performance | `cec smartlead sequences:analytics --id seq_456` |

### 📝 Templates (3 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `templates:list` | List email templates | `cec smartlead templates:list --category outreach` |
| `templates:create` | Create new template | `cec smartlead templates:create --name "Introduction" --subject "Hello {{firstName}}"` |
| `templates:update` | Update template | `cec smartlead templates:update --id tmpl_789 --subject "Updated Subject"` |

</details>

<details>
<summary>🚀 <strong>Instantly Commands (45 total)</strong></summary>

### 🎯 Campaigns (15 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `campaigns:list` | List all campaigns | `cec instantly campaigns:list --status active` |
| `campaigns:create` | Create new campaign | `cec instantly campaigns:create --name "Enterprise Outreach"` |
| `campaigns:update` | Update campaign | `cec instantly campaigns:update --id camp_123 --daily-limit 100` |
| `campaigns:delete` | Delete campaign | `cec instantly campaigns:delete --id camp_123` |
| `campaigns:start` | Launch campaign | `cec instantly campaigns:start --id camp_123` |
| `campaigns:pause` | Pause campaign | `cec instantly campaigns:pause --id camp_123` |
| `campaigns:clone` | Clone campaign | `cec instantly campaigns:clone --id camp_123` |
| `campaigns:analytics` | Campaign analytics | `cec instantly campaigns:analytics --id camp_123` |
| `campaigns:leads-count` | Count campaign leads | `cec instantly campaigns:leads-count --id camp_123` |
| `campaigns:schedule` | Schedule sending | `cec instantly campaigns:schedule --id camp_123` |
| `campaigns:warmup` | Enable campaign warmup | `cec instantly campaigns:warmup --id camp_123` |
| `campaigns:deliverability` | Check deliverability | `cec instantly campaigns:deliverability --id camp_123` |
| `campaigns:export` | Export campaign data | `cec instantly campaigns:export --id camp_123` |
| `campaigns:bulk-actions` | Bulk campaign operations | `cec instantly campaigns:bulk-actions --action pause` |
| `campaigns:settings` | View/update settings | `cec instantly campaigns:settings --id camp_123` |

### 👥 Leads (20 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `leads:list` | List campaign leads | `cec instantly leads:list --campaign camp_123` |
| `leads:add` | Add single lead | `cec instantly leads:add --email john@company.com` |
| `leads:bulk-add` | Add multiple leads | `cec instantly leads:bulk-add --file leads.csv` |
| `leads:update` | Update lead info | `cec instantly leads:update --email john@company.com --first-name John` |
| `leads:delete` | Remove lead | `cec instantly leads:delete --email john@company.com` |
| `leads:search` | Search leads | `cec instantly leads:search --query "company.com"` |
| `leads:export` | Export leads | `cec instantly leads:export --campaign camp_123` |
| `leads:import-csv` | Import from CSV | `cec instantly leads:import-csv --file data.csv` |
| `leads:import-json` | Import from JSON | `cec instantly leads:import-json --file data.json` |
| `leads:validate` | Validate emails | `cec instantly leads:validate --campaign camp_123` |
| `leads:segment` | Segment leads | `cec instantly leads:segment --criteria replied` |
| `leads:tag` | Tag leads | `cec instantly leads:tag --campaign camp_123 --tag priority` |
| `leads:untag` | Remove tags | `cec instantly leads:untag --campaign camp_123 --tag priority` |
| `leads:status` | Update lead status | `cec instantly leads:status --email john@company.com --status paused` |
| `leads:activity` | View lead activity | `cec instantly leads:activity --email john@company.com` |
| `leads:merge` | Merge duplicate leads | `cec instantly leads:merge --primary john@company.com` |
| `leads:blacklist` | Add to blacklist | `cec instantly leads:blacklist --email john@company.com` |
| `leads:whitelist` | Add to whitelist | `cec instantly leads:whitelist --email john@company.com` |
| `leads:bounce-check` | Check bounce status | `cec instantly leads:bounce-check --email john@company.com` |
| `leads:engagement-score` | Get engagement scores | `cec instantly leads:engagement-score --campaign camp_123` |

### 📧 Accounts (10 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `accounts:list` | List email accounts | `cec instantly accounts:list` |
| `accounts:add` | Add email account | `cec instantly accounts:add --email sender@company.com` |
| `accounts:update` | Update account | `cec instantly accounts:update --email sender@company.com` |
| `accounts:delete` | Remove account | `cec instantly accounts:delete --email sender@company.com` |
| `accounts:test` | Test connectivity | `cec instantly accounts:test --email sender@company.com` |
| `accounts:warmup` | Manage warmup | `cec instantly accounts:warmup --email sender@company.com` |
| `accounts:limits` | Check sending limits | `cec instantly accounts:limits --email sender@company.com` |
| `accounts:health` | Account health check | `cec instantly accounts:health --email sender@company.com` |
| `accounts:rotate` | Rotate accounts | `cec instantly accounts:rotate --campaign camp_123` |
| `accounts:sync` | Sync account status | `cec instantly accounts:sync --email sender@company.com` |

</details>

<details>
<summary>🔥 <strong>Salesforge Commands (42 total)</strong></summary>

### 🤖 AI-Powered Sequences (42 commands)
| Command | Description | Example |
|---------|-------------|---------|
| `sequences:list` | List AI sequences | `cec salesforge sequences:list --persona "VP Sales"` |
| `sequences:create` | Create AI sequence | `cec salesforge sequences:create --persona "CTO" --industry "Tech"` |
| `sequences:update` | Update sequence | `cec salesforge sequences:update --id seq_123` |
| `sequences:delete` | Delete sequence | `cec salesforge sequences:delete --id seq_123` |
| `sequences:optimize` | AI optimization | `cec salesforge sequences:optimize --id seq_123` |
| `sequences:test` | Test sequence | `cec salesforge sequences:test --id seq_123` |
| `sequences:clone` | Clone sequence | `cec salesforge sequences:clone --id seq_123` |
| `sequences:analytics` | Sequence analytics | `cec salesforge sequences:analytics --id seq_123` |
| `sequences:ai-insights` | Get AI insights | `cec salesforge sequences:ai-insights --id seq_123` |
| `sequences:personalize` | AI personalization | `cec salesforge sequences:personalize --id seq_123` |
| *...32 more AI-powered commands* | | |

</details>

<details>
<summary>☀️ <strong>Apollo Commands (42 total)</strong></summary>

### 🎯 Sequences (15 commands)
### 👥 Contacts (12 commands)  
### 📧 Accounts (8 commands)
### 📝 Templates (7 commands)

*Full command list available in interactive shell: `cec apollo`*

</details>

<details>
<summary>⚡ <strong>Email Bison Commands (32 total)</strong></summary>

### 🎯 Campaigns (8 commands)
### 🦬 Power Automation (10 commands)
### 📊 Analytics (7 commands)
### 📧 Accounts (4 commands)
### 👥 Leads (2 commands)
### 🔄 Sequences (1 command)

*Full command list available in interactive shell: `cec emailbison`*

</details>

<details>
<summary>💼 <strong>AmpleMarket Commands (15 total)</strong></summary>

### 👤 Account Management (3 commands)
### 📋 Lead Lists (4 commands)
### 👥 Contacts (3 commands)
### 🔄 Sequences (3 commands)
### ✅ Tasks (2 commands)

*Full command list available in interactive shell: `cec amplemarket`*

</details>

<details>
<summary>🏢 <strong>Outreach Commands (55 total)</strong></summary>

### 🔄 Sequences (12 commands)
### 👥 Prospects (15 commands)
### 📧 Mailboxes (8 commands)
### 📝 Templates (10 commands)
### 📊 Analytics (6 commands)
### ⚙️ Settings (4 commands)

*Full command list available in interactive shell: `cec outreach`*

</details>

<details>
<summary>🌟 <strong>SalesLoft Commands (48 total)</strong></summary>

### 🔄 Cadences (12 commands)
### 👥 People (15 commands)
### 📧 Email (8 commands)
### 📞 Calls (6 commands)
### 📊 Analytics (4 commands)
### 👨‍💼 Admin (3 commands)

*Full command list available in interactive shell: `cec salesloft`*

</details>

<details>
<summary>🌈 <strong>LemList Commands (25 total)</strong></summary>

### 🎯 Campaigns (6 commands)
### 👥 Leads (5 commands)
### 🔄 Sequences (4 commands)
### 📝 Templates (4 commands)
### 📊 Analytics (3 commands)
### 👥 Team (3 commands)

*Full command list available in interactive shell: `cec lemlist`*

</details>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **Bun** ≥ 1.0.0 (recommended for performance)
- API keys for your chosen platforms

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/cold-email-cli.git
cd cold-email-cli

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install

# Make globally available
bun link
# or
npm link
```

### Configuration

1. **Copy environment template:**
```bash
cp config/environment.example .env
```

2. **Add your API keys:**
```bash
# .env file
SMARTLEAD_API_KEY=your_smartlead_key
INSTANTLY_API_KEY=your_instantly_key
SALESFORGE_API_KEY=your_salesforge_key
APOLLO_API_KEY=your_apollo_key
EMAILBISON_API_KEY=your_emailbison_key
AMPLEMARKET_API_KEY=your_amplemarket_key
OUTREACH_API_KEY=your_outreach_key
SALESLOFT_API_KEY=your_salesloft_key
LEMLIST_API_KEY=your_lemlist_key
```

### Usage

```bash
# Launch interactive menu
cec

# Enter platform shell
cec smartlead
cec instantly
cec salesforge

# Direct command execution
cec smartlead campaigns:list --status active
cec instantly leads:add --email john@company.com
cec salesforge sequences:create --persona "VP Sales"

# Execute with JSON args
cec exec smartlead campaigns:create --args '{"name":"Q1 Campaign","daily_limit":50}'

# List all platforms
cec platforms

# Get help
cec help
```

---

## 🎨 Interactive Shell Experience

Each platform features a beautiful, branded interactive shell:

### 🌊 SmartLead Shell
```
   ███████╗███╗   ███╗ █████╗ ██████╗ ████████╗██╗     ███████╗ █████╗ ██████╗ 
   ██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║     ██╔════╝██╔══██╗██╔══██╗
   ███████╗██╔████╔██║███████║██████╔╝   ██║   ██║     █████╗  ███████║██║  ██║
   ╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║   ██║     ██╔══╝  ██╔══██║██║  ██║
   ███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ███████╗███████╗██║  ██║██████╔╝
   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ 

                      ⚡ Advanced Campaign Management & Analytics ⚡

   ┌─────────────────────────────────────────────────────────────────────────────┐
   │                       🌊 SMARTLEAD COMMAND CENTER 🌊                       │
   └─────────────────────────────────────────────────────────────────────────────┘
```

**Navigation:**
- `1-6` - Select command categories
- `ESC` - Go back / Exit
- `Ctrl+C` - Force exit

---

## 🔧 Development

### Build System
```bash
# Development with Bun
bun run dev

# Build for production
bun run build

# Type checking
bun run type-check

# Linting with Biome
bun run lint
bun run lint:fix

# Testing
bun test
```

### Adding New Platforms

1. **Create module structure:**
```bash
mkdir -p src/modules/newplatform/{commands,mcp}
```

2. **Implement required files:**
- `api.ts` - API client
- `ascii.ts` - ASCII art branding
- `index.ts` - Module exports
- `shell.tsx` - Interactive shell
- `commands/*.ts` - Command implementations
- `mcp/newplatform-mcp.json` - MCP configuration

3. **Add to module selector:**
```typescript
// src/core/module-selector.ts
import newplatform from "../modules/newplatform/index";

export const modules = {
  // ... existing modules
  newplatform,
};
```

### MCP Integration

Each platform includes Model Context Protocol (MCP) configurations for AI assistant integration:

```json
{
  "mcpServers": {
    "@cec/smartlead": {
      "command": "cec",
      "args": ["smartlead"],
      "env": {
        "SMARTLEAD_API_KEY": "your_api_key"
      }
    }
  }
}
```

---

## 📚 Documentation

- 📖 [Complete API Documentation](docs/API_COMPLETION_SUMMARY.md)
- 🏗️ [Module Framework Guide](docs/MODULE_FRAMEWORK.md)
- 🚀 [Platform Implementation Summary](docs/COMPLETE_PLATFORM_SUMMARY.md)
- 📝 [Contributing Guidelines](docs/CONTRIBUTING.md)
- 🗺️ [Roadmap & Future Plans](docs/ROADMAP.md)
- 📋 [Changelog](docs/CHANGELOG.md)

---

## 🌟 Features

### ✨ Core Features
- 🎯 **9 Platform Support** - Complete coverage of major cold email platforms
- 🔧 **372+ Commands** - Comprehensive functionality across all platforms
- 🎨 **Interactive Shells** - Beautiful, branded terminal interfaces
- ⚡ **Bun-Powered** - ~2x performance improvement over npm/yarn
- 🔒 **Type-Safe** - Complete TypeScript implementation with Zod validation
- 🌈 **Branded Themes** - Authentic company colors and ASCII art
- 📱 **Responsive UI** - Clean, modern terminal interface with React Ink

### 🔧 Technical Excellence
- 🏗️ **Modular Architecture** - Clean separation with complete platform isolation
- 🔍 **Comprehensive Schemas** - 50+ Zod schemas for API validation
- 🎭 **Error Handling** - Structured error messages and graceful failures
- 📊 **JSON Output** - Machine-readable output for automation
- 🔄 **Rate Limiting** - Built-in API rate limit handling
- 🧪 **Testing Suite** - Comprehensive test coverage
- 📝 **Documentation** - Complete API and usage documentation

### 🤖 AI Integration
- 🧠 **MCP Support** - Model Context Protocol configurations for all platforms
- 🔗 **AI Assistant Ready** - Direct integration with Claude, ChatGPT, and other AI tools
- 📋 **Structured Commands** - Consistent command patterns across platforms
- 🎯 **Context Aware** - Platform-specific AI context and capabilities

---

## 💬 Community & Support

<div align="center">

[![Discord](https://img.shields.io/discord/1234567890?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/mB76X5QJ)
[![GitHub Issues](https://img.shields.io/github/issues/your-org/cold-email-cli?logo=github)](https://github.com/your-org/cold-email-cli/issues)
[![Discussions](https://img.shields.io/github/discussions/your-org/cold-email-cli?logo=github)](https://github.com/your-org/cold-email-cli/discussions)

**[Join our Discord Community](https://discord.gg/mB76X5QJ)** for:
- 💬 Real-time support and discussions
- 🤝 Connect with other cold email professionals
- 📢 Latest updates and feature announcements
- 💡 Share tips, tricks, and best practices

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎨 ASCII art generated and customized for each platform
- 🌈 Color schemes inspired by actual brand guidelines
- ⚡ Performance optimizations powered by Bun
- 🔧 Built with modern TypeScript and React Ink
- 🤝 Community-driven development and feedback

---

<div align="center">

**Made with ❄️ by the Cold Email CLI Community**

[⭐ Star us on GitHub](https://github.com/your-org/cold-email-cli) • [🐛 Report Issues](https://github.com/your-org/cold-email-cli/issues) • [💬 Join Discord](https://discord.gg/mB76X5QJ)

</div> 