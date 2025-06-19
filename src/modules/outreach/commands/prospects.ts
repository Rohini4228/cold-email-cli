import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const prospectCommands: CLICommand[] = [
  {
    name: "prospects:list",
    description: "👥 List all prospects",
    usage: "outreach prospects:list [--page <page>] [--count <count>]",
    category: "👤 Prospect Management",
    handler: async (args) => {
      const prospects = await api.getProspects(args);
      console.log("👤 Outreach Prospects:");
      prospects.forEach((prospect: any) => {
        console.log(`  ${prospect.id}: ${prospect.attributes.firstName} ${prospect.attributes.lastName} (${prospect.attributes.emails?.[0]?.email})`);
      });
    },
  },
  {
    name: "prospects:create",
    description: "➕ Create new prospect",
    usage: "outreach prospects:create --firstName <name> --lastName <name> --email <email>",
    category: "👤 Prospect Management",
    handler: async (args) => {
      const prospect = await api.createProspect(args);
      console.log(`✅ Created prospect: ${prospect.attributes.firstName} ${prospect.attributes.lastName}`);
    },
  },
  {
    name: "prospects:get",
    description: "🔍 Get prospect details",
    usage: "outreach prospects:get --id <prospect_id>",
    category: "👤 Prospect Management",
    handler: async (args) => {
      const prospect = await api.getProspect(args.id);
      console.log("👤 Prospect Details:");
      console.log(`  ID: ${prospect.id}`);
      console.log(`  Name: ${prospect.attributes.firstName} ${prospect.attributes.lastName}`);
      console.log(`  Email: ${prospect.attributes.emails?.[0]?.email}`);
      console.log(`  Company: ${prospect.attributes.company || 'N/A'}`);
    },
  },
  {
    name: "prospects:update", 
    description: "✏️ Update prospect",
    usage: "outreach prospects:update --id <prospect_id> [--firstName <name>] [--lastName <name>]",
    category: "👤 Prospect Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const prospect = await api.updateProspect(id, data);
      console.log(`✅ Updated prospect: ${prospect.attributes.firstName} ${prospect.attributes.lastName}`);
    },
  },
];

export const prospectAliases: CLICommand[] = [
  {
    name: "p:list",
    description: "👥 List prospects (alias)",
    usage: "outreach p:list",
    category: "👤 Prospect Management",
    handler: prospectCommands[0].handler,
  },
  {
    name: "p:create",
    description: "➕ Create prospect (alias)",
    usage: "outreach p:create --firstName <name> --lastName <name> --email <email>",
    category: "👤 Prospect Management",
    handler: prospectCommands[1].handler,
  },
]; 