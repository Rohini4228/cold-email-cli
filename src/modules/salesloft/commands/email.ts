import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const emailCommands: CLICommand[] = [
  {
    name: "email:list",
    description: "📧 List emails",
    usage: "salesloft email:list",
    category: "📧 Email Management",
    handler: async (args) => {
      const emails = await api.getEmails(args);
      console.log("📧 Recent Emails:");
      console.log(JSON.stringify(emails, null, 2));
    },
  },
];

export const emailAliases: CLICommand[] = [];
