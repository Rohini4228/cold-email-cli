import type { CLICommand } from "../../../types/global";
import { AmpleMarketAPI } from "../api";

const api = new AmpleMarketAPI();

export const leadListCommands: CLICommand[] = [
  {
    name: "leadlists:list",
    description: "📋 List all lead lists",
    usage: "leadlists:list",
    category: "📊 Lead List Management",
    handler: async (_args) => {
      const data = await api.getLeadLists();
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leadlists:create",
    description: "✨ Create new lead list",
    usage: 'leadlists:create --name "List Name" [--description "List description"]',
    category: "📊 Lead List Management",
    handler: async (args) => {
      if (!args.name) {
        throw new Error("❌ Required: --name");
      }

      const leadListData: any = {
        name: args.name,
      };

      if (args.description) leadListData.description = args.description;

      const data = await api.createLeadList(leadListData);
      console.log("✅ Lead list created successfully:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leadlists:get",
    description: "🔍 Get lead list details",
    usage: "leadlists:get --id lead_list_id",
    category: "📊 Lead List Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("❌ Required: --id");
      }

      const data = await api.getLeadList(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const leadListAliases: CLICommand[] = [
  { ...leadListCommands[0], name: "ll:list" },
  { ...leadListCommands[1], name: "ll:create" },
  { ...leadListCommands[2], name: "ll:get" },
];
