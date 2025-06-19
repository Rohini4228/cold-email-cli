import type { CLICommand, Platform } from "../../types/global";
import { SalesLoftAPI } from "./api";
import { adminAliases, adminCommands } from "./commands/admin";
import { analyticsAliases, analyticsCommands } from "./commands/analytics";
import { cadenceAliases, cadenceCommands } from "./commands/cadences";
import { callAliases, callCommands } from "./commands/calls";
import { emailAliases, emailCommands } from "./commands/email";
import { peopleAliases, peopleCommands } from "./commands/people";

// Initialize API client
export const api = new SalesLoftAPI();

// Combine all commands
export const salesLoftCommands: CLICommand[] = [
  ...cadenceCommands,
  ...peopleCommands,
  ...emailCommands,
  ...callCommands,
  ...analyticsCommands,
  ...adminCommands,
];

// Combine all aliases
export const salesLoftAliases: CLICommand[] = [
  ...cadenceAliases,
  ...peopleAliases,
  ...emailAliases,
  ...callAliases,
  ...analyticsAliases,
  ...adminAliases,
];

// All commands combined (main + aliases)
export const allSalesLoftCommands: CLICommand[] = [...salesLoftCommands, ...salesLoftAliases];

// Platform info
export const platformInfo = {
  name: "Salesloft",
  description: "Modern sales engagement & cadence platform",
  version: "1.0.0",
  totalCommands: allSalesLoftCommands.length,
  categories: [
    {
      name: "🌟 Cadence Management",
      description: "Manage sales cadences and sequences",
      commands: cadenceCommands.length,
    },
    {
      name: "👥 People Management",
      description: "Manage contacts and prospects",
      commands: peopleCommands.length,
    },
    {
      name: "📧 Email Management",
      description: "Email campaigns and templates",
      commands: emailCommands.length,
    },
    {
      name: "📞 Call Management",
      description: "Call logging and tracking",
      commands: callCommands.length,
    },
    {
      name: "📊 Analytics",
      description: "Performance analytics and reporting",
      commands: analyticsCommands.length,
    },
    {
      name: "⚙️ Admin",
      description: "Administrative functions",
      commands: adminCommands.length,
    },
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
export { cadenceCommands, peopleCommands, emailCommands, callCommands, analyticsCommands, adminCommands };

export default {
  name: "Salesloft",
  description: "Modern sales engagement & cadence platform",
  version: "1.0.0",
  totalCommands: allSalesLoftCommands.length,
  categories: [
    {
      name: "🌟 Cadence Management",
      description: "Manage sales cadences and sequences",
      commands: cadenceCommands.length,
    },
    {
      name: "👥 People Management",
      description: "Manage contacts and prospects",
      commands: peopleCommands.length,
    },
    {
      name: "📧 Email Management",
      description: "Email campaigns and templates",
      commands: emailCommands.length,
    },
    {
      name: "📞 Call Management",
      description: "Call logging and tracking",
      commands: callCommands.length,
    },
    {
      name: "📊 Analytics",
      description: "Performance analytics and reporting",
      commands: analyticsCommands.length,
    },
    {
      name: "⚙️ Admin",
      description: "Administrative functions",
      commands: adminCommands.length,
    },
  ],
  api,
  commands: allSalesLoftCommands,
} as Platform;
