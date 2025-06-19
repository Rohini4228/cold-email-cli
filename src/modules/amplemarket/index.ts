import type { CLICommand } from "../../types/global";
import { AmpleMarketAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/account";
import { contactAliases, contactCommands } from "./commands/contacts";
import { leadListAliases, leadListCommands } from "./commands/leadlists";
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { taskAliases, taskCommands } from "./commands/tasks";

// Initialize API client
export const api = new AmpleMarketAPI();

// Combine all commands
export const ampleMarketCommands: CLICommand[] = [
  ...accountCommands,
  ...leadListCommands,
  ...contactCommands,
  ...sequenceCommands,
  ...taskCommands,
];

// Combine all aliases
export const ampleMarketAliases: CLICommand[] = [
  ...accountAliases,
  ...leadListAliases,
  ...contactAliases,
  ...sequenceAliases,
  ...taskAliases,
];

// All commands combined (main + aliases)
export const allAmpleMarketCommands: CLICommand[] = [...ampleMarketCommands, ...ampleMarketAliases];

// Platform info
export const platformInfo = {
  name: "AmpleMarket",
  description: "🎯 Sales Intelligence & Prospecting Platform",
  version: "2.0.0",
  totalCommands: allAmpleMarketCommands.length,
  categories: [
    "🏢 Account Management",
    "📊 Lead List Management",
    "👤 Contact Management",
    "🚀 Sequence Management",
    "✅ Task Management",
  ],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "🏢 Account Management": accountCommands.filter((cmd) => cmd.category === "🏢 Account Management"),
  "📊 Lead List Management": leadListCommands.filter((cmd) => cmd.category === "📊 Lead List Management"),
  "👤 Contact Management": contactCommands.filter((cmd) => cmd.category === "👤 Contact Management"),
  "🚀 Sequence Management": sequenceCommands.filter((cmd) => cmd.category === "🚀 Sequence Management"),
  "✅ Task Management": taskCommands.filter((cmd) => cmd.category === "✅ Task Management"),
};

// Export for MCP and CLI usage
export { 
  accountCommands,
  leadListCommands,
  contactCommands, 
  sequenceCommands, 
  taskCommands, 
};

export default {
  commands: allAmpleMarketCommands,
  platformInfo,
  commandCategories,
  api,
};
