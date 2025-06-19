import type { CLICommand } from "../../../types/global";
import { api } from "../index";

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "📝 List all templates",
    usage: "lemlist templates:list",
    category: "📝 Template Management",
    handler: async () => {
      const templates = await api.getTemplates();
      console.log("📝 LemList Templates:");
      templates.forEach((template: any) => {
        console.log(`  ${template._id}: ${template.name}`);
      });
    },
  },
  {
    name: "templates:create",
    description: "➕ Create new template",
    usage: "lemlist templates:create --name <name> --subject <subject> --body <body>",
    category: "📝 Template Management",
    handler: async (args: { name: string; subject: string; body: string }) => {
      const template = await api.createTemplate(args);
      console.log(`✅ Created template: ${template.name}`);
    },
  },
  {
    name: "templates:get",
    description: "🔍 Get template details",
    usage: "lemlist templates:get --id <template_id>",
    category: "📝 Template Management",
    handler: async (args) => {
      const template = await api.getTemplate(args.id);
      console.log("📝 Template Details:");
      console.log(`  ID: ${template._id}`);
      console.log(`  Name: ${template.name}`);
      console.log(`  Subject: ${template.subject}`);
    },
  },
  {
    name: "templates:update",
    description: "✏️ Update template",
    usage: "lemlist templates:update --id <template_id> [options]",
    category: "📝 Template Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const template = await api.updateTemplate(id, data);
      console.log(`✅ Updated template: ${template.name}`);
    },
  },
  {
    name: "templates:delete",
    description: "🗑️ Delete template",
    usage: "lemlist templates:delete --id <template_id>",
    category: "📝 Template Management",
    handler: async (args) => {
      await api.deleteTemplate(args.id);
      console.log(`✅ Deleted template: ${args.id}`);
    },
  },
];

export const templateAliases: CLICommand[] = [
  {
    name: "tpl:list",
    description: "📝 List templates (alias)",
    usage: "lemlist tpl:list",
    category: "📝 Template Management",
    handler: templateCommands[0].handler,
  },
  {
    name: "tpl:create",
    description: "➕ Create template (alias)",
    usage: "lemlist tpl:create --name <name> --subject <subject> --body <body>",
    category: "📝 Template Management",
    handler: templateCommands[1].handler,
  },
]; 