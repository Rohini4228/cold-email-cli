import { CLIModule, CLICommand } from '../../types/global';
import axios from 'axios';

export class ApolloModule implements CLIModule {
  name = 'apollo';
  version = '2.0.0';
  description = 'Email Sequence & Outreach Automation';
  
  private apiKey: string | undefined;
  private baseURL = 'https://api.apollo.io/v1';

  constructor() {
    this.apiKey = process.env.APOLLO_API_KEY;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', data?: any) {
    if (!this.apiKey) {
      throw new Error('APOLLO_API_KEY environment variable is required');
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
      throw new Error(`Apollo API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  commands: CLICommand[] = [
    // Sequence Management (12 commands)
    {
      name: 'sequences:list',
      description: 'List email sequences',
      usage: 'sequences:list [--limit 20] [--folder "My Folder"]',
      category: 'Sequence Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.limit) params.append('limit', args.limit);
        if (args.folder) params.append('folder', args.folder);
        
        const data = await this.makeRequest(`/sequences?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'sequences:create',
      description: 'Create email sequence',
      usage: 'sequences:create --name "Sequence Name" --steps 5',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.name) {
          throw new Error('Required: --name');
        }
        
        const sequenceData = {
          name: args.name,
          steps_count: args.steps ? parseInt(args.steps) : 3,
          folder: args.folder || 'Default',
        };
        
        const result = await this.makeRequest('/sequences', 'POST', sequenceData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'sequences:get',
      description: 'Get sequence details',
      usage: 'sequences:get --id sequence_id',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/sequences/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'sequences:update',
      description: 'Update sequence',
      usage: 'sequences:update --id sequence_id --name "New Name"',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.name) updateData.name = args.name;
        if (args.status) updateData.status = args.status;
        
        const result = await this.makeRequest(`/sequences/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'sequences:delete',
      description: 'Delete sequence',
      usage: 'sequences:delete --id sequence_id',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/sequences/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'sequences:start',
      description: 'Start sequence',
      usage: 'sequences:start --id sequence_id',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/sequences/${args.id}/start`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'sequences:pause',
      description: 'Pause sequence',
      usage: 'sequences:pause --id sequence_id',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/sequences/${args.id}/pause`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Contact Management (8 commands)
    {
      name: 'contacts:list',
      description: 'List contacts in sequence',
      usage: 'contacts:list --sequence_id id [--status contacted]',
      category: 'Contact Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.sequence_id) params.append('sequence_id', args.sequence_id);
        if (args.status) params.append('status', args.status);
        
        const data = await this.makeRequest(`/contacts?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'contacts:add',
      description: 'Add contact to sequence',
      usage: 'contacts:add --sequence_id id --email john@company.com',
      category: 'Contact Management',
      handler: async (args) => {
        if (!args.sequence_id || !args.email) {
          throw new Error('Required: --sequence_id, --email');
        }
        
        const contactData = {
          sequence_id: args.sequence_id,
          email: args.email,
          first_name: args.first_name,
          last_name: args.last_name,
          company: args.company,
          title: args.title,
        };
        
        const result = await this.makeRequest('/contacts', 'POST', contactData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'contacts:get',
      description: 'Get contact details',
      usage: 'contacts:get --id contact_id',
      category: 'Contact Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/contacts/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'contacts:update',
      description: 'Update contact information',
      usage: 'contacts:update --id contact_id --title "VP Sales"',
      category: 'Contact Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.first_name) updateData.first_name = args.first_name;
        if (args.last_name) updateData.last_name = args.last_name;
        if (args.title) updateData.title = args.title;
        if (args.company) updateData.company = args.company;
        
        const result = await this.makeRequest(`/contacts/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'contacts:remove',
      description: 'Remove contact from sequence',
      usage: 'contacts:remove --id contact_id',
      category: 'Contact Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/contacts/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Template Management (7 commands)
    {
      name: 'templates:list',
      description: 'List email templates',
      usage: 'templates:list [--category outreach]',
      category: 'Template Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.category) params.append('category', args.category);
        
        const data = await this.makeRequest(`/templates?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'templates:create',
      description: 'Create email template',
      usage: 'templates:create --name "Template Name" --subject "Subject" --body "Email body"',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.name || !args.subject || !args.body) {
          throw new Error('Required: --name, --subject, --body');
        }
        
        const templateData = {
          name: args.name,
          subject: args.subject,
          body: args.body,
          category: args.category || 'outreach',
        };
        
        const result = await this.makeRequest('/templates', 'POST', templateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'templates:get',
      description: 'Get template details',
      usage: 'templates:get --id template_id',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/templates/${args.id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'templates:update',
      description: 'Update template',
      usage: 'templates:update --id template_id --subject "New Subject"',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.name) updateData.name = args.name;
        if (args.subject) updateData.subject = args.subject;
        if (args.body) updateData.body = args.body;
        
        const result = await this.makeRequest(`/templates/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'templates:delete',
      description: 'Delete template',
      usage: 'templates:delete --id template_id',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/templates/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Account Management (6 commands)
    {
      name: 'accounts:list',
      description: 'List email accounts',
      usage: 'accounts:list [--status active]',
      category: 'Account Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.status) params.append('status', args.status);
        
        const data = await this.makeRequest(`/accounts?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'accounts:get',
      description: 'Get account details',
      usage: 'accounts:get --email account@domain.com',
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
      description: 'Update account settings',
      usage: 'accounts:update --email account@domain.com --daily_limit 500',
      category: 'Account Management',
      handler: async (args) => {
        if (!args.email) {
          throw new Error('Required: --email');
        }
        
        const updateData: any = {};
        if (args.daily_limit) updateData.daily_limit = parseInt(args.daily_limit);
        if (args.warmup_enabled !== undefined) updateData.warmup_enabled = args.warmup_enabled === 'true';
        
        const result = await this.makeRequest(`/accounts/${encodeURIComponent(args.email)}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Analytics (5 commands)
    {
      name: 'analytics:sequence',
      description: 'Get sequence analytics',
      usage: 'analytics:sequence --id sequence_id',
      category: 'Analytics',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const data = await this.makeRequest(`/sequences/${args.id}/analytics`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:performance',
      description: 'Get overall performance analytics',
      usage: 'analytics:performance [--date_from YYYY-MM-DD] [--date_to YYYY-MM-DD]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.date_from) params.append('date_from', args.date_from);
        if (args.date_to) params.append('date_to', args.date_to);
        
        const data = await this.makeRequest(`/analytics/performance?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:deliverability',
      description: 'Get deliverability analytics',
      usage: 'analytics:deliverability --account account@domain.com',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.account) params.append('account', args.account);
        
        const data = await this.makeRequest(`/analytics/deliverability?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },

    // Inbox Management (4 commands)
    {
      name: 'inbox:list',
      description: 'List inbox messages',
      usage: 'inbox:list [--unread true] [--limit 50]',
      category: 'Inbox Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.unread) params.append('unread', args.unread);
        if (args.limit) params.append('limit', args.limit);
        
        const data = await this.makeRequest(`/inbox?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'inbox:reply',
      description: 'Reply to inbox message',
      usage: 'inbox:reply --message_id id --body "Reply message"',
      category: 'Inbox Management',
      handler: async (args) => {
        if (!args.message_id || !args.body) {
          throw new Error('Required: --message_id, --body');
        }
        
        const replyData = {
          message_id: args.message_id,
          body: args.body,
        };
        
        const result = await this.makeRequest('/inbox/reply', 'POST', replyData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'inbox:mark-read',
      description: 'Mark message as read',
      usage: 'inbox:mark-read --message_id id',
      category: 'Inbox Management',
      handler: async (args) => {
        if (!args.message_id) {
          throw new Error('Required: --message_id');
        }
        
        const result = await this.makeRequest(`/inbox/${args.message_id}/mark-read`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'inbox:archive',
      description: 'Archive inbox message',
      usage: 'inbox:archive --message_id id',
      category: 'Inbox Management',
      handler: async (args) => {
        if (!args.message_id) {
          throw new Error('Required: --message_id');
        }
        
        const result = await this.makeRequest(`/inbox/${args.message_id}/archive`, 'POST');
        console.log(JSON.stringify(result, null, 2));
      }
    }
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