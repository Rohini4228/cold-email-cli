import type { CLICommand, Platform } from "../../types/global";
import { OutreachAPI } from "./api";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { mailboxAliases, mailboxCommands } from "./commands/mailboxes";
import { prospectAliases, prospectCommands } from "./commands/prospects";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { settingsAliases, settingsCommands } from "./commands/settings";
import { templateAliases, templateCommands } from "./commands/templates";

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

export default {
  name: "Outreach",
  description: "Enterprise sales engagement & sequence platform",
  version: "1.0.0",
  totalCommands: allOutreachCommands.length,
  categories: [
    {
      name: "🏢 Sequence Management",
      description: "Manage sales sequences and automation",
      commands: sequenceCommands.length,
    },
    {
      name: "👥 Prospect Management",
      description: "Manage prospects and contacts",
      commands: prospectCommands.length,
    },
    {
      name: "📧 Mailbox Management",
      description: "Email account configuration",
      commands: mailboxCommands.length,
    },
    {
      name: "📄 Template Management",
      description: "Email template creation and management",
      commands: templateCommands.length,
    },
    {
      name: "📊 Analytics",
      description: "Performance analytics and reporting",
      commands: analyticsCommands.length,
    },
    {
      name: "⚙️ Settings & Configuration",
      description: "Platform settings and configuration",
      commands: settingsCommands.length,
    },
  ],
  api,
  commands: allOutreachCommands,
} as Platform;
