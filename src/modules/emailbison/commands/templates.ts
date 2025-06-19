import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "List all power templates",
    usage: "templates:list [--category category] [--limit 25]",
    category: "Power Templates",
    handler: async (args) => {
      const data = await api.getTemplates(args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:create",
    description: "Create new power template",
    usage: 'templates:create --name "Template Name" --subject "Subject" --content "Content"',
    category: "Power Templates",
    handler: async (args) => {
      if (!args.name) {
        throw new Error("Required: --name");
      }
      if (!args.subject) {
        throw new Error("Required: --subject");
      }
      if (!args.content) {
        throw new Error("Required: --content");
      }

      const templateData: any = {
        name: args.name,
        subject: args.subject,
        content: args.content,
      };

      if (args.category) templateData.category = args.category;
      if (args["power-variables"]) {
        try {
          templateData.power_variables = JSON.parse(args["power-variables"]);
        } catch {
          throw new Error("Invalid JSON for --power-variables");
        }
      }

      const data = await api.createTemplate(templateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:get",
    description: "Get template details",
    usage: "templates:get --id template_id",
    category: "Power Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const data = await api.getTemplate(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:update",
    description: "Update template",
    usage: 'templates:update --id template_id [--name "New Name"] [--subject "New Subject"]',
    category: "Power Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      const updateData: any = {};
      if (args.name) updateData.name = args.name;
      if (args.subject) updateData.subject = args.subject;
      if (args.content) updateData.content = args.content;
      if (args.category) updateData.category = args.category;

      const data = await api.updateTemplate(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:delete",
    description: "Delete template",
    usage: "templates:delete --id template_id",
    category: "Power Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }

      await api.deleteTemplate(args.id);
      console.log("Template deleted successfully");
    },
  },
  {
    name: "templates:power-personalize",
    description: "Generate personalized content using AI",
    usage: 'templates:power-personalize --id template_id --lead-data \'{"company":"Acme Corp"}\'',
    category: "Power Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id");
      }
      if (!args["lead-data"]) {
        throw new Error("Required: --lead-data (JSON object)");
      }

      let leadData: Record<string, any>;
      try {
        leadData = JSON.parse(args["lead-data"]);
      } catch {
        throw new Error("Invalid JSON for --lead-data");
      }

      const data = await api.powerPersonalize(args.id, leadData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const templateAliases: CLICommand[] = [
  { ...templateCommands[0], name: "t:list" },
  { ...templateCommands[1], name: "t:create" },
  { ...templateCommands[2], name: "t:get" },
  { ...templateCommands[3], name: "t:update" },
  { ...templateCommands[4], name: "t:delete" },
  { ...templateCommands[5], name: "t:personalize" },
];
