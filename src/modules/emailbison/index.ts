import type { CLICommand } from "../../types/global";
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
  name: "Email Bison",
  description: "Advanced Email Automation - Power through your email campaigns",
  version: "2.0.0",
  totalCommands: allEmailBisonCommands.length,
  categories: [
    "Power Campaign Management",
    "Power Lead Management",
    "Power Email Accounts",
    "Power Sequences",
    "Power Templates",
    "Power Automation",
    "Power Analytics",
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
  commands: allEmailBisonCommands,
  platformInfo,
  commandCategories,
  api,
};
