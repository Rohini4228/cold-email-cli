import { CLIModule, CLICommand } from '../../types/global';
import axios from 'axios';

export class SmartLeadModule implements CLIModule {
  name = 'smartlead';
  version = '2.0.0';
  description = 'Advanced Campaign Management & Analytics';
  
  private apiKey: string | undefined;
  private baseURL = 'https://server.smartlead.ai/api/v1';

  constructor() {
    this.apiKey = process.env.SMARTLEAD_API_KEY;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', data?: any) {
    if (!this.apiKey) {
      throw new Error('SMARTLEAD_API_KEY environment variable is required');
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
      throw new Error(`SmartLead API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  commands: CLICommand[] = [
    // Campaign Management Commands
    {
      name: 'campaigns:list',
      description: 'List all campaigns',
      usage: 'campaigns:list [--limit 20] [--offset 0]',
      category: 'Campaign Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.limit) params.append('limit', args.limit);
        if (args.offset) params.append('offset', args.offset);
        
        const data = await this.makeRequest(`/campaigns?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'campaigns:create',
      description: 'Create new campaign',
      usage: 'campaigns:create --name "Campaign Name" --track_settings "open,click"',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.name) {
          throw new Error('Required: --name');
        }
        
        const campaignData = {
          name: args.name,
          track_settings: args.track_settings || 'open,click',
        };
        
        const result = await this.makeRequest('/campaigns', 'POST', campaignData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    // Lead Management Commands
    {
      name: 'leads:add-bulk',
      description: 'Add leads in bulk to campaign',
      usage: 'leads:add-bulk --campaign_id id --leads leads.csv',
      category: 'Lead Management',
      handler: async (args) => {
        if (!args.campaign_id || !args.leads) {
          throw new Error('Required: --campaign_id, --leads');
        }
        
        const data = await this.makeRequest(`/campaigns/${args.campaign_id}/leads`, 'POST', {
          lead_list: args.leads
        });
        console.log(JSON.stringify(data, null, 2));
      }
    },
    // Analytics Commands
    {
      name: 'analytics:campaign',
      description: 'Get campaign analytics',
      usage: 'analytics:campaign --campaign_id id',
      category: 'Analytics',
      handler: async (args) => {
        if (!args.campaign_id) {
          throw new Error('Required: --campaign_id');
        }
        
        const data = await this.makeRequest(`/campaigns/${args.campaign_id}/analytics`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    // Account Management Commands
    {
      name: 'accounts:list',
      description: 'List email accounts',
      usage: 'accounts:list',
      category: 'Email Accounts',
      handler: async () => {
        const data = await this.makeRequest('/email-accounts');
        console.log(JSON.stringify(data, null, 2));
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