import type { CLICommand } from "../../types/global";
import { LemListAPI } from "./api";
import { campaignAliases, campaignCommands } from "./commands/campaigns";
import { leadAliases, leadCommands } from "./commands/leads";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { templateAliases, templateCommands } from "./commands/templates";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { teamAliases, teamCommands } from "./commands/team";

// Initialize API client
export const api = new LemListAPI();

// Combine all commands
export const lemlistCommands: CLICommand[] = [
  ...campaignCommands,
  ...leadCommands,
  ...sequenceCommands,
  ...templateCommands,
  ...analyticsCommands,
  ...teamCommands,
];

// Combine all aliases
export const lemlistAliases: CLICommand[] = [
  ...campaignAliases,
  ...leadAliases,
  ...sequenceAliases,
  ...templateAliases,
  ...analyticsAliases,
  ...teamAliases,
];

// All commands combined (main + aliases)
export const allLemListCommands: CLICommand[] = [...lemlistCommands, ...lemlistAliases];

// Platform info
export const platformInfo = {
  name: "LemList",
  description: "🎯 Creative Email Outreach & Automation Platform",
  version: "2.0.0",
  totalCommands: allLemListCommands.length,
  categories: [
    "🚀 Campaign Management",
    "👥 Lead Management",
    "🔄 Sequence Management",
    "📝 Template Management",
    "📊 Analytics & Reporting",
    "⚙️ Team & Account",
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "🚀 Campaign Management": campaignCommands.filter((cmd) => cmd.category === "🚀 Campaign Management"),
  "👥 Lead Management": leadCommands.filter((cmd) => cmd.category === "👥 Lead Management"),
  "🔄 Sequence Management": sequenceCommands.filter((cmd) => cmd.category === "🔄 Sequence Management"),
  "📝 Template Management": templateCommands.filter((cmd) => cmd.category === "📝 Template Management"),
  "📊 Analytics & Reporting": analyticsCommands.filter((cmd) => cmd.category === "📊 Analytics & Reporting"),
  "⚙️ Team & Account": teamCommands.filter((cmd) => cmd.category === "⚙️ Team & Account"),
};

// Export for MCP and CLI usage
export { 
  campaignCommands,
  leadCommands,
  sequenceCommands,
  templateCommands,
  analyticsCommands,
  teamCommands,
};

export default {
  commands: allLemListCommands,
  platformInfo,
  commandCategories,
  api,
};
