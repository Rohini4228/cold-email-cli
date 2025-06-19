import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const campaignCommands: CLICommand[] = [
  {
    name: "campaigns:list",
    description: "📋 List all campaigns",
    usage: "lemlist campaigns:list",
    category: "🚀 Campaign Management",
    handler: async () => {
      const campaigns = await api.getCampaigns();
      console.log("🚀 LemList Campaigns:");
      campaigns.forEach((campaign: any) => {
        console.log(`  ${campaign._id}: ${campaign.name} (${campaign.isStarted ? '✅ Active' : '⏸️  Paused'})`);
      });
    },
  },
  {
    name: "campaigns:create",
    description: "➕ Create new campaign",
    usage: "lemlist campaigns:create --name <name>",
    category: "🚀 Campaign Management",
    handler: async (args: { name: string; options?: any }) => {
      const campaign = await api.createCampaign(args);
      console.log(`✅ Created campaign: ${campaign.name}`);
    },
  },
  {
    name: "campaigns:get",
    description: "🔍 Get campaign details",
    usage: "lemlist campaigns:get --id <campaign_id>",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      const campaign = await api.getCampaign(args.id);
      console.log("🚀 Campaign Details:");
      console.log(`  ID: ${campaign._id}`);
      console.log(`  Name: ${campaign.name}`);
      console.log(`  Status: ${campaign.isStarted ? '✅ Active' : '⏸️  Paused'}`);
    },
  },
  {
    name: "campaigns:update",
    description: "✏️ Update campaign",
    usage: "lemlist campaigns:update --id <campaign_id> [--name <name>]",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const campaign = await api.updateCampaign(id, data);
      console.log(`✅ Updated campaign: ${campaign.name}`);
    },
  },
  {
    name: "campaigns:delete",
    description: "🗑️ Delete campaign",
    usage: "lemlist campaigns:delete --id <campaign_id>",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      await api.deleteCampaign(args.id);
      console.log(`✅ Deleted campaign: ${args.id}`);
    },
  },
  {
    name: "campaigns:start",
    description: "▶️ Start campaign",
    usage: "lemlist campaigns:start --id <campaign_id>",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      await api.startCampaign(args.id);
      console.log(`✅ Started campaign: ${args.id}`);
    },
  },
  {
    name: "campaigns:pause",
    description: "⏸️ Pause campaign",
    usage: "lemlist campaigns:pause --id <campaign_id>",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      await api.pauseCampaign(args.id);
      console.log(`✅ Paused campaign: ${args.id}`);
    },
  },
  {
    name: "campaigns:stats",
    description: "📊 Get campaign statistics",
    usage: "lemlist campaigns:stats --id <campaign_id>",
    category: "🚀 Campaign Management",
    handler: async (args) => {
      const stats = await api.getCampaignStats(args.id);
      console.log("📊 Campaign Statistics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const campaignAliases: CLICommand[] = [
  {
    name: "camp:list",
    description: "📋 List campaigns (alias)",
    usage: "lemlist camp:list",
    category: "🚀 Campaign Management",
    handler: campaignCommands[0].handler,
  },
  {
    name: "camp:create",
    description: "➕ Create campaign (alias)",
    usage: "lemlist camp:create --name <name>",
    category: "🚀 Campaign Management",
    handler: campaignCommands[1].handler,
  },
  {
    name: "camp:start",
    description: "▶️ Start campaign (alias)",
    usage: "lemlist camp:start --id <id>",
    category: "🚀 Campaign Management",
    handler: campaignCommands[5].handler,
  },
]; 