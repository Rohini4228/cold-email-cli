import type { CLICommand } from "../../../types/global";
import { ApolloAPI } from "../api";

const api = new ApolloAPI();

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "List all email templates",
    usage: "templates:list [--page 1] [--per_page 25]",
    category: "Email Templates",
    handler: async (args) => {
      const params: any = {};
      if (args.page) params.page = parseInt(args.page);
      if (args.per_page) params.per_page = parseInt(args.per_page);

      const data = await api.getEmailTemplates(params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:get",
    description: "Get details of a specific email template",
    usage: "templates:get --id <template_id>",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (template ID)");
      }

      const data = await api.getEmailTemplate(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:create",
    description: "Create a new email template",
    usage: 'templates:create --name "Template Name" --subject "Subject" --body "Body content"',
    category: "Email Templates",
    handler: async (args) => {
      if (!args.name || !args.subject || !args.body) {
        throw new Error("Required: --name, --subject, and --body");
      }

      const templateData: any = {
        name: args.name,
        subject: args.subject,
        body_text: args.body,
      };

      if (args.body_html) templateData.body_html = args.body_html;
      if (args.folder_id) templateData.folder_id = args.folder_id;

      const data = await api.createEmailTemplate(templateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:update",
    description: "Update an email template",
    usage: 'templates:update --id <template_id> [--name "New Name"] [--subject "New Subject"]',
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (template ID)");
      }

      const updateData: any = {};
      if (args.name) updateData.name = args.name;
      if (args.subject) updateData.subject = args.subject;
      if (args.body) updateData.body_text = args.body;
      if (args.body_html) updateData.body_html = args.body_html;

      const data = await api.updateEmailTemplate(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:delete",
    description: "Delete an email template",
    usage: "templates:delete --id <template_id>",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (template ID)");
      }

      const _data = await api.deleteEmailTemplate(args.id);
      console.log("Template deleted successfully");
    },
  },
];

export const templateAliases: CLICommand[] = [
  { ...templateCommands[0], name: "tpl:list" },
  { ...templateCommands[1], name: "tpl:get" },
  { ...templateCommands[2], name: "tpl:create" },
  { ...templateCommands[3], name: "tpl:update" },
  { ...templateCommands[4], name: "tpl:delete" },
];
