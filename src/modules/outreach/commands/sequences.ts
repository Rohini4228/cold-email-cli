import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "📋 List all sequences",
    usage: "outreach sequences:list [--page <page>] [--count <count>]",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      const sequences = await api.getSequences(args);
      console.log("🎯 Outreach Sequences:");
      sequences.forEach((seq: any) => {
        console.log(`  ${seq.id}: ${seq.attributes.name} (${seq.attributes.enabledAt ? '✅ Active' : '⏸️  Paused'})`);
      });
    },
  },
  {
    name: "sequences:create", 
    description: "➕ Create new sequence",
    usage: "outreach sequences:create --name <name> [--description <desc>]",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      const sequence = await api.createSequence(args);
      console.log(`✅ Created sequence: ${sequence.attributes.name}`);
    },
  },
  {
    name: "sequences:get",
    description: "🔍 Get sequence details",
    usage: "outreach sequences:get --id <sequence_id>",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      const sequence = await api.getSequence(args.id);
      console.log("🎯 Sequence Details:");
      console.log(`  ID: ${sequence.id}`);
      console.log(`  Name: ${sequence.attributes.name}`);
      console.log(`  Description: ${sequence.attributes.description || 'N/A'}`);
      console.log(`  Status: ${sequence.attributes.enabledAt ? '✅ Active' : '⏸️  Paused'}`);
    },
  },
  {
    name: "sequences:update",
    description: "✏️ Update sequence",
    usage: "outreach sequences:update --id <sequence_id> [--name <name>] [--description <desc>]",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const sequence = await api.updateSequence(id, data);
      console.log(`✅ Updated sequence: ${sequence.attributes.name}`);
    },
  },
  {
    name: "sequences:delete",
    description: "🗑️ Delete sequence",
    usage: "outreach sequences:delete --id <sequence_id>",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      await api.deleteSequence(args.id);
      console.log(`✅ Deleted sequence: ${args.id}`);
    },
  },
  {
    name: "sequences:stats",
    description: "📊 Get sequence statistics",
    usage: "outreach sequences:stats --id <sequence_id>",
    category: "🎯 Sequence Management",
    handler: async (args) => {
      const stats = await api.getSequenceStats(args.id);
      console.log("📊 Sequence Statistics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const sequenceAliases: CLICommand[] = [
  {
    name: "seq:list",
    description: "📋 List all sequences (alias)",
    usage: "outreach seq:list",
    category: "🎯 Sequence Management",
    handler: sequenceCommands[0].handler,
  },
  {
    name: "seq:create",
    description: "➕ Create new sequence (alias)",
    usage: "outreach seq:create --name <name>",
    category: "🎯 Sequence Management", 
    handler: sequenceCommands[1].handler,
  },
  {
    name: "seq:get",
    description: "🔍 Get sequence details (alias)",
    usage: "outreach seq:get --id <id>",
    category: "🎯 Sequence Management",
    handler: sequenceCommands[2].handler,
  },
]; 