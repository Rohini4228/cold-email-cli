import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "📝 List all templates",
    usage: "outreach templates:list [--page <page>] [--count <count>]",
    category: "📝 Template Management",
    handler: async (args) => {
      const templates = await api.getTemplates(args);
      console.log("📝 Outreach Templates:");
      templates.forEach((template: any) => {
        console.log(`  ${template.id}: ${template.attributes.name || template.attributes.subject}`);
      });
    },
  },
  {
    name: "templates:create",
    description: "➕ Create new template",
    usage: "outreach templates:create --name <name> --subject <subject> --body <body>",
    category: "📝 Template Management",
    handler: async (args) => {
      const template = await api.createTemplate(args);
      console.log(`✅ Created template: ${template.attributes.name || template.attributes.subject}`);
    },
  },
  {
    name: "templates:get",
    description: "🔍 Get template details",
    usage: "outreach templates:get --id <template_id>",
    category: "📝 Template Management",
    handler: async (args) => {
      const template = await api.getTemplate(args.id);
      console.log("📝 Template Details:");
      console.log(`  ID: ${template.id}`);
      console.log(`  Name: ${template.attributes.name || 'N/A'}`);
      console.log(`  Subject: ${template.attributes.subject}`);
    },
  },
  {
    name: "templates:update",
    description: "✏️ Update template",
    usage: "outreach templates:update --id <template_id> [options]",
    category: "📝 Template Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const template = await api.updateTemplate(id, data);
      console.log(`✅ Updated template: ${template.attributes.name || template.attributes.subject}`);
    },
  },
];

export const templateAliases: CLICommand[] = [
  {
    name: "tpl:list",
    description: "📝 List templates (alias)",
    usage: "outreach tpl:list",
    category: "📝 Template Management",
    handler: templateCommands[0].handler,
  },
  {
    name: "tpl:create",
    description: "➕ Create template (alias)",
    usage: "outreach tpl:create --name <name> --subject <subject> --body <body>",
    category: "📝 Template Management",
    handler: templateCommands[1].handler,
  },
]; 