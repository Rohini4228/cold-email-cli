import { CLICommand } from '../../../types/global';
import { SmartLeadAPI } from '../api';

const api = new SmartLeadAPI();

export const leadCommands: CLICommand[] = [
  {
    name: 'leads:add-bulk',
    description: 'Add leads in bulk to campaign',
    usage: 'leads:add-bulk --campaign_id id --leads leads.csv',
    category: 'Lead Management',
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error('Required: --campaign_id, --leads');
      }
      const data = await api.addLeadsToCampaign(args.campaign_id, args.leads);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'leads:list',
    description: 'List campaign leads',
    usage: 'leads:list --campaign_id id [--limit 100]',
    category: 'Lead Management',
    handler: async (args) => {
      if (!args.campaign_id) throw new Error('Required: --campaign_id');
      const data = await api.getCampaignLeads(args.campaign_id, args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'leads:update',
    description: 'Update lead information',
    usage: 'leads:update --id lead_id --status interested',
    category: 'Lead Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      const data = await api.updateLead(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    }
  }
]; 