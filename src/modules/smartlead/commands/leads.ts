import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const leadCommands: CLICommand[] = [
  {
    name: "leads:add-bulk",
    description: "Add multiple leads to campaign",
    usage: "leads:add-bulk --campaign_id id --leads leads.csv",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error("Required: --campaign_id, --leads");
      }
      const data = await api.addLeadsToCampaign(args.campaign_id, args.leads);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:list",
    description: "List campaign leads with filters",
    usage: "leads:list --campaign_id id [--limit 100] [--status active]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const data = await api.getCampaignLeads(args.campaign_id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:add",
    description: "Add single lead to campaign",
    usage: "leads:add --campaign_id id --email john@company.com --first_name John",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.email) {
        throw new Error("Required: --campaign_id, --email");
      }
      const leadData = [
        {
          email: args.email,
          first_name: args.first_name || "",
          last_name: args.last_name || "",
          company: args.company || "",
        },
      ];
      const data = await api.addLeadsToCampaign(args.campaign_id, leadData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:update",
    description: "Update lead information",
    usage: "leads:update --id lead_id --status interested",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateLead(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:delete",
    description: "Remove lead from campaign",
    usage: "leads:delete --id lead_id",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      // Implementation for lead deletion
      console.log("🚧 Lead deletion feature coming soon");
    },
  },
  {
    name: "leads:pause",
    description: "Pause lead in campaign",
    usage: "leads:pause --id lead_id",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateLead(args.id, { status: "paused" });
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:resume",
    description: "Resume paused lead",
    usage: "leads:resume --id lead_id",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateLead(args.id, { status: "active" });
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:export",
    description: "Export campaign leads to CSV",
    usage: "leads:export --campaign_id id [--format csv]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const data = await api.getCampaignLeads(args.campaign_id, args);
      console.log("📊 Exporting leads...", JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:import",
    description: "Import leads from CSV file",
    usage: "leads:import --campaign_id id --file leads.csv",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.file) {
        throw new Error("Required: --campaign_id, --file");
      }
      console.log("📥 Importing leads from file...");
      // Implementation for CSV import
      console.log("🚧 CSV import feature coming soon");
    },
  },
  {
    name: "leads:validate",
    description: "Validate lead email addresses",
    usage: "leads:validate --campaign_id id",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      console.log("✅ Validating lead emails...");
      // Implementation for email validation
      console.log("🚧 Email validation feature coming soon");
    },
  },
];

// Lead command aliases
export const leadAliases: CLICommand[] = [
  { ...leadCommands[0], name: "l:bulk" },
  { ...leadCommands[1], name: "l:list" },
  { ...leadCommands[2], name: "l:add" },
  { ...leadCommands[3], name: "l:update" },
  { ...leadCommands[5], name: "l:pause" },
  { ...leadCommands[6], name: "l:resume" },
];
