import type { CLICommand } from "../../types/global";
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
  ...sequenceCommands,
  ...templateCommands,
  ...analyticsCommands,
];

// Combine all aliases
export const smartLeadAliases: CLICommand[] = [
  ...campaignAliases,
  ...leadAliases,
  ...accountAliases,
  ...sequenceAliases,
  ...templateAliases,
  ...analyticsAliases,
];

// All commands combined (main + aliases)
export const allSmartLeadCommands: CLICommand[] = [...smartLeadCommands, ...smartLeadAliases];

// Platform info
export const platformInfo = {
  name: "SmartLead",
  description: "Campaign Management & Analytics - The complete cold email infrastructure",
  version: "2.0.0",
  totalCommands: allSmartLeadCommands.length,
  categories: [
    "Campaign Management",
    "Lead Management",
    "Email Accounts",
    "Email Sequences",
    "Email Templates",
    "Analytics & Reporting",
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "Campaign Management": campaignCommands.filter((cmd) => cmd.category === "Campaign Management"),
  "Lead Management": leadCommands.filter((cmd) => cmd.category === "Lead Management"),
  "Email Accounts": accountCommands.filter((cmd) => cmd.category === "Email Accounts"),
  "Email Sequences": sequenceCommands.filter((cmd) => cmd.category === "Email Sequences"),
  "Email Templates": templateCommands.filter((cmd) => cmd.category === "Email Templates"),
  "Analytics & Reporting": analyticsCommands.filter((cmd) => cmd.category === "Analytics & Reporting"),
};

// Export for MCP and CLI usage
export { campaignCommands, leadCommands, accountCommands, sequenceCommands, templateCommands, analyticsCommands };

export default {
  commands: allSmartLeadCommands,
  platformInfo,
  commandCategories,
  api,
};
