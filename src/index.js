#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');

const program = new Command();

// Configuration management
const CONFIG_DIR = path.join(os.homedir(), '.smartlead-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (error) {
    console.warn(chalk.yellow('Warning: Could not load config file'));
  }
  return {};
}

function saveConfig(config) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function getApiKey() {
  const config = loadConfig();
  return config.apiKey || process.env.SMARTLEAD_API_KEY;
}

function getBaseUrl() {
  const config = loadConfig();
  return config.baseUrl || process.env.SMARTLEAD_BASE_URL || 'https://server.smartlead.ai/api/v1';
}

// API Client
class SmartLeadAPI {
  constructor() {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error(chalk.red('❌ No API key found. Run: smartlead config'));
      process.exit(1);
    }

    this.client = axios.create({
      baseURL: getBaseUrl(),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.client.interceptors.request.use((config) => {
      config.params = { ...config.params, api_key: apiKey };
      return config;
    });
  }

  async request(method, endpoint, data = null) {
    try {
      const config = { method, url: endpoint };
      if (data) config.data = data;
      
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      }
      throw error;
    }
  }
}

// SmartLead Brand Colors
const colors = {
  primary: '#2563eb',    // SmartLead Blue
  secondary: '#0ea5e9',  // Light Blue
  accent: '#06b6d4',     // Cyan
  success: '#10b981',    // Green
  warning: '#f59e0b',    // Amber
  error: '#ef4444',      // Red
  text: '#1f2937',       // Dark Gray
  muted: '#6b7280'       // Gray
};

// Utility functions
function createTitle() {
  try {
    return figlet.textSync('SmartLead CLI', { font: 'Big' });
  } catch {
    return 'SmartLead CLI';
  }
}

function showBanner() {
  const title = createTitle();
  console.log(gradient(colors.primary, colors.secondary, colors.accent)(title));
  console.log(chalk.hex(colors.secondary)('🚀 Professional Email Campaign Management\n'));
}

function formatTable(headers, rows) {
  const colWidths = headers.map((header, index) => {
    return Math.max(header.length, ...rows.map(row => String(row[index] || '').length));
  });

  const separator = '─'.repeat(colWidths.reduce((sum, width) => sum + width + 3, -1));
  
  console.log(chalk.hex(colors.muted)(separator));
  console.log(headers.map((header, index) => 
    chalk.hex(colors.primary)(header.padEnd(colWidths[index]))
  ).join(' │ '));
  console.log(chalk.hex(colors.muted)(separator));
  
  rows.forEach(row => {
    console.log(row.map((cell, index) => 
      String(cell || '').padEnd(colWidths[index])
    ).join(' │ '));
  });
  
  console.log(chalk.hex(colors.muted)(separator));
}

function formatStatus(status) {
  const statusColors = {
    'ACTIVE': chalk.hex(colors.success),
    'PAUSED': chalk.hex(colors.warning),
    'STOPPED': chalk.hex(colors.error),
    'DRAFTED': chalk.hex(colors.muted),
    'COMPLETED': chalk.hex(colors.accent)
  };
  return (statusColors[status] || chalk.hex(colors.muted))(status);
}

// Configuration commands
program
  .name('smartlead')
  .description('SmartLead CLI - Manage your email campaigns from the terminal')
  .version('1.0.0');

program
  .command('config')
  .description('Configure API settings')
  .action(async () => {
    console.log(chalk.hex(colors.primary)('🔑 SmartLead API Configuration'));
    console.log(chalk.hex(colors.muted)('Get your API key from: https://app.smartlead.ai/app/settings\n'));

    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your SmartLead API Key:',
        validate: (input) => input?.length > 0 || 'API Key is required'
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'API Base URL:',
        default: getBaseUrl()
      }
    ]);

    const config = loadConfig();
    config.apiKey = answers.apiKey;
    config.baseUrl = answers.baseUrl;
    config.lastUsed = new Date().toISOString();
    
    saveConfig(config);
    console.log(chalk.hex(colors.success)('✅ Configuration saved successfully!'));
  });

program
  .command('show-config')
  .description('Show current configuration')
  .action(() => {
    const config = loadConfig();
    console.log(chalk.hex(colors.primary)('\n📋 Current Configuration:'));
    console.log(chalk.hex(colors.muted)('─'.repeat(40)));
    
    if (config.apiKey) {
      console.log(chalk.hex(colors.text)('API Key:'), chalk.hex(colors.success)('***' + config.apiKey.slice(-4)));
    } else {
      console.log(chalk.hex(colors.text)('API Key:'), chalk.hex(colors.error)('Not configured'));
    }
    
    console.log(chalk.hex(colors.text)('Base URL:'), chalk.hex(colors.secondary)(getBaseUrl()));
    
    if (config.lastUsed) {
      console.log(chalk.hex(colors.text)('Last Used:'), chalk.hex(colors.muted)(new Date(config.lastUsed).toLocaleString()));
    }
    console.log();
  });

// Campaign Management Commands
program
  .command('campaigns')
  .description('List all campaigns')
  .option('-l, --limit <number>', 'Limit number of results', '50')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.hex(colors.warning)('⏳ Loading campaigns...'));
      
      const campaigns = await api.request('GET', '/campaigns');
      
      if (campaigns.length === 0) {
        console.log(chalk.hex(colors.warning)('📢 No campaigns found'));
        return;
      }

      console.log(chalk.hex(colors.primary)(`\n📢 Found ${campaigns.length} campaigns:\n`));
      
      const headers = ['ID', 'Name', 'Status', 'Created', 'Max Leads/Day'];
      const rows = campaigns.slice(0, parseInt(options.limit)).map(campaign => [
        campaign.id,
        campaign.name || 'Untitled',
        formatStatus(campaign.status),
        new Date(campaign.created_at).toLocaleDateString(),
        campaign.max_leads_per_day || 'N/A'
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign <id>')
  .description('Get campaign details')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading campaign ${id}...`));
      
      const campaign = await api.request('GET', `/campaigns/${id}`);
      
      console.log(chalk.cyan(`\n📢 Campaign #${campaign.id}:\n`));
      console.log(chalk.blue('Name:'), campaign.name || 'Untitled');
      console.log(chalk.blue('Status:'), formatStatus(campaign.status));
      console.log(chalk.blue('Created:'), new Date(campaign.created_at).toLocaleString());
      console.log(chalk.blue('Updated:'), new Date(campaign.updated_at).toLocaleString());
      console.log(chalk.blue('Max Leads/Day:'), campaign.max_leads_per_day);
      console.log(chalk.blue('Time Between Emails:'), `${campaign.min_time_btwn_emails} minutes`);
      console.log(chalk.blue('Follow-up %:'), `${campaign.follow_up_percentage || 0}%`);
      console.log(chalk.blue('Plain Text:'), campaign.send_as_plain_text ? chalk.green('Yes') : chalk.red('No'));
      console.log(chalk.blue('AI ESP Matching:'), campaign.enable_ai_esp_matching ? chalk.green('Enabled') : chalk.red('Disabled'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-create <name>')
  .description('Create a new campaign')
  .option('-c, --client-id <id>', 'Client ID for the campaign')
  .action(async (name, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Creating campaign "${name}"...`));
      
      const data = { name };
      if (options.clientId) data.client_id = parseInt(options.clientId);
      
      const result = await api.request('POST', '/campaigns/create', data);
      
      console.log(chalk.green('✅ Campaign created successfully!'));
      console.log(chalk.blue('ID:'), result.id);
      console.log(chalk.blue('Name:'), result.name);
      console.log(chalk.blue('Created:'), new Date(result.created_at).toLocaleString());
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-start <id>')
  .description('Start a campaign')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Starting campaign ${id}...`));
      
      await api.request('POST', `/campaigns/${id}/status`, { status: 'START' });
      
      console.log(chalk.green('✅ Campaign started successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-pause <id>')
  .description('Pause a campaign')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Pausing campaign ${id}...`));
      
      await api.request('POST', `/campaigns/${id}/status`, { status: 'PAUSED' });
      
      console.log(chalk.green('✅ Campaign paused successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-stop <id>')
  .description('Stop a campaign')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Stopping campaign ${id}...`));
      
      await api.request('POST', `/campaigns/${id}/status`, { status: 'STOPPED' });
      
      console.log(chalk.green('✅ Campaign stopped successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-delete <id>')
  .description('Delete a campaign')
  .action(async (id) => {
    const confirm = await inquirer.prompt([{
      type: 'confirm',
      name: 'delete',
      message: `Are you sure you want to delete campaign ${id}?`,
      default: false
    }]);

    if (!confirm.delete) {
      console.log(chalk.yellow('Operation cancelled'));
      return;
    }

    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Deleting campaign ${id}...`));
      
      await api.request('DELETE', `/campaigns/${id}`);
      
      console.log(chalk.green('✅ Campaign deleted successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Lead Management Commands
program
  .command('leads <campaign-id>')
  .description('List leads in a campaign')
  .option('-l, --limit <number>', 'Limit number of results', '50')
  .option('-o, --offset <number>', 'Offset for pagination', '0')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading leads for campaign ${campaignId}...`));
      
      const params = {
        limit: parseInt(options.limit),
        offset: parseInt(options.offset)
      };
      
      const result = await api.request('GET', `/campaigns/${campaignId}/leads`, null);
      
      if (!result.data || result.data.length === 0) {
        console.log(chalk.yellow('🎯 No leads found'));
        return;
      }

      console.log(chalk.cyan(`\n🎯 Found ${result.total_leads || result.data.length} leads:\n`));
      
      const headers = ['ID', 'Name', 'Email', 'Company', 'Status'];
      const rows = result.data.slice(0, parseInt(options.limit)).map(item => [
        item.lead.id,
        `${item.lead.first_name || ''} ${item.lead.last_name || ''}`.trim(),
        item.lead.email,
        item.lead.company_name || 'N/A',
        item.status
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-add <campaign-id>')
  .description('Add leads to a campaign')
  .option('-f, --file <path>', 'CSV file with leads')
  .option('-e, --email <email>', 'Single email to add')
  .option('-n, --name <name>', 'Name for single lead')
  .option('-c, --company <company>', 'Company for single lead')
  .option('--phone <phone>', 'Phone number')
  .option('--website <website>', 'Website URL')
  .option('--location <location>', 'Location')
  .option('--linkedin <url>', 'LinkedIn profile URL')
  .option('--ignore-global-blocks', 'Ignore global block list')
  .option('--ignore-unsubscribes', 'Ignore unsubscribe list')
  .option('--allow-duplicates', 'Allow duplicates in other campaigns')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      let leads = [];

      if (options.file) {
        // TODO: Implement CSV parsing
        console.log(chalk.red('❌ CSV file support not yet implemented'));
        return;
      } else if (options.email) {
        const [firstName, ...lastNameParts] = (options.name || '').split(' ');
        leads = [{
          email: options.email,
          first_name: firstName || '',
          last_name: lastNameParts.join(' ') || '',
          company_name: options.company || '',
          phone_number: options.phone || '',
          website: options.website || '',
          location: options.location || '',
          linkedin_profile: options.linkedin || ''
        }];
      } else {
        console.log(chalk.red('❌ Please provide either --file or --email'));
        return;
      }

      const settings = {
        ignore_global_block_list: !!options.ignoreGlobalBlocks,
        ignore_unsubscribe_list: !!options.ignoreUnsubscribes,
        ignore_duplicate_leads_in_other_campaign: !!options.allowDuplicates
      };

      console.log(chalk.yellow(`⏳ Adding ${leads.length} lead(s) to campaign ${campaignId}...`));
      
      const result = await api.request('POST', `/campaigns/${campaignId}/leads`, {
        lead_list: leads,
        settings: settings
      });
      
      console.log(chalk.green('✅ Leads added successfully!'));
      console.log(chalk.blue('Uploaded:'), result.upload_count);
      console.log(chalk.blue('Total:'), result.total_leads);
      console.log(chalk.blue('Already in Campaign:'), result.already_added_to_campaign || 0);
      console.log(chalk.blue('Duplicates:'), result.duplicate_count);
      console.log(chalk.blue('Invalid:'), result.invalid_email_count);
      console.log(chalk.blue('Unsubscribed:'), result.unsubscribed_leads || 0);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Enhanced Lead Management Commands
program
  .command('lead-update <campaign-id> <lead-id>')
  .description('Update a lead')
  .option('--email <email>', 'Email address')
  .option('--first-name <name>', 'First name')
  .option('--last-name <name>', 'Last name')
  .option('--company <company>', 'Company name')
  .option('--phone <phone>', 'Phone number')
  .option('--website <website>', 'Website URL')
  .option('--location <location>', 'Location')
  .option('--linkedin <url>', 'LinkedIn profile URL')
  .action(async (campaignId, leadId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating lead ${leadId} in campaign ${campaignId}...`));
      
      const data = {};
      if (options.email) data.email = options.email;
      if (options.firstName) data.first_name = options.firstName;
      if (options.lastName) data.last_name = options.lastName;
      if (options.company) data.company_name = options.company;
      if (options.phone) data.phone_number = options.phone;
      if (options.website) data.website = options.website;
      if (options.location) data.location = options.location;
      if (options.linkedin) data.linkedin_profile = options.linkedin;
      
      await api.request('POST', `/campaigns/${campaignId}/leads/${leadId}`, data);
      
      console.log(chalk.green('✅ Lead updated successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-delete <campaign-id> <lead-id>')
  .description('Delete a lead from campaign')
  .action(async (campaignId, leadId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Deleting lead ${leadId} from campaign ${campaignId}...`));
      
      await api.request('DELETE', `/campaigns/${campaignId}/leads/${leadId}`);
      
      console.log(chalk.green('✅ Lead deleted successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-pause <campaign-id> <lead-id>')
  .description('Pause a lead in campaign')
  .action(async (campaignId, leadId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Pausing lead ${leadId} in campaign ${campaignId}...`));
      
      await api.request('POST', `/campaigns/${campaignId}/leads/${leadId}/pause`);
      
      console.log(chalk.green('✅ Lead paused successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-resume <campaign-id> <lead-id>')
  .description('Resume a lead in campaign')
  .option('--delay-days <days>', 'Resume with delay in days', '0')
  .action(async (campaignId, leadId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Resuming lead ${leadId} in campaign ${campaignId}...`));
      
      const data = {
        resume_lead_with_delay_days: parseInt(options.delayDays)
      };
      
      await api.request('POST', `/campaigns/${campaignId}/leads/${leadId}/resume`, data);
      
      console.log(chalk.green('✅ Lead resumed successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-unsubscribe <campaign-id> <lead-id>')
  .description('Unsubscribe lead from campaign')
  .action(async (campaignId, leadId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Unsubscribing lead ${leadId} from campaign ${campaignId}...`));
      
      await api.request('POST', `/campaigns/${campaignId}/leads/${leadId}/unsubscribe`);
      
      console.log(chalk.green('✅ Lead unsubscribed successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-global-unsubscribe <lead-id>')
  .description('Unsubscribe lead from all campaigns')
  .action(async (leadId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Globally unsubscribing lead ${leadId}...`));
      
      await api.request('POST', `/leads/${leadId}/unsubscribe`);
      
      console.log(chalk.green('✅ Lead globally unsubscribed successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-category <campaign-id> <lead-id>')
  .description('Update lead category')
  .option('--category-id <id>', 'Category ID')
  .option('--pause', 'Pause lead when updating category')
  .action(async (campaignId, leadId, options) => {
    try {
      if (!options.categoryId) {
        console.log(chalk.red('❌ Please provide --category-id'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating category for lead ${leadId}...`));
      
      const data = {
        category_id: parseInt(options.categoryId),
        pause_lead: !!options.pause
      };
      
      await api.request('POST', `/campaigns/${campaignId}/leads/${leadId}/category`, data);
      
      console.log(chalk.green('✅ Lead category updated successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-message-history <campaign-id> <lead-id>')
  .description('Get lead message history')
  .action(async (campaignId, leadId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading message history for lead ${leadId}...`));
      
      const result = await api.request('GET', `/campaigns/${campaignId}/leads/${leadId}/message-history`);
      
      console.log(chalk.cyan(`\n💬 Message History:\n`));
      console.log(chalk.blue('From:'), result.from);
      console.log(chalk.blue('To:'), result.to);
      console.log();
      
      if (result.history && result.history.length > 0) {
        result.history.forEach((message, index) => {
          const typeColor = message.type === 'SENT' ? chalk.green : chalk.yellow;
          console.log(`${typeColor(message.type)} - ${new Date(message.time).toLocaleString()}`);
          console.log(`Subject: ${message.subject || 'N/A'}`);
          if (message.email_body) {
            // Strip HTML tags for display
            const plainText = message.email_body.replace(/<[^>]*>/g, '').trim();
            console.log(`Body: ${plainText.substring(0, 200)}${plainText.length > 200 ? '...' : ''}`);
          }
          console.log();
        });
      } else {
        console.log(chalk.yellow('No message history found'));
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-search-email <email>')
  .description('Search for lead by email address')
  .action(async (email) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Searching for lead with email ${email}...`));
      
      const lead = await api.request('GET', `/leads?email=${encodeURIComponent(email)}`);
      
      if (lead) {
        console.log(chalk.cyan(`\n👤 Lead Found:\n`));
        console.log(chalk.blue('ID:'), lead.id);
        console.log(chalk.blue('Name:'), `${lead.first_name} ${lead.last_name}`.trim());
        console.log(chalk.blue('Email:'), lead.email);
        console.log(chalk.blue('Company:'), lead.company_name || 'N/A');
        console.log(chalk.blue('Phone:'), lead.phone_number || 'N/A');
        console.log(chalk.blue('Location:'), lead.location || 'N/A');
        console.log(chalk.blue('Website:'), lead.website || 'N/A');
        console.log(chalk.blue('LinkedIn:'), lead.linkedin_profile || 'N/A');
        console.log(chalk.blue('Created:'), new Date(lead.created_at).toLocaleString());
        console.log(chalk.blue('Unsubscribed:'), lead.is_unsubscribed ? chalk.red('Yes') : chalk.green('No'));
      } else {
        console.log(chalk.yellow('👤 No lead found with that email address'));
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('leads-global')
  .description('Get all leads from entire account')
  .option('--limit <number>', 'Limit number of results', '50')
  .option('--offset <number>', 'Offset for pagination', '0')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading all leads from account...'));
      
      const params = `?limit=${options.limit}&offset=${options.offset}`;
      const result = await api.request('GET', `/leads/global-leads${params}`);
      
      if (!result.data || result.data.length === 0) {
        console.log(chalk.yellow('👥 No leads found'));
        return;
      }

      console.log(chalk.cyan(`\n👥 Found ${result.total_leads || result.data.length} leads:\n`));
      
      const headers = ['ID', 'Name', 'Email', 'Company', 'Created'];
      const rows = result.data.slice(0, parseInt(options.limit)).map(lead => [
        lead.id,
        `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
        lead.email,
        lead.company_name || 'N/A',
        new Date(lead.created_at).toLocaleDateString()
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Email Account Management Commands
program
  .command('email-accounts')
  .description('List email accounts')
  .option('-l, --limit <number>', 'Limit number of results', '50')
  .option('-o, --offset <number>', 'Offset for pagination', '0')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading email accounts...'));
      
      const params = `?offset=${options.offset}&limit=${options.limit}`;
      const accounts = await api.request('GET', `/email-accounts/${params}`);
      
      if (accounts.length === 0) {
        console.log(chalk.yellow('✉️ No email accounts found'));
        return;
      }

      console.log(chalk.cyan(`\n✉️ Found ${accounts.length} email accounts:\n`));
      
      const headers = ['ID', 'Email', 'Name', 'Type', 'Status', 'Daily Sent', 'Warmup'];
      const rows = accounts.slice(0, parseInt(options.limit)).map(account => [
        account.id,
        account.from_email,
        account.from_name,
        account.type,
        account.is_smtp_success && account.is_imap_success ? chalk.green('✓') : chalk.red('✗'),
        account.daily_sent_count || 0,
        account.warmup_details ? 
          (account.warmup_details.status === 'ACTIVE' ? chalk.green('Active') : chalk.gray('Inactive')) : 
          chalk.gray('N/A')
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('email-account <id>')
  .description('Get email account details')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading email account ${id}...`));
      
      const account = await api.request('GET', `/email-accounts/${id}`);
      
      console.log(chalk.cyan(`\n✉️ Email Account #${account.id}:\n`));
      console.log(chalk.blue('Name:'), account.from_name);
      console.log(chalk.blue('Email:'), account.from_email);
      console.log(chalk.blue('Type:'), account.type);
      console.log(chalk.blue('SMTP Host:'), account.smtp_host);
      console.log(chalk.blue('SMTP Port:'), account.smtp_port);
      console.log(chalk.blue('IMAP Host:'), account.imap_host);
      console.log(chalk.blue('IMAP Port:'), account.imap_port);
      console.log(chalk.blue('Daily Limit:'), account.message_per_day);
      console.log(chalk.blue('Daily Sent:'), account.daily_sent_count || 0);
      console.log(chalk.blue('SMTP Status:'), account.is_smtp_success ? chalk.green('✓') : chalk.red('✗'));
      console.log(chalk.blue('IMAP Status:'), account.is_imap_success ? chalk.green('✓') : chalk.red('✗'));
      
      if (account.warmup_details) {
        console.log(chalk.blue('\n🔥 Warmup Details:'));
        console.log(`  Status: ${account.warmup_details.status === 'ACTIVE' ? chalk.green('Active') : chalk.gray('Inactive')}`);
        console.log(`  Total Sent: ${account.warmup_details.total_sent_count}`);
        console.log(`  Spam Count: ${account.warmup_details.total_spam_count}`);
        console.log(`  Reputation: ${account.warmup_details.warmup_reputation}`);
        console.log(`  Max Per Day: ${account.warmup_details.max_email_per_day}`);
        console.log(`  Reply Rate: ${account.warmup_details.reply_rate}%`);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('email-account-create')
  .description('Create a new email account')
  .option('--email <email>', 'Email address (required)')
  .option('--name <name>', 'From name (required)')
  .option('--password <password>', 'Email password (required)')
  .option('--smtp-host <host>', 'SMTP host (required)')
  .option('--smtp-port <port>', 'SMTP port (required)')
  .option('--imap-host <host>', 'IMAP host (required)')
  .option('--imap-port <port>', 'IMAP port (required)')
  .option('--daily-limit <limit>', 'Daily email limit', '100')
  .option('--client-id <id>', 'Client ID')
  .option('--enable-warmup', 'Enable warmup')
  .action(async (options) => {
    try {
      if (!options.email || !options.name || !options.password || !options.smtpHost || !options.smtpPort || !options.imapHost || !options.imapPort) {
        console.log(chalk.red('❌ Missing required options. Use --help to see required fields.'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Creating email account ${options.email}...`));
      
      const data = {
        id: null,
        from_name: options.name,
        from_email: options.email,
        user_name: options.email,
        password: options.password,
        smtp_host: options.smtpHost,
        smtp_port: parseInt(options.smtpPort),
        imap_host: options.imapHost,
        imap_port: parseInt(options.imapPort),
        max_email_per_day: parseInt(options.dailyLimit),
        warmup_enabled: !!options.enableWarmup,
        client_id: options.clientId ? parseInt(options.clientId) : null
      };
      
      const result = await api.request('POST', '/email-accounts/save', data);
      
      console.log(chalk.green('✅ Email account created successfully!'));
      console.log(chalk.blue('Account ID:'), result.emailAccountId);
      if (result.warmupKey) {
        console.log(chalk.blue('Warmup Key:'), result.warmupKey);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('email-account-update <id>')
  .description('Update email account settings')
  .option('--daily-limit <limit>', 'Daily email limit')
  .option('--tracking-url <url>', 'Custom tracking URL')
  .option('--bcc <email>', 'BCC email address')
  .option('--signature <signature>', 'Email signature')
  .option('--client-id <id>', 'Client ID')
  .option('--wait-time <minutes>', 'Time to wait between emails (minutes)')
  .action(async (id, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating email account ${id}...`));
      
      const data = {};
      if (options.dailyLimit) data.max_email_per_day = parseInt(options.dailyLimit);
      if (options.trackingUrl) data.custom_tracking_url = options.trackingUrl;
      if (options.bcc) data.bcc = options.bcc;
      if (options.signature) data.signature = options.signature;
      if (options.clientId) data.client_id = parseInt(options.clientId);
      if (options.waitTime) data.time_to_wait_in_mins = parseInt(options.waitTime);
      
      const result = await api.request('POST', `/email-accounts/${id}`, data);
      
      console.log(chalk.green('✅ Email account updated successfully!'));
      console.log(chalk.blue('Account ID:'), result.emailAccountId);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('warmup-setup <account-id>')
  .description('Setup/update warmup for email account')
  .option('--enable', 'Enable warmup')
  .option('--disable', 'Disable warmup')
  .option('--daily-count <count>', 'Daily warmup emails')
  .option('--rampup <amount>', 'Daily rampup amount')
  .option('--reply-rate <percentage>', 'Reply rate percentage')
  .option('--warmup-key <key>', 'Custom warmup key')
  .action(async (accountId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Setting up warmup for email account ${accountId}...`));
      
      const data = {};
      if (options.enable) data.warmup_enabled = true;
      if (options.disable) data.warmup_enabled = false;
      if (options.dailyCount) data.total_warmup_per_day = parseInt(options.dailyCount);
      if (options.rampup) data.daily_rampup = parseInt(options.rampup);
      if (options.replyRate) data.reply_rate_percentage = parseInt(options.replyRate);
      if (options.warmupKey) data.warmup_key_id = options.warmupKey;
      
      const result = await api.request('POST', `/email-accounts/${accountId}/warmup`, data);
      
      console.log(chalk.green('✅ Warmup settings updated successfully!'));
      console.log(chalk.blue('Account ID:'), result.emailAccountId);
      if (result.warmupKey) {
        console.log(chalk.blue('Warmup Key:'), result.warmupKey);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('warmup-stats <account-id>')
  .description('Get warmup statistics for email account')
  .action(async (accountId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading warmup stats for account ${accountId}...`));
      
      const stats = await api.request('GET', `/email-accounts/${accountId}/warmup-stats`);
      
      console.log(chalk.cyan(`\n🔥 Warmup Stats for Account #${stats.id}:\n`));
      console.log(chalk.blue('Sent Count:'), stats.sent_count);
      console.log(chalk.blue('Spam Count:'), stats.spam_count);
      console.log(chalk.blue('Inbox Count:'), stats.inbox_count);
      console.log(chalk.blue('Received Count:'), stats.warmup_email_received_count);
      
      if (stats.stats_by_date && stats.stats_by_date.length > 0) {
        console.log(chalk.blue('\n📊 Daily Stats (Last 7 Days):'));
        
        const headers = ['Date', 'Sent', 'Replies', 'Saved from Spam'];
        const rows = stats.stats_by_date.map(day => [
          day.date,
          day.sent_count,
          day.reply_count,
          day.save_from_spam_count
        ]);

        formatTable(headers, rows);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('reconnect-failed-accounts')
  .description('Reconnect all failed email accounts (rate limited to 3 times per day)')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Reconnecting failed email accounts...'));
      
      const result = await api.request('POST', '/email-accounts/reconnect-failed-email-accounts', {});
      
      console.log(chalk.green('✅ Request submitted successfully!'));
      console.log(chalk.blue('Message:'), result.message);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Campaign Schedule & Settings Commands
program
  .command('campaign-schedule <id>')
  .description('Update campaign schedule')
  .option('--timezone <tz>', 'Timezone (e.g., America/Los_Angeles)')
  .option('--days <days>', 'Days of week (comma-separated: 0-6)')
  .option('--start-hour <hour>', 'Start hour (HH:MM format)')
  .option('--end-hour <hour>', 'End hour (HH:MM format)')
  .option('--min-time <minutes>', 'Minimum time between emails', '10')
  .option('--max-leads <number>', 'Max new leads per day', '20')
  .action(async (id, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating schedule for campaign ${id}...`));
      
      const data = {};
      if (options.timezone) data.timezone = options.timezone;
      if (options.days) data.days_of_the_week = options.days.split(',').map(d => parseInt(d.trim()));
      if (options.startHour) data.start_hour = options.startHour;
      if (options.endHour) data.end_hour = options.endHour;
      if (options.minTime) data.min_time_btw_emails = parseInt(options.minTime);
      if (options.maxLeads) data.max_new_leads_per_day = parseInt(options.maxLeads);
      
      await api.request('POST', `/campaigns/${id}/schedule`, data);
      
      console.log(chalk.green('✅ Campaign schedule updated successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-settings <id>')
  .description('Update campaign general settings')
  .option('--track <settings>', 'Track settings (DONT_TRACK_EMAIL_OPEN, DONT_TRACK_LINK_CLICK, DONT_TRACK_REPLY_TO_AN_EMAIL)')
  .option('--stop <setting>', 'Stop lead settings (REPLY_TO_AN_EMAIL, CLICK_ON_A_LINK, OPEN_AN_EMAIL)')
  .option('--unsubscribe-text <text>', 'Unsubscribe text')
  .option('--plain-text', 'Send as plain text')
  .option('--follow-up <percentage>', 'Follow-up percentage (0-100)')
  .option('--client-id <id>', 'Client ID')
  .option('--ai-esp-matching', 'Enable AI ESP matching')
  .action(async (id, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating settings for campaign ${id}...`));
      
      const data = {};
      if (options.track) data.track_settings = [options.track];
      if (options.stop) data.stop_lead_settings = options.stop;
      if (options.unsubscribeText) data.unsubscribe_text = options.unsubscribeText;
      if (options.plainText) data.send_as_plain_text = true;
      if (options.followUp) data.follow_up_percentage = parseInt(options.followUp);
      if (options.clientId) data.client_id = parseInt(options.clientId);
      if (options.aiEspMatching) data.enable_ai_esp_matching = true;
      
      await api.request('POST', `/campaigns/${id}/settings`, data);
      
      console.log(chalk.green('✅ Campaign settings updated successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Campaign Sequences
program
  .command('campaign-sequences <id>')
  .description('Get campaign sequences')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading sequences for campaign ${id}...`));
      
      const sequences = await api.request('GET', `/campaigns/${id}/sequences`);
      
      console.log(chalk.cyan(`\n📧 Sequences for Campaign #${id}:\n`));
      
      sequences.forEach((seq, index) => {
        console.log(chalk.blue(`Sequence ${seq.seq_number}:`));
        if (seq.sequence_variants && seq.sequence_variants.length > 0) {
          seq.sequence_variants.forEach(variant => {
            console.log(`  ${chalk.green(variant.variant_label)}: ${variant.subject}`);
          });
        }
        console.log();
      });
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Campaign Email Accounts
program
  .command('campaign-email-accounts <id>')
  .description('List email accounts for campaign')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading email accounts for campaign ${id}...`));
      
      const accounts = await api.request('GET', `/campaigns/${id}/email-accounts`);
      
      if (accounts.length === 0) {
        console.log(chalk.yellow('✉️ No email accounts found for this campaign'));
        return;
      }

      console.log(chalk.cyan(`\n✉️ Found ${accounts.length} email accounts:\n`));
      
      const headers = ['ID', 'Email', 'Name', 'Type', 'Daily Limit', 'Sent Today'];
      const rows = accounts.map(account => [
        account.id,
        account.from_email,
        account.from_name,
        account.type,
        account.message_per_day,
        account.daily_sent_count || 0
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-add-email <campaign-id>')
  .description('Add email account to campaign')
  .option('--account-ids <ids>', 'Email account IDs (comma-separated)')
  .action(async (campaignId, options) => {
    try {
      if (!options.accountIds) {
        console.log(chalk.red('❌ Please provide email account IDs with --account-ids'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Adding email accounts to campaign ${campaignId}...`));
      
      const accountIds = options.accountIds.split(',').map(id => parseInt(id.trim()));
      const result = await api.request('POST', `/campaigns/${campaignId}/email-accounts`, {
        email_account_ids: accountIds
      });
      
      console.log(chalk.green('✅ Email accounts added successfully!'));
      console.log(chalk.blue('Added:'), result.result.length);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-remove-email <campaign-id>')
  .description('Remove email account from campaign')
  .option('--account-ids <ids>', 'Email account IDs (comma-separated)')
  .action(async (campaignId, options) => {
    try {
      if (!options.accountIds) {
        console.log(chalk.red('❌ Please provide email account IDs with --account-ids'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Removing email accounts from campaign ${campaignId}...`));
      
      const accountIds = options.accountIds.split(',').map(id => parseInt(id.trim()));
      const result = await api.request('DELETE', `/campaigns/${campaignId}/email-accounts`, {
        email_account_ids: accountIds
      });
      
      console.log(chalk.green('✅ Email accounts removed successfully!'));
      console.log(chalk.blue('Removed:'), result.result);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Analytics Commands
program
  .command('analytics <campaign-id>')
  .description('Get campaign analytics')
  .option('--start-date <date>', 'Start date (YYYY-MM-DD)')
  .option('--end-date <date>', 'End date (YYYY-MM-DD)')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      let endpoint = `/campaigns/${campaignId}/analytics`;
      
      if (options.startDate && options.endDate) {
        endpoint = `/campaigns/${campaignId}/analytics-by-date?start_date=${options.startDate}&end_date=${options.endDate}`;
        console.log(chalk.yellow(`⏳ Loading analytics for campaign ${campaignId} (${options.startDate} to ${options.endDate})...`));
      } else {
        console.log(chalk.yellow(`⏳ Loading analytics for campaign ${campaignId}...`));
      }
      
      const analytics = await api.request('GET', endpoint);
      
      console.log(chalk.cyan(`\n📊 Analytics for Campaign #${campaignId}:\n`));
      
      console.log(chalk.blue('📧 Email Stats:'));
      console.log(`  Sent: ${chalk.green(analytics.sent_count)}`);
      console.log(`  Opens: ${chalk.yellow(analytics.open_count)} (${analytics.unique_open_count || 'N/A'} unique)`);
      console.log(`  Clicks: ${chalk.cyan(analytics.click_count)} (${analytics.unique_click_count || 'N/A'} unique)`);
      console.log(`  Replies: ${chalk.magenta(analytics.reply_count)}`);
      console.log(`  Bounces: ${chalk.red(analytics.bounce_count)}`);
      console.log(`  Unsubscribes: ${chalk.gray(analytics.unsubscribed_count)}`);
      
      console.log(chalk.blue('\n🎯 Lead Stats:'));
      if (analytics.campaign_lead_stats) {
        console.log(`  Total: ${analytics.campaign_lead_stats.total}`);
        console.log(`  Completed: ${chalk.green(analytics.campaign_lead_stats.completed)}`);
        console.log(`  In Progress: ${chalk.yellow(analytics.campaign_lead_stats.inprogress)}`);
        console.log(`  Not Started: ${chalk.gray(analytics.campaign_lead_stats.notStarted)}`);
        console.log(`  Blocked: ${chalk.red(analytics.campaign_lead_stats.blocked)}`);
      }
      
      if (analytics.client_name) {
        console.log(chalk.blue('\n🏢 Client Info:'));
        console.log(`  Name: ${analytics.client_name}`);
        console.log(`  Email: ${analytics.client_email}`);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Statistics Commands
program
  .command('stats <campaign-id>')
  .description('Get detailed campaign statistics')
  .option('-l, --limit <number>', 'Limit number of results', '50')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading statistics for campaign ${campaignId}...`));
      
      const params = { limit: parseInt(options.limit) };
      const stats = await api.request('GET', `/campaigns/${campaignId}/statistics`, null);
      
      console.log(chalk.cyan(`\n📈 Statistics for Campaign #${campaignId}:\n`));
      console.log(chalk.blue('Total Stats:'), stats.total_stats);
      
      if (stats.data && stats.data.length > 0) {
        const headers = ['Lead', 'Email', 'Sequence', 'Sent', 'Opens', 'Clicks'];
        const rows = stats.data.slice(0, parseInt(options.limit)).map(stat => [
          stat.lead_name,
          stat.lead_email,
          stat.sequence_number,
          stat.sent_time ? new Date(stat.sent_time).toLocaleDateString() : 'N/A',
          stat.open_count,
          stat.click_count
        ]);

        formatTable(headers, rows);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Export Commands
program
  .command('export <campaign-id>')
  .description('Export campaign data')
  .option('-f, --format <format>', 'Export format (csv)', 'csv')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Exporting campaign ${campaignId} data...`));
      
      const data = await api.request('GET', `/campaigns/${campaignId}/leads-export`);
      
      const filename = `campaign-${campaignId}-export-${Date.now()}.csv`;
      fs.writeFileSync(filename, data);
      
      console.log(chalk.green('✅ Export completed!'));
      console.log(chalk.blue('File:'), filename);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Webhook Commands
program
  .command('webhooks <campaign-id>')
  .description('List campaign webhooks')
  .action(async (campaignId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading webhooks for campaign ${campaignId}...`));
      
      const webhooks = await api.request('GET', `/campaigns/${campaignId}/webhooks`);
      
      if (webhooks.length === 0) {
        console.log(chalk.yellow('🔗 No webhooks found'));
        return;
      }

      console.log(chalk.cyan(`\n🔗 Found ${webhooks.length} webhooks:\n`));
      
      const headers = ['ID', 'Name', 'URL', 'Events'];
      const rows = webhooks.map(webhook => [
        webhook.id,
        webhook.name,
        webhook.webhook_url,
        webhook.event_types.join(', ')
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('webhook-create <campaign-id>')
  .description('Create campaign webhook')
  .option('--name <name>', 'Webhook name (required)')
  .option('--url <url>', 'Webhook URL (required)')
  .option('--events <events>', 'Event types (comma-separated)')
  .option('--categories <categories>', 'Categories (comma-separated)')
  .action(async (campaignId, options) => {
    try {
      if (!options.name || !options.url) {
        console.log(chalk.red('❌ Missing required options: --name and --url'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Creating webhook for campaign ${campaignId}...`));
      
      const data = {
        id: null,
        name: options.name,
        webhook_url: options.url,
        event_types: options.events ? options.events.split(',').map(e => e.trim()) : ['EMAIL_SENT'],
        categories: options.categories ? options.categories.split(',').map(c => c.trim()) : []
      };
      
      const result = await api.request('POST', `/campaigns/${campaignId}/webhooks`, data);
      
      console.log(chalk.green('✅ Webhook created successfully!'));
      console.log(chalk.blue('Name:'), result.name);
      console.log(chalk.blue('URL:'), result.webhook_url);
      console.log(chalk.blue('Events:'), result.event_types.join(', '));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('webhook-update <campaign-id>')
  .description('Update campaign webhook')
  .option('--webhook-id <id>', 'Webhook ID to update (required)')
  .option('--name <name>', 'Webhook name')
  .option('--url <url>', 'Webhook URL')
  .option('--events <events>', 'Event types (comma-separated)')
  .option('--categories <categories>', 'Categories (comma-separated)')
  .action(async (campaignId, options) => {
    try {
      if (!options.webhookId) {
        console.log(chalk.red('❌ Missing required option: --webhook-id'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating webhook ${options.webhookId}...`));
      
      const data = {
        id: parseInt(options.webhookId)
      };
      
      if (options.name) data.name = options.name;
      if (options.url) data.webhook_url = options.url;
      if (options.events) data.event_types = options.events.split(',').map(e => e.trim());
      if (options.categories) data.categories = options.categories.split(',').map(c => c.trim());
      
      const result = await api.request('POST', `/campaigns/${campaignId}/webhooks`, data);
      
      console.log(chalk.green('✅ Webhook updated successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('webhook-delete <campaign-id>')
  .description('Delete campaign webhook')
  .option('--webhook-id <id>', 'Webhook ID to delete (required)')
  .action(async (campaignId, options) => {
    try {
      if (!options.webhookId) {
        console.log(chalk.red('❌ Missing required option: --webhook-id'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Deleting webhook ${options.webhookId}...`));
      
      const data = {
        id: parseInt(options.webhookId)
      };
      
      await api.request('DELETE', `/campaigns/${campaignId}/webhooks`, data);
      
      console.log(chalk.green('✅ Webhook deleted successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Client Management Commands
program
  .command('clients')
  .description('List all clients')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading clients...'));
      
      const clients = await api.request('GET', '/client');
      
      if (clients.length === 0) {
        console.log(chalk.yellow('🏢 No clients found'));
        return;
      }

      console.log(chalk.cyan(`\n🏢 Found ${clients.length} clients:\n`));
      
      const headers = ['ID', 'Name', 'Email', 'Created'];
      const rows = clients.map(client => [
        client.id,
        client.name,
        client.email,
        new Date(client.created_at).toLocaleDateString()
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('client-create')
  .description('Create a new client')
  .option('--name <name>', 'Client name (required)')
  .option('--email <email>', 'Client email (required)')
  .option('--password <password>', 'Client password (required)')
  .option('--permissions <permissions>', 'Permissions (comma-separated, default: full_access)')
  .option('--logo <logo>', 'Logo text')
  .option('--logo-url <url>', 'Logo URL')
  .action(async (options) => {
    try {
      if (!options.name || !options.email || !options.password) {
        console.log(chalk.red('❌ Missing required options: --name, --email, --password'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Creating client ${options.name}...`));
      
      const data = {
        name: options.name,
        email: options.email,
        password: options.password,
        permission: options.permissions ? options.permissions.split(',').map(p => p.trim()) : ['full_access'],
        logo: options.logo || null,
        logo_url: options.logoUrl || null
      };
      
      const result = await api.request('POST', '/client/save', data);
      
      console.log(chalk.green('✅ Client created successfully!'));
      console.log(chalk.blue('Client ID:'), result.clientId);
      console.log(chalk.blue('Name:'), result.name);
      console.log(chalk.blue('Email:'), result.email);
      console.log(chalk.blue('Password:'), result.password);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Block List Management
program
  .command('block-list-add')
  .description('Add emails/domains to global block list')
  .option('--domains <domains>', 'Domains to block (comma-separated)')
  .option('--client-id <id>', 'Client ID (for client-specific blocks)')
  .action(async (options) => {
    try {
      if (!options.domains) {
        console.log(chalk.red('❌ Please provide domains to block with --domains'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Adding domains to block list...'));
      
      const data = {
        domain_block_list: options.domains.split(',').map(d => d.trim()),
        client_id: options.clientId ? parseInt(options.clientId) : null
      };
      
      const result = await api.request('POST', '/leads/add-domain-block-list', data);
      
      console.log(chalk.green('✅ Domains added to block list successfully!'));
      console.log(chalk.blue('Upload Count:'), result.uploadCount);
      console.log(chalk.blue('Total Domains Added:'), result.totalDomainAdded);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('block-list-show')
  .description('Show global block list')
  .option('--limit <number>', 'Limit results', '50')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading global block list...'));
      
      const result = await api.request('GET', `/leads/global-block-list?limit=${options.limit}`);
      
      if (!result.data || result.data.length === 0) {
        console.log(chalk.yellow('🚫 No blocked domains found'));
        return;
      }

      console.log(chalk.cyan(`\n🚫 Found ${result.total || result.data.length} blocked domains:\n`));
      
      const headers = ['Domain/Email', 'Added Date', 'Client'];
      const rows = result.data.map(item => [
        item.domain || item.email,
        new Date(item.created_at).toLocaleDateString(),
        item.client_name || 'Global'
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Master Inbox Reply
program
  .command('lead-reply <campaign-id>')
  .description('Reply to lead from master inbox')
  .option('--stats-id <id>', 'Email stats ID (required)')
  .option('--message <message>', 'Reply message (required)')
  .option('--reply-message-id <id>', 'Message ID to reply to (required)')
  .option('--reply-time <time>', 'Original message time (required)')
  .option('--reply-body <body>', 'Original message body (required)')
  .option('--cc <email>', 'CC email address')
  .option('--bcc <email>', 'BCC email address')
  .option('--add-signature', 'Add signature to reply')
  .action(async (campaignId, options) => {
    try {
      if (!options.statsId || !options.message || !options.replyMessageId || !options.replyTime || !options.replyBody) {
        console.log(chalk.red('❌ Missing required options. Use --help for details.'));
        return;
      }

      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Sending reply for campaign ${campaignId}...`));
      
      const data = {
        email_stats_id: options.statsId,
        email_body: options.message,
        reply_message_id: options.replyMessageId,
        reply_email_time: options.replyTime,
        reply_email_body: options.replyBody,
        cc: options.cc || '',
        bcc: options.bcc || '',
        add_signature: !!options.addSignature
      };
      
      await api.request('POST', `/campaigns/${campaignId}/reply-email-thread`, data);
      
      console.log(chalk.green('✅ Reply sent successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Domain Management Commands
program
  .command('domains')
  .description('List all email domains')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading email domains...'));
      
      const domains = await api.request('GET', '/domains');
      
      if (domains.length === 0) {
        console.log(chalk.yellow('🌐 No domains found'));
        return;
      }

      console.log(chalk.cyan(`\n🌐 Found ${domains.length} domains:\n`));
      
      const headers = ['ID', 'Domain', 'Status', 'Warmup', 'Daily Limit', 'DKIM'];
      const rows = domains.map(domain => [
        domain.id,
        domain.domain,
        domain.is_verified ? chalk.green('Verified') : chalk.red('Unverified'),
        domain.warmup_enabled ? chalk.green('Enabled') : chalk.gray('Disabled'),
        domain.daily_limit || 'N/A',
        domain.dkim_verified ? chalk.green('✓') : chalk.red('✗')
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Email Warmup Commands
program
  .command('warmup-accounts')
  .description('List email accounts with warmup status')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading warmup accounts...'));
      
      const accounts = await api.request('GET', '/warmup/accounts');
      
      if (accounts.length === 0) {
        console.log(chalk.yellow('🔥 No warmup accounts found'));
        return;
      }

      console.log(chalk.cyan(`\n🔥 Found ${accounts.length} warmup accounts:\n`));
      
      const headers = ['Email', 'Status', 'Daily Sent', 'Reputation', 'Days Active'];
      const rows = accounts.map(account => [
        account.email,
        account.warmup_enabled ? chalk.green('Active') : chalk.gray('Inactive'),
        account.daily_sent || 0,
        account.reputation || 'N/A',
        account.warmup_days || 0
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('warmup-enable <email>')
  .description('Enable warmup for an email account')
  .action(async (email) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Enabling warmup for ${email}...`));
      
      await api.request('POST', '/warmup/enable', { email });
      
      console.log(chalk.green('✅ Warmup enabled successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('warmup-disable <email>')
  .description('Disable warmup for an email account')
  .action(async (email) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Disabling warmup for ${email}...`));
      
      await api.request('POST', '/warmup/disable', { email });
      
      console.log(chalk.green('✅ Warmup disabled successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Sequence Management Commands
program
  .command('sequences <campaign-id>')
  .description('List email sequences in a campaign')
  .action(async (campaignId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading sequences for campaign ${campaignId}...`));
      
      const sequences = await api.request('GET', `/campaigns/${campaignId}/sequences`);
      
      if (sequences.length === 0) {
        console.log(chalk.yellow('📝 No sequences found'));
        return;
      }

      console.log(chalk.cyan(`\n📝 Found ${sequences.length} sequences:\n`));
      
      const headers = ['Step', 'Subject', 'Type', 'Delay', 'Open Rate', 'Reply Rate'];
      const rows = sequences.map(seq => [
        seq.sequence_number,
        seq.subject_line || 'N/A',
        seq.email_type,
        seq.delay_days ? `${seq.delay_days} days` : 'Immediate',
        seq.open_rate ? `${seq.open_rate}%` : 'N/A',
        seq.reply_rate ? `${seq.reply_rate}%` : 'N/A'
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('sequence-create <campaign-id>')
  .description('Create a new email sequence')
  .option('-s, --subject <subject>', 'Email subject line')
  .option('-d, --delay <days>', 'Delay in days', '1')
  .option('-t, --type <type>', 'Email type (initial/followup)', 'followup')
  .action(async (campaignId, options) => {
    try {
      const api = new SmartLeadAPI();
      
      if (!options.subject) {
        console.error(chalk.red('❌ Subject line is required. Use -s or --subject'));
        return;
      }

      console.log(chalk.yellow(`⏳ Creating sequence for campaign ${campaignId}...`));
      
      const data = {
        subject_line: options.subject,
        delay_days: parseInt(options.delay),
        email_type: options.type
      };
      
      const result = await api.request('POST', `/campaigns/${campaignId}/sequences`, data);
      
      console.log(chalk.green('✅ Sequence created successfully!'));
      console.log(chalk.blue('Step:'), result.sequence_number);
      console.log(chalk.blue('Subject:'), result.subject_line);
      console.log(chalk.blue('Delay:'), `${result.delay_days} days`);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Advanced Campaign Settings
program
  .command('campaign-settings <id>')
  .description('View detailed campaign settings')
  .action(async (id) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading settings for campaign ${id}...`));
      
      const settings = await api.request('GET', `/campaigns/${id}/settings`);
      
      console.log(chalk.cyan(`\n⚙️ Settings for Campaign #${id}:\n`));
      
      console.log(chalk.blue('📧 Email Settings:'));
      console.log(`  Max Leads/Day: ${chalk.green(settings.max_leads_per_day)}`);
      console.log(`  Time Between Emails: ${chalk.green(settings.min_time_btwn_emails)} minutes`);
      console.log(`  Follow-up Percentage: ${chalk.green(settings.follow_up_percentage || 0)}%`);
      console.log(`  Plain Text Mode: ${settings.send_as_plain_text ? chalk.green('Yes') : chalk.red('No')}`);
      
      console.log(chalk.blue('\n🎯 Targeting:'));
      console.log(`  Time Zone: ${chalk.green(settings.timezone || 'N/A')}`);
      console.log(`  Schedule: ${chalk.green(settings.sending_schedule || 'Business Hours')}`);
      console.log(`  Weekend Sending: ${settings.send_on_weekends ? chalk.green('Enabled') : chalk.red('Disabled')}`);
      
      console.log(chalk.blue('\n🤖 AI Features:'));
      console.log(`  AI ESP Matching: ${settings.enable_ai_esp_matching ? chalk.green('Enabled') : chalk.red('Disabled')}`);
      console.log(`  Smart Delivery: ${settings.smart_delivery ? chalk.green('Enabled') : chalk.red('Disabled')}`);
      console.log(`  A/B Testing: ${settings.ab_testing_enabled ? chalk.green('Enabled') : chalk.red('Disabled')}`);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('campaign-update <id>')
  .description('Update campaign settings')
  .option('--max-leads <number>', 'Maximum leads per day')
  .option('--time-between <minutes>', 'Minutes between emails')
  .option('--followup-percent <percent>', 'Follow-up percentage')
  .option('--plain-text', 'Enable plain text mode')
  .option('--ai-esp', 'Enable AI ESP matching')
  .action(async (id, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Updating campaign ${id}...`));
      
      const updates = {};
      if (options.maxLeads) updates.max_leads_per_day = parseInt(options.maxLeads);
      if (options.timeBetween) updates.min_time_btwn_emails = parseInt(options.timeBetween);
      if (options.followupPercent) updates.follow_up_percentage = parseInt(options.followupPercent);
      if (options.plainText) updates.send_as_plain_text = true;
      if (options.aiEsp) updates.enable_ai_esp_matching = true;
      
      if (Object.keys(updates).length === 0) {
        console.log(chalk.yellow('❌ No updates specified. Use --help to see available options'));
        return;
      }
      
      await api.request('PUT', `/campaigns/${id}`, updates);
      
      console.log(chalk.green('✅ Campaign updated successfully!'));
      console.log(chalk.blue('Updated fields:'), Object.keys(updates).join(', '));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Reporting and Advanced Analytics
program
  .command('reports')
  .description('List available reports')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading available reports...'));
      
      const reports = await api.request('GET', '/reports');
      
      console.log(chalk.cyan('\n📊 Available Reports:\n'));
      
      const headers = ['ID', 'Name', 'Type', 'Last Generated', 'Status'];
      const rows = reports.map(report => [
        report.id,
        report.name,
        report.type,
        report.last_generated ? new Date(report.last_generated).toLocaleDateString() : 'Never',
        report.status
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('report-generate <type>')
  .description('Generate a new report')
  .option('-s, --start-date <date>', 'Start date (YYYY-MM-DD)')
  .option('-e, --end-date <date>', 'End date (YYYY-MM-DD)')
  .option('-c, --campaign-id <id>', 'Campaign ID for campaign-specific reports')
  .action(async (type, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Generating ${type} report...`));
      
      const data = { type };
      if (options.startDate) data.start_date = options.startDate;
      if (options.endDate) data.end_date = options.endDate;
      if (options.campaignId) data.campaign_id = parseInt(options.campaignId);
      
      const result = await api.request('POST', '/reports/generate', data);
      
      console.log(chalk.green('✅ Report generation started!'));
      console.log(chalk.blue('Report ID:'), result.id);
      console.log(chalk.blue('Status:'), result.status);
      console.log(chalk.blue('Estimated completion:'), result.estimated_completion);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Lead Categories and Tags
program
  .command('lead-categories')
  .description('List lead categories')
  .action(async () => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading lead categories...'));
      
      const categories = await api.request('GET', '/lead-categories');
      
      if (categories.length === 0) {
        console.log(chalk.yellow('🏷️ No categories found'));
        return;
      }

      console.log(chalk.cyan(`\n🏷️ Found ${categories.length} categories:\n`));
      
      const headers = ['ID', 'Name', 'Color', 'Lead Count', 'Created'];
      const rows = categories.map(cat => [
        cat.id,
        cat.name,
        cat.color || 'Default',
        cat.lead_count || 0,
        new Date(cat.created_at).toLocaleDateString()
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

program
  .command('lead-category-create <name>')
  .description('Create a new lead category')
  .option('-c, --color <color>', 'Category color (hex code)')
  .option('-d, --description <description>', 'Category description')
  .action(async (name, options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Creating category "${name}"...`));
      
      const data = { name };
      if (options.color) data.color = options.color;
      if (options.description) data.description = options.description;
      
      const result = await api.request('POST', '/lead-categories', data);
      
      console.log(chalk.green('✅ Category created successfully!'));
      console.log(chalk.blue('ID:'), result.id);
      console.log(chalk.blue('Name:'), result.name);
      console.log(chalk.blue('Color:'), result.color);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Advanced Lead Management
program
  .command('leads-search')
  .description('Search leads across all campaigns')
  .option('-e, --email <email>', 'Search by email')
  .option('-c, --company <company>', 'Search by company name')
  .option('-n, --name <name>', 'Search by first or last name')
  .option('-s, --status <status>', 'Filter by status')
  .option('-l, --limit <number>', 'Limit results', '50')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Searching leads...'));
      
      const params = {};
      if (options.email) params.email = options.email;
      if (options.company) params.company = options.company;
      if (options.name) params.name = options.name;
      if (options.status) params.status = options.status;
      if (options.limit) params.limit = parseInt(options.limit);
      
      if (Object.keys(params).length === 0) {
        console.log(chalk.red('❌ Please provide at least one search parameter'));
        return;
      }
      
      const result = await api.request('GET', '/leads/search', params);
      
      if (!result.data || result.data.length === 0) {
        console.log(chalk.yellow('🎯 No leads found matching criteria'));
        return;
      }

      console.log(chalk.cyan(`\n🎯 Found ${result.total || result.data.length} leads:\n`));
      
      const headers = ['ID', 'Name', 'Email', 'Company', 'Campaign', 'Status'];
      const rows = result.data.slice(0, parseInt(options.limit)).map(lead => [
        lead.id,
        `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
        lead.email,
        lead.company_name || 'N/A',
        lead.campaign_name || lead.campaign_id,
        lead.status
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Unsubscribe Management
program
  .command('unsubscribes')
  .description('List unsubscribed leads')
  .option('-l, --limit <number>', 'Limit results', '50')
  .option('-c, --campaign-id <id>', 'Filter by campaign ID')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading unsubscribed leads...'));
      
      const params = { limit: parseInt(options.limit) };
      if (options.campaignId) params.campaign_id = parseInt(options.campaignId);
      
      const result = await api.request('GET', '/unsubscribes', params);
      
      if (result.length === 0) {
        console.log(chalk.yellow('📧 No unsubscribed leads found'));
        return;
      }

      console.log(chalk.cyan(`\n📧 Found ${result.length} unsubscribed leads:\n`));
      
      const headers = ['Email', 'Name', 'Campaign', 'Unsubscribed Date', 'Reason'];
      const rows = result.map(unsub => [
        unsub.email,
        `${unsub.first_name || ''} ${unsub.last_name || ''}`.trim(),
        unsub.campaign_name || unsub.campaign_id,
        new Date(unsub.unsubscribed_at).toLocaleDateString(),
        unsub.reason || 'N/A'
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Bounce Management
program
  .command('bounces')
  .description('List bounced emails')
  .option('-l, --limit <number>', 'Limit results', '50')
  .option('-t, --type <type>', 'Bounce type (hard/soft)')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading bounced emails...'));
      
      const params = { limit: parseInt(options.limit) };
      if (options.type) params.bounce_type = options.type;
      
      const result = await api.request('GET', '/bounces', params);
      
      if (result.length === 0) {
        console.log(chalk.yellow('📫 No bounced emails found'));
        return;
      }

      console.log(chalk.cyan(`\n📫 Found ${result.length} bounced emails:\n`));
      
      const headers = ['Email', 'Type', 'Reason', 'Campaign', 'Bounce Date'];
      const rows = result.map(bounce => [
        bounce.email,
        bounce.bounce_type === 'hard' ? chalk.red('Hard') : chalk.yellow('Soft'),
        bounce.reason,
        bounce.campaign_name || bounce.campaign_id,
        new Date(bounce.bounced_at).toLocaleDateString()
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Update the help command to include new features
program
  .command('help-advanced')
  .description('Show advanced commands')
  .action(() => {
    showBanner();
    console.log(chalk.cyan('🔧 Advanced SmartLead CLI Commands:\n'));
    
    console.log(chalk.yellow('🌐 Domain & Email Management:'));
    console.log(chalk.blue('  smartlead domains') + chalk.gray(' - List email domains'));
    console.log(chalk.blue('  smartlead warmup-accounts') + chalk.gray(' - List warmup accounts'));
    console.log(chalk.blue('  smartlead warmup-enable <email>') + chalk.gray(' - Enable warmup'));
    console.log(chalk.blue('  smartlead warmup-disable <email>') + chalk.gray(' - Disable warmup'));
    
    console.log(chalk.yellow('\n📝 Sequence Management:'));
    console.log(chalk.blue('  smartlead sequences <campaign-id>') + chalk.gray(' - List email sequences'));
    console.log(chalk.blue('  smartlead sequence-create <campaign-id>') + chalk.gray(' - Create new sequence'));
    
    console.log(chalk.yellow('\n⚙️ Advanced Campaign Settings:'));
    console.log(chalk.blue('  smartlead campaign-settings <id>') + chalk.gray(' - View detailed settings'));
    console.log(chalk.blue('  smartlead campaign-update <id>') + chalk.gray(' - Update campaign settings'));
    
    console.log(chalk.yellow('\n📊 Advanced Analytics:'));
    console.log(chalk.blue('  smartlead reports') + chalk.gray(' - List available reports'));
    console.log(chalk.blue('  smartlead report-generate <type>') + chalk.gray(' - Generate reports'));
    
    console.log(chalk.yellow('\n🏷️ Lead Organization:'));
    console.log(chalk.blue('  smartlead lead-categories') + chalk.gray(' - List lead categories'));
    console.log(chalk.blue('  smartlead lead-category-create <name>') + chalk.gray(' - Create category'));
    console.log(chalk.blue('  smartlead leads-search') + chalk.gray(' - Search leads globally'));
    
    console.log(chalk.yellow('\n📧 Email Health:'));
    console.log(chalk.blue('  smartlead unsubscribes') + chalk.gray(' - List unsubscribed leads'));
    console.log(chalk.blue('  smartlead bounces') + chalk.gray(' - List bounced emails'));
    
    console.log(chalk.green('\n🚀 Example Advanced Usage:'));
    console.log(chalk.gray('  smartlead warmup-enable user@company.com'));
    console.log(chalk.gray('  smartlead sequence-create 123 -s "Follow up #2" -d 3'));
    console.log(chalk.gray('  smartlead leads-search -c "Acme Corp" -s "replied"'));
    console.log(chalk.gray('  smartlead campaign-update 123 --max-leads 50 --ai-esp'));
    console.log();
  });

// Help command
program
  .command('help-all')
  .description('Show all available commands')
  .action(() => {
    showBanner();
    console.log(chalk.cyan('📋 Complete SmartLead CLI Command Reference:\n'));
    
    console.log(chalk.yellow('🔧 Configuration & Setup:'));
    console.log(chalk.blue('  smartlead config') + chalk.gray(' - Configure API settings'));
    console.log(chalk.blue('  smartlead show-config') + chalk.gray(' - Show current configuration'));
    
    console.log(chalk.yellow('\n📢 Campaign Management:'));
    console.log(chalk.blue('  smartlead campaigns') + chalk.gray(' - List all campaigns'));
    console.log(chalk.blue('  smartlead campaign <id>') + chalk.gray(' - Get campaign details'));
    console.log(chalk.blue('  smartlead campaign-create <name>') + chalk.gray(' - Create new campaign'));
    console.log(chalk.blue('  smartlead campaign-start/pause/stop <id>') + chalk.gray(' - Control campaign status'));
    console.log(chalk.blue('  smartlead campaign-delete <id>') + chalk.gray(' - Delete a campaign'));
    console.log(chalk.blue('  smartlead campaign-schedule <id>') + chalk.gray(' - Update campaign schedule'));
    console.log(chalk.blue('  smartlead campaign-settings <id>') + chalk.gray(' - Update campaign settings'));
    console.log(chalk.blue('  smartlead campaign-sequences <id>') + chalk.gray(' - Get campaign sequences'));
    console.log(chalk.blue('  smartlead campaign-email-accounts <id>') + chalk.gray(' - List campaign email accounts'));
    console.log(chalk.blue('  smartlead campaign-add-email <id>') + chalk.gray(' - Add email account to campaign'));
    console.log(chalk.blue('  smartlead campaign-remove-email <id>') + chalk.gray(' - Remove email account from campaign'));
    
    console.log(chalk.yellow('\n👥 Lead Management:'));
    console.log(chalk.blue('  smartlead leads <campaign-id>') + chalk.gray(' - List leads in campaign'));
    console.log(chalk.blue('  smartlead lead-add <campaign-id>') + chalk.gray(' - Add leads to campaign'));
    console.log(chalk.blue('  smartlead lead-update <campaign-id> <lead-id>') + chalk.gray(' - Update a lead'));
    console.log(chalk.blue('  smartlead lead-delete <campaign-id> <lead-id>') + chalk.gray(' - Delete a lead'));
    console.log(chalk.blue('  smartlead lead-pause/resume <campaign-id> <lead-id>') + chalk.gray(' - Pause/resume lead'));
    console.log(chalk.blue('  smartlead lead-unsubscribe <campaign-id> <lead-id>') + chalk.gray(' - Unsubscribe lead'));
    console.log(chalk.blue('  smartlead lead-global-unsubscribe <lead-id>') + chalk.gray(' - Global unsubscribe'));
    console.log(chalk.blue('  smartlead lead-category <campaign-id> <lead-id>') + chalk.gray(' - Update lead category'));
    console.log(chalk.blue('  smartlead lead-message-history <campaign-id> <lead-id>') + chalk.gray(' - Get message history'));
    console.log(chalk.blue('  smartlead lead-search-email <email>') + chalk.gray(' - Search lead by email'));
    console.log(chalk.blue('  smartlead leads-global') + chalk.gray(' - Get all leads from account'));
    console.log(chalk.blue('  smartlead leads-search') + chalk.gray(' - Search leads across campaigns'));
    console.log(chalk.blue('  smartlead lead-reply <campaign-id>') + chalk.gray(' - Reply to lead from master inbox'));
    
    console.log(chalk.yellow('\n✉️ Email Account Management:'));
    console.log(chalk.blue('  smartlead email-accounts') + chalk.gray(' - List email accounts'));
    console.log(chalk.blue('  smartlead email-account <id>') + chalk.gray(' - Get email account details'));
    console.log(chalk.blue('  smartlead email-account-create') + chalk.gray(' - Create new email account'));
    console.log(chalk.blue('  smartlead email-account-update <id>') + chalk.gray(' - Update email account'));
    console.log(chalk.blue('  smartlead warmup-setup <account-id>') + chalk.gray(' - Setup/update warmup'));
    console.log(chalk.blue('  smartlead warmup-stats <account-id>') + chalk.gray(' - Get warmup statistics'));
    console.log(chalk.blue('  smartlead reconnect-failed-accounts') + chalk.gray(' - Reconnect failed accounts'));
    console.log(chalk.blue('  smartlead warmup-accounts') + chalk.gray(' - List warmup status'));
    console.log(chalk.blue('  smartlead warmup-enable/disable <email>') + chalk.gray(' - Control warmup'));
    
    console.log(chalk.yellow('\n📊 Analytics & Statistics:'));
    console.log(chalk.blue('  smartlead analytics <campaign-id>') + chalk.gray(' - Campaign analytics'));
    console.log(chalk.blue('  smartlead stats <campaign-id>') + chalk.gray(' - Detailed campaign statistics'));
    console.log(chalk.blue('  smartlead export <campaign-id>') + chalk.gray(' - Export campaign data'));
    console.log(chalk.blue('  smartlead reports') + chalk.gray(' - List available reports'));
    console.log(chalk.blue('  smartlead report-generate <type>') + chalk.gray(' - Generate new report'));
    
    console.log(chalk.yellow('\n🔗 Webhooks:'));
    console.log(chalk.blue('  smartlead webhooks <campaign-id>') + chalk.gray(' - List campaign webhooks'));
    console.log(chalk.blue('  smartlead webhook-create <campaign-id>') + chalk.gray(' - Create webhook'));
    console.log(chalk.blue('  smartlead webhook-update <campaign-id>') + chalk.gray(' - Update webhook'));
    console.log(chalk.blue('  smartlead webhook-delete <campaign-id>') + chalk.gray(' - Delete webhook'));
    
    console.log(chalk.yellow('\n🏢 Client Management:'));
    console.log(chalk.blue('  smartlead clients') + chalk.gray(' - List all clients'));
    console.log(chalk.blue('  smartlead client-create') + chalk.gray(' - Create new client'));
    
    console.log(chalk.yellow('\n🚫 Block Lists & Categories:'));
    console.log(chalk.blue('  smartlead block-list-add') + chalk.gray(' - Add to global block list'));
    console.log(chalk.blue('  smartlead block-list-show') + chalk.gray(' - Show global block list'));
    console.log(chalk.blue('  smartlead lead-categories') + chalk.gray(' - List lead categories'));
    console.log(chalk.blue('  smartlead lead-category-create <name>') + chalk.gray(' - Create new category'));
    
    console.log(chalk.yellow('\n📧 Advanced Operations:'));
    console.log(chalk.blue('  smartlead sequences <campaign-id>') + chalk.gray(' - List email sequences'));
    console.log(chalk.blue('  smartlead sequence-create <campaign-id>') + chalk.gray(' - Create email sequence'));
    console.log(chalk.blue('  smartlead unsubscribes') + chalk.gray(' - List unsubscribed leads'));
    console.log(chalk.blue('  smartlead bounces') + chalk.gray(' - List bounced emails'));
    console.log(chalk.blue('  smartlead domains') + chalk.gray(' - List email domains'));
    
    console.log(chalk.yellow('\n📚 Help & Information:'));
    console.log(chalk.blue('  smartlead help-advanced') + chalk.gray(' - Show advanced command options'));
    console.log(chalk.blue('  smartlead --help') + chalk.gray(' - Show basic help'));
    console.log(chalk.blue('  smartlead --version') + chalk.gray(' - Show version'));
    
    console.log(chalk.green('\n🚀 Common Usage Examples:'));
    console.log(chalk.gray('  smartlead campaigns --limit 10'));
    console.log(chalk.gray('  smartlead lead-add 123 --email john@company.com --name "John Doe"'));
    console.log(chalk.gray('  smartlead analytics 123 --start-date 2024-01-01 --end-date 2024-01-31'));
    console.log(chalk.gray('  smartlead email-account-create --email test@domain.com --name "Test Account"'));
    console.log(chalk.gray('  smartlead webhook-create 123 --name "My Webhook" --url "https://webhook.site/test"'));
    console.log(chalk.gray('  smartlead block-list-add --domains "spam.com,bad-domain.com"'));
    
    console.log(chalk.cyan('\n📖 Total Commands: ') + chalk.yellow('80+') + chalk.cyan(' comprehensive SmartLead API endpoints'));
    console.log('');
  });

// Default action - only show banner once
program.action(() => {
  showBanner();
  console.log(chalk.hex(colors.warning)('⚡ Quick start: ') + chalk.hex(colors.primary)('smartlead config'));
  console.log(chalk.hex(colors.muted)('Run ') + chalk.hex(colors.primary)('smartlead help-all') + chalk.hex(colors.muted)(' to see all commands'));
  console.log();
});

// Parse arguments
program.parse(); 