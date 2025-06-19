import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const teamCommands: CLICommand[] = [
  {
    name: "team:members",
    description: "👨‍💼 List team members",
    usage: "lemlist team:members",
    category: "⚙️ Team & Account",
    handler: async () => {
      const members = await api.getTeamMembers();
      console.log("👨‍💼 Team Members:");
      console.log(JSON.stringify(members, null, 2));
    },
  },
  {
    name: "account:info",
    description: "🏢 Get account information",
    usage: "lemlist account:info",
    category: "⚙️ Team & Account",
    handler: async () => {
      const account = await api.getAccountInfo();
      console.log("🏢 Account Information:");
      console.log(JSON.stringify(account, null, 2));
    },
  },
];

export const teamAliases: CLICommand[] = [
  {
    name: "team:list",
    description: "👨‍💼 List team (alias)",
    usage: "lemlist team:list",
    category: "⚙️ Team & Account",
    handler: teamCommands[0].handler,
  },
]; 