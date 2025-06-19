import type { CLICommand } from "../../types/global";
import { SalesforgeAPI } from "./api";

// Import modular command files
import { sequenceAliases, sequenceCommands } from "./commands/sequences";

// Initialize API client
export const api = new SalesforgeAPI();

// All Salesforge commands
export const salesforgeCommands: CLICommand[] = [...sequenceCommands];

// All Salesforge aliases
export const salesforgeAliases: CLICommand[] = [...sequenceAliases];

// All commands combined (main + aliases)
export const allSalesforgeCommands: CLICommand[] = [...salesforgeCommands, ...salesforgeAliases];

// Platform info
export const platformInfo = {
  name: "Salesforge",
  description: "AI-Powered Multi-Channel Sequences - Intelligent automation that converts",
  version: "2.0.0",
  totalCommands: allSalesforgeCommands.length,
  categories: ["AI Sequences"],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "AI Sequences": sequenceCommands.filter((cmd) => cmd.category === "AI Sequences"),
};

// Export for MCP and CLI usage
export { sequenceCommands };

export default {
  commands: allSalesforgeCommands,
  platformInfo,
  commandCategories,
  api,
};
