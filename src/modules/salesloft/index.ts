import type { CLICommand } from "../../types/global";
import { SalesLoftAPI } from "./api";
import { cadenceAliases, cadenceCommands } from "./commands/cadences";
import { peopleAliases, peopleCommands } from "./commands/people";
import { emailAliases, emailCommands } from "./commands/email";
import { callAliases, callCommands } from "./commands/calls";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { adminAliases, adminCommands } from "./commands/admin";

// Initialize API client
export const api = new SalesLoftAPI();

// Combine all commands
export const salesloftCommands: CLICommand[] = [
  ...cadenceCommands,
  ...peopleCommands,
  ...emailCommands,
  ...callCommands,
  ...analyticsCommands,
  ...adminCommands,
];

// Combine all aliases
export const salesloftAliases: CLICommand[] = [
  ...cadenceAliases,
  ...peopleAliases,
  ...emailAliases,
  ...callAliases,
  ...analyticsAliases,
  ...adminAliases,
];

// All commands combined (main + aliases)
export const allSalesLoftCommands: CLICommand[] = [...salesloftCommands, ...salesloftAliases];

// Platform info
export const platformInfo = {
  name: "SalesLoft",
  description: "🔄 Modern Sales Engagement & Cadence Platform",
  version: "2.0.0",
  totalCommands: allSalesLoftCommands.length,
  categories: [
    "🔄 Cadence Management",
    "👥 People Management",
    "📧 Email Management",
    "📞 Call Management",
    "📊 Analytics & Reporting",
    "⚙️ Admin & Configuration",
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "🔄 Cadence Management": cadenceCommands.filter((cmd) => cmd.category === "🔄 Cadence Management"),
  "👥 People Management": peopleCommands.filter((cmd) => cmd.category === "👥 People Management"),
  "📧 Email Management": emailCommands.filter((cmd) => cmd.category === "📧 Email Management"),
  "📞 Call Management": callCommands.filter((cmd) => cmd.category === "📞 Call Management"),
  "📊 Analytics & Reporting": analyticsCommands.filter((cmd) => cmd.category === "📊 Analytics & Reporting"),
  "⚙️ Admin & Configuration": adminCommands.filter((cmd) => cmd.category === "⚙️ Admin & Configuration"),
};

// Export for MCP and CLI usage
export { 
  cadenceCommands,
  peopleCommands,
  emailCommands,
  callCommands,
  analyticsCommands,
  adminCommands,
};

export default {
  commands: allSalesLoftCommands,
  platformInfo,
  commandCategories,
  api,
};
