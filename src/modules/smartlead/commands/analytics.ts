import { CLICommand } from '../../../types/global';
import { SmartLeadAPI } from '../api';

const api = new SmartLeadAPI();

export const analyticsCommands: CLICommand[] = [
  {
    name: 'analytics:campaign',
    description: 'Get campaign analytics',
    usage: 'analytics:campaign --campaign_id id',
    category: 'Analytics',
    handler: async (args) => {
      if (!args.campaign_id) throw new Error('Required: --campaign_id');
      const data = await api.getCampaignAnalytics(args.campaign_id);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'analytics:account',
    description: 'Get email account analytics',
    usage: 'analytics:account --email user@domain.com',
    category: 'Analytics',
    handler: async (args) => {
      if (!args.email) throw new Error('Required: --email');
      const data = await api.getEmailAccountAnalytics(args.email);
      console.log(JSON.stringify(data, null, 2));
    }
  }
]; 