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

// Utility functions
function createTitle() {
  try {
    return figlet.textSync('SmartLead CLI', { font: 'Big' });
  } catch {
    return 'SmartLead CLI';
  }
}

function showBanner() {
  console.log(gradient.rainbow(createTitle()));
  console.log(chalk.cyan('🚀 Beautiful CLI for SmartLead API Management\n'));
}

function formatTable(headers, rows) {
  const colWidths = headers.map((header, index) => {
    return Math.max(header.length, ...rows.map(row => String(row[index] || '').length));
  });

  const separator = '─'.repeat(colWidths.reduce((sum, width) => sum + width + 3, -1));
  
  console.log(chalk.gray(separator));
  console.log(headers.map((header, index) => 
    chalk.cyan(header.padEnd(colWidths[index]))
  ).join(' │ '));
  console.log(chalk.gray(separator));
  
  rows.forEach(row => {
    console.log(row.map((cell, index) => 
      String(cell || '').padEnd(colWidths[index])
    ).join(' │ '));
  });
  
  console.log(chalk.gray(separator));
}

function formatStatus(status) {
  const colors = {
    'ACTIVE': chalk.green,
    'PAUSED': chalk.yellow,
    'STOPPED': chalk.red,
    'DRAFTED': chalk.gray,
    'COMPLETED': chalk.blue
  };
  return (colors[status] || chalk.gray)(status);
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
    showBanner();
    console.log(chalk.cyan('🔑 SmartLead API Configuration'));
    console.log(chalk.gray('Get your API key from: https://app.smartlead.ai/app/settings\n'));

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
    console.log(chalk.green('✅ Configuration saved successfully!'));
  });

program
  .command('show-config')
  .description('Show current configuration')
  .action(() => {
    const config = loadConfig();
    console.log(chalk.cyan('\n📋 Current Configuration:'));
    console.log(chalk.gray('─'.repeat(40)));
    
    if (config.apiKey) {
      console.log(chalk.white('API Key:'), chalk.green('***' + config.apiKey.slice(-4)));
    } else {
      console.log(chalk.white('API Key:'), chalk.red('Not configured'));
    }
    
    console.log(chalk.white('Base URL:'), chalk.blue(getBaseUrl()));
    
    if (config.lastUsed) {
      console.log(chalk.white('Last Used:'), chalk.gray(new Date(config.lastUsed).toLocaleString()));
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
      console.log(chalk.yellow('⏳ Loading campaigns...'));
      
      const campaigns = await api.request('GET', '/campaigns');
      
      if (campaigns.length === 0) {
        console.log(chalk.yellow('📢 No campaigns found'));
        return;
      }

      console.log(chalk.cyan(`\n📢 Found ${campaigns.length} campaigns:\n`));
      
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
          company_name: options.company || ''
        }];
      } else {
        console.log(chalk.red('❌ Please provide either --file or --email'));
        return;
      }

      console.log(chalk.yellow(`⏳ Adding ${leads.length} lead(s) to campaign ${campaignId}...`));
      
      const result = await api.request('POST', `/campaigns/${campaignId}/leads`, {
        lead_list: leads
      });
      
      console.log(chalk.green('✅ Leads added successfully!'));
      console.log(chalk.blue('Uploaded:'), result.upload_count);
      console.log(chalk.blue('Total:'), result.total_leads);
      console.log(chalk.blue('Duplicates:'), result.duplicate_count);
      console.log(chalk.blue('Invalid:'), result.invalid_email_count);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Email Account Management Commands
