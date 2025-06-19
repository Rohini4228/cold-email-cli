import type { CLICommand } from "../../types/global";
import { OutreachAPI } from "./api";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { prospectAliases, prospectCommands } from "./commands/prospects";
import { mailboxAliases, mailboxCommands } from "./commands/mailboxes";
import { templateAliases, templateCommands } from "./commands/templates";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { settingsAliases, settingsCommands } from "./commands/settings";

// Initialize API client
export const api = new OutreachAPI();

// Combine all commands
export const outreachCommands: CLICommand[] = [
  ...sequenceCommands,
  ...prospectCommands,
  ...mailboxCommands,
  ...templateCommands,
  ...analyticsCommands,
  ...settingsCommands,
];

// Combine all aliases
export const outreachAliases: CLICommand[] = [
  ...sequenceAliases,
  ...prospectAliases,
  ...mailboxAliases,
  ...templateAliases,
  ...analyticsAliases,
  ...settingsAliases,
];

// All commands combined (main + aliases)
export const allOutreachCommands: CLICommand[] = [...outreachCommands, ...outreachAliases];

// Platform info
export const platformInfo = {
  name: "Outreach",
  description: "🎯 Enterprise Sales Engagement & Sequence Platform",
  version: "2.0.0",
  totalCommands: allOutreachCommands.length,
  categories: [
    "🎯 Sequence Management",
    "👤 Prospect Management",
    "📧 Mailbox Management",
    "📝 Template Management",
    "📊 Analytics & Reporting",
    "⚙️ Settings & Configuration",
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "🎯 Sequence Management": sequenceCommands.filter((cmd) => cmd.category === "🎯 Sequence Management"),
  "👤 Prospect Management": prospectCommands.filter((cmd) => cmd.category === "👤 Prospect Management"),
  "📧 Mailbox Management": mailboxCommands.filter((cmd) => cmd.category === "📧 Mailbox Management"),
  "📝 Template Management": templateCommands.filter((cmd) => cmd.category === "📝 Template Management"),
  "📊 Analytics & Reporting": analyticsCommands.filter((cmd) => cmd.category === "📊 Analytics & Reporting"),
  "⚙️ Settings & Configuration": settingsCommands.filter((cmd) => cmd.category === "⚙️ Settings & Configuration"),
};

// Export for MCP and CLI usage
export { 
  sequenceCommands,
  prospectCommands,
  mailboxCommands,
  templateCommands,
  analyticsCommands,
  settingsCommands,
};

export default {
  commands: allOutreachCommands,
  platformInfo,
  commandCategories,
  api,
};
