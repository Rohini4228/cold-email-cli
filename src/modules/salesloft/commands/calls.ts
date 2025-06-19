import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const callCommands: CLICommand[] = [
  {
    name: "calls:list",
    description: "📞 List calls",
    usage: "salesloft calls:list",
    category: "📞 Call Management",
    handler: async (args) => {
      const calls = await api.getCalls(args);
      console.log("📞 Recent Calls:");
      console.log(JSON.stringify(calls, null, 2));
    },
  },
];

export const callAliases: CLICommand[] = [];
