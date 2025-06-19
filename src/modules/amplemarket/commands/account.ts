import type { CLICommand } from "../../../types/global";
import { AmpleMarketAPI } from "../api";

const api = new AmpleMarketAPI();

export const accountCommands: CLICommand[] = [
  {
    name: "account:details",
    description: "👤 Get account details",
    usage: "account:details",
    category: "🏢 Account Management",
    handler: async (_args) => {
      const data = await api.getAccountDetails();
      console.log("👤 Account Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "account:users",
    description: "👥 List all users",
    usage: "account:users",
    category: "🏢 Account Management",
    handler: async (_args) => {
      const data = await api.getUsers();
      console.log("👥 Account Users:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "phone:review",
    description: "📱 Review phone number",
    usage: 'phone:review --phone-id phone_id --valid true [--notes "Phone notes"]',
    category: "🏢 Account Management",
    handler: async (args) => {
      if (!args["phone-id"]) {
        throw new Error("❌ Required: --phone-id");
      }
      if (args.valid === undefined) {
        throw new Error("❌ Required: --valid (true/false)");
      }

      const reviewData: any = {
        is_valid: args.valid === "true",
      };

      if (args.notes) reviewData.notes = args.notes;

      const data = await api.reviewPhoneNumber(args["phone-id"], reviewData);
      console.log("📱 Phone number reviewed successfully:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const accountAliases: CLICommand[] = [
  { ...accountCommands[0], name: "acc:details" },
  { ...accountCommands[1], name: "acc:users" },
  { ...accountCommands[2], name: "phone:check" },
];
