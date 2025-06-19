import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "List all email templates",
    usage: "templates:list [--category outreach] [--limit 50]",
    category: "Email Templates",
    handler: async (args) => {
      const data = await api.getTemplates(args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:create",
    description: "Create new email template",
    usage: 'templates:create --name "Template Name" --subject "Subject" --body "Body"',
    category: "Email Templates",
    handler: async (args) => {
      if (!args.name) throw new Error("Required: --name");
      const templateData = {
        name: args.name,
        subject: args.subject || "New Template",
        body: args.body || "Template body content",
        category: args.category || "outreach",
      };
      const data = await api.createTemplate(templateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:get",
    description: "🔍 Get specific template details",
    usage: "templates:get --id template_id",
    category: "📄 Templates",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getTemplates({ id: args.id });
      console.log("🔍 Template Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:update",
    description: "Update email template",
    usage: 'templates:update --id template_id --name "New Name"',
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateTemplate(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:delete",
    description: "Delete email template",
    usage: "templates:delete --id template_id",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteTemplate(args.id);
      console.log("✅ Template deleted successfully");
    },
  },
  {
    name: "templates:clone",
    description: "Clone existing template",
    usage: 'templates:clone --id template_id --name "Cloned Template"',
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id || !args.name) {
        throw new Error("Required: --id, --name");
      }
      console.log("📋 Cloning template...");
      // Implementation for template cloning
      console.log("🚧 Template cloning feature coming soon");
    },
  },
  {
    name: "templates:test",
    description: "Send test email using template",
    usage: "templates:test --id template_id --email test@example.com",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id || !args.email) {
        throw new Error("Required: --id, --email");
      }
      console.log(`📧 Sending test email to ${args.email}...`);
      // Implementation for test template
      console.log("🚧 Template testing feature coming soon");
    },
  },
  {
    name: "templates:variables",
    description: "List available template variables",
    usage: "templates:variables [--category lead]",
    category: "Email Templates",
    handler: async (_args) => {
      const variables = [
        "{{first_name}}",
        "{{last_name}}",
        "{{full_name}}",
        "{{email}}",
        "{{company}}",
        "{{job_title}}",
        "{{linkedin_url}}",
        "{{website}}",
        "{{phone}}",
        "{{custom_field_1}}",
        "{{custom_field_2}}",
        "{{custom_field_3}}",
      ];
      console.log("📝 Available template variables:");
      variables.forEach((v) => console.log(`  ${v}`));
    },
  },
  {
    name: "templates:preview",
    description: "Preview template with sample data",
    usage: "templates:preview --id template_id [--lead_id lead_id]",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("👁️  Previewing template...");
      // Implementation for template preview
      console.log("🚧 Template preview feature coming soon");
    },
  },
  {
    name: "templates:import",
    description: "Import templates from file",
    usage: "templates:import --file templates.json",
    category: "Email Templates",
    handler: async (args) => {
      if (!args.file) throw new Error("Required: --file");
      console.log("📥 Importing templates...");
      // Implementation for template import
      console.log("🚧 Template import feature coming soon");
    },
  },
];

// Template command aliases
export const templateAliases: CLICommand[] = [
  { ...templateCommands[0], name: "t:list" },
  { ...templateCommands[1], name: "t:create" },
  { ...templateCommands[2], name: "t:get" },
  { ...templateCommands[3], name: "t:update" },
  { ...templateCommands[4], name: "t:delete" },
  { ...templateCommands[6], name: "t:test" },
];
