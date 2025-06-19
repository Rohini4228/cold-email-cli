import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "📋 List all email campaigns",
    usage: "campaigns:list [--page 1] [--per_page 20] [--status active]",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      const params = {
        page: args.page ? parseInt(args.page) : 1,
        per_page: args.per_page ? parseInt(args.per_page) : 20,
        ...(args.status && { status: args.status })
      };
      const data = await api.getCampaigns(params);
      console.log("📋 QuickMail Campaigns:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:create",
    description: "➕ Create new email campaign",
    usage: 'campaigns:create --name "Campaign Name" --subject "Email Subject" --from_name "John Doe" --from_email "john@company.com"',
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.name || !args.subject || !args.from_name || !args.from_email) {
        throw new Error("Required: --name, --subject, --from_name, --from_email");
      }
      
      const campaignData = {
        name: args.name,
        subject: args.subject,
        from_name: args.from_name,
        from_email: args.from_email,
        reply_to: args.reply_to,
        track_opens: args.track_opens === 'true',
        track_clicks: args.track_clicks === 'true',
      };
      
      const data = await api.createCampaign(campaignData);
      console.log("✅ Campaign created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:get",
    description: "🔍 Get campaign details",
    usage: "campaigns:get --id campaign_id",
    category: "🌊 Campaign Management",
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
    usage: 'campaigns:update --id campaign_id --name "New Name" [--subject "New Subject"]',
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      const updateData = {
        ...(args.name && { name: args.name }),
        ...(args.subject && { subject: args.subject }),
        ...(args.from_name && { from_name: args.from_name }),
        ...(args.from_email && { from_email: args.from_email }),
        ...(args.reply_to && { reply_to: args.reply_to }),
        ...(args.track_opens && { track_opens: args.track_opens === 'true' }),
        ...(args.track_clicks && { track_clicks: args.track_clicks === 'true' }),
      };
      
      const data = await api.updateCampaign(args.id, updateData);
      console.log("✅ Campaign updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:delete",
    description: "🗑️ Delete campaign",
    usage: "campaigns:delete --id campaign_id",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteCampaign(args.id);
      console.log("✅ Campaign deleted successfully!");
    },
  },
  {
    name: "campaigns:launch",
    description: "🚀 Launch campaign",
    usage: "campaigns:launch --id campaign_id",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.launchCampaign(args.id);
      console.log("🚀 Campaign launched successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:pause",
    description: "⏸️ Pause running campaign",
    usage: "campaigns:pause --id campaign_id",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.pauseCampaign(args.id);
      console.log("⏸️ Campaign paused successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:stop",
    description: "⏹️ Stop campaign execution",
    usage: "campaigns:stop --id campaign_id",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.stopCampaign(args.id);
      console.log("⏹️ Campaign stopped successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:stats",
    description: "📊 Get campaign statistics",
    usage: "campaigns:stats --id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🌊 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      const params = {
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getCampaignStats(args.id, params);
      console.log("📊 Campaign Statistics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Campaign command aliases
export const campaignAliases: CLICommand[] = [
  { ...campaignCommands[0], name: "camp:list", description: "📋 List campaigns (alias)" },
  { ...campaignCommands[1], name: "camp:create", description: "➕ Create campaign (alias)" },
  { ...campaignCommands[2], name: "camp:get", description: "🔍 Get campaign (alias)" },
  { ...campaignCommands[5], name: "camp:launch", description: "🚀 Launch campaign (alias)" },
  { ...campaignCommands[6], name: "camp:pause", description: "⏸️ Pause campaign (alias)" },
  { ...campaignCommands[7], name: "camp:stop", description: "⏹️ Stop campaign (alias)" },
  { ...campaignCommands[8], name: "camp:stats", description: "📊 Campaign stats (alias)" },
]; 