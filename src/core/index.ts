#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { ModuleSelector } from './module-selector';
import { ConfigManager } from './utils/config';
import { ThemeManager } from './utils/theme';
import { ModuleName } from '../types/global';

export class CLIApplication {
  private program: Command;
  private moduleSelector: ModuleSelector;
  private configManager: ConfigManager;
  private theme: ThemeManager;
  private packageJson: any;

  constructor() {
    this.program = new Command();
    this.moduleSelector = new ModuleSelector();
    this.configManager = ConfigManager.getInstance();
    this.theme = new ThemeManager();
    
    // Load package.json for version info
    this.packageJson = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
    );
    
    this.setupCLI();
  }

  private setupCLI(): void {
    this.program
      .name('smartlead')
      .description('Multi-module CLI for email marketing platforms')
      .version(this.packageJson.version);

    // Core CLI commands
    this.program
      .command('modules')
      .description('Show available modules')
      .action(() => this.showModules());

    this.program
      .command('switch')
      .description('Switch between modules')
      .action(() => this.switchModule());

    this.program
      .command('info')
      .description('Show current module information')
      .action(() => this.showModuleInfo());

    this.program
      .command('config')
      .description('Configure the CLI')
      .action(() => this.configureModule());

    this.program
      .command('show-config')
      .description('Show current configuration')
      .action(() => this.showConfig());

    this.program
      .command('reset')
      .description('Reset configuration')
      .option('--module <module>', 'Reset specific module config')
      .action((options) => this.resetConfig(options));

    // Interactive mode
    this.program
      .command('interactive')
      .alias('i')
      .description('Start interactive mode')
      .action(() => this.startInteractiveMode());

    // Default action - show help or run module
    this.program.action(async () => {
      const args = process.argv.slice(2);
      
      if (args.length === 0) {
        await this.showWelcome();
        return;
      }

      // Try to execute in current module
      await this.executeInModule();
    });
  }

  private async showWelcome(): Promise<void> {
    const currentModule = this.configManager.getActiveModule();
    const moduleInfo = this.moduleSelector.getModuleInfo(currentModule);
    
    this.theme.setModule(currentModule);
    
    console.log(this.theme.createBanner(
      'Multi-Module CLI',
      'Email Marketing Automation Platform'
    ));
    
    console.log(this.theme.primary('🎯 Quick Start:'));
    console.log(`  ${this.theme.text('smartlead modules')} ${this.theme.muted('- Show available modules')}`);
    console.log(`  ${this.theme.text('smartlead switch')} ${this.theme.muted('- Switch between modules')}`);
    console.log(`  ${this.theme.text('smartlead config')} ${this.theme.muted('- Configure API settings')}`);
    console.log(`  ${this.theme.text('smartlead interactive')} ${this.theme.muted('- Start interactive mode')}`);
    
    if (moduleInfo) {
      console.log(`\n${this.theme.secondary('📦 Active Module:')} ${this.theme.primary(moduleInfo.displayName)}`);
      console.log(`  ${this.theme.muted(moduleInfo.description)}`);
    }
    
    console.log();
  }

  private async showModules(): Promise<void> {
    await this.moduleSelector.showAllModules();
  }

  private async switchModule(): Promise<void> {
    const selectedModule = await this.moduleSelector.switchModule();
    this.theme.setModule(selectedModule);
  }

  private async showModuleInfo(): Promise<void> {
    await this.moduleSelector.showModuleInfo();
  }

  private async configureModule(): Promise<void> {
    const currentModule = this.configManager.getActiveModule();
    const module = await this.moduleSelector.loadModule(currentModule);
    
    if (module) {
      // The module should handle its own configuration
      console.log(this.theme.infoMessage(`Configuring ${currentModule} module...`));
      
      try {
        await module.executeCommand('config', []);
      } catch (error) {
        console.log(this.theme.errorMessage(`Configuration failed: ${error}`));
      }
    }
  }

  private async showConfig(): Promise<void> {
    const config = this.configManager.loadConfig();
    const currentModule = this.configManager.getActiveModule();
    const moduleConfig = this.configManager.getModuleConfig(currentModule);
    
    console.log(this.theme.primary('\n📋 Current Configuration:'));
    console.log(this.theme.muted('─'.repeat(40)));
    
    console.log(`${this.theme.text('Active Module:')} ${this.theme.primary(currentModule)}`);
    console.log(`${this.theme.text('Config Directory:')} ${this.theme.muted(this.configManager.getConfigDir())}`);
    
    if (config.lastUsed) {
      console.log(`${this.theme.text('Last Used:')} ${this.theme.muted(new Date(config.lastUsed).toLocaleString())}`);
    }
    
    if (moduleConfig?.apiKey) {
      console.log(`${this.theme.text('API Key:')} ${this.theme.success('***' + moduleConfig.apiKey.slice(-4))}`);
    } else {
      console.log(`${this.theme.text('API Key:')} ${this.theme.error('Not configured')}`);
    }
    
    if (moduleConfig?.baseUrl) {
      console.log(`${this.theme.text('Base URL:')} ${this.theme.secondary(moduleConfig.baseUrl)}`);
    }
    
    console.log();
  }

  private async resetConfig(options: any): Promise<void> {
    if (options.module) {
      const moduleName = options.module as ModuleName;
      if (this.moduleSelector.isModuleAvailable(moduleName)) {
        this.configManager.resetModuleConfig(moduleName);
        console.log(this.theme.successMessage(`Reset ${moduleName} module configuration`));
      } else {
        console.log(this.theme.errorMessage(`Module '${moduleName}' not found`));
      }
    } else {
      this.configManager.deleteConfig();
      console.log(this.theme.successMessage('Reset all configuration'));
    }
  }

  private async startInteractiveMode(): Promise<void> {
    console.log(this.theme.createBanner('Interactive Mode', 'Multi-Module Email Marketing CLI'));
    
    const selectedModule = await this.moduleSelector.selectModule();
    const module = await this.moduleSelector.loadModule(selectedModule);
    
    if (module) {
      console.log(this.theme.infoMessage('Starting interactive session...'));
      // The module should handle its own interactive mode
      // This would be implemented in each module
    }
  }

  private async executeInModule(): Promise<void> {
    const currentModule = this.configManager.getActiveModule();
    const module = await this.moduleSelector.loadModule(currentModule);
    
    if (module) {
      const args = process.argv.slice(2);
      const commandName = args[0] || '';
      const commandArgs = args.slice(1);
      
      try {
        await module.executeCommand(commandName, commandArgs);
      } catch (error) {
        console.log(this.theme.errorMessage(`Command execution failed: ${error}`));
        process.exit(1);
      }
    } else {
      console.log(this.theme.errorMessage('Failed to load module'));
      process.exit(1);
    }
  }

  public async run(): Promise<void> {
    try {
      // Parse arguments
      await this.program.parseAsync(process.argv);
    } catch (error) {
      console.log(this.theme.errorMessage(`CLI Error: ${error}`));
      process.exit(1);
    }
  }
}

// Entry point
if (require.main === module) {
  const cli = new CLIApplication();
  cli.run().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} 