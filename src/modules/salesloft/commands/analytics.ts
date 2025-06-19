import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const analyticsCommands: CLICommand[] = [
  {
    name: "analytics:cadence",
    description: "📊 Get cadence analytics",
    usage: "salesloft analytics:cadence --id <cadence_id>",
    category: "📊 Analytics & Reporting",
    handler: async (args) => {
      const stats = await api.getCadenceStats(args.id);
      console.log("📊 Cadence Analytics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const analyticsAliases: CLICommand[] = [];
