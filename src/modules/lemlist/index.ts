import type { CLICommand, Platform } from "../../types/global";
import { lemlistAPI } from "./api";
import { analyticsCommands } from "./commands/analytics";
import { campaignCommands } from "./commands/campaigns";
import { leadCommands } from "./commands/leads";
import { sequenceCommands } from "./commands/sequences";
import { teamCommands } from "./commands/team";
import { templateCommands } from "./commands/templates";

export const api = new lemlistAPI();

// Combined command arrays
export const lemlistCommands: CLICommand[] = [
  ...campaignCommands,
  ...leadCommands,
  ...sequenceCommands,
  ...templateCommands,
  ...teamCommands,
  ...analyticsCommands,
];

export const lemlistAliases: CLICommand[] = [
  // Campaign aliases
  { ...campaignCommands[0], name: "camp:list", usage: "lemlist camp:list" },
  { ...campaignCommands[1], name: "camp:create", usage: "lemlist camp:create --name <name>" },
  { ...campaignCommands[3], name: "camp:start", usage: "lemlist camp:start --id <id>" },

  // Lead aliases
  { ...leadCommands[0], name: "ld:list", usage: "lemlist ld:list --campaign_id <campaign_id>" },
  {
    ...leadCommands[1],
    name: "ld:add",
    usage: "lemlist ld:add --campaign_id <campaign_id> --email <email> --firstName <name> --lastName <name>",
  },
];

export const alllemlistCommands: CLICommand[] = [...lemlistCommands, ...lemlistAliases];

// Platform configuration
export default {
  name: "lemlist",
  description: "Creative email outreach & automation platform",
  version: "1.0.0",
  totalCommands: alllemlistCommands.length,
  categories: [
    {
      name: "💖 Campaign Management",
      description: "Manage creative email campaigns",
      commands: campaignCommands.length,
    },
    {
      name: "👥 Lead Management",
      description: "Import and manage leads",
      commands: leadCommands.length,
    },
    {
      name: "📝 Sequence Management",
      description: "Create and manage email sequences",
      commands: sequenceCommands.length,
    },
    {
      name: "📄 Template Management",
      description: "Manage email templates",
      commands: templateCommands.length,
    },
    {
      name: "👥 Team Management",
      description: "Team collaboration features",
      commands: teamCommands.length,
    },
    {
      name: "📊 Analytics",
      description: "Campaign and account analytics",
      commands: analyticsCommands.length,
    },
  ],
  api,
  commands: alllemlistCommands,
} as Platform;
