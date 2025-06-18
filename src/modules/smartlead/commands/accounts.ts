import { CLICommand } from '../../../types/global';
import { SmartLeadAPI } from '../api';

const api = new SmartLeadAPI();

export const accountCommands: CLICommand[] = [
  {
    name: 'accounts:list',
    description: 'List email accounts',
    usage: 'accounts:list',
    category: 'Email Accounts',
    handler: async () => {
      const data = await api.getEmailAccounts();
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'accounts:add',
    description: 'Add new email account',
    usage: 'accounts:add --email user@domain.com --password pass',
    category: 'Email Accounts',
    handler: async (args) => {
      if (!args.email) throw new Error('Required: --email');
      const data = await api.addEmailAccount(args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'accounts:warmup',
    description: 'Start/stop email warmup',
    usage: 'accounts:warmup --email user@domain.com --action start',
    category: 'Email Accounts',
    handler: async (args) => {
      if (!args.email || !args.action) {
        throw new Error('Required: --email, --action (start|stop)');
      }
      const data = await api.warmupEmailAccount(args.email, args.action);
      console.log(JSON.stringify(data, null, 2));
    }
  }
]; 