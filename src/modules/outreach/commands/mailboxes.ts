import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const mailboxCommands: CLICommand[] = [
  {
    name: "mailboxes:list",
    description: "📧 List all mailboxes",
    usage: "outreach mailboxes:list",
    category: "📧 Mailbox Management",
    handler: async () => {
      const mailboxes = await api.getMailboxes();
      console.log("📧 Outreach Mailboxes:");
      mailboxes.forEach((mailbox: any) => {
        console.log(`  ${mailbox.id}: ${mailbox.attributes.email} (${mailbox.attributes.smtpHost})`);
      });
    },
  },
  {
    name: "mailboxes:get",
    description: "🔍 Get mailbox details",
    usage: "outreach mailboxes:get --id <mailbox_id>",
    category: "📧 Mailbox Management",
    handler: async (args) => {
      const mailbox = await api.getMailbox(args.id);
      console.log("📧 Mailbox Details:");
      console.log(`  ID: ${mailbox.id}`);
      console.log(`  Email: ${mailbox.attributes.email}`);
      console.log(`  SMTP Host: ${mailbox.attributes.smtpHost}`);
    },
  },
  {
    name: "mailboxes:update",
    description: "✏️ Update mailbox",
    usage: "outreach mailboxes:update --id <mailbox_id> [options]",
    category: "📧 Mailbox Management",
    handler: async (args) => {
      const { id, ...data } = args;
      const mailbox = await api.updateMailbox(id, data);
      console.log(`✅ Updated mailbox: ${mailbox.attributes.email}`);
    },
  },
];

export const mailboxAliases: CLICommand[] = [
  {
    name: "mb:list",
    description: "📧 List mailboxes (alias)",
    usage: "outreach mb:list",
    category: "📧 Mailbox Management",
    handler: mailboxCommands[0].handler,
  },
]; 