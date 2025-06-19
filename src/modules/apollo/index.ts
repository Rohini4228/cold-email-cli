import type { CLICommand, Platform } from "../../types/global";
import { ApolloAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/accounts";
import { contactAliases, contactCommands } from "./commands/contacts";
// Import modular command files
import { sequenceAliases, sequenceCommands } from "./commands/sequences";
import { templateAliases, templateCommands } from "./commands/templates";

// Initialize API client
export const api = new ApolloAPI();

// Combine all commands
export const apolloCommands: CLICommand[] = [
  ...sequenceCommands,
  ...templateCommands,
  ...contactCommands,
  ...accountCommands,
];

// Combine all aliases
export const apolloAliases: CLICommand[] = [
  ...sequenceAliases,
  ...templateAliases,
  ...contactAliases,
  ...accountAliases,
];

// All commands combined (main + aliases)
export const allApolloCommands: CLICommand[] = [...apolloCommands, ...apolloAliases];

export default {
  name: "Apollo",
  description: "Email sequences & outreach automation platform",
  version: "1.0.0",
  totalCommands: allApolloCommands.length,
  categories: [
    {
      name: "☀️ Email Sequences",
      description: "Manage email sequences and automation",
      commands: sequenceCommands.length,
    },
    {
      name: "📄 Email Templates",
      description: "Create and manage email templates",
      commands: templateCommands.length,
    },
    {
      name: "👥 Contacts",
      description: "Manage contacts and prospects",
      commands: contactCommands.length,
    },
    {
      name: "📧 Email Accounts",
      description: "Email account setup and configuration",
      commands: accountCommands.length,
    },
  ],
  api,
  commands: allApolloCommands,
} as Platform;
