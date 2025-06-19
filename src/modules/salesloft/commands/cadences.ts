import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const cadenceCommands: CLICommand[] = [
  {
    name: "cadences:list",
    description: "📋 List all cadences",
    usage: "salesloft cadences:list [--page <page>] [--per_page <per_page>]",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      const cadences = await api.getCadences(args);
      console.log("🔄 SalesLoft Cadences:");
      cadences.forEach((cadence: any) => {
        console.log(`  ${cadence.id}: ${cadence.name} (${cadence.shared ? '🌐 Shared' : '👤 Personal'})`);
      });
    },
  },
  {
    name: "cadences:create",
    description: "➕ Create new cadence",
    usage: "salesloft cadences:create --name <name> [--shared]",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      const cadence = await api.createCadence(args);
      console.log(`✅ Created cadence: ${cadence.name}`);
    },
  },
  {
    name: "cadences:get",
    description: "🔍 Get cadence details",
    usage: "salesloft cadences:get --id <cadence_id>",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      const cadence = await api.getCadence(args.id);
      console.log("🔄 Cadence Details:");
      console.log(`  ID: ${cadence.id}`);
      console.log(`  Name: ${cadence.name}`);
      console.log(`  Shared: ${cadence.shared ? '✅ Yes' : '❌ No'}`);
    },
  },
  {
    name: "cadences:update",
    description: "✏️ Update cadence",
    usage: "salesloft cadences:update --id <cadence_id> [--name <name>] [--shared]",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const cadence = await api.updateCadence(id, data);
      console.log(`✅ Updated cadence: ${cadence.name}`);
    },
  },
  {
    name: "cadences:delete",
    description: "🗑️ Delete cadence",
    usage: "salesloft cadences:delete --id <cadence_id>",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      await api.deleteCadence(args.id);
      console.log(`✅ Deleted cadence: ${args.id}`);
    },
  },
  {
    name: "cadences:stats",
    description: "📊 Get cadence statistics",
    usage: "salesloft cadences:stats --id <cadence_id>",
    category: "🔄 Cadence Management",
    handler: async (args) => {
      const stats = await api.getCadenceStats(args.id);
      console.log("📊 Cadence Statistics:");
      console.log(JSON.stringify(stats, null, 2));
    },
  },
];

export const cadenceAliases: CLICommand[] = [
  {
    name: "cad:list",
    description: "📋 List cadences (alias)",
    usage: "salesloft cad:list",
    category: "🔄 Cadence Management",
    handler: cadenceCommands[0].handler,
  },
  {
    name: "cad:create",
    description: "➕ Create cadence (alias)",
    usage: "salesloft cad:create --name <name>",
    category: "🔄 Cadence Management",
    handler: cadenceCommands[1].handler,
  },
]; 