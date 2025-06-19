import type { CLICommand } from "../../../types/global";
import { InstantlyAPI } from "../api";

const api = new InstantlyAPI();

export const leadCommands: CLICommand[] = [
  {
    name: "leads:upload",
    description: "Upload leads to campaign",
    usage: "leads:upload --campaign_id id --file leads.csv",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.file) {
        throw new Error("Required: --campaign_id, --file");
      }
      const data = await api.uploadLeads(args.campaign_id, args.file);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:list",
    description: "List campaign leads",
    usage: "leads:list --campaign_id id [--status active] [--limit 100]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const data = await api.getCampaignLeads(args.campaign_id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:status",
    description: "Check lead processing status",
    usage: "leads:status --campaign_id id [--lead_id id]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const data = await api.getLeadStatus(args.campaign_id, args.lead_id);
      console.log("📊 Lead Status:", JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:pause",
    description: "Pause leads in campaign",
    usage: 'leads:pause --campaign_id id --leads "email1,email2"',
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error("Required: --campaign_id, --leads");
      }
      console.log("⏸️  Pausing leads...");
      // Implementation for pausing leads
      console.log("🚧 Lead pausing feature coming soon");
    },
  },
  {
    name: "leads:resume",
    description: "Resume paused leads",
    usage: 'leads:resume --campaign_id id --leads "email1,email2"',
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error("Required: --campaign_id, --leads");
      }
      console.log("▶️  Resuming leads...");
      // Implementation for resuming leads
      console.log("🚧 Lead resuming feature coming soon");
    },
  },
  {
    name: "leads:remove",
    description: "Remove leads from campaign",
    usage: 'leads:remove --campaign_id id --leads "email1,email2"',
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error("Required: --campaign_id, --leads");
      }
      console.log("🗑️  Removing leads...");
      // Implementation for removing leads
      console.log("🚧 Lead removal feature coming soon");
    },
  },
  {
    name: "leads:export",
    description: "Export campaign leads",
    usage: "leads:export --campaign_id id [--format csv] [--status all]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const format = args.format || "csv";
      console.log(`📊 Exporting leads to ${format.toUpperCase()}...`);
      // Implementation for lead export
      console.log("🚧 Lead export feature coming soon");
    },
  },
  {
    name: "leads:validate",
    description: "Validate email addresses",
    usage: 'leads:validate --emails "email1,email2" [--check_mx true]',
    category: "Lead Management",
    handler: async (args) => {
      if (!args.emails) throw new Error("Required: --emails");
      console.log("✅ Validating email addresses...");
      // Implementation for email validation
      console.log("🚧 Email validation feature coming soon");
    },
  },
  {
    name: "leads:bulk-update",
    description: "Bulk update lead properties",
    usage: "leads:bulk-update --campaign_id id --updates updates.json",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.updates) {
        throw new Error("Required: --campaign_id, --updates");
      }
      console.log("🔄 Bulk updating leads...");
      // Implementation for bulk update
      console.log("🚧 Bulk update feature coming soon");
    },
  },
  {
    name: "leads:duplicates",
    description: "Find and manage duplicate leads",
    usage: "leads:duplicates --campaign_id id [--action remove]",
    category: "Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      console.log("🔍 Finding duplicate leads...");
      // Implementation for duplicate detection
      console.log("🚧 Duplicate detection feature coming soon");
    },
  },
];

// Lead command aliases
export const leadAliases: CLICommand[] = [
  { ...leadCommands[0], name: "upload" },
  { ...leadCommands[1], name: "leads" },
  { ...leadCommands[2], name: "status" },
  { ...leadCommands[3], name: "pause" },
  { ...leadCommands[4], name: "resume" },
  { ...leadCommands[6], name: "export" },
];
