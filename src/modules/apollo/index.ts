import type { CLICommand } from "../../types/global";
import { ApolloAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/accounts";
import { contactAliases, contactCommands } from "./commands/contacts";
// Import modular command files
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { templateAliases, templateCommands } from "./commands/templates";

// Initialize API client
export const api = new ApolloAPI();

// All Apollo commands (email sequences only)
export const apolloCommands: CLICommand[] = [
  ...sequenceCommands,
  ...templateCommands,
  ...contactCommands,
  ...accountCommands,
];

// All Apollo aliases
export const apolloAliases: CLICommand[] = [
  ...sequenceAliases,
  ...templateAliases,
  ...contactAliases,
  ...accountAliases,
];

// All commands combined (main + aliases)
export const allApolloCommands: CLICommand[] = [...apolloCommands, ...apolloAliases];

// Platform info
export const platformInfo = {
  name: "Apollo",
  description: "Email Sequences & Outreach Automation - Professional email sequences that work",
  version: "2.0.0",
  totalCommands: allApolloCommands.length,
  categories: ["Email Sequences", "Email Templates", "Contacts", "Email Accounts"],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "Email Sequences": sequenceCommands.filter((cmd) => cmd.category === "Email Sequences"),
  "Email Templates": templateCommands.filter((cmd) => cmd.category === "Email Templates"),
  Contacts: contactCommands.filter((cmd) => cmd.category === "Contacts"),
  "Email Accounts": accountCommands.filter((cmd) => cmd.category === "Email Accounts"),
};

// Export for MCP and CLI usage
export { sequenceCommands, templateCommands, contactCommands, accountCommands };

export default {
  commands: allApolloCommands,
  platformInfo,
  commandCategories,
  api,
};
