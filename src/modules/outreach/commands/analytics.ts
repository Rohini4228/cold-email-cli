import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const analyticsCommands: CLICommand[] = [
  {
    name: "analytics:prospects",
    description: "📊 Get prospect analytics",
    usage: "outreach analytics:prospects",
    category: "📊 Analytics & Reporting",
    handler: async (args) => {
      const stats = await api.getProspectStats(args);
      console.log("📊 Prospect Analytics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
  {
    name: "analytics:sequences",
    description: "📈 Get sequence analytics",
    usage: "outreach analytics:sequences --id <sequence_id>",
    category: "📊 Analytics & Reporting",
    handler: async (args) => {
      const stats = await api.getSequenceStats(args.id);
      console.log("📈 Sequence Analytics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const analyticsAliases: CLICommand[] = [
  {
    name: "stats:prospects",
    description: "📊 Prospect stats (alias)",
    usage: "outreach stats:prospects",
    category: "📊 Analytics & Reporting",
    handler: analyticsCommands[0].handler,
  },
]; 