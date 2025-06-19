import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "📋 List all sequences",
    usage: "sequences:list [--limit 50] [--offset 0]",
    category: "📝 Email Sequences",
    handler: async (args) => {
      const params = {
        limit: args.limit || 50,
        offset: args.offset || 0,
      };
      const data = await api.getSequences(params);
      console.log("📝 Sequences:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:create",
    description: "➕ Create new sequence",
    usage: 'sequences:create --name "Sequence Name" [--description "Description"]',
    category: "📝 Email Sequences",
    handler: async (args) => {
      if (!args.name) throw new Error("Required: --name");
      const sequenceData = {
        name: args.name,
        description: args.description || "",
      };
      const data = await api.createSequence(sequenceData);
      console.log("✅ Sequence created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:update",
    description: "✏️ Update sequence",
    usage: 'sequences:update --id sequence_id --name "New Name"',
    category: "📝 Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateSequence(args.id, args);
      console.log("✅ Sequence updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:delete",
    description: "🗑️ Delete sequence",
    usage: "sequences:delete --id sequence_id",
    category: "📝 Email Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteSequence(args.id);
      console.log("✅ Sequence deleted successfully");
    },
  },
  {
    name: "sequences:clone",
    description: "🔄 Clone sequence",
    usage: 'sequences:clone --id sequence_id --name "Cloned Sequence"',
    category: "📝 Email Sequences",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");
      console.log("🔄 Cloning sequence...");
      console.log("🚧 Sequence cloning feature coming soon - use SmartLead dashboard for now");
    },
  },
  {
    name: "sequences:templates",
    description: "📄 Get sequence templates",
    usage: "sequences:templates [--category sales|followup]",
    category: "📝 Email Sequences",
    handler: async (args) => {
      const params = args.category ? { category: args.category } : {};
      const data = await api.getTemplates(params);
      console.log("📄 Sequence Templates:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Sequence command aliases
export const sequenceAliases: CLICommand[] = [
  { ...sequenceCommands[0], name: "seq:list", description: "📋 List sequences (alias)" },
  { ...sequenceCommands[1], name: "seq:create", description: "➕ Create sequence (alias)" },
  { ...sequenceCommands[2], name: "seq:update", description: "✏️ Update sequence (alias)" },
  { ...sequenceCommands[3], name: "seq:delete", description: "🗑️ Delete sequence (alias)" },
];
