import type { CLICommand, Platform } from "../../types/global";
import { EmailBisonAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/accounts";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { automationAliases, automationCommands } from "./commands/automation";
import { campaignAliases, campaignCommands } from "./commands/campaigns";
import { leadAliases, leadCommands } from "./commands/leads";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { templateAliases, templateCommands } from "./commands/templates";

// Initialize API client
export const api = new EmailBisonAPI();

// Combine all commands
export const emailBisonCommands: CLICommand[] = [
  ...campaignCommands,
  ...leadCommands,
  ...accountCommands,
  ...sequenceCommands,
  ...templateCommands,
  ...automationCommands,
  ...analyticsCommands,
];

// Combine all aliases
export const emailBisonAliases: CLICommand[] = [
  ...campaignAliases,
  ...leadAliases,
  ...accountAliases,
  ...sequenceAliases,
  ...templateAliases,
  ...automationAliases,
  ...analyticsAliases,
];

// All commands combined (main + aliases)
export const allEmailBisonCommands: CLICommand[] = [...emailBisonCommands, ...emailBisonAliases];

// Platform info
export const platformInfo = {
  name: "EmailBison",
  description: "Power-driven email automation platform",
  version: "1.0.0",
  totalCommands: allEmailBisonCommands.length,
  categories: [
    {
      name: "⚡ Power Campaigns",
      description: "High-power email campaigns with advanced automation",
      commands: campaignCommands.length,
    },
    {
      name: "📊 Analytics & Reports",
      description: "Performance analytics and detailed reporting",
      commands: analyticsCommands.length,
    },
    {
      name: "🎯 Lead Management",
      description: "Advanced lead targeting and management",
      commands: leadCommands.length,
    },
    {
      name: "📧 Account Management",
      description: "Email account configuration and management",
      commands: accountCommands.length,
    },
    {
      name: "📝 Templates & Sequences",
      description: "Email templates and sequence management",
      commands: templateCommands.length + sequenceCommands.length,
    },
    {
      name: "⚙️ Automation Settings",
      description: "Advanced automation and power settings",
      commands: automationCommands.length,
    },
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "Power Campaign Management": campaignCommands.filter((cmd) => cmd.category === "Power Campaign Management"),
  "Power Lead Management": leadCommands.filter((cmd) => cmd.category === "Power Lead Management"),
  "Power Email Accounts": accountCommands.filter((cmd) => cmd.category === "Power Email Accounts"),
  "Power Sequences": sequenceCommands.filter((cmd) => cmd.category === "Power Sequences"),
  "Power Templates": templateCommands.filter((cmd) => cmd.category === "Power Templates"),
  "Power Automation": automationCommands.filter((cmd) => cmd.category === "Power Automation"),
  "Power Analytics": [...analyticsCommands, ...campaignCommands.filter((cmd) => cmd.category === "Power Analytics")],
};

// Export for MCP and CLI usage
export {
  campaignCommands,
  leadCommands,
  accountCommands,
  sequenceCommands,
  templateCommands,
  automationCommands,
  analyticsCommands,
};

export default {
  name: "EmailBison",
  description: "Power-driven email automation platform",
  version: "1.0.0",
  totalCommands: allEmailBisonCommands.length,
  categories: [
    {
      name: "⚡ Power Campaigns",
      description: "High-power email campaigns with advanced automation",
      commands: campaignCommands.length,
    },
    {
      name: "📊 Analytics & Reports",
      description: "Performance analytics and detailed reporting",
      commands: analyticsCommands.length,
    },
    {
      name: "🎯 Lead Management",
      description: "Advanced lead targeting and management",
      commands: leadCommands.length,
    },
    {
      name: "📧 Account Management",
      description: "Email account configuration and management",
      commands: accountCommands.length,
    },
    {
      name: "📝 Templates & Sequences",
      description: "Email templates and sequence management",
      commands: templateCommands.length + sequenceCommands.length,
    },
    {
      name: "⚙️ Automation Settings",
      description: "Advanced automation and power settings",
      commands: automationCommands.length,
    },
  ],
  api,
  commands: allEmailBisonCommands,
} as Platform;
