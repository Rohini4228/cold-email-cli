import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const peopleCommands: CLICommand[] = [
  {
    name: "people:list",
    description: "👥 List all people",
    usage: "salesloft people:list [--page <page>] [--per_page <per_page>]",
    category: "👥 People Management",
    handler: async (args) => {
      const people = await api.getPeople(args);
      console.log("👥 SalesLoft People:");
      people.forEach((person: any) => {
        console.log(`  ${person.id}: ${person.first_name} ${person.last_name} (${person.email_address})`);
      });
    },
  },
  {
    name: "people:create",
    description: "➕ Create new person",
    usage: "salesloft people:create --first_name <name> --last_name <name> --email_address <email>",
    category: "👥 People Management",
    handler: async (args) => {
      const person = await api.createPerson(args);
      console.log(`✅ Created person: ${person.first_name} ${person.last_name}`);
    },
  },
  {
    name: "people:get",
    description: "🔍 Get person details",
    usage: "salesloft people:get --id <person_id>",
    category: "👥 People Management",
    handler: async (args) => {
      const person = await api.getPerson(args.id);
      console.log("👥 Person Details:");
      console.log(`  ID: ${person.id}`);
      console.log(`  Name: ${person.first_name} ${person.last_name}`);
      console.log(`  Email: ${person.email_address}`);
    },
  },
];

export const peopleAliases: CLICommand[] = [
  {
    name: "pp:list",
    description: "👥 List people (alias)",
    usage: "salesloft pp:list",
    category: "👥 People Management",
    handler: peopleCommands[0].handler,
  },
]; 