import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const adminCommands: CLICommand[] = [
  {
    name: "admin:user",
    description: "⚙️ Get user info",
    usage: "salesloft admin:user",
    category: "⚙️ Admin & Configuration",
    handler: async () => {
      const user = await api.getUser();
      console.log("⚙️ User Info:");
      console.log(JSON.stringify(user, null, 2));
    },
  },
];

export const adminAliases: CLICommand[] = []; 