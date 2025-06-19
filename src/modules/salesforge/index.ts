import type { CLICommand, Platform } from "../../types/global";
import { SalesforgeAPI } from "./api";

// Import modular command files
import { sequenceAliases, sequenceCommands } from "./commands/sequences";

// Initialize API client
export const api = new SalesforgeAPI();

// Combine all commands
export const salesforgeCommands: CLICommand[] = [...sequenceCommands];

// Combine all aliases
export const salesforgeAliases: CLICommand[] = [...sequenceAliases];

// All commands combined (main + aliases)
export const allSalesforgeCommands: CLICommand[] = [...salesforgeCommands, ...salesforgeAliases];

export default {
  name: "Salesforge",
  description: "AI-powered multi-channel sequences & automation",
  version: "1.0.0",
  totalCommands: allSalesforgeCommands.length,
  categories: [
    {
      name: "🔥 AI Sequences",
      description: "AI-powered sequence creation and management",
      commands: sequenceCommands.length,
    },
  ],
  api,
  commands: allSalesforgeCommands,
} as Platform;
