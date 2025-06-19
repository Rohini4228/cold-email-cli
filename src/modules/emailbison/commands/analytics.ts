import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const analyticsCommands: CLICommand[] = [
  {
    name: "analytics:account",
    description: "Get comprehensive account analytics",
    usage: "analytics:account",
    category: "Power Analytics",
    handler: async (_args) => {
      const data = await api.getAccountAnalytics();
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:deliverability",
    description: "Get deliverability report",
    usage: "analytics:deliverability [--period 30d]",
    category: "Power Analytics",
    handler: async (args) => {
      const data = await api.getDeliverabilityReport(args.period);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const analyticsAliases: CLICommand[] = [
  { ...analyticsCommands[0], name: "ana:account" },
  { ...analyticsCommands[1], name: "ana:delivery" },
];
