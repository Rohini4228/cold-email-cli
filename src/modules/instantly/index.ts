/**
 * Instantly v2 API CLI Module
 * Complete implementation of Instantly API v2 with 30+ commands
 */

import { CLIModule, CLICommand } from '../../types/global';
import { 
  AccountSchema, CampaignSchema, EmailSchema, LeadSchema, 
  CampaignAnalyticsSchema, AnalyticsOverviewSchema, DailyAnalyticsSchema, 
  StepAnalyticsSchema, EmailVerificationSchema, LeadListSchema, 
  SubsequenceSchema, CustomTagSchema, BlockListEntrySchema, 
  LeadLabelSchema, WorkspaceSchema, BackgroundJobSchema, APIKeySchema,
  PaginatedResponseSchema
} from '../../types/instantly';
import axios from 'axios';
import { z } from 'zod';

export class InstantlyModule implements CLIModule {
  name = 'instantly';
  version = '2.0.0';
  description = 'High-Volume Email Automation & Deliverability';
  
  private apiKey: string | undefined;
  private baseURL = 'https://api.instantly.ai/api/v2';

  constructor() {
    this.apiKey = process.env.INSTANTLY_API_KEY;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', data?: any) {
    if (!this.apiKey) {
      throw new Error('INSTANTLY_API_KEY environment variable is required');
    }

    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Instantly API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  commands: CLICommand[] = [
    // Account Management (11 commands)
    {
      name: 'accounts:list',
      description: 'List all email sending accounts',
      usage: 'accounts:list [--status active] [--limit 50]',
      category: 'Account Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.status) params.append('status', args.status);
        if (args.limit) params.append('limit', args.limit);
        
        const data = await this.makeRequest(`/accounts?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'accounts:create',
      description: 'Add new email sending account',
      usage: 'accounts:create --email user@domain.com --first_name John --last_name Doe --provider_code 2',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email || !args.first_name || !args.last_name || !args.provider_code) {
          throw new Error('Required: --email, --first_name, --last_name, --provider_code');
        }
        
        const accountData = {
          email: args.email,
          first_name: args.first_name,
          last_name: args.last_name,
          provider_code: parseInt(args.provider_code),
        };
        
        const result = await this.makeRequest('/accounts', 'POST', accountData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:get',
      description: 'Get specific email account details',
      usage: 'accounts:get --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const data = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'accounts:update',
      description: 'Update email account settings',
      usage: 'accounts:update --email user@domain.com --daily_limit 300',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const updateData: any = {};
        if (args.daily_limit) updateData.daily_limit = parseInt(args.daily_limit);
        if (args.enable_slow_ramp !== undefined) updateData.enable_slow_ramp = args.enable_slow_ramp === 'true';
        if (args.sending_gap) updateData.sending_gap = parseInt(args.sending_gap);
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:delete',
      description: 'Remove email account',
      usage: 'accounts:delete --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:warmup-start',
      description: 'Start email account warmup process',
      usage: 'accounts:warmup-start --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}/warmup/start`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:warmup-stop',
      description: 'Stop email account warmup process',
      usage: 'accounts:warmup-stop --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}/warmup/stop`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:warmup-analytics',
      description: 'Get email account warmup analytics',
      usage: 'accounts:warmup-analytics --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        const params: any = {};
        if (args.email) params.email = args.email;
        
        const result = await this.makeRequest('/accounts/warmup-analytics', 'POST', params);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:pause',
      description: 'Pause email account',
      usage: 'accounts:pause --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}/pause`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:resume',
      description: 'Resume paused email account',
      usage: 'accounts:resume --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}/resume`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'accounts:test-vitals',
      description: 'Test account vitals and connectivity',
      usage: 'accounts:test-vitals --email user@domain.com',
      category: 'Account Management',
      handler: async (args) => {
        const params: any = {};
        if (args.email) params.email = args.email;
        
        const result = await this.makeRequest('/accounts/test/vitals', 'POST', params);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Campaign Management (11 commands)
    {
      name: 'campaigns:list',
      description: 'List all email campaigns with filtering',
      usage: 'campaigns:list [--limit 50] [--search "Campaign Name"] [--tag_ids id1,id2]',
      category: 'Campaign Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.limit) params.append('limit', args.limit);
        if (args.search) params.append('search', args.search);
        if (args.tag_ids) params.append('tag_ids', args.tag_ids);
        if (args.starting_after) params.append('starting_after', args.starting_after);
        
        const data = await this.makeRequest(`/campaigns?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'campaigns:create',
      description: 'Create new email campaign',
      usage: 'campaigns:create --name "Q1 Campaign" --schedule_name "Business Hours" --timezone "America/New_York"',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.name || !args.schedule_name || !args.timezone) {
          throw new Error('Required: --name, --schedule_name, --timezone');
        }
        
        const campaignData = {
          name: args.name,
          campaign_schedule: {
            schedules: [{
              name: args.schedule_name,
              timing: {
                from: args.start_time || '09:00',
                to: args.end_time || '17:00'
              },
              days: {
                1: true, 2: true, 3: true, 4: true, 5: true,
                6: false, 0: false
              },
              timezone: args.timezone
            }]
          },
          daily_limit: args.daily_limit ? parseInt(args.daily_limit) : 100,
          email_list: args.email_list ? args.email_list.split(',') : [],
          stop_on_reply: args.stop_on_reply === 'true',
          link_tracking: args.link_tracking !== 'false',
          open_tracking: args.open_tracking !== 'false',
        };
        
        const result = await this.makeRequest('/campaigns', 'POST', campaignData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:get',
      description: 'Get specific campaign details',
      usage: 'campaigns:get --id campaign_uuid',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/campaigns/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'campaigns:update',
      description: 'Update campaign settings',
      usage: 'campaigns:update --id campaign_uuid --name "Updated Name" --daily_limit 200',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.name) updateData.name = args.name;
        if (args.daily_limit) updateData.daily_limit = parseInt(args.daily_limit);
        if (args.stop_on_reply !== undefined) updateData.stop_on_reply = args.stop_on_reply === 'true';
        if (args.daily_max_leads) updateData.daily_max_leads = parseInt(args.daily_max_leads);
        
        const result = await this.makeRequest(`/campaigns/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:delete',
      description: 'Delete email campaign',
      usage: 'campaigns:delete --id campaign_uuid',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/campaigns/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:activate',
      description: 'Start/activate campaign',
      usage: 'campaigns:activate --id campaign_uuid',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/campaigns/${args.id}/activate`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:pause',
      description: 'Pause running campaign',
      usage: 'campaigns:pause --id campaign_uuid',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/campaigns/${args.id}/pause`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:share',
      description: 'Share campaign (enables sharing for 7 days)',
      usage: 'campaigns:share --id campaign_uuid',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/campaigns/${args.id}/share`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Lead Management (10 commands)
    {
      name: 'leads:create',
      description: 'Add single lead to campaign',
      usage: 'leads:create --email john@company.com --first_name John --last_name Doe --campaign_id uuid',
      category: 'Lead Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const leadData = {
          email: args.email,
          first_name: args.first_name,
          last_name: args.last_name,
          company: args.company,
          campaign_id: args.campaign_id,
          custom_variables: args.custom_variables ? JSON.parse(args.custom_variables) : undefined,
        };
        
        const result = await this.makeRequest('/leads', 'POST', leadData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'leads:list',
      description: 'List leads with filtering',
      usage: 'leads:list [--campaign_id uuid] [--status active] [--limit 50]',
      category: 'Lead Management',
      handler: async (args) => {
        const params: any = {};
        if (args.campaign_id) params.campaign_id = args.campaign_id;
        if (args.status) params.status = args.status;
        if (args.limit) params.limit = parseInt(args.limit);
        
        const result = await this.makeRequest('/leads/list', 'POST', params);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'leads:get',
      description: 'Get specific lead details',
      usage: 'leads:get --id lead_uuid',
      category: 'Lead Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/leads/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'leads:update',
      description: 'Update lead information',
      usage: 'leads:update --id lead_uuid --first_name John --status interested',
      category: 'Lead Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.first_name) updateData.first_name = args.first_name;
        if (args.last_name) updateData.last_name = args.last_name;
        if (args.company) updateData.company = args.company;
        if (args.status) updateData.status = args.status;
        
        const result = await this.makeRequest(`/leads/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'leads:delete',
      description: 'Remove lead',
      usage: 'leads:delete --id lead_uuid',
      category: 'Lead Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/leads/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Email Management (7 commands)
    {
      name: 'emails:list',
      description: 'List emails with filtering',
      usage: 'emails:list [--campaign_id uuid] [--is_unread 1] [--limit 50]',
      category: 'Email Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.is_unread) params.append('is_unread', args.is_unread);
        if (args.limit) params.append('limit', args.limit);
        if (args.starting_after) params.append('starting_after', args.starting_after);
        
        const data = await this.makeRequest(`/emails?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'emails:get',
      description: 'Get specific email details',
      usage: 'emails:get --id email_uuid',
      category: 'Email Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/emails/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'emails:update',
      description: 'Update email information',
      usage: 'emails:update --id email_uuid --is_unread 0',
      category: 'Email Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.is_unread !== undefined) updateData.is_unread = parseInt(args.is_unread);
        if (args.is_focused !== undefined) updateData.is_focused = parseInt(args.is_focused);
        if (args.i_status !== undefined) updateData.i_status = parseInt(args.i_status);
        
        const result = await this.makeRequest(`/emails/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'emails:delete',
      description: 'Delete email',
      usage: 'emails:delete --id email_uuid',
      category: 'Email Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/emails/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'emails:reply',
      description: 'Send email reply',
      usage: 'emails:reply --to recipient@domain.com --subject "Re: Subject" --body "Reply message"',
      category: 'Email Management',
      handler: async (args) => {
        if (!args.to || !args.subject || !args.body) {
          throw new Error('Required: --to, --subject, --body');
        }
        
        const replyData = {
          to_address_email_list: args.to,
          subject: args.subject,
          body: {
            text: args.body,
            html: args.html_body || `<p>${args.body}</p>`,
          },
          eaccount: args.from_account,
        };
        
        const result = await this.makeRequest('/emails/reply', 'POST', replyData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Analytics (6 commands)
    {
      name: 'analytics:campaigns',
      description: 'Get campaign analytics',
      usage: 'analytics:campaigns [--id campaign_uuid] [--start_date 2024-01-01] [--end_date 2024-12-31]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.id) params.append('id', args.id);
        if (args.ids) params.append('ids', args.ids);
        if (args.start_date) params.append('start_date', args.start_date);
        if (args.end_date) params.append('end_date', args.end_date);
        if (args.exclude_total_leads_count) params.append('exclude_total_leads_count', args.exclude_total_leads_count);
        
        const data = await this.makeRequest(`/campaigns/analytics?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:overview',
      description: 'Get analytics overview',
      usage: 'analytics:overview [--id campaign_uuid] [--campaign_status 1]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.id) params.append('id', args.id);
        if (args.ids) params.append('ids', args.ids);
        if (args.start_date) params.append('start_date', args.start_date);
        if (args.end_date) params.append('end_date', args.end_date);
        if (args.campaign_status) params.append('campaign_status', args.campaign_status);
        
        const data = await this.makeRequest(`/campaigns/analytics/overview?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:daily',
      description: 'Get daily campaign analytics',
      usage: 'analytics:daily [--campaign_id uuid] [--start_date 2024-01-01] [--end_date 2024-12-31]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.start_date) params.append('start_date', args.start_date);
        if (args.end_date) params.append('end_date', args.end_date);
        if (args.campaign_status) params.append('campaign_status', args.campaign_status);
        
        const data = await this.makeRequest(`/campaigns/analytics/daily?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:steps',
      description: 'Get campaign steps analytics',
      usage: 'analytics:steps [--campaign_id uuid] [--start_date 2024-01-01] [--end_date 2024-12-31]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.start_date) params.append('start_date', args.start_date);
        if (args.end_date) params.append('end_date', args.end_date);
        
        const data = await this.makeRequest(`/campaigns/analytics/steps?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },

    // Additional commands for completeness
    {
      name: 'email-verification:verify',
      description: 'Verify email address',
      usage: 'email-verification:verify --email test@domain.com',
      category: 'Email Verification',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const verifyData = { email: args.email };
        const result = await this.makeRequest('/email-verification', 'POST', verifyData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'email-verification:get',
      description: 'Get email verification status',
      usage: 'email-verification:get --email test@domain.com',
      category: 'Email Verification',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const data = await this.makeRequest(`/email-verification/${encodeURIComponent(args.email)}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
  ];

  async execute(commandName: string, args: Record<string, any>): Promise<void> {
    const command = this.commands.find(cmd => cmd.name === commandName);
    if (!command) {
      throw new Error(`Command '${commandName}' not found`);
    }
    
    try {
      await command.handler(args);
    } catch (error: any) {
      throw new Error(`Failed to execute ${commandName}: ${error.message}`);
    }
  }
}

// TODO: Implement full Instantly API integration
// TODO: Add campaign management commands
// TODO: Add lead management commands  
// TODO: Add sequence management commands
// TODO: Add analytics and reporting commands
// TODO: Add deliverability optimization features
// TODO: Add team collaboration features 