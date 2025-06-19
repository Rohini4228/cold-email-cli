/**
 * Instantly v2 API CLI Module
 * Complete implementation of Instantly API v2 with 30+ commands
 */

import type { CLICommand, Platform } from "../../types/global";
import { InstantlyAPI } from "./api";
import { accountAliases, accountCommands } from "./commands/accounts";
// Import all modular command files
import { campaignAliases, campaignCommands } from "./commands/campaigns";
import { leadAliases, leadCommands } from "./commands/leads";

// Initialize API client
export const api = new InstantlyAPI();

// Combine all commands
export const instantlyCommands: CLICommand[] = [...campaignCommands, ...leadCommands, ...accountCommands];

// Combine all aliases
export const instantlyAliases: CLICommand[] = [...campaignAliases, ...leadAliases, ...accountAliases];

// All commands combined (main + aliases)
export const allInstantlyCommands: CLICommand[] = [...instantlyCommands, ...instantlyAliases];

export default {
  name: "Instantly",
  description: "High-volume email automation & deliverability platform",
  version: "2.0.0",
  totalCommands: allInstantlyCommands.length,
  categories: [
    {
      name: "🚀 Campaign Management",
      description: "Manage email campaigns and automation",
      commands: campaignCommands.length,
    },
    {
      name: "👥 Lead Management",
      description: "Import and manage leads",
      commands: leadCommands.length,
    },
    {
      name: "📧 Account Management",
      description: "Email account configuration and warmup",
      commands: accountCommands.length,
    },
  ],
  api,
  commands: allInstantlyCommands,
} as Platform;
