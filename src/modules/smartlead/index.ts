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
      name: "🌊 Campaign Management",
      description: "Complete campaign lifecycle management",
      commands: campaignCommands.length,
    },
    {
      name: "📧 Email Account Management",
      description: "Email account setup and warmup",
      commands: accountCommands.length,
    },
    {
      name: "👥 Lead Management",
      description: "Lead import and management",
      commands: leadCommands.length,
    },
    {
      name: "📊 Analytics & Reporting",
      description: "Performance analytics and insights",
      commands: analyticsCommands.length,
    },
    {
      name: "📝 Sequence Management",
      description: "Email sequence automation",
      commands: sequenceCommands.length,
    },
    {
      name: "📄 Template Management",
      description: "Email template creation and management",
      commands: templateCommands.length,
    },
  ],
  api,
  commands: allSmartLeadCommands,
} as Platform;
