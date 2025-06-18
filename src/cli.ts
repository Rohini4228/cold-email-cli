#!/usr/bin/env node

import { program } from 'commander';
import { render } from 'ink';
import React from 'react';
import chalk from 'chalk';
import { SmartLeadShell } from './modules/smartlead/shell.js';
import { InstantlyShell } from './modules/instantly/shell.js';
import { SalesforgeShell } from './modules/salesforge/shell.js';
import { ApolloShell } from './modules/apollo/shell.js';
import { MainMenu } from './components/MainMenu.js';

const ASCII_ART = `
 ██████╗███████╗ ██████╗
██╔════╝██╔════╝██╔════╝
██║     █████╗  ██║     
██║     ██╔══╝  ██║     
╚██████╗███████╗╚██████╗
 ╚═════╝╚══════╝ ╚═════╝
                        
Cold Email CLI v2.0.0   
`;

function showBanner() {
  console.clear();
  console.log(chalk.cyan(ASCII_ART));
  console.log(chalk.gray('Professional CLI for cold email automation'));
  console.log(chalk.blue('Discord: https://discord.gg/mB76X5QJ'));
  console.log('');
}

async function launchShell(platform: string) {
  console.clear();
  
  const shells = {
    smartlead: SmartLeadShell,
    instantly: InstantlyShell, 
    salesforge: SalesforgeShell,
    apollo: ApolloShell
  };
  
  const ShellComponent = shells[platform as keyof typeof shells];
  if (!ShellComponent) {
    console.log(chalk.red(`Unknown platform: ${platform}`));
    process.exit(1);
  }
  
  render(React.createElement(ShellComponent));
}

// Configure Commander
program
  .name('cec')
  .description('Cold Email CLI - Professional automation across multiple platforms')
  .version('2.0.0');

// Platform shells
['smartlead', 'instantly', 'salesforge', 'apollo'].forEach(platform => {
  program
    .command(platform)
    .description(`Launch ${platform} interactive shell`)
    .action(() => launchShell(platform));
});

// Direct command execution
program
  .command('exec <platform> <command>')
  .description('Execute command directly')
  .option('-a, --args <args>', 'Command arguments as JSON')
  .action(async (platform: string, command: string, options) => {
    const args = options.args ? JSON.parse(options.args) : {};
    
    try {
      const { selectModule } = await import('./core/module-selector.js');
      const module = await selectModule(platform);
      
      if (!module) {
        console.log(chalk.red(`Platform "${platform}" not found`));
        process.exit(1);
      }
      
      await module.execute(command, args);
    } catch (error: any) {
      console.log(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Info commands
program
  .command('platforms')
  .alias('p')
  .description('List all available platforms')
  .action(() => {
    showBanner();
    console.log(chalk.bold('Available Platforms:\n'));
    console.log(`${chalk.hex('#00BFFF')('⚡ SmartLead')}     - Campaign Management & Analytics (68 commands)`);
    console.log(`${chalk.hex('#FF8C00')('🚀 Instantly')}     - High-Volume Automation (45 commands)`);
    console.log(`${chalk.hex('#FF1493')('🤖 Salesforge')}   - AI-Powered Sequences (42 commands)`);
    console.log(`${chalk.green('🎯 Apollo')}        - Email Outreach (42 commands)`);
    console.log('');
    console.log(chalk.yellow('Coming Soon:'));
    console.log(`${chalk.gray('📧 Email Bison')}   - Advanced email automation`);
    console.log(`${chalk.gray('📈 AmpleMarket')}   - Sales intelligence platform`);
    console.log(`${chalk.gray('📩 Lemlist')}       - Personalization at scale`);
    console.log(`${chalk.gray('🎯 Outreach')}      - Sales engagement platform`);
    console.log(`${chalk.gray('💼 SalesLoft')}     - Revenue intelligence`);
    console.log('');
    console.log(chalk.gray('Use: cec <platform> to launch shell'));
  });

program
  .command('discord')
  .alias('d')
  .description('Open Discord community')
  .action(() => {
    console.log(chalk.blue('Join our Discord:'));
    console.log(chalk.cyan('https://discord.gg/mB76X5QJ'));
  });

// Default action - show main menu
program.action(() => {
  showBanner();
  render(React.createElement(MainMenu));
});

// Parse CLI arguments
if (process.argv.length === 2) {
  showBanner();
  render(React.createElement(MainMenu));
} else {
  program.parse();
} 