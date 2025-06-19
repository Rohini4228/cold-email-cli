import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "📋 List all sequences",
    usage: "lemlist sequences:list",
    category: "🔄 Sequence Management",
    handler: async () => {
      const sequences = await api.getSequences();
      console.log("🔄 LemList Sequences:");
      sequences.forEach((sequence: any) => {
        console.log(`  ${sequence._id}: ${sequence.name} (${sequence.steps?.length || 0} steps)`);
      });
    },
  },
  {
    name: "sequences:create",
    description: "➕ Create new sequence",
    usage: "lemlist sequences:create --name <name>",
    category: "🔄 Sequence Management",
    handler: async (args: { name: string; steps?: any[] }) => {
      const sequence = await api.createSequence(args);
      console.log(`✅ Created sequence: ${sequence.name}`);
    },
  },
  {
    name: "sequences:get",
    description: "🔍 Get sequence details",
    usage: "lemlist sequences:get --id <sequence_id>",
    category: "🔄 Sequence Management",
    handler: async (args) => {
      const sequence = await api.getSequence(args.id);
      console.log("🔄 Sequence Details:");
      console.log(`  ID: ${sequence._id}`);
      console.log(`  Name: ${sequence.name}`);
      console.log(`  Steps: ${sequence.steps?.length || 0}`);
    },
  },
  {
    name: "sequences:update",
    description: "✏️ Update sequence",
    usage: "lemlist sequences:update --id <sequence_id> [--name <name>]",
    category: "🔄 Sequence Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const sequence = await api.updateSequence(id, data);
      console.log(`✅ Updated sequence: ${sequence.name}`);
    },
  },
  {
    name: "sequences:delete",
    description: "🗑️ Delete sequence",
    usage: "lemlist sequences:delete --id <sequence_id>",
    category: "🔄 Sequence Management",
    handler: async (args) => {
      await api.deleteSequence(args.id);
      console.log(`✅ Deleted sequence: ${args.id}`);
    },
  },
];

export const sequenceAliases: CLICommand[] = [
  {
    name: "seq:list",
    description: "📋 List sequences (alias)",
    usage: "lemlist seq:list",
    category: "🔄 Sequence Management",
    handler: sequenceCommands[0].handler,
  },
  {
    name: "seq:create",
    description: "➕ Create sequence (alias)",
    usage: "lemlist seq:create --name <name>",
    category: "🔄 Sequence Management",
    handler: sequenceCommands[1].handler,
  },
]; 