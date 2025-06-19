import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const analyticsCommands: CLICommand[] = [
  {
    name: "analytics:overview",
    description: "📊 Get overall account statistics",
    usage: "analytics:overview [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const params = {
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getOverallStats(params);
      console.log("📊 QuickMail Account Overview:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:campaigns",
    description: "📈 Get campaign performance analytics",
    usage: "analytics:campaigns --id campaign_id [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      
      const params = {
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getCampaignStats(args.id, params);
      console.log("📈 Campaign Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:emails",
    description: "📧 Get email performance statistics",
    usage: "analytics:emails [--campaign_id campaign_id] [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const params = {
        ...(args.campaign_id && { campaign_id: args.campaign_id }),
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getEmailStats(params);
      console.log("📧 Email Performance Statistics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:clicks",
    description: "🖱️ Get click tracking analytics",
    usage: "analytics:clicks [--campaign_id campaign_id] [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const params = {
        ...(args.campaign_id && { campaign_id: args.campaign_id }),
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getClickStats(params);
      console.log("🖱️ Click Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:unsubscribes",
    description: "🚫 Get unsubscribe analytics",
    usage: "analytics:unsubscribes [--campaign_id campaign_id] [--start_date 2024-01-01] [--end_date 2024-12-31]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const params = {
        ...(args.campaign_id && { campaign_id: args.campaign_id }),
        ...(args.start_date && { start_date: args.start_date }),
        ...(args.end_date && { end_date: args.end_date }),
      };
      
      const data = await api.getUnsubscribeStats(params);
      console.log("🚫 Unsubscribe Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:deliverability",
    description: "📬 Get deliverability analytics",
    usage: "analytics:deliverability [--email_account_id account_id]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const data = await api.getDeliverabilityStats(args.email_account_id);
      console.log("📬 Deliverability Analytics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "analytics:performance",
    description: "🏆 Get performance summary dashboard",
    usage: "analytics:performance [--period 7d|30d|90d]",
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      const period = args.period || "30d";
      
      // Calculate date range based on period
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      
      switch (period) {
        case "7d":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "30d":
          startDate.setDate(startDate.getDate() - 30);
          break;
        case "90d":
          startDate.setDate(startDate.getDate() - 90);
          break;
        default:
          startDate.setDate(startDate.getDate() - 30);
      }
      
      const params = {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate,
      };
      
      console.log(`🏆 Performance Dashboard (${period}):`);
      console.log("=".repeat(50));
      
      try {
        const [overallStats, emailStats, clickStats] = await Promise.all([
          api.getOverallStats(params),
          api.getEmailStats(params),
          api.getClickStats(params),
        ]);
        
        console.log("📊 Overall Performance:");
        console.log(JSON.stringify(overallStats, null, 2));
        console.log("\n📧 Email Metrics:");
        console.log(JSON.stringify(emailStats, null, 2));
        console.log("\n🖱️ Click Metrics:");
        console.log(JSON.stringify(clickStats, null, 2));
        
      } catch (error) {
        console.log("⚠️ Some analytics data may not be available");
        console.log("Error:", error.message);
      }
    },
  },
  {
    name: "analytics:compare",
    description: "⚖️ Compare campaign performance",
    usage: 'analytics:compare --campaigns "campaign_id1,campaign_id2" [--metric opens|clicks|replies]',
    category: "📈 Analytics & Reporting",
    handler: async (args) => {
      if (!args.campaigns) throw new Error("Required: --campaigns");
      
      const campaignIds = args.campaigns.split(',').map(id => id.trim());
      const metric = args.metric || "opens";
      
      console.log("⚖️ Campaign Comparison:");
      console.log(`📊 Metric: ${metric}`);
      console.log("=".repeat(50));
      
      const comparisons = [];
      
      for (const campaignId of campaignIds) {
        try {
          const stats = await api.getCampaignStats(campaignId);
          comparisons.push({
            campaign_id: campaignId,
            stats: stats,
          });
        } catch (error) {
          console.log(`⚠️ Could not fetch stats for campaign ${campaignId}: ${error.message}`);
        }
      }
      
      comparisons.forEach((comparison, index) => {
        console.log(`\n📈 Campaign ${index + 1} (ID: ${comparison.campaign_id}):`);
        console.log(JSON.stringify(comparison.stats, null, 2));
      });
      
      console.log("\n💡 Tip: Use specific metrics like --metric opens for focused comparison");
    },
  },
];

// Analytics command aliases
export const analyticsAliases: CLICommand[] = [
  { ...analyticsCommands[0], name: "stats", description: "📊 Overview stats (alias)" },
  { ...analyticsCommands[1], name: "camp-stats", description: "📈 Campaign stats (alias)" },
  { ...analyticsCommands[2], name: "email-stats", description: "📧 Email stats (alias)" },
  { ...analyticsCommands[3], name: "click-stats", description: "🖱️ Click stats (alias)" },
  { ...analyticsCommands[6], name: "performance", description: "🏆 Performance dashboard (alias)" },
  { ...analyticsCommands[7], name: "compare", description: "⚖️ Compare campaigns (alias)" },
]; 