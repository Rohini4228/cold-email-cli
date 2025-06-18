import { CLIModule, CLICommand } from '../../types/global';

export class LemlistModule implements CLIModule {
  name = 'lemlist';
  version = '2.0.0';
  description = 'Personalization at Scale - Coming Soon';

  commands: CLICommand[] = [{
    name: 'info',
    description: 'Show platform info',
    usage: 'lemlist info',
    category: 'Info',
    handler: async () => console.log('📩 Lemlist - Coming Soon')
  }];

  async execute(commandName: string, args: any) {
    const cmd = this.commands.find(c => c.name === commandName);
    if (!cmd) throw new Error(`Command '${commandName}' not found`);
    await cmd.handler(args);
  }
} 