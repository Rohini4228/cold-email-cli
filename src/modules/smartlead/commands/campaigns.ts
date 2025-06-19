import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "📋 List all campaigns with pagination and filters",
    usage: "campaigns:list [--limit 20] [--offset 0] [--status active]",
    category: "🎯 Campaign Management",
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
    description: "➕ Create new campaign",
    usage: 'campaigns:create --name "Campaign Name" [--description "Description"]',
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.name) throw new Error("Required: --name");
      const campaignData = {
        name: args.name,
        description: args.description || "",
        ...args
      };
      const data = await api.createCampaign(campaignData);
      console.log("✅ Campaign created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:get",
    description: "🔍 Get detailed campaign information",
    usage: "campaigns:get --id campaign_id",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:update",
    description: "✏️ Update campaign settings",
    usage: 'campaigns:update --id campaign_id --name "New Name"',
    category: "🎯 Campaign Management",
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
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteCampaign(args.id);
      console.log("✅ Campaign deleted successfully");
    },
  },
  {
    name: "campaigns:start",
    description: "🚀 Start campaign execution",
    usage: "campaigns:start --id campaign_id",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateCampaignStatus(args.id, "START");
      console.log("✅ Campaign started successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:pause",
    description: "⏸️ Pause running campaign",
    usage: "campaigns:pause --id campaign_id",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateCampaignStatus(args.id, "PAUSED");
      console.log("⏸️ Campaign paused successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:stop",
    description: "⏹️ Stop campaign execution",
    usage: "campaigns:stop --id campaign_id",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateCampaignStatus(args.id, "STOPPED");
      console.log("⏹️ Campaign stopped successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:schedule",
    description: "📅 Set campaign schedule and timing",
    usage: 'campaigns:schedule --id campaign_id --timezone "America/New_York" --start_hour "09:00" --end_hour "17:00" --days "1,2,3,4,5"',
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const scheduleData = {
        timezone: args.timezone || "UTC",
        days_of_the_week: args.days?.split(',').map(Number) || [1,2,3,4,5],
        start_hour: args.start_hour || "09:00",
        end_hour: args.end_hour || "17:00",
        min_time_btw_emails: args.min_time || 10,
        max_new_leads_per_day: args.max_leads || 20,
      };
      const data = await api.updateCampaignSchedule(args.id, scheduleData);
      console.log("✅ Campaign schedule updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:settings",
    description: "⚙️ Update campaign settings",
    usage: 'campaigns:settings --id campaign_id --track_settings "DONT_TRACK_EMAIL_OPEN" --stop_lead_settings "REPLY_TO_AN_EMAIL"',
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const settingsData = {
        track_settings: args.track_settings ? [args.track_settings] : undefined,
        stop_lead_settings: args.stop_lead_settings,
        unsubscribe_text: args.unsubscribe_text,
        send_as_plain_text: args.plain_text === 'true',
        follow_up_percentage: args.follow_up_percentage ? parseInt(args.follow_up_percentage) : undefined,
        enable_ai_esp_matching: args.ai_esp_matching === 'true',
      };
      const data = await api.updateCampaignSettings(args.id, settingsData);
      console.log("✅ Campaign settings updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:sequences",
    description: "📝 Manage campaign sequences",
    usage: "campaigns:sequences --id campaign_id [--action list|save]",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      if (args.action === 'save') {
        console.log("💾 Saving sequence data...");
        console.log("🚧 Sequence editing feature coming soon - use SmartLead dashboard for now");
        return;
      }
      
      const data = await api.getCampaignSequences(args.id);
      console.log("📝 Campaign Sequences:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:statistics",
    description: "📊 Get campaign statistics",
    usage: "campaigns:statistics --id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      let data: any;
      if (args.start_date && args.end_date) {
        data = await api.getCampaignStatsByDateRange(args.id, args.start_date, args.end_date);
        console.log("📊 Campaign Statistics (Date Range):");
      } else {
        data = await api.getCampaignStatistics(args.id);
        console.log("📊 Campaign Statistics:");
      }
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "campaigns:export",
    description: "📤 Export campaign data",
    usage: "campaigns:export --id campaign_id [--format csv|json]",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const format = args.format || 'csv';
      
      if (format === 'csv') {
        const data = await api.exportCampaignLeads(args.id);
        console.log("📤 Exporting campaign data as CSV...");
        console.log(data);
      } else {
        const data = await api.getCampaignStatistics(args.id);
        console.log("📤 Exporting campaign data as JSON...");
        console.log(JSON.stringify(data, null, 2));
      }
    },
  },
  {
    name: "campaigns:clone",
    description: "🔄 Clone existing campaign",
    usage: 'campaigns:clone --id campaign_id --name "Cloned Campaign"',
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");
      console.log("🔄 Cloning campaign...");
      console.log("🚧 Campaign cloning feature coming soon - contact SmartLead support for manual cloning");
    },
  },
  {
    name: "campaigns:email-accounts",
    description: "📧 Manage campaign email accounts",
    usage: "campaigns:email-accounts --id campaign_id [--action list|add|remove] [--account_ids 123,456]",
    category: "🎯 Campaign Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      if (args.action === 'add' && args.account_ids) {
        const accountIds = args.account_ids.split(',').map(Number);
        const data = await api.addEmailAccountsToCampaign(args.id, accountIds);
        console.log("✅ Email accounts added to campaign!");
        console.log(JSON.stringify(data, null, 2));
      } else if (args.action === 'remove' && args.account_ids) {
        const accountIds = args.account_ids.split(',').map(Number);
        const data = await api.removeEmailAccountsFromCampaign(args.id, accountIds);
        console.log("✅ Email accounts removed from campaign!");
        console.log(JSON.stringify(data, null, 2));
      } else {
        const data = await api.getCampaignEmailAccounts(args.id);
        console.log("📧 Campaign Email Accounts:");
        console.log(JSON.stringify(data, null, 2));
      }
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
  { ...campaignCommands[7], name: "c:stop", description: "⏹️ Stop campaign (alias)" },
  { ...campaignCommands[11], name: "c:stats", description: "📊 Campaign stats (alias)" },
];
