import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const leadCommands: CLICommand[] = [
  {
    name: "leads:list",
    description: "👥 List campaign leads",
    usage: "lemlist leads:list --campaign_id <campaign_id>",
    category: "👥 Lead Management",
    handler: async (args) => {
      const leads = await api.getCampaignLeads(args.campaign_id);
      console.log("👥 Campaign Leads:");
      leads.forEach((lead: any) => {
        console.log(`  ${lead.email}: ${lead.firstName} ${lead.lastName} (${lead.campaignStatus})`);
      });
    },
  },
  {
    name: "leads:add",
    description: "➕ Add lead to campaign",
    usage: "lemlist leads:add --campaign_id <campaign_id> --email <email> --firstName <name> --lastName <name>",
    category: "👥 Lead Management",
    handler: async (args) => {
      const { campaign_id, ...leadData } = args;
      const lead = await api.addLeadToCampaign(campaign_id, leadData);
      console.log(`✅ Added lead: ${lead.firstName} ${lead.lastName} (${lead.email})`);
    },
  },
  {
    name: "leads:get",
    description: "🔍 Get lead details",
    usage: "lemlist leads:get --campaign_id <campaign_id> --email <email>",
    category: "👥 Lead Management",
    handler: async (args) => {
      const lead = await api.getLeadFromCampaign(args.campaign_id, args.email);
      console.log("👥 Lead Details:");
      console.log(`  Email: ${lead.email}`);
      console.log(`  Name: ${lead.firstName} ${lead.lastName}`);
      console.log(`  Status: ${lead.campaignStatus}`);
    },
  },
  {
    name: "leads:update",
    description: "✏️ Update lead",
    usage: "lemlist leads:update --campaign_id <campaign_id> --email <email> [options]",
    category: "👥 Lead Management",
    handler: async (args) => {
      const { campaign_id, email, ...data } = args;
      const lead = await api.updateLeadInCampaign(campaign_id, email, data);
      console.log(`✅ Updated lead: ${lead.firstName} ${lead.lastName}`);
    },
  },
  {
    name: "leads:delete",
    description: "🗑️ Delete lead from campaign",
    usage: "lemlist leads:delete --campaign_id <campaign_id> --email <email>",
    category: "👥 Lead Management",
    handler: async (args) => {
      await api.deleteLeadFromCampaign(args.campaign_id, args.email);
      console.log(`✅ Deleted lead: ${args.email}`);
    },
  },
  {
    name: "leads:unsubscribe",
    description: "✋ Unsubscribe lead",
    usage: "lemlist leads:unsubscribe --campaign_id <campaign_id> --email <email>",
    category: "👥 Lead Management",
    handler: async (args) => {
      await api.unsubscribeLead(args.campaign_id, args.email);
      console.log(`✅ Unsubscribed lead: ${args.email}`);
    },
  },
];

export const leadAliases: CLICommand[] = [
  {
    name: "ld:list",
    description: "👥 List leads (alias)",
    usage: "lemlist ld:list --campaign_id <campaign_id>",
    category: "👥 Lead Management",
    handler: leadCommands[0].handler,
  },
  {
    name: "ld:add",
    description: "➕ Add lead (alias)",
    usage: "lemlist ld:add --campaign_id <campaign_id> --email <email> --firstName <name> --lastName <name>",
    category: "👥 Lead Management",
    handler: leadCommands[1].handler,
  },
];
