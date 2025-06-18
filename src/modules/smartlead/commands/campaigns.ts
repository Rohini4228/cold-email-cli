import { CLICommand } from '../../../types/global';
import { SmartLeadAPI } from '../api';

const api = new SmartLeadAPI();

export const campaignCommands: CLICommand[] = [
  {
    name: 'campaigns:list',
    description: 'List all campaigns with pagination',
    usage: 'campaigns:list [--limit 20] [--offset 0]',
    category: 'Campaign Management',
    handler: async (args) => {
      const data = await api.getCampaigns(args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'campaigns:create',
    description: 'Create new campaign',
    usage: 'campaigns:create --name "Campaign Name" --track_settings "open,click"',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.name) throw new Error('Required: --name');
      const data = await api.createCampaign(args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'campaigns:get',
    description: 'Get campaign details',
    usage: 'campaigns:get --id campaign_id',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      const data = await api.getCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'campaigns:update',
    description: 'Update campaign',
    usage: 'campaigns:update --id campaign_id --name "New Name"',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      const data = await api.updateCampaign(args.id, args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'campaigns:delete',
    description: 'Delete campaign',
    usage: 'campaigns:delete --id campaign_id',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      await api.deleteCampaign(args.id);
      console.log('Campaign deleted successfully');
    }
  },
  {
    name: 'campaigns:start',
    description: 'Start campaign',
    usage: 'campaigns:start --id campaign_id',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      const data = await api.startCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'campaigns:pause',
    description: 'Pause campaign',
    usage: 'campaigns:pause --id campaign_id',
    category: 'Campaign Management',
    handler: async (args) => {
      if (!args.id) throw new Error('Required: --id');
      const data = await api.pauseCampaign(args.id);
      console.log(JSON.stringify(data, null, 2));
    }
  }
]; 