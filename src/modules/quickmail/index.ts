import type { CLICommand, Platform } from "../../types/global";
import { QuickMailAPI } from "./api";
import { campaignCommands, campaignAliases } from "./commands/campaigns";
import { contactCommands, contactAliases } from "./commands/contacts";
import { outreachCommands, outreachAliases } from "./commands/outreaches";
import { accountCommands, accountAliases } from "./commands/accounts";
import { templateCommands, templateAliases } from "./commands/templates";
import { analyticsCommands, analyticsAliases } from "./commands/analytics";

// Initialize API client
export const api = new QuickMailAPI();

// Combine all commands
export const quickmailCommands: CLICommand[] = [
  ...campaignCommands,
  ...contactCommands,
  ...outreachCommands,
  ...accountCommands,
  ...templateCommands,
  ...analyticsCommands,
];

// Combine all aliases
export const quickmailAliases: CLICommand[] = [
  ...campaignAliases,
  ...contactAliases,
  ...outreachAliases,
  ...accountAliases,
  ...templateAliases,
  ...analyticsAliases,
];

// All commands combined (main + aliases)
export const allQuickMailCommands: CLICommand[] = [...quickmailCommands, ...quickmailAliases];

export default {
  name: "QuickMail",
  description: "Lightning-fast email automation & outreach platform",
  version: "2.0.0",
  totalCommands: allQuickMailCommands.length,
  categories: [
    {
      name: "🌊 Campaign Management",
      description: "Create and manage email campaigns",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "🌊 Campaign Management").length,
    },
    {
      name: "👥 Contact Management",
      description: "Import and manage contact databases",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "👥 Contact Management").length,
    },
    {
      name: "🔄 Outreach Sequences",
      description: "Build automated outreach sequences",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "🔄 Outreach Sequences").length,
    },
    {
      name: "📧 Email Account Management",
      description: "Configure email accounts and warmup",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "📧 Email Account Management").length,
    },
    {
      name: "📄 Template Management",
      description: "Create and manage email templates",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "📄 Template Management").length,
    },
    {
      name: "📈 Analytics & Reporting",
      description: "Track performance and analytics",
      commands: allQuickMailCommands.filter(cmd => cmd.category === "📈 Analytics & Reporting").length,
    },
  ],
  api,
  commands: allQuickMailCommands,
} as Platform; 