program
  .command('email-accounts')
  .description('List email accounts')
  .option('-l, --limit <number>', 'Limit number of results', '50')
  .action(async (options) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow('⏳ Loading email accounts...'));
      
      const accounts = await api.request('GET', '/email-accounts', null);
      
      if (accounts.length === 0) {
        console.log(chalk.yellow('✉️ No email accounts found'));
        return;
      }

      console.log(chalk.cyan(`\n✉️ Found ${accounts.length} email accounts:\n`));
      
      const headers = ['ID', 'Email', 'Name', 'Type', 'Status', 'Daily Sent'];
      const rows = accounts.slice(0, parseInt(options.limit)).map(account => [
        account.id,
        account.from_email,
        account.from_name,
        account.type,
        account.is_smtp_success && account.is_imap_success ? chalk.green('✓') : chalk.red('✗'),
        account.daily_sent_count || 0
      ]);

      formatTable(headers, rows);
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Analytics Commands
program
  .command('analytics <campaign-id>')
  .description('Get campaign analytics')
  .action(async (campaignId) => {
    try {
      const api = new SmartLeadAPI();
      console.log(chalk.yellow(`⏳ Loading analytics for campaign ${campaignId}...`));
      
      const analytics = await api.request('GET', `/campaigns/${campaignId}/analytics`);
      
      console.log(chalk.cyan(`\n📊 Analytics for Campaign #${campaignId}:\n`));
      
      console.log(chalk.blue('📧 Email Stats:'));
      console.log(`  Sent: ${chalk.green(analytics.sent_count)}`);
      console.log(`  Opens: ${chalk.yellow(analytics.open_count)} (${analytics.unique_open_count} unique)`);
      console.log(`  Clicks: ${chalk.cyan(analytics.click_count)} (${analytics.unique_click_count} unique)`);
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
    console.log(chalk.cyan('📋 All Available Commands:\n'));
    
    console.log(chalk.yellow('🔧 Configuration:'));
    console.log(chalk.blue('  smartlead config') + chalk.gray(' - Configure API settings'));
    console.log(chalk.blue('  smartlead show-config') + chalk.gray(' - Show current configuration'));
    
    console.log(chalk.yellow('\n📢 Campaign Management:'));
    console.log(chalk.blue('  smartlead campaigns') + chalk.gray(' - List all campaigns'));
    console.log(chalk.blue('  smartlead campaign <id>') + chalk.gray(' - Get campaign details'));
    console.log(chalk.blue('  smartlead campaign-create <name>') + chalk.gray(' - Create new campaign'));
    console.log(chalk.blue('  smartlead campaign-start <id>') + chalk.gray(' - Start campaign'));
    console.log(chalk.blue('  smartlead campaign-pause <id>') + chalk.gray(' - Pause campaign'));
    console.log(chalk.blue('  smartlead campaign-stop <id>') + chalk.gray(' - Stop campaign'));
    console.log(chalk.blue('  smartlead campaign-delete <id>') + chalk.gray(' - Delete campaign'));
    
    console.log(chalk.yellow('\n🎯 Lead Management:'));
    console.log(chalk.blue('  smartlead leads <campaign-id>') + chalk.gray(' - List campaign leads'));
    console.log(chalk.blue('  smartlead lead-add <campaign-id>') + chalk.gray(' - Add leads to campaign'));
    
    console.log(chalk.yellow('\n✉️ Email Accounts:'));
    console.log(chalk.blue('  smartlead email-accounts') + chalk.gray(' - List email accounts'));
    
    console.log(chalk.yellow('\n📊 Analytics:'));
    console.log(chalk.blue('  smartlead analytics <campaign-id>') + chalk.gray(' - Get campaign analytics'));
    console.log(chalk.blue('  smartlead stats <campaign-id>') + chalk.gray(' - Get detailed statistics'));
    console.log(chalk.blue('  smartlead export <campaign-id>') + chalk.gray(' - Export campaign data'));
    
    console.log(chalk.yellow('\n🔗 Webhooks:'));
    console.log(chalk.blue('  smartlead webhooks <campaign-id>') + chalk.gray(' - List campaign webhooks'));
    
    console.log(chalk.yellow('\n🏢 Client Management:'));
    console.log(chalk.blue('  smartlead clients') + chalk.gray(' - List all clients'));
    
    console.log(chalk.yellow('\n📚 Help:'));
    console.log(chalk.blue('  smartlead help') + chalk.gray(' - Show basic help'));
    console.log(chalk.blue('  smartlead help-all') + chalk.gray(' - Show all commands'));
    console.log(chalk.blue('  smartlead help-advanced') + chalk.gray(' - Show advanced commands'));
    console.log(chalk.blue('  smartlead --version') + chalk.gray(' - Show version'));
    
    console.log(chalk.green('\n🚀 Example Usage:'));
    console.log(chalk.gray('  smartlead config'));
    console.log(chalk.gray('  smartlead campaigns'));
    console.log(chalk.gray('  smartlead campaign 123'));
    console.log(chalk.gray('  smartlead analytics 123'));
    console.log();
  });

// Default action
program.action(() => {
  showBanner();
  console.log(chalk.yellow('⚡ Quick start: ') + chalk.cyan('smartlead config'));
  console.log(chalk.gray('Run ') + chalk.cyan('smartlead help-all') + chalk.gray(' to see all commands'));
  console.log();
});

// Parse arguments
program.parse();

// Show help if no arguments
if (!process.argv.slice(2).length) {
  showBanner();
  console.log(chalk.yellow('⚡ Quick start: ') + chalk.cyan('smartlead config'));
  console.log(chalk.gray('Run ') + chalk.cyan('smartlead help-all') + chalk.gray(' to see all commands'));
  console.log();
} 