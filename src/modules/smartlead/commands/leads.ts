import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const leadCommands: CLICommand[] = [
  {
    name: "leads:list",
    description: "📋 List leads in campaign with filters",
    usage: "leads:list --campaign_id campaign_id [--limit 100] [--offset 0] [--status STARTED]",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      
      const params = {
        limit: args.limit || 100,
        offset: args.offset || 0,
        ...(args.status && { status: args.status }),
      };
      
      const data = await api.getCampaignLeads(args.campaign_id, params);
      console.log("👥 Campaign Leads:");
      console.log(`📊 Total: ${data.total_leads}`);
      console.log(JSON.stringify(data.data, null, 2));
    },
  },
  {
    name: "leads:search",
    description: "🔍 Search leads by email address",
    usage: "leads:search --email john@domain.com",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.email) throw new Error("Required: --email");
      const data = await api.searchLeads({ email: args.email });
      console.log("🔍 Lead Search Results:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:add",
    description: "➕ Add leads to campaign",
    usage: 'leads:add --campaign_id campaign_id --leads \'[{"first_name":"John","last_name":"Doe","email":"john@domain.com","company_name":"ACME Inc"}]\'',
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) throw new Error("Required: --campaign_id, --leads");
      
      let leads: any[];
      try {
        leads = JSON.parse(args.leads);
      } catch (error) {
        throw new Error("Invalid JSON format for leads");
      }
      
      const settings = {
        ignore_global_block_list: args.ignore_blocklist !== 'false',
        ignore_unsubscribe_list: args.ignore_unsubscribe !== 'false',
        ignore_duplicate_leads_in_other_campaign: args.ignore_duplicates === 'true',
      };
      
      const data = await api.addLeadsToCampaign(args.campaign_id, leads, settings);
      console.log("✅ Leads added successfully!");
      console.log(`📊 Uploaded: ${data.upload_count}`);
      console.log(`📊 Total: ${data.total_leads}`);
      console.log(`📊 Already Added: ${data.already_added_to_campaign}`);
      console.log(`📊 Duplicates: ${data.duplicate_count}`);
      console.log(`📊 Invalid Emails: ${data.invalid_email_count}`);
      console.log(`📊 Unsubscribed: ${data.unsubscribed_leads}`);
    },
  },
  {
    name: "leads:update",
    description: "✏️ Update lead information",
    usage: 'leads:update --campaign_id campaign_id --lead_id lead_id --first_name "John" --last_name "Smith" --company_name "New Company"',
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      
      const updateData = {
        ...(args.first_name && { first_name: args.first_name }),
        ...(args.last_name && { last_name: args.last_name }),
        ...(args.email && { email: args.email }),
        ...(args.phone_number && { phone_number: args.phone_number }),
        ...(args.company_name && { company_name: args.company_name }),
        ...(args.website && { website: args.website }),
        ...(args.location && { location: args.location }),
        ...(args.linkedin_profile && { linkedin_profile: args.linkedin_profile }),
        ...(args.custom_fields && { custom_fields: JSON.parse(args.custom_fields) }),
      };
      
      const data = await api.updateLeadInCampaign(args.campaign_id, args.lead_id, updateData);
      console.log("✅ Lead updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:delete",
    description: "🗑️ Remove lead from campaign",
    usage: "leads:delete --campaign_id campaign_id --lead_id lead_id",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      await api.deleteLeadFromCampaign(args.campaign_id, args.lead_id);
      console.log("✅ Lead removed from campaign successfully!");
    },
  },
  {
    name: "leads:pause",
    description: "⏸️ Pause lead in campaign",
    usage: "leads:pause --campaign_id campaign_id --lead_id lead_id",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      const data = await api.pauseLeadInCampaign(args.campaign_id, args.lead_id);
      console.log("⏸️ Lead paused successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:resume",
    description: "▶️ Resume lead in campaign",
    usage: "leads:resume --campaign_id campaign_id --lead_id lead_id [--delay_days 5]",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      const delayDays = args.delay_days ? parseInt(args.delay_days) : 0;
      const data = await api.resumeLeadInCampaign(args.campaign_id, args.lead_id, delayDays);
      console.log("▶️ Lead resumed successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:unsubscribe",
    description: "🚫 Unsubscribe lead from campaign",
    usage: "leads:unsubscribe --campaign_id campaign_id --lead_id lead_id [--global true]",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      
      if (args.global === 'true') {
        await api.unsubscribeLeadGlobally(args.lead_id);
        console.log("🚫 Lead unsubscribed globally!");
      } else {
        await api.unsubscribeLeadFromCampaign(args.campaign_id, args.lead_id);
        console.log("🚫 Lead unsubscribed from campaign!");
      }
    },
  },
  {
    name: "leads:categories",
    description: "🏷️ Manage lead categories",
    usage: "leads:categories [--action list|update] [--campaign_id campaign_id] [--lead_id lead_id] [--category_id 1] [--pause_lead true]",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (args.action === 'update') {
        if (!args.campaign_id || !args.lead_id || !args.category_id) {
          throw new Error("Required for update: --campaign_id, --lead_id, --category_id");
        }
        
        const pauseLead = args.pause_lead === 'true';
        const data = await api.updateLeadCategory(args.campaign_id, args.lead_id, parseInt(args.category_id), pauseLead);
        console.log("✅ Lead category updated successfully!");
        console.log(JSON.stringify(data, null, 2));
      } else {
        const categories = await api.getLeadCategories();
        console.log("🏷️ Available Lead Categories:");
        categories.forEach(category => {
          console.log(`  ${category.id}: ${category.name} (Created: ${new Date(category.created_at).toLocaleDateString()})`);
        });
      }
    },
  },
  {
    name: "leads:message-history",
    description: "💬 Get lead message history",
    usage: "leads:message-history --campaign_id campaign_id --lead_id lead_id",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.lead_id) throw new Error("Required: --campaign_id, --lead_id");
      
      const data = await api.getLeadMessageHistory(args.campaign_id, args.lead_id);
      console.log("💬 Lead Message History:");
      console.log(`📧 From: ${data.from}`);
      console.log(`📧 To: ${data.to}`);
      console.log("📜 History:");
      
      data.history.forEach((message, index) => {
        console.log(`\n--- Message ${index + 1} (${message.type}) ---`);
        console.log(`⏰ Time: ${new Date(message.time).toLocaleString()}`);
        console.log(`📧 Subject: ${message.subject || 'No subject'}`);
        console.log(`📝 Body: ${message.email_body}`);
        if (message.message_id) console.log(`🆔 Message ID: ${message.message_id}`);
        if (message.stats_id) console.log(`📊 Stats ID: ${message.stats_id}`);
      });
    },
  },
  {
    name: "leads:reply",
    description: "📧 Reply to lead from master inbox",
    usage: 'leads:reply --campaign_id campaign_id --email_stats_id "stats_id" --email_body "Your reply message" --reply_message_id "message_id" --reply_email_time "2024-01-01T12:00:00.000Z"',
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.email_stats_id || !args.email_body || !args.reply_message_id || !args.reply_email_time) {
        throw new Error("Required: --campaign_id, --email_stats_id, --email_body, --reply_message_id, --reply_email_time");
      }
      
      const replyData = {
        email_stats_id: args.email_stats_id,
        email_body: args.email_body,
        reply_message_id: args.reply_message_id,
        reply_email_time: args.reply_email_time,
        reply_email_body: args.reply_email_body || "",
        cc: args.cc || "",
        bcc: args.bcc || "",
        add_signature: args.add_signature !== 'false',
      };
      
      const data = await api.replyToLeadFromMasterInbox(args.campaign_id, replyData);
      console.log("✅ Reply sent successfully!");
      console.log("Response:", data);
    },
  },
  {
    name: "leads:export",
    description: "📤 Export campaign leads",
    usage: "leads:export --campaign_id campaign_id",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      
      const data = await api.exportCampaignLeads(args.campaign_id);
      console.log("📤 Exporting campaign leads...");
      console.log("CSV Data:");
      console.log(data);
    },
  },
  {
    name: "leads:blocklist",
    description: "🚫 Manage global block list",
    usage: 'leads:blocklist --action add --domains \'["spam@domain.com", "badcompany.com"]\' [--client_id 123]',
    category: "👥 Lead Management", 
    handler: async (args) => {
      if (args.action === 'add') {
        if (!args.domains) throw new Error("Required: --domains (JSON array)");
        
        let domains: string[];
        try {
          domains = JSON.parse(args.domains);
        } catch (error) {
          throw new Error("Invalid JSON format for domains");
        }
        
        const clientId = args.client_id ? parseInt(args.client_id) : undefined;
        const data = await api.addToGlobalBlockList(domains, clientId);
        console.log("✅ Domains added to block list!");
        console.log(`📊 Upload Count: ${data.uploadCount}`);
        console.log(`📊 Total Added: ${data.totalDomainAdded}`);
      } else {
        console.log("🚫 Global Block List Management");
        console.log("Available actions: add");
        console.log("Usage: leads:blocklist --action add --domains '[\"email@domain.com\", \"domain.com\"]'");
      }
    },
  },
  {
    name: "leads:bulk-import",
    description: "📁 Bulk import leads from CSV format",
    usage: 'leads:bulk-import --campaign_id campaign_id --csv_data "first_name,last_name,email\\nJohn,Doe,john@example.com"',
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.csv_data) throw new Error("Required: --campaign_id, --csv_data");
      
      console.log("📁 Parsing CSV data...");
      const lines = args.csv_data.split('\n');
      const headers = lines[0].split(',');
      const leads = lines.slice(1).map(line => {
        const values = line.split(',');
        const lead = {};
        headers.forEach((header, index) => {
          lead[header.trim()] = values[index]?.trim();
        });
        return lead;
      }).filter(lead => lead.email);
      
      if (leads.length === 0) {
        throw new Error("No valid leads found in CSV data");
      }
      
      console.log(`📊 Found ${leads.length} leads to import`);
      const data = await api.addLeadsToCampaign(args.campaign_id, leads);
      console.log("✅ Bulk import completed!");
      console.log(`📊 Uploaded: ${data.upload_count}`);
      console.log(`📊 Total: ${data.total_leads}`);
      console.log(`📊 Duplicates: ${data.duplicate_count}`);
      console.log(`📊 Invalid: ${data.invalid_email_count}`);
    },
  },
  {
    name: "leads:stats",
    description: "📊 Get lead statistics for campaign",
    usage: "leads:stats --campaign_id campaign_id",
    category: "👥 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id) throw new Error("Required: --campaign_id");
      
      const analytics = await api.getCampaignAnalytics(args.campaign_id);
      console.log("📊 Lead Statistics:");
      console.log(`📊 Total Leads: ${analytics.campaign_lead_stats.total}`);
      console.log(`✅ Completed: ${analytics.campaign_lead_stats.completed}`);
      console.log(`🚀 In Progress: ${analytics.campaign_lead_stats.inprogress}`);
      console.log(`⏸️ Not Started: ${analytics.campaign_lead_stats.notStarted}`);
      console.log(`⏹️ Stopped: ${analytics.campaign_lead_stats.stopped}`);
      console.log(`🚫 Blocked: ${analytics.campaign_lead_stats.blocked}`);
      console.log('');
      console.log("📧 Email Metrics:");
      console.log(`📤 Sent: ${analytics.sent_count}`);
      console.log(`👁️ Opened: ${analytics.open_count} (${analytics.unique_open_count} unique)`);
      console.log(`🖱️ Clicked: ${analytics.click_count} (${analytics.unique_click_count} unique)`);
      console.log(`↩️ Replied: ${analytics.reply_count}`);
      console.log(`🚫 Unsubscribed: ${analytics.unsubscribed_count}`);
      console.log(`⚠️ Bounced: ${analytics.bounce_count}`);
    },
  },
];

// Lead command aliases
export const leadAliases: CLICommand[] = [
  { ...leadCommands[0], name: "l:list", description: "📋 List leads (alias)" },
  { ...leadCommands[1], name: "l:search", description: "🔍 Search leads (alias)" },
  { ...leadCommands[2], name: "l:add", description: "➕ Add leads (alias)" },
  { ...leadCommands[3], name: "l:update", description: "✏️ Update lead (alias)" },
  { ...leadCommands[4], name: "l:delete", description: "🗑️ Delete lead (alias)" },
  { ...leadCommands[5], name: "l:pause", description: "⏸️ Pause lead (alias)" },
  { ...leadCommands[6], name: "l:resume", description: "▶️ Resume lead (alias)" },
  { ...leadCommands[9], name: "l:history", description: "💬 Message history (alias)" },
  { ...leadCommands[14], name: "l:stats", description: "📊 Lead stats (alias)" },
];
