import type { CLICommand, Platform } from "../../types/global";
import { SmartLeadAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/accounts";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
// Import all modular command files
import { campaignAliases, campaignCommands } from "./commands/campaigns";
import { leadAliases, leadCommands } from "./commands/leads";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { templateAliases, templateCommands } from "./commands/templates";

// Initialize API client
export const api = new SmartLeadAPI();

// Combine all commands
export const smartLeadCommands: CLICommand[] = [
  ...campaignCommands,
  ...leadCommands,
  ...accountCommands,
  ...analyticsCommands,
  ...sequenceCommands,
  ...templateCommands,
];

// Combine all aliases
export const smartLeadAliases: CLICommand[] = [
  ...campaignAliases,
  ...leadAliases,
  ...accountAliases,
  ...analyticsAliases,
  ...sequenceAliases,
  ...templateAliases,
];

// All commands combined (main + aliases)
export const allSmartLeadCommands: CLICommand[] = [...smartLeadCommands, ...smartLeadAliases];

export default {
  name: "SmartLead",
  description: "Advanced campaign management & analytics platform",
  version: "2.0.0",
  totalCommands: allSmartLeadCommands.length,
  categories: [
    {
      name: "🎯 Campaign Management",
      description: "Complete campaign lifecycle management",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "🎯 Campaign Management").length,
    },
    {
      name: "📧 Email Accounts",
      description: "Email account setup and warmup",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "📧 Email Accounts").length,
    },
    {
      name: "👥 Lead Management",
      description: "Lead import and management",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "👥 Lead Management").length,
    },
    {
      name: "📊 Analytics & Reporting",
      description: "Performance analytics and insights",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "📊 Analytics & Reporting").length,
    },
    {
      name: "📝 Email Sequences",
      description: "Email sequence automation",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "📝 Email Sequences").length,
    },
    {
      name: "📄 Email Templates",
      description: "Email template creation and management",
      commands: allSmartLeadCommands.filter(cmd => cmd.category === "📄 Email Templates").length,
    },
  ],
  api,
  commands: allSmartLeadCommands,
} as Platform;
