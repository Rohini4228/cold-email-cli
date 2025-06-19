import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const contactCommands: CLICommand[] = [
  {
    name: "contacts:list",
    description: "📋 List all contacts",
    usage: "contacts:list [--page 1] [--per_page 20] [--search query]",
    category: "👥 Contact Management",
    handler: async (args) => {
      const params = {
        page: args.page ? parseInt(args.page) : 1,
        per_page: args.per_page ? parseInt(args.per_page) : 20,
        ...(args.search && { search: args.search }),
      };
      const data = await api.getContacts(params);
      console.log("👥 QuickMail Contacts:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:create",
    description: "➕ Create new contact",
    usage:
      'contacts:create --email "john@company.com" [--first_name "John"] [--last_name "Doe"] [--company "ACME Inc"]',
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.email) throw new Error("Required: --email");

      const contactData = {
        email: args.email,
        first_name: args.first_name,
        last_name: args.last_name,
        company: args.company,
        position: args.position,
        phone: args.phone,
        website: args.website,
        linkedin: args.linkedin,
        custom_fields: args.custom_fields ? JSON.parse(args.custom_fields) : undefined,
      };

      const data = await api.createContact(contactData);
      console.log("✅ Contact created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:get",
    description: "🔍 Get contact details",
    usage: "contacts:get --id contact_id",
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getContact(args.id);
      console.log("🔍 Contact Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:update",
    description: "✏️ Update contact information",
    usage: 'contacts:update --id contact_id [--first_name "John"] [--company "New Company"]',
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const updateData = {
        ...(args.email && { email: args.email }),
        ...(args.first_name && { first_name: args.first_name }),
        ...(args.last_name && { last_name: args.last_name }),
        ...(args.company && { company: args.company }),
        ...(args.position && { position: args.position }),
        ...(args.phone && { phone: args.phone }),
        ...(args.website && { website: args.website }),
        ...(args.linkedin && { linkedin: args.linkedin }),
        ...(args.custom_fields && { custom_fields: JSON.parse(args.custom_fields) }),
      };

      const data = await api.updateContact(args.id, updateData);
      console.log("✅ Contact updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:delete",
    description: "🗑️ Delete contact",
    usage: "contacts:delete --id contact_id",
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteContact(args.id);
      console.log("✅ Contact deleted successfully!");
    },
  },
  {
    name: "contacts:bulk-create",
    description: "📦 Create multiple contacts at once",
    usage: 'contacts:bulk-create --contacts \'[{"email":"john@company.com","first_name":"John"}]\'',
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.contacts) throw new Error("Required: --contacts (JSON array)");

      let contacts: any[];
      try {
        contacts = JSON.parse(args.contacts);
      } catch (error) {
        throw new Error("Invalid JSON format for contacts");
      }

      const data = await api.bulkCreateContacts(contacts);
      console.log("✅ Bulk contacts created successfully!");
      console.log(`📊 Created: ${contacts.length} contacts`);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:import",
    description: "📁 Import contacts from CSV",
    usage:
      'contacts:import --csv_data "email,first_name\\njohn@company.com,John" --mapping \'{"email":"email","first_name":"first_name"}\'',
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.csv_data || !args.mapping) throw new Error("Required: --csv_data, --mapping");

      let mapping: Record<string, string>;
      try {
        mapping = JSON.parse(args.mapping);
      } catch (error) {
        throw new Error("Invalid JSON format for mapping");
      }

      const data = await api.importContacts({
        csv_data: args.csv_data,
        mapping: mapping,
      });
      console.log("✅ Contacts imported successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:search",
    description: "🔍 Search contacts by criteria",
    usage: 'contacts:search --query "john" [--page 1] [--per_page 20]',
    category: "👥 Contact Management",
    handler: async (args) => {
      if (!args.query) throw new Error("Required: --query");

      const params = {
        search: args.query,
        page: args.page ? parseInt(args.page) : 1,
        per_page: args.per_page ? parseInt(args.per_page) : 20,
      };

      const data = await api.getContacts(params);
      console.log("🔍 Contact Search Results:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Contact command aliases
export const contactAliases: CLICommand[] = [
  { ...contactCommands[0], name: "c:list", description: "📋 List contacts (alias)" },
  { ...contactCommands[1], name: "c:create", description: "➕ Create contact (alias)" },
  { ...contactCommands[2], name: "c:get", description: "🔍 Get contact (alias)" },
  { ...contactCommands[3], name: "c:update", description: "✏️ Update contact (alias)" },
  { ...contactCommands[4], name: "c:delete", description: "🗑️ Delete contact (alias)" },
  { ...contactCommands[7], name: "c:search", description: "🔍 Search contacts (alias)" },
];
