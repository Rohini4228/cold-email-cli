import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "List all Email Bison campaigns with power levels",
    usage: "campaigns:list [--power-level 1-10] [--status active] [--limit 25]",
    category: "Power Campaign Management",
    handler: async (args) => {
      const params: any = {};
      if (args.power_level) params.power_level = parseInt(args.power_level);
      if (args.status) params.status = args.status;
      if (args.limit) params.limit = parseInt(args.limit);
      if (args.offset) params.offset = parseInt(args.offset);

      const data = await api.getCampaigns(params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:create",
    description: "Create new power-driven campaign",
    usage: 'campaigns:create --name "Campaign Name" --power-level 5 [--daily-limit 1000]',
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.name) {
        throw new Error("Required: --name");
      }
      if (!args["power-level"]) {
        throw new Error("Required: --power-level (1-10)");
      }

      const campaignData: any = {
        name: args.name,
        power_level: parseInt(args["power-level"]),
      };

      if (args["daily-limit"]) campaignData.daily_limit = parseInt(args["daily-limit"]);
      if (args["automation-rules"]) {
        try {
          campaignData.automation_rules = JSON.parse(args["automation-rules"]);
        } catch {
          throw new Error("Invalid JSON for --automation-rules");
        }
      }

      const data = await api.createCampaign(campaignData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:get",
    description: "Get detailed campaign information",
    usage: "campaigns:get --id campaign_id",
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.getCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:update",
    description: "Update campaign settings",
    usage: 'campaigns:update --id campaign_id [--name "New Name"] [--power-level 8]',
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const updateData: any = {};
      if (args.name) updateData.name = args.name;
      if (args["power-level"]) updateData.power_level = parseInt(args["power-level"]);
      if (args["daily-limit"]) updateData.daily_limit = parseInt(args["daily-limit"]);

      const data = await api.updateCampaign(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:delete",
    description: "Delete campaign permanently",
    usage: "campaigns:delete --id campaign_id",
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      await api.deleteCampaign(args.id);
      console.log("Campaign deleted successfully");
    },
  },
  {
    name: "campaigns:power-boost",
    description: "Boost campaign power level for increased performance",
    usage: "campaigns:power-boost --id campaign_id --power-level 10",
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }
      if (!args["power-level"]) {
        throw new Error("Required: --power-level (1-10)");
      }

      const data = await api.powerBoostCampaign(args.id, parseInt(args["power-level"]));
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:start",
    description: "Start campaign execution",
    usage: "campaigns:start --id campaign_id",
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.startCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:pause",
    description: "Pause campaign execution",
    usage: "campaigns:pause --id campaign_id",
    category: "Power Campaign Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.pauseCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:analytics",
    description: "Get comprehensive campaign analytics",
    usage: "campaigns:analytics --id campaign_id [--period 30d]",
    category: "Power Analytics",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.getCampaignAnalytics(args.id, args.period);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:power-metrics",
    description: "Get advanced power metrics for campaign",
    usage: "campaigns:power-metrics --id campaign_id",
    category: "Power Analytics",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.getPowerMetrics(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const campaignAliases: CLICommand[] = [
  { ...campaignCommands[0], name: "c:list" },
  { ...campaignCommands[1], name: "c:create" },
  { ...campaignCommands[2], name: "c:get" },
  { ...campaignCommands[3], name: "c:update" },
  { ...campaignCommands[4], name: "c:delete" },
  { ...campaignCommands[5], name: "c:boost" },
  { ...campaignCommands[6], name: "c:start" },
  { ...campaignCommands[7], name: "c:pause" },
];
