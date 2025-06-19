import type { CLICommand } from "../../../types/global";
import { AmpleMarketAPI } from "../api";

const api = new AmpleMarketAPI();

export const contactCommands: CLICommand[] = [
  {
    name: "contacts:list",
    description: "👥 List all contacts",
    usage: "contacts:list [--limit 50] [--offset 0]",
    category: "👤 Contact Management",
    handler: async (args) => {
      const params: any = {};
      if (args.limit) params.limit = parseInt(args.limit);
      if (args.offset) params.offset = parseInt(args.offset);

      const data = await api.getContacts(params);
      console.log("👥 Your Contacts:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:get",
    description: "🔍 Get contact details by ID",
    usage: "contacts:get --id contact_id",
    category: "👤 Contact Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("❌ Required: --id");
      }

      const data = await api.getContact(args.id);
      console.log("👤 Contact Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:get-by-email",
    description: "📧 Get contact details by email",
    usage: "contacts:get-by-email --email user@domain.com",
    category: "👤 Contact Management",
    handler: async (args) => {
      if (!args.email) {
        throw new Error("❌ Required: --email");
      }

      const data = await api.getContactByEmail(args.email);
      console.log("📧 Contact by Email:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:search",
    description: "🔎 Search for people (non-enrichment)",
    usage: 'contacts:search [--company "Company"] [--title "Title"] [--location "Location"] [--limit 25]',
    category: "👤 Contact Management",
    handler: async (args) => {
      const searchParams: any = {};
      if (args.company) searchParams.company = args.company;
      if (args.title) searchParams.title = args.title;
      if (args.location) searchParams.location = args.location;
      if (args.industry) searchParams.industry = args.industry;
      if (args.limit) searchParams.limit = parseInt(args.limit);

      const data = await api.searchPeople(searchParams);
      console.log("🔎 Search Results:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const contactAliases: CLICommand[] = [
  { ...contactCommands[0], name: "c:list" },
  { ...contactCommands[1], name: "c:get" },
  { ...contactCommands[2], name: "c:email" },
  { ...contactCommands[3], name: "c:search" },
];
