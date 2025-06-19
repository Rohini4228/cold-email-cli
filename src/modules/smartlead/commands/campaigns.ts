import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "List all campaigns with pagination and filters",
    usage: "campaigns:list [--limit 20] [--offset 0] [--status active]",
    category: "Campaign Management",
    handler: async (args) => {
      const params = new URLSearchParams();
      if (args.limit) params.append("limit", args.limit);
      if (args.offset) params.append("offset", args.offset);
      if (args.status) params.append("status", args.status);

      const data = await api.getCampaigns(Object.fromEntries(params));
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:create",
    description: "Create new email campaign",
    usage: 'campaigns:create --name "Campaign Name" --track_settings "open,click"',
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.name) throw new Error("Required: --name");
      const data = await api.createCampaign(args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:get",
    description: "Get detailed campaign information",
    usage: "campaigns:get --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:update",
    description: "Update campaign settings",
    usage: 'campaigns:update --id campaign_id --name "New Name"',
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateCampaign(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:delete",
    description: "Delete campaign permanently",
    usage: "campaigns:delete --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteCampaign(args.id);
      console.log("✅ Campaign deleted successfully");
    },
  },
  {
    name: "campaigns:start",
    description: "Start campaign execution",
    usage: "campaigns:start --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.startCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:pause",
    description: "Pause running campaign",
    usage: "campaigns:pause --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.pauseCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:resume",
    description: "Resume paused campaign",
    usage: "campaigns:resume --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.startCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:clone",
    description: "Clone existing campaign",
    usage: 'campaigns:clone --id campaign_id --name "Cloned Campaign"',
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");
      // Implementation for cloning
      console.log("🚧 Campaign cloning feature coming soon");
    },
  },
  {
    name: "campaigns:archive",
    description: "Archive completed campaign",
    usage: "campaigns:archive --id campaign_id",
    category: "Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      // Implementation for archiving
      console.log("🚧 Campaign archiving feature coming soon");
    },
  },
];

// Aliases for common commands
export const campaignAliases: CLICommand[] = [
  { ...campaignCommands[0], name: "c:list" },
  { ...campaignCommands[1], name: "c:create" },
  { ...campaignCommands[2], name: "c:get" },
  { ...campaignCommands[5], name: "c:start" },
  { ...campaignCommands[6], name: "c:pause" },
];
