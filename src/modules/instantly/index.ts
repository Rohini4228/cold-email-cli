/**
 * Instantly v2 API CLI Module
 * Complete implementation of Instantly API v2 with 30+ commands
 */

import type { CLICommand } from "../../types/global";
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

// Platform info
export const platformInfo = {
  name: "Instantly",
  description: "High-Volume Email Automation & Deliverability - Scale your outreach infinitely",
  version: "2.0.0",
  totalCommands: allInstantlyCommands.length,
  categories: ["Campaign Automation", "Lead Management", "Email Accounts"],
  status: "active",
};

// Command categories for organized display
export const commandCategories = {
  "Campaign Automation": campaignCommands.filter((cmd) => cmd.category === "Campaign Automation"),
  "Lead Management": leadCommands.filter((cmd) => cmd.category === "Lead Management"),
  "Email Accounts": accountCommands.filter((cmd) => cmd.category === "Email Accounts"),
};

// Export for MCP and CLI usage
export { campaignCommands, leadCommands, accountCommands };

export default {
  commands: allInstantlyCommands,
  platformInfo,
  commandCategories,
  api,
};
