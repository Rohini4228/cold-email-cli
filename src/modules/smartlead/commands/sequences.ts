import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "List all email sequences in campaign",
    usage: "sequences:list --campaign_id id [--status active]",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const data = await api.getCampaignSequences(args.campaign_id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:create",
    description: "Create new email sequence",
    usage: 'sequences:create --campaign_id id --subject "Subject" --message "Message"',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      const sequenceData = {
        subject: args.subject || "New Email Sequence",
        message: args.message || "Your message here",
        wait_days: args.wait_days || 1,
      };
      const data = await api.createSequence(args.campaign_id, sequenceData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:update",
    description: "Update email sequence content",
    usage: 'sequences:update --id sequence_id --subject "New Subject"',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateSequence(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:delete",
    description: "Delete email sequence",
    usage: "sequences:delete --id sequence_id",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteSequence(args.id);
      console.log("✅ Sequence deleted successfully");
    },
  },
  {
    name: "sequences:reorder",
    description: "Reorder sequence position in campaign",
    usage: "sequences:reorder --id sequence_id --position 2",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id || !args.position) {
        throw new Error("Required: --id, --position");
      }
      console.log(`🔄 Reordering sequence to position ${args.position}...`);
      // Implementation for sequence reordering
      console.log("🚧 Sequence reordering feature coming soon");
    },
  },
  {
    name: "sequences:clone",
    description: "Clone sequence to another campaign",
    usage: "sequences:clone --id sequence_id --campaign_id target_id",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id || !args.campaign_id) {
        throw new Error("Required: --id, --campaign_id");
      }
      console.log("📋 Cloning sequence...");
      // Implementation for sequence cloning
      console.log("🚧 Sequence cloning feature coming soon");
    },
  },
  {
    name: "sequences:test",
    description: "Send test email for sequence",
    usage: "sequences:test --id sequence_id --email test@example.com",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id || !args.email) {
        throw new Error("Required: --id, --email");
      }
      console.log(`📧 Sending test email to ${args.email}...`);
      // Implementation for test email
      console.log("🚧 Test email feature coming soon");
    },
  },
  {
    name: "sequences:schedule",
    description: "Schedule sequence sending times",
    usage: 'sequences:schedule --id sequence_id --days "1,3,5" --time "09:00"',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("📅 Setting sequence schedule...");
      // Implementation for sequence scheduling
      console.log("🚧 Sequence scheduling feature coming soon");
    },
  },
  {
    name: "sequences:analytics",
    description: "View sequence performance analytics",
    usage: "sequences:analytics --id sequence_id [--days 30]",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getSequenceAnalytics(args.id);
      console.log("📊 Sequence analytics:", JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:preview",
    description: "Preview sequence with variable substitution",
    usage: "sequences:preview --id sequence_id --lead_id lead_id",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("👁️  Previewing sequence...");
      // Implementation for sequence preview
      console.log("🚧 Sequence preview feature coming soon");
    },
  },
];

// Sequence command aliases
export const sequenceAliases: CLICommand[] = [
  { ...sequenceCommands[0], name: "s:list" },
  { ...sequenceCommands[1], name: "s:create" },
  { ...sequenceCommands[2], name: "s:update" },
  { ...sequenceCommands[3], name: "s:delete" },
  { ...sequenceCommands[6], name: "s:test" },
  { ...sequenceCommands[8], name: "s:stats" },
];
