import type { CLICommand } from "../../../types/global";
import { InstantlyAPI } from "../api";

const api = new InstantlyAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "📋 List all campaigns with filters",
    usage: "campaigns:list [--limit 20] [--offset 0] [--status active]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      const params = {
        limit: args.limit || 20,
        offset: args.offset || 0,
        ...(args.status && { status: args.status }),
      };
      const data = await api.getCampaigns(params);
      console.log("🚀 Instantly Campaigns:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:create",
    description: "➕ Create new email campaign",
    usage: 'campaigns:create --name "Campaign Name" [--description "Campaign description"]',
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.name) throw new Error("Required: --name");
      const data = await api.createCampaign(args);
      console.log("✅ Campaign created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:get",
    description: "🔍 Get campaign details",
    usage: "campaigns:get --id campaign_id",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getCampaign(args.id);
      console.log("🔍 Campaign Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:update",
    description: "✏️ Update campaign settings",
    usage: 'campaigns:update --id campaign_id --name "New Name"',
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateCampaign(args.id, args);
      console.log("✅ Campaign updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:delete",
    description: "🗑️ Delete campaign permanently",
    usage: "campaigns:delete --id campaign_id",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteCampaign(args.id);
      console.log("✅ Campaign deleted successfully");
    },
  },
  {
    name: "campaigns:start",
    description: "🚀 Launch campaign",
    usage: "campaigns:start --id campaign_id",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.launchCampaign(args.id);
      console.log("✅ Campaign launched successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:pause",
    description: "⏸️ Pause running campaign",
    usage: "campaigns:pause --id campaign_id",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.pauseCampaign(args.id);
      console.log("⏸️ Campaign paused successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:analytics",
    description: "📊 Get campaign analytics",
    usage: "campaigns:analytics --id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const params = {
        id: args.id,
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };

      const data = await api.getCampaignAnalytics(params);
      console.log("📊 Campaign Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:analytics-overview",
    description: "📈 Get campaign analytics overview",
    usage: "campaigns:analytics-overview --id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const params = {
        id: args.id,
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };

      const data = await api.getCampaignAnalyticsOverview(params);
      console.log("📈 Campaign Analytics Overview:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:daily-analytics",
    description: "📅 Get daily campaign analytics",
    usage: "campaigns:daily-analytics --campaign_id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");

      const params = {
        campaign_id: args.campaign_id,
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };

      const data = await api.getCampaignDailyAnalytics(params);
      console.log("📅 Daily Campaign Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:step-analytics",
    description: "📊 Get campaign step analytics",
    usage: "campaigns:step-analytics --campaign_id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");

      const params = {
        campaign_id: args.campaign_id,
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };

      const data = await api.getCampaignStepAnalytics(params);
      console.log("📊 Step Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:subsequences",
    description: "📝 Manage campaign subsequences",
    usage:
      "campaigns:subsequences --action list|create|pause|resume [--campaign_id campaign_id] [--subsequence_id subsequence_id]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      switch (args.action) {
        case "create": {
          if (!args.campaign_id) throw new Error("Required for create: --campaign_id");
          const createData = await api.createSubsequence({
            campaign_id: args.campaign_id,
            name: args.name || "New Subsequence",
            description: args.description || "",
          });
          console.log("✅ Subsequence created successfully!");
          console.log(JSON.stringify(createData, null, 2));
          break;
        }

        case "pause":
          if (!args.subsequence_id) throw new Error("Required for pause: --subsequence_id");
          await api.pauseSubsequence(args.subsequence_id);
          console.log("⏸️ Subsequence paused successfully!");
          break;

        case "resume":
          if (!args.subsequence_id) throw new Error("Required for resume: --subsequence_id");
          await api.resumeSubsequence(args.subsequence_id);
          console.log("▶️ Subsequence resumed successfully!");
          break;

        default: {
          const data = await api.getSubsequences();
          console.log("📝 Campaign Subsequences:");
          console.log(JSON.stringify(data, null, 2));
        }
      }
    },
  },
  {
    name: "campaigns:clone",
    description: "🔄 Clone existing campaign",
    usage: 'campaigns:clone --id campaign_id --name "Cloned Campaign"',
    category: "🚀 Campaign Management",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");
      console.log("🔄 Cloning campaign...");
      console.log("🚧 Campaign cloning feature coming soon - use Instantly dashboard for now");
    },
  },
];

// Aliases for common commands
export const campaignAliases: CLICommand[] = [
  { ...campaignCommands[0], name: "c:list", description: "📋 List campaigns (alias)" },
  { ...campaignCommands[1], name: "c:create", description: "➕ Create campaign (alias)" },
  { ...campaignCommands[2], name: "c:get", description: "🔍 Get campaign (alias)" },
  { ...campaignCommands[5], name: "c:start", description: "🚀 Start campaign (alias)" },
  { ...campaignCommands[6], name: "c:pause", description: "⏸️ Pause campaign (alias)" },
  { ...campaignCommands[7], name: "c:analytics", description: "📊 Campaign analytics (alias)" },
];
