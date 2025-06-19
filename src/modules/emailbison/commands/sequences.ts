import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "List power sequences",
    usage: "sequences:list [--campaign-id campaign_id]",
    category: "Power Sequences",
    handler: async (args) => {
      const data = await api.getSequences(args["campaign-id"]);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:create",
    description: "Create new power sequence",
    usage:
      'sequences:create --name "Sequence Name" --campaign-id campaign_id --steps \'[{"delay_days":1,"subject":"Hello","content":"Hi there"}]\'',
    category: "Power Sequences",
    handler: async (args) => {
      if (!args.name) {
        throw new Error("Required: --name");
      }
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args.steps) {
        throw new Error("Required: --steps (JSON array)");
      }

      let steps: any[];
      try {
        steps = JSON.parse(args.steps);
      } catch {
        throw new Error("Invalid JSON for --steps");
      }

      const sequenceData: any = {
        name: args.name,
        campaign_id: args["campaign-id"],
        steps,
      };

      if (args["power-settings"]) {
        try {
          sequenceData.power_settings = JSON.parse(args["power-settings"]);
        } catch {
          throw new Error("Invalid JSON for --power-settings");
        }
      }

      const data = await api.createSequence(sequenceData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:update",
    description: "Update sequence configuration",
    usage: 'sequences:update --id sequence_id [--name "New Name"]',
    category: "Power Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const updateData: any = {};
      if (args.name) updateData.name = args.name;
      if (args.steps) {
        try {
          updateData.steps = JSON.parse(args.steps);
        } catch {
          throw new Error("Invalid JSON for --steps");
        }
      }

      const data = await api.updateSequence(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:delete",
    description: "Delete sequence",
    usage: "sequences:delete --id sequence_id",
    category: "Power Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      await api.deleteSequence(args.id);
      console.log("Sequence deleted successfully");
    },
  },
  {
    name: "sequences:optimize",
    description: "AI-optimize sequence for better performance",
    usage: "sequences:optimize --id sequence_id [--goal open-rate]",
    category: "Power Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.optimizeSequence(args.id, args.goal);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const sequenceAliases: CLICommand[] = [
  { ...sequenceCommands[0], name: "s:list" },
  { ...sequenceCommands[1], name: "s:create" },
  { ...sequenceCommands[2], name: "s:update" },
  { ...sequenceCommands[3], name: "s:delete" },
  { ...sequenceCommands[4], name: "s:optimize" },
];
