# 🚀 Professional Cold Email CLI

Advanced command-line interface for cold email outreach automation.

## Platform Support (200+ Commands Total)

🟢 SmartLead     - 82 commands (Scale, Analytics, Infrastructure)
🟢 Instantly    - 35 commands (Volume, Deliverability, Automation)  
🟢 SalesForge   - 82 commands (AI, Multi-Channel, Personalization)

## Quick Start

1. Install: npm install -g professional-cold-email-cli
2. Launch: cold-email-cli
3. Select your platform (SmartLead/Instantly/SalesForge)
4. Configure API: config set --api-key YOUR_KEY
5. Start building campaigns!

## Core Commands

help              - Show available commands
version           - Show CLI and module versions  
switch            - Switch between cold email platforms
clear             - Clear terminal screen
exit              - Exit CLI

## Platform Examples

### SmartLead (Advanced Analytics & Scale)
campaigns:create --name "Enterprise Outreach" --type multi-sequence
campaigns:analytics --id cam_12345 --metrics detailed
leads:segment --rules "company_size>500,title contains 'VP'"
analytics:forecast --model advanced --horizon 90d

### Instantly (High-Volume Automation) 
campaigns:launch --volume high --daily-limit 1000
accounts:warmup --strategy aggressive --duration 30d
deliverability:check --domain company.com --full-audit
sequences:personalize --ai-level advanced --variables dynamic

### SalesForge (AI-Powered Multi-Channel)
ai:personalize --level advanced --data-sources "linkedin,company,news"
sequences:multi-channel --channels "email,linkedin,phone"
conversation:analyze --sentiment --intent --next-best-action
pipeline:forecast --ai-model advanced --confidence 95

## Configuration

~/.cold-email-cli/config.json:
{
  "defaultPlatform": "smartlead",
  "platforms": {
    "smartlead": { "apiKey": "your_key" },
    "instantly": { "apiKey": "your_key" },
    "salesforge": { "apiKey": "your_key" }
  }
}

Built for professional cold outreach automation. 