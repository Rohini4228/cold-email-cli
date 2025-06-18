#!/usr/bin/env node

import { selectModule } from './module-selector.js';
import { getTheme, formatCommandList, showCommandHelp, showError } from './utils/theme.js';
import { CLIModule } from '../types/global.js';

export class ColdEmailCLI {
  private currentModule: CLIModule | null = null;

  async start(): Promise<void> {
    try {
      // Show initial welcome and module selection
      this.currentModule = await selectModule();
      
      if (!this.currentModule) {
        process.exit(0);
      }

      // Start interactive mode
      await this.startInteractiveMode();
    } catch (error) {
      showError(`Failed to start CLI: ${error}`);
      process.exit(1);
    }
  }

  private async startInteractiveMode(): Promise<void> {
    if (!this.currentModule) return;

    console.log(this.createWelcomeBanner());
    
    // Simple command loop (would be replaced with proper readline in production)
    const commands = ['help', 'campaigns:list', 'leads:create', 'version', 'exit'];
    
    for (const cmd of commands) {
      console.log(`\n${this.getPrompt()}${cmd}`);
      await this.handleCommand(cmd);
    }
  }

  private getPrompt(): string {
    if (!this.currentModule) return '> ';
    
    const theme = getTheme(this.currentModule.name.toLowerCase());
    const moduleName = this.currentModule.name;
    
    return theme.accent(`${moduleName}> `);
  }

  private async handleCommand(input: string): Promise<void> {
    const trimmed = input.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        if (args.length > 0 && args[0]) {
          this.showCommandHelp(args[0]);
        } else {
          this.showHelp();
        }
        break;
      case 'version':
        this.showVersion();
        break;
      case 'switch':
        await this.switchModule();
        break;
      case 'clear':
        console.clear();
        break;
      case 'exit':
        console.log('👋 Goodbye!');
        process.exit(0);
      default:
        if (this.currentModule && command) {
          const parsedArgs = this.parseArgs(args);
          try {
            await this.currentModule.execute(command, parsedArgs);
          } catch (error) {
            showError(`Command execution failed: ${error}`);
          }
        } else {
          showError(`Unknown command: ${command}. Type 'help' for available commands.`);
        }
    }
  }

  private parseArgs(args: string[]): Record<string, any> {
    const parsed: Record<string, any> = {};
    
    for (let i = 0; i < args.length; i++) {
      const param = args[i];
      if (!param) continue;
      
      if (param.startsWith('--')) {
        const key = param.substring(2);
        const nextArg = args[i + 1];
        const value = nextArg && !nextArg.startsWith('-') ? nextArg : true;
        parsed[key] = value;
        if (value !== true) i++; // Skip next arg if it was used as value
      } else if (param.startsWith('-')) {
        const key = param.substring(1);
        const nextArg = args[i + 1];
        const value = nextArg && !nextArg.startsWith('-') ? nextArg : true;
        parsed[key] = value;
        if (value !== true) i++; // Skip next arg if it was used as value
      } else {
        // Positional argument
        const existingPositional = parsed['_'] || [];
        parsed['_'] = [...existingPositional, param];
      }
    }
    
    return parsed;
  }

  private async switchModule(): Promise<void> {
    console.log('🔄 Switching modules...');
    this.currentModule = await selectModule();
    if (this.currentModule) {
      console.log(this.createWelcomeBanner());
    }
  }

  private showHelp(): void {
    if (!this.currentModule) return;
    
    const theme = getTheme(this.currentModule.name.toLowerCase());
    
    console.log(`
${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${theme.gradient(`🎯 ${this.currentModule.name} Cold Email CLI`)}
${theme.secondary(`   ${this.currentModule.description}`)}

${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${theme.accent('🔧 Core Commands:')}
${theme.muted('─'.repeat(50))}
  ${theme.accent('help'.padEnd(20))} ${theme.secondary('Show this help message')}
  ${theme.accent('help <command>'.padEnd(20))} ${theme.secondary('Show detailed command help')}
  ${theme.accent('version'.padEnd(20))} ${theme.secondary('Show CLI version information')}
  ${theme.accent('switch'.padEnd(20))} ${theme.secondary('Switch between cold email platforms')}
  ${theme.accent('clear'.padEnd(20))} ${theme.secondary('Clear the terminal screen')}
  ${theme.accent('exit'.padEnd(20))} ${theme.secondary('Exit the CLI')}
`);

    formatCommandList(this.currentModule.commands, this.currentModule.name.toLowerCase());
    
    if (this.currentModule.commands.length > 0) {
      console.log(theme.muted(`\n💡 Tip: Use "${theme.accent('help <command>')}" for detailed usage examples`));
      console.log(theme.muted(`📖 Total Commands Available: ${theme.accent(this.currentModule.commands.length.toString())}\n`));
    }
  }

  private showVersion(): void {
    const packageJson = require('../../package.json');
    const theme = getTheme(this.currentModule?.name?.toLowerCase());
    
    console.log(`
${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${theme.gradient('🚀 Professional Cold Email CLI')}
${theme.secondary('   Advanced Cold Outreach Automation Platform')}

${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${theme.accent('📦 Version Information:')}
${theme.muted('─'.repeat(30))}
  ${theme.secondary('CLI Version:')} ${theme.accent(packageJson.version)}
  ${theme.secondary('Current Module:')} ${theme.accent(this.currentModule?.name || 'None')}
  ${theme.secondary('Module Version:')} ${theme.accent(this.currentModule?.version || 'N/A')}
  ${theme.secondary('Node.js:')} ${theme.accent(process.version)}
  ${theme.secondary('Platform:')} ${theme.accent(process.platform)}

${theme.accent('🎯 Supported Platforms:')}
${theme.muted('─'.repeat(30))}
  ${theme.secondary('• SmartLead')} ${theme.muted('- Advanced Campaign Management & Analytics')}
  ${theme.secondary('• Instantly')} ${theme.muted('- High-Volume Automation & Deliverability')}
  ${theme.secondary('• SalesForge')} ${theme.muted('- AI-Powered Multi-Channel Sequences')}

${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
`);
  }

  private showCommandHelp(commandName: string): void {
    if (!this.currentModule) return;
    
    const command = this.currentModule.commands.find(cmd => cmd.name === commandName);
    if (command) {
      showCommandHelp(command, this.currentModule.name.toLowerCase());
    } else {
      showError(`Command '${commandName}' not found. Type 'help' to see all available commands.`);
    }
  }

  private createWelcomeBanner(): string {
    if (!this.currentModule) return '';
    
    const theme = getTheme(this.currentModule.name.toLowerCase());
    const width = 80;
    const border = '━'.repeat(width);
    
    return `
${theme.primary(border)}

${theme.gradient(`🎯 ${this.currentModule.name} Cold Email Platform`)}
${theme.secondary(`   ${this.currentModule.description}`)}
${theme.muted(`   Type "help" to see all ${this.currentModule.commands.length} available commands`)}

${theme.primary(border)}
`;
  }
}

// Start the CLI
const cli = new ColdEmailCLI();
cli.start().catch(console.error); 