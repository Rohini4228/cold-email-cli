import type { CLICommand } from "../../../types/global";
import { ApolloAPI } from "../api";

const api = new ApolloAPI();

export const accountCommands: CLICommand[] = [
  {
    name: "accounts:list",
    description: "List all email accounts",
    usage: "accounts:list",
    category: "Email Accounts",
    handler: async (_args) => {
      const data = await api.getEmailAccounts();
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:get",
    description: "Get details of a specific email account",
    usage: "accounts:get --id <account_id>",
    category: "Email Accounts",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (account ID)");
      }

      const data = await api.getEmailAccount(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:update",
    description: "Update email account settings",
    usage: "accounts:update --id <account_id> [--daily_send_limit 50] [--active true]",
    category: "Email Accounts",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (account ID)");
      }

      const updateData: any = {};
      if (args.daily_send_limit) updateData.daily_send_limit = parseInt(args.daily_send_limit);
      if (args.active !== undefined) updateData.active = args.active === "true";
      if (args.from_name) updateData.from_name = args.from_name;
      if (args.signature) updateData.signature = args.signature;

      const data = await api.updateEmailAccount(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const accountAliases: CLICommand[] = [
  { ...accountCommands[0], name: "accts:list" },
  { ...accountCommands[1], name: "accts:get" },
  { ...accountCommands[2], name: "accts:update" },
];
