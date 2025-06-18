import { CLIModule, CLICommand } from '../../types/global';
import axios from 'axios';

export class SalesforgeModule implements CLIModule {
  name = 'salesforge';
  version = '2.0.0';
  description = 'AI-Powered Multi-Channel Sequences';
  
  private apiKey: string | undefined;
  private baseURL = 'https://api.salesforge.ai/public/v2';

  constructor() {
    this.apiKey = process.env.SALESFORGE_API_KEY;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', data?: any) {
    if (!this.apiKey) {
      throw new Error('SALESFORGE_API_KEY environment variable is required');
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
      throw new Error(`Salesforge API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  commands: CLICommand[] = [
    // Campaign Management (10 commands)
    {
      name: 'campaigns:list',
      description: 'List AI-powered email campaigns',
      usage: 'campaigns:list [--limit 20] [--offset 0] [--status active]',
      category: 'Campaign Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.limit) params.append('limit', args.limit);
        if (args.offset) params.append('offset', args.offset);
        if (args.status) params.append('status', args.status);
        
        const data = await this.makeRequest(`/campaigns?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'campaigns:create',
      description: 'Create AI-optimized campaign',
      usage: 'campaigns:create --name "Campaign Name" --type email --ai_optimization true',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.name) {
          throw new Error('Required: --name');
        }
        
        const campaignData = {
          name: args.name,
          type: args.type || 'email',
          ai_optimization_enabled: args.ai_optimization !== 'false',
          target_personas: args.personas ? args.personas.split(',') : [],
          industry: args.industry || '',
        };
        
        const result = await this.makeRequest('/campaigns', 'POST', campaignData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:get',
      description: 'Get campaign details with AI insights',
      usage: 'campaigns:get --id campaign_id',
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
      description: 'Update campaign with AI optimization',
      usage: 'campaigns:update --id campaign_id --ai_optimization true',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const updateData: any = {};
        if (args.name) updateData.name = args.name;
        if (args.ai_optimization !== undefined) updateData.ai_optimization_enabled = args.ai_optimization === 'true';
        if (args.performance_goal) updateData.performance_goal = args.performance_goal;
        
        const result = await this.makeRequest(`/campaigns/${args.id}`, 'PATCH', updateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'campaigns:delete',
      description: 'Delete campaign',
      usage: 'campaigns:delete --id campaign_id',
      category: 'Campaign Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const result = await this.makeRequest(`/campaigns/${args.id}`, 'DELETE');
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Sequence Management (8 commands)
    {
      name: 'sequences:list',
      description: 'List AI-generated email sequences',
      usage: 'sequences:list [--campaign_id id] [--ai_generated true]',
      category: 'Sequence Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.ai_generated) params.append('ai_generated', args.ai_generated);
        
        const data = await this.makeRequest(`/sequences?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'sequences:create',
      description: 'Create AI-powered email sequence',
      usage: 'sequences:create --name "Sequence Name" --campaign_id id --persona "decision_maker"',
      category: 'Sequence Management',
      handler: async (args) => {
        if (!args.name || !args.campaign_id) {
          throw new Error('Required: --name, --campaign_id');
        }
        
        const sequenceData = {
          name: args.name,
          campaign_id: args.campaign_id,
          ai_generated: args.ai_generated !== 'false',
          persona: args.persona,
          industry: args.industry,
        };
        
        const result = await this.makeRequest('/sequences', 'POST', sequenceData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Lead Management (6 commands)
    {
      name: 'leads:list',
      description: 'List leads with AI engagement scores',
      usage: 'leads:list --campaign_id id [--engagement_score_min 0.5]',
      category: 'Lead Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.engagement_score_min) params.append('engagement_score_min', args.engagement_score_min);
        
        const data = await this.makeRequest(`/leads?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'leads:create',
      description: 'Create lead with AI enrichment',
      usage: 'leads:create --email john@company.com --ai_enrich true',
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
          ai_enrich: args.ai_enrich !== 'false',
        };
        
        const result = await this.makeRequest('/leads', 'POST', leadData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Template Management (7 commands)
    {
      name: 'templates:list',
      description: 'List AI-optimized email templates',
      usage: 'templates:list [--ai_optimized true] [--persona "decision_maker"]',
      category: 'Template Management',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.ai_optimized) params.append('ai_optimized', args.ai_optimized);
        if (args.persona) params.append('persona', args.persona);
        
        const data = await this.makeRequest(`/templates?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'templates:create',
      description: 'Create AI-optimized email template',
      usage: 'templates:create --name "Template Name" --content "Email content" --ai_optimize true',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.name || !args.content) {
          throw new Error('Required: --name, --content');
        }
        
        const templateData = {
          name: args.name,
          content: args.content,
          subject: args.subject,
          ai_optimized: args.ai_optimize !== 'false',
          persona: args.persona,
          industry: args.industry,
        };
        
        const result = await this.makeRequest('/templates', 'POST', templateData);
        console.log(JSON.stringify(result, null, 2));
      }
    },
    {
      name: 'templates:optimize',
      description: 'AI-optimize existing template',
      usage: 'templates:optimize --id template_id --goal "reply_rate"',
      category: 'Template Management',
      handler: async (args) => {
        if (!args.id) {
          throw new Error('Required: --id');
        }
        
        const optimizeData = {
          goal: args.goal || 'reply_rate',
          persona: args.persona,
          industry: args.industry,
        };
        
        const result = await this.makeRequest(`/templates/${args.id}/optimize`, 'POST', optimizeData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Multi-Channel (5 commands)
    {
      name: 'multichannel:sequences',
      description: 'List multi-channel sequences',
      usage: 'multichannel:sequences [--channels email,linkedin,phone]',
      category: 'Multi-Channel',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.channels) params.append('channels', args.channels);
        
        const data = await this.makeRequest(`/multichannel/sequences?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'multichannel:create',
      description: 'Create multi-channel sequence',
      usage: 'multichannel:create --name "Multi-Channel Sequence" --channels email,linkedin',
      category: 'Multi-Channel',
      handler: async (args) => {
        if (!args.name || !args.channels) {
          throw new Error('Required: --name, --channels');
        }
        
        const sequenceData = {
          name: args.name,
          channels: args.channels.split(','),
          ai_optimization: args.ai_optimization !== 'false',
        };
        
        const result = await this.makeRequest('/multichannel/sequences', 'POST', sequenceData);
        console.log(JSON.stringify(result, null, 2));
      }
    },

    // Analytics (6 commands)
    {
      name: 'analytics:performance',
      description: 'Get AI performance analytics',
      usage: 'analytics:performance --campaign_id id [--include_ai_insights true]',
      category: 'Analytics',
      handler: async (args) => {
        const params = new URLSearchParams();
        if (args.campaign_id) params.append('campaign_id', args.campaign_id);
        if (args.include_ai_insights) params.append('include_ai_insights', args.include_ai_insights);
        
        const data = await this.makeRequest(`/analytics/performance?${params}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:ai-insights',
      description: 'Get AI-generated insights and recommendations',
      usage: 'analytics:ai-insights --campaign_id id',
      category: 'Analytics',
      handler: async (args) => {
        if (!args.campaign_id) {
          throw new Error('Required: --campaign_id');
        }
        
        const data = await this.makeRequest(`/analytics/ai-insights/${args.campaign_id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    },
    {
      name: 'analytics:predictions',
      description: 'Get AI performance predictions',
      usage: 'analytics:predictions --campaign_id id --forecast_days 30',
      category: 'Analytics',
      handler: async (args) => {
        if (!args.campaign_id) {
          throw new Error('Required: --campaign_id');
        }
        
        const params = new URLSearchParams();
        params.append('campaign_id', args.campaign_id);
        if (args.forecast_days) params.append('forecast_days', args.forecast_days);
        
        const data = await this.makeRequest(`/analytics/predictions?${params}`);
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