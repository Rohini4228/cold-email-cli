import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const leadCommands: CLICommand[] = [
  {
    name: "leads:list",
    description: "List leads with advanced filtering",
    usage: "leads:list [--campaign-id campaign_id] [--status active] [--limit 50]",
    category: "Power Lead Management",
    handler: async (args) => {
      const data = await api.getLeads(args["campaign-id"], args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:add",
    description: "Add leads to campaign",
    usage: 'leads:add --campaign-id campaign_id --leads \'[{"email":"test@example.com","first_name":"John"}]\'',
    category: "Power Lead Management",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args.leads) {
        throw new Error("Required: --leads (JSON array)");
      }

      let leadData: any[];
      try {
        leadData = JSON.parse(args.leads);
      } catch {
        throw new Error("Invalid JSON for --leads");
      }

      const data = await api.addLeads(args["campaign-id"], leadData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:import",
    description: "Import leads from file with power processing",
    usage: "leads:import --campaign-id campaign_id --file leads.csv",
    category: "Power Lead Management",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args.file) {
        throw new Error("Required: --file");
      }

      const options = args.options ? JSON.parse(args.options) : undefined;
      const data = await api.importLeadsFromFile(args["campaign-id"], args.file, options);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:power-segment",
    description: "AI-powered lead segmentation",
    usage: 'leads:power-segment --campaign-id campaign_id --criteria \'{"industry":"tech"}\'',
    category: "Power Lead Management",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args.criteria) {
        throw new Error("Required: --criteria (JSON object)");
      }

      let criteriaData: Record<string, any>;
      try {
        criteriaData = JSON.parse(args.criteria);
      } catch {
        throw new Error("Invalid JSON for --criteria");
      }

      const data = await api.powerSegmentLeads(args["campaign-id"], criteriaData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:validate",
    description: "Validate and clean lead data",
    usage: "leads:validate --campaign-id campaign_id",
    category: "Power Lead Management",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }

      const data = await api.validateLeads(args["campaign-id"]);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const leadAliases: CLICommand[] = [
  { ...leadCommands[0], name: "l:list" },
  { ...leadCommands[1], name: "l:add" },
  { ...leadCommands[2], name: "l:import" },
  { ...leadCommands[3], name: "l:segment" },
  { ...leadCommands[4], name: "l:validate" },
];
