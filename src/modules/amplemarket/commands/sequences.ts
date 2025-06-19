import type { CLICommand } from "../../../types/global";
import { AmpleMarketAPI } from "../api";

const api = new AmpleMarketAPI();

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "🔄 List all sequences",
    usage: "sequences:list",
    category: "🚀 Sequence Management",
    handler: async (_args) => {
      const data = await api.getSequences();
      console.log("🔄 Available Sequences:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:add-leads",
    description: "➕ Add leads to sequence",
    usage: 'sequences:add-leads --sequence-id sequence_id --lead-ids \'["lead1","lead2"]\'',
    category: "🚀 Sequence Management",
    handler: async (args) => {
      if (!args["sequence-id"]) {
        throw new Error("❌ Required: --sequence-id");
      }
      if (!args["lead-ids"]) {
        throw new Error("❌ Required: --lead-ids (JSON array)");
      }

      let leadIds: string[];
      try {
        leadIds = JSON.parse(args["lead-ids"]);
        if (!Array.isArray(leadIds)) {
          throw new Error("❌ --lead-ids must be a JSON array");
        }
      } catch {
        throw new Error("❌ Invalid JSON for --lead-ids");
      }

      const data = await api.addLeadsToSequence(args["sequence-id"], leadIds);
      console.log("✅ Leads added to sequence successfully:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const sequenceAliases: CLICommand[] = [
  { ...sequenceCommands[0], name: "seq:list" },
  { ...sequenceCommands[1], name: "seq:add" },
];
