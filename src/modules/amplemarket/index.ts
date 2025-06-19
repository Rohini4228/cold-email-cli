import type { CLICommand, Platform } from "../../types/global";
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
  name: "Amplemarket",
  description: "Sales intelligence & prospecting platform",
  version: "1.0.0",
  totalCommands: allAmpleMarketCommands.length,
  categories: [
    {
      name: "💼 Account Management",
      description: "Manage sales intelligence accounts",
      commands: accountCommands.length,
    },
    {
      name: "👥 Contact Management",
      description: "Manage and organize contacts",
      commands: contactCommands.length,
    },
    {
      name: "📊 Lead List Management",
      description: "Create and manage lead lists",
      commands: leadListCommands.length,
    },
    {
      name: "📋 Sequence Management",
      description: "Manage email sequences",
      commands: sequenceCommands.length,
    },
    {
      name: "📞 Task Management",
      description: "Call logs and task tracking",
      commands: taskCommands.length,
    },
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
export { accountCommands, leadListCommands, contactCommands, sequenceCommands, taskCommands };

export default {
  name: "Amplemarket",
  description: "Sales intelligence & prospecting platform",
  version: "1.0.0",
  totalCommands: allAmpleMarketCommands.length,
  categories: [
    {
      name: "💼 Account Management",
      description: "Manage sales intelligence accounts",
      commands: accountCommands.length,
    },
    {
      name: "👥 Contact Management",
      description: "Manage and organize contacts",
      commands: contactCommands.length,
    },
    {
      name: "📊 Lead List Management",
      description: "Create and manage lead lists",
      commands: leadListCommands.length,
    },
    {
      name: "📋 Sequence Management",
      description: "Manage email sequences",
      commands: sequenceCommands.length,
    },
    {
      name: "📞 Task Management",
      description: "Call logs and task tracking",
      commands: taskCommands.length,
    },
  ],
  api,
  commands: allAmpleMarketCommands,
} as Platform;
