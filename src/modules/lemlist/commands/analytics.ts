import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const analyticsCommands: CLICommand[] = [
  {
    name: "analytics:campaign",
    description: "📊 Get campaign analytics",
    usage: "lemlist analytics:campaign --id <campaign_id>",
    category: "📊 Analytics & Reporting",
    handler: async (args) => {
      const stats = await api.getCampaignStats(args.id);
      console.log("📊 Campaign Analytics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
  {
    name: "analytics:account",
    description: "📈 Get account analytics",
    usage: "lemlist analytics:account",
    category: "📊 Analytics & Reporting",
    handler: async () => {
      const stats = await api.getAccountStats();
      console.log("📈 Account Analytics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const analyticsAliases: CLICommand[] = [
  {
    name: "stats:campaign",
    description: "📊 Campaign stats (alias)",
    usage: "lemlist stats:campaign --id <campaign_id>",
    category: "📊 Analytics & Reporting",
    handler: analyticsCommands[0].handler,
  },
];
