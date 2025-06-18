import { Command } from 'commander';
import inquirer from 'inquirer';
import * as readline from 'readline';
import { config } from '../config/config';
import { smartLeadApi, SmartLeadAPIError } from '../api/smartlead-client';
import { VisualUtils } from '../ui/visual-utils';
import { ANSIUtils } from '../ui/ansi-utils';
import { CampaignFilters, LeadFilters, EmailAccountFilters, ShellCommand } from '../types/smartlead';

export class SmartLeadCLI {
  private program: Command;
  private rl?: readline.Interface;
  private shellMode = false;
  private commandHistory: string[] = [];
  private currentHistoryIndex = -1;
  private pendingForceQuit = false;
  private currentShellLine = 6;

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  private setupCommands(): void {
    this.program
      .name('smartlead')
      .description('🚀 The most powerful and beautiful CLI for SmartLead API management')
      .version('2.0.0')
      .option('-v, --verbose', 'Enable verbose logging')
      .option('-t, --theme <theme>', 'Set theme (smartlead, neon, matrix, default)', 'smartlead')
      .hook('preAction', (thisCommand) => {
        const options = thisCommand.opts();
        if (options.theme) {
          config.setTheme(options.theme);
        }
      });

    // Interactive mode
    this.program
      .command('interactive')
      .alias('i')
      .description('🎨 Launch beautiful interactive mode with workspaces')
      .option('--no-banner', 'Skip the welcome banner')
      .option('--theme-studio', 'Start directly in theme studio')
      .action((options) => this.startInteractiveMode(options));

    // Shell mode
    this.program
      .command('shell')
      .alias('sh')
      .description('💻 Launch full-screen shell mode with auto-complete')
      .option('--no-clear', 'Don\'t clear screen on startup')
      .action((options) => this.startShellMode(options));

    // Configuration commands
    this.setupConfigCommands();
    
    // Campaign commands
    this.setupCampaignCommands();
    
    // Lead commands
    this.setupLeadCommands();
    
    // Email commands
    this.setupEmailCommands();
    
    // Analytics commands
    this.setupAnalyticsCommands();
    
    // Theme commands
    this.setupThemeCommands();

    // Quick utilities
    this.setupUtilityCommands();
  }

  private setupConfigCommands(): void {
    const configCmd = this.program
      .command('config')
      .description('⚙️ Manage configuration settings');

    configCmd
      .command('set')
      .description('Set configuration values')
      .option('--api-key <key>', 'Set SmartLead API key')
      .option('--base-url <url>', 'Set custom base URL')
      .option('--theme <theme>', 'Set default theme')
      .action((options) => this.setConfig(options));

    configCmd
      .command('show')
      .alias('get')
      .description('Show current configuration')
      .option('--json', 'Output in JSON format')
      .action((options) => this.showConfig(options));

    configCmd
      .command('test')
      .description('Test API connection')
      .action(() => this.testConnection());

    configCmd
      .command('clear')
      .description('Clear all configuration')
      .option('--force', 'Skip confirmation prompt')
      .action((options) => this.clearConfig(options));
  }

  private setupCampaignCommands(): void {
    const campaignCmd = this.program
      .command('campaigns')
      .alias('c')
      .description('📢 Campaign management operations');

    campaignCmd
      .command('list')
      .alias('ls')
      .description('List campaigns with advanced filtering')
      .option('--status <status>', 'Filter by status (active, paused, stopped, drafted)')
      .option('--limit <number>', 'Limit number of results', '25')
      .option('--sort <sort>', 'Sort order (newest, oldest, activity, name)', 'newest')
      .option('--stats', 'Include detailed statistics')
      .option('--extended', 'Show extended information')
      .action((options) => this.listCampaigns(options));

    campaignCmd
      .command('create')
      .description('Create a new campaign')
      .option('--name <name>', 'Campaign name')
      .option('--leads <number>', 'Max leads per day', '50')
      .option('--ai-esp', 'Enable AI ESP matching')
      .option('--plain-text', 'Send as plain text')
      .action((options) => this.createCampaign(options));

    campaignCmd
      .command('analytics <id>')
      .description('View campaign analytics')
      .option('--extended', 'Show extended analytics')
      .option('--date-range <days>', 'Date range in days', '30')
      .option('--charts', 'Show visual charts')
      .action((id, options) => this.campaignAnalytics(id, options));

    campaignCmd
      .command('start <id>')
      .description('Start a campaign')
      .action((id) => this.controlCampaign(id, 'START'));

    campaignCmd
      .command('pause <id>')
      .description('Pause a campaign')
      .action((id) => this.controlCampaign(id, 'PAUSED'));

    campaignCmd
      .command('stop <id>')
      .description('Stop a campaign')
      .action((id) => this.controlCampaign(id, 'STOPPED'));

    campaignCmd
      .command('delete <id>')
      .description('Delete a campaign')
      .option('--force', 'Skip confirmation')
      .action((id, options) => this.deleteCampaign(id, options));
  }

  private setupLeadCommands(): void {
    const leadCmd = this.program
      .command('leads')
      .alias('l')
      .description('👥 Lead management operations');

    leadCmd
      .command('list <campaign-id>')
      .description('List leads in a campaign')
      .option('--status <status>', 'Filter by status')
      .option('--company <company>', 'Filter by company')
      .option('--limit <number>', 'Limit results', '50')
      .option('--sort <sort>', 'Sort order (recent, name, email, company, status)', 'recent')
      .option('--extended', 'Show extended information')
      .action((campaignId, options) => this.listLeads(campaignId, options));

    leadCmd
      .command('search')
      .description('Search leads across campaigns')
      .option('--email <email>', 'Search by email')
      .option('--company <company>', 'Search by company')
      .option('--name <name>', 'Search by name')
      .option('--limit <number>', 'Limit results', '25')
      .action((options) => this.searchLeads(options));

    leadCmd
      .command('add <campaign-id>')
      .description('Add leads to a campaign')
      .option('--file <path>', 'Import from CSV file')
      .option('--email <email>', 'Single lead email')
      .option('--name <name>', 'Lead name')
      .option('--company <company>', 'Lead company')
      .option('--ignore-duplicates', 'Ignore duplicate leads')
      .action((campaignId, options) => this.addLeads(campaignId, options));

    leadCmd
      .command('export <campaign-id>')
      .description('Export campaign leads')
      .option('--format <format>', 'Export format (csv, json)', 'csv')
      .option('--output <path>', 'Output file path')
      .option('--filters <filters>', 'Apply filters during export')
      .action((campaignId, options) => this.exportLeads(campaignId, options));
  }

  private setupEmailCommands(): void {
    const emailCmd = this.program
      .command('emails')
      .alias('e')
      .description('✉️ Email account management');

    emailCmd
      .command('list')
      .description('List email accounts with health status')
      .option('--status <status>', 'Filter by health (healthy, partial, failed)')
      .option('--warmup <state>', 'Filter by warmup (enabled, disabled, high, low)')
      .option('--provider <provider>', 'Filter by email provider')
      .option('--sort <sort>', 'Sort order (activity, email, health, limit, warmup)', 'health')
      .option('--extended', 'Show extended information')
      .action((options) => this.listEmailAccounts(options));

    emailCmd
      .command('warmup <account-id>')
      .description('Manage email warmup settings')
      .option('--detailed', 'Show detailed warmup statistics')
      .option('--enable', 'Enable warmup')
      .option('--disable', 'Disable warmup')
      .option('--daily <number>', 'Set daily warmup emails')
      .action((accountId, options) => this.manageWarmup(accountId, options));

    emailCmd
      .command('health')
      .description('Monitor email account health')
      .option('--domain <domain>', 'Check specific domain')
      .option('--alerts', 'Show health alerts')
      .option('--summary', 'Show health summary')
      .action((options) => this.emailHealth(options));
  }

  private setupAnalyticsCommands(): void {
    const analyticsCmd = this.program
      .command('analytics')
      .alias('a')
      .description('📊 Analytics and reporting');

    analyticsCmd
      .command('overview')
      .description('Show analytics overview')
      .option('--campaigns <ids>', 'Specific campaign IDs (comma-separated)')
      .option('--date-range <days>', 'Date range in days', '7')
      .action((options) => this.analyticsOverview(options));

    analyticsCmd
      .command('campaign <id>')
      .description('Detailed campaign analytics')
      .option('--extended', 'Extended analytics')
      .option('--date-range <days>', 'Date range in days', '30')
      .option('--charts', 'Show visual charts')
      .action((id, options) => this.campaignAnalytics(id, options));

    analyticsCmd
      .command('export')
      .description('Export analytics data')
      .option('--format <format>', 'Export format (json, csv)', 'json')
      .option('--output <path>', 'Output file path')
      .option('--campaigns <ids>', 'Campaign IDs to include')
      .action((options) => this.exportAnalytics(options));

    analyticsCmd
      .command('dashboard')
      .description('Launch real-time analytics dashboard')
      .option('--live', 'Enable live updates')
      .option('--refresh <seconds>', 'Refresh interval', '30')
      .action((options) => this.analyticsDashboard(options));
  }

  private setupThemeCommands(): void {
    const themeCmd = this.program
      .command('theme')
      .alias('t')
      .description('🎨 Theme and appearance settings');

    themeCmd
      .command('set <theme>')
      .description('Set theme (smartlead, neon, matrix, default)')
      .action((theme) => this.setTheme(theme));

    themeCmd
      .command('preview')
      .description('Preview all available themes')
      .action(() => this.previewThemes());

    themeCmd
      .command('current')
      .description('Show current theme')
      .action(() => this.currentTheme());
  }

  private setupUtilityCommands(): void {
    this.program
      .command('test')
      .description('🔧 Test API connection and configuration')
      .action(() => this.testConnection());

    this.program
      .command('version')
      .alias('v')
      .description('Show version information')
      .action(() => this.showVersion());

    this.program
      .command('doctor')
      .description('🩺 Run system diagnostics')
      .action(() => this.runDiagnostics());
  }

  // Main entry point
  async run(): Promise<void> {
    try {
      // Handle no arguments - show interactive mode
      if (process.argv.length <= 2) {
        await this.startInteractiveMode({});
        return;
      }

      await this.program.parseAsync(process.argv);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Interactive Mode Implementation
  private async startInteractiveMode(options: any): Promise<void> {
    try {
      if (!options.noBanner) {
        VisualUtils.showBanner();
        await this.showWelcomeScreen();
      }

      if (options.themeStudio) {
        await this.themeStudio();
        return;
      }

      await this.runInteractiveLoop();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async runInteractiveLoop(): Promise<void> {
    while (true) {
      try {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'workspace',
            message: '🎯 Choose your workspace:',
            choices: [
              { name: '💻 Full-Screen Shell Mode', value: 'shell' },
              { name: '📢 Campaign Management', value: 'campaigns' },
              { name: '👥 Lead Operations', value: 'leads' },
              { name: '✉️  Email Account Management', value: 'emails' },
              { name: '📊 Analytics & Reports', value: 'analytics' },
              { name: '⚙️  Configuration', value: 'config' },
              { name: '🎨 Theme Studio', value: 'themes' },
              { name: '🚀 Quick Actions', value: 'quick' },
              { name: '🚪 Exit', value: 'exit' }
            ],
            pageSize: 15
          }
        ]);

        switch (answer.workspace) {
          case 'shell':
            await this.startShellMode({});
            break;
          case 'campaigns':
            await this.campaignWorkspace();
            break;
          case 'leads':
            await this.leadWorkspace();
            break;
          case 'emails':
            await this.emailWorkspace();
            break;
          case 'analytics':
            await this.analyticsWorkspace();
            break;
          case 'config':
            await this.configWorkspace();
            break;
          case 'themes':
            await this.themeStudio();
            break;
          case 'quick':
            await this.quickActions();
            break;
          case 'exit':
            await this.showExitScreen();
            process.exit(0);
        }
      } catch (error: any) {
        if (error.message.includes('force closed')) {
          await this.showExitScreen();
          process.exit(0);
        }
        this.handleError(error);
      }
    }
  }

  // Shell Mode Implementation
  private async startShellMode(options: any): Promise<void> {
    try {
      this.shellMode = true;
      
      if (!options.noClear) {
        ANSIUtils.setupFullScreen();
      }

      await this.initializeShell();
      await this.runShellLoop();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.exitShellMode();
    }
  }

  private async initializeShell(): Promise<void> {
    const term = ANSIUtils.getTerminalSize();
    const theme = VisualUtils.getCurrentTheme();
    
    // Draw shell interface with better border
    ANSIUtils.drawBorder(term.width, term.height, {
      color: theme.primary,
      title: '🚀 SmartLead Terminal Shell - Type "help" for commands'
    });

    // Show status bar
    ANSIUtils.moveTo(3, 3);
    const statusText = theme.muted('Status: ') + theme.success('Connected ✓');
    process.stdout.write(statusText);
    
    // Show theme on the right side
    const themeText = theme.muted('Theme: ') + theme.accent(config.getTheme());
    ANSIUtils.moveTo(3, Math.max(term.width - themeText.length - 10, statusText.length + 20));
    process.stdout.write(themeText);
    
    // Draw separator line
    ANSIUtils.moveTo(4, 2);
    process.stdout.write(theme.accent('─'.repeat(term.width - 3)));
    
    // Set initial content position
    this.currentShellLine = 5;
    
    // Initialize readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.getShellPrompt(),
      historySize: 100,
      completer: this.createCompleter()
    });

    this.setupKeyHandlers();
    
    // Position cursor for first prompt at bottom
    this.positionPromptAtBottom();
  }

  private createCompleter(): (line: string) => [string[], string] {
    const commands = [
      'campaigns', 'leads', 'emails', 'analytics', 'config', 'theme',
      'help', 'clear', 'exit', 'status'
    ];
    
    const subCommands: Record<string, string[]> = {
      'campaigns': ['list', 'create', 'start', 'pause', 'stop', 'analytics'],
      'leads': ['list', 'search', 'add'],
      'emails': ['list', 'warmup', 'health'],
      'analytics': ['overview', 'campaign', 'export'],
      'config': ['show', 'set'],
      'theme': ['set']
    };
    
    return (line: string) => {
      const parts = line.split(' ');
      const mainCommand = parts[0];
      
      if (parts.length === 1) {
        // Complete main commands
        const hits = commands.filter(cmd => cmd.startsWith(line));
        return [hits, line];
      } else if (parts.length === 2 && subCommands[mainCommand]) {
        // Complete subcommands
        const subCommand = parts[1];
        const hits = subCommands[mainCommand].filter(cmd => cmd.startsWith(subCommand));
        return [hits, subCommand];
      }
      
      return [[], line];
    };
  }

  private async runShellLoop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.rl) return reject(new Error('Shell not initialized'));

      this.positionPromptAtBottom();
      this.rl.prompt();

      this.rl.on('line', async (input) => {
        const command = input.trim();
        
        if (command === 'exit' || command === 'quit') {
          await this.gracefulShellExit();
          this.rl?.close();
          return resolve();
        }

        if (command) {
          this.commandHistory.push(command);
          this.currentHistoryIndex = this.commandHistory.length;
          
          try {
            await this.executeShellCommand(command);
          } catch (error) {
            this.handleShellError(error);
          }
        }

        // Position cursor for next prompt at bottom
        this.positionPromptAtBottom();
        this.rl?.prompt();
      });

      this.rl.on('close', () => {
        this.exitShellMode();
        resolve();
      });

      // Handle Ctrl+C more gracefully
      this.rl.on('SIGINT', async () => {
        console.log(''); // New line
        const theme = VisualUtils.getCurrentTheme();
        console.log(theme.warning('⚠️  Press Ctrl+C again to force quit, or type "exit" to quit gracefully'));
        
        // Set a flag for double Ctrl+C detection
        if (this.pendingForceQuit) {
          console.log(theme.error('🚪 Force quitting...'));
          this.exitShellMode();
          process.exit(0);
        }
        
        this.pendingForceQuit = true;
        setTimeout(() => {
          this.pendingForceQuit = false;
        }, 2000); // Reset after 2 seconds
        
        this.positionPromptAtBottom();
        this.rl?.prompt();
      });
    });
  }

  private getShellPrompt(): string {
    const theme = VisualUtils.getCurrentTheme();
    return theme.primary('smartlead') + theme.muted(' $ ');
  }



  private setupKeyHandlers(): void {
    if (!this.rl) return;

    // Handle up/down arrow keys for command history
    process.stdin.on('keypress', (str, key) => {
      if (!key || !this.rl) return;

      if (key.name === 'up' && this.currentHistoryIndex > 0) {
        this.currentHistoryIndex--;
        const command = this.commandHistory[this.currentHistoryIndex];
        this.rl.write(null, { ctrl: true, name: 'u' }); // Clear line
        this.rl.write(command);
      } else if (key.name === 'down' && this.currentHistoryIndex < this.commandHistory.length - 1) {
        this.currentHistoryIndex++;
        const command = this.commandHistory[this.currentHistoryIndex];
        this.rl.write(null, { ctrl: true, name: 'u' }); // Clear line
        this.rl.write(command);
      }
    });
  }

  private async executeShellCommand(commandLine: string): Promise<void> {
    const cmd = this.parseShellCommand(commandLine);
    const theme = VisualUtils.getCurrentTheme();
    
    // Move to output area
    this.moveToNextShellLine();
    
    try {
      switch (cmd.command) {
        case 'help':
          await this.showShellHelp();
          break;
        case 'clear':
          this.clearShellOutput();
          this.currentShellLine = 5; // Reset to top of content area
          break;
        case 'status':
          await this.showShellStatus();
          break;
        case 'campaigns':
          await this.handleShellCampaigns(cmd);
          break;
        case 'leads':
          await this.handleShellLeads(cmd);
          break;
        case 'emails':
          await this.handleShellEmails(cmd);
          break;
        case 'analytics':
          await this.handleShellAnalytics(cmd);
          break;
        case 'config':
          await this.handleShellConfig(cmd);
          break;
        case 'theme':
          await this.handleShellTheme(cmd);
          break;
        case 'ls':
        case 'dir':
          // Common commands that users might try
          console.log(theme.warning('📝 This is a SmartLead shell, not a system shell.'));
          console.log(theme.muted('💡 Try: campaigns, leads, emails, analytics, config, help'));
          break;
        case '':
          // Empty command, do nothing
          this.currentShellLine--; // Don't advance line for empty commands
          break;
        default:
          console.log(theme.error(`❌ Unknown command: "${cmd.command}"`));
          console.log(theme.muted('💡 Type "help" to see available commands'));
      }
    } catch (error) {
      console.log(theme.error(`❌ Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  }

  private parseShellCommand(commandLine: string): ShellCommand {
    const parts = commandLine.split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    // Parse filter arguments
    const filters: Record<string, any> = {};
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith('--')) {
        const key = args[i].substring(2);
        const value = args[i + 1];
        if (value && !value.startsWith('--')) {
          filters[key] = value;
          i++; // Skip the value in next iteration
        } else {
          filters[key] = true;
        }
      }
    }

    return { command, args, filters };
  }

  private exitShellMode(): void {
    this.shellMode = false;
    if (this.rl) {
      this.rl.close();
      this.rl = undefined;
    }
    ANSIUtils.exitFullScreen();
  }

  private async gracefulShellExit(): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    console.log('');
    console.log(theme.success('👋 Exiting SmartLead Shell...'));
    console.log(theme.muted('Thank you for using SmartLead CLI!'));
    await ANSIUtils.sleep(500);
  }

  private moveToNextShellLine(): void {
    const terminal = ANSIUtils.getTerminalSize();
    this.currentShellLine++;
    
    // If we're near the prompt area (bottom - 5 lines), scroll content
    if (this.currentShellLine >= terminal.height - 5) {
      this.scrollShellContent();
    }
    
    ANSIUtils.moveTo(this.currentShellLine, 3);
  }

  private positionPromptAtBottom(): void {
    const terminal = ANSIUtils.getTerminalSize();
    ANSIUtils.moveTo(terminal.height - 2, 1);
  }

  private scrollShellContent(): void {
    const terminal = ANSIUtils.getTerminalSize();
    
    // Move content up by 10 lines
    const contentHeight = terminal.height - 8; // Space between header and prompt
    const scrollAmount = 10;
    
    // Copy content upward
    for (let i = 6; i <= contentHeight - scrollAmount; i++) {
      ANSIUtils.moveTo(i, 2);
      // This would ideally copy the line content, but for simplicity we'll just clear and reset
    }
    
    // Clear the bottom part that was scrolled
    for (let i = contentHeight - scrollAmount + 1; i <= contentHeight; i++) {
      ANSIUtils.moveTo(i, 2);
      process.stdout.write(' '.repeat(terminal.width - 3));
    }
    
    // Reset current line position
    this.currentShellLine = Math.max(6, this.currentShellLine - scrollAmount);
  }

  private clearShellOutput(): void {
    const terminal = ANSIUtils.getTerminalSize();
    
    // Clear the main content area but keep header and borders
    for (let i = 5; i < terminal.height - 3; i++) {
      ANSIUtils.moveTo(i, 2);
      process.stdout.write(' '.repeat(terminal.width - 3));
    }
    
    this.currentShellLine = 6; // Reset to start of content area
  }

  // Error handling
  private handleError(error: any): void {
    config.log('error', 'CLI Error', { error: error.message });
    
    if (error instanceof SmartLeadAPIError) {
      VisualUtils.showError(error, 'SmartLead API');
    } else {
      VisualUtils.showError(error, 'Application');
    }
  }

  private handleShellError(error: any): void {
    const theme = VisualUtils.getCurrentTheme();
    console.log(theme.error(`❌ Error: ${error.message}`));
  }

  // Placeholder methods for workspaces and commands
  private async showWelcomeScreen(): Promise<void> {
    // Implementation will be added
  }

  private async showExitScreen(): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    console.clear();
    
    const message = [
      '👋 Thank you for using SmartLead CLI!',
      '',
      '🚀 Keep optimizing your email campaigns',
      '📧 Visit smartlead.ai for more tools',
      '',
      theme.muted('Made with ❤️  for the SmartLead community')
    ].join('\n');
    
    console.log(VisualUtils.createBox(message, 'Goodbye'));
  }

  // Command implementations will be added in separate methods
  private async setConfig(options: any): Promise<void> {
    // Implementation
  }

  private async showConfig(options: any): Promise<void> {
    // Implementation
  }

  private async testConnection(): Promise<void> {
    // Implementation
  }

  private async clearConfig(options: any): Promise<void> {
    // Implementation
  }

  private async listCampaigns(options: any): Promise<void> {
    // Implementation
  }

  private async createCampaign(options: any): Promise<void> {
    // Implementation
  }

  private async campaignAnalytics(id: string, options: any): Promise<void> {
    // Implementation
  }

  private async controlCampaign(id: string, action: string): Promise<void> {
    // Implementation
  }

  private async deleteCampaign(id: string, options: any): Promise<void> {
    // Implementation
  }

  private async listLeads(campaignId: string, options: any): Promise<void> {
    // Implementation
  }

  private async searchLeads(options: any): Promise<void> {
    // Implementation
  }

  private async addLeads(campaignId: string, options: any): Promise<void> {
    // Implementation
  }

  private async exportLeads(campaignId: string, options: any): Promise<void> {
    // Implementation
  }

  private async listEmailAccounts(options: any): Promise<void> {
    // Implementation
  }

  private async manageWarmup(accountId: string, options: any): Promise<void> {
    // Implementation
  }

  private async emailHealth(options: any): Promise<void> {
    // Implementation
  }

  private async analyticsOverview(options: any): Promise<void> {
    // Implementation
  }

  private async exportAnalytics(options: any): Promise<void> {
    // Implementation
  }

  private async analyticsDashboard(options: any): Promise<void> {
    // Implementation
  }

  private async setTheme(theme: string): Promise<void> {
    // Implementation
  }

  private async previewThemes(): Promise<void> {
    // Implementation
  }

  private async currentTheme(): Promise<void> {
    // Implementation
  }

  private async showVersion(): Promise<void> {
    // Implementation
  }

  private async runDiagnostics(): Promise<void> {
    // Implementation
  }

  private async campaignWorkspace(): Promise<void> {
    // Implementation
  }

  private async leadWorkspace(): Promise<void> {
    // Implementation
  }

  private async emailWorkspace(): Promise<void> {
    // Implementation
  }

  private async analyticsWorkspace(): Promise<void> {
    // Implementation
  }

  private async configWorkspace(): Promise<void> {
    // Implementation
  }

  private async themeStudio(): Promise<void> {
    // Implementation
  }

  private async quickActions(): Promise<void> {
    // Implementation
  }

  private async showShellHelp(): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    
    console.log(theme.accent('🚀 SmartLead Shell Commands:'));
    console.log('');
    console.log(theme.primary('📢 Campaign Commands:'));
    console.log('  campaigns list [--status=active] [--limit=25]');
    console.log('  campaigns create --name="Campaign Name" [--leads=50]');
    console.log('  campaigns start <id> | pause <id> | stop <id>');
    console.log('  campaigns analytics <id>');
    console.log('');
    console.log(theme.primary('👥 Lead Commands:'));
    console.log('  leads list [--campaign=id] [--status=active] [--limit=50]');
    console.log('  leads search --email=user@domain.com');
    console.log('  leads add --campaign=id --email=user@domain.com');
    console.log('');
    console.log(theme.primary('✉️  Email Commands:'));
    console.log('  emails list [--status=healthy] [--warmup=enabled]');
    console.log('  emails warmup <account-id>');
    console.log('  emails health');
    console.log('');
    console.log(theme.primary('📊 Analytics Commands:'));
    console.log('  analytics overview');
    console.log('  analytics campaign <id>');
    console.log('  analytics export --format=csv');
    console.log('');
    console.log(theme.primary('🔧 System Commands:'));
    console.log('  config show | set --api-key=key');
    console.log('  theme set <smartlead|neon|matrix|default>');
    console.log('  status | clear | help | exit');
    console.log('');
    console.log(theme.muted('💡 Use arrow keys for command history, Tab for auto-completion'));
  }

  private async showShellStatus(): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    
    try {
      console.log(theme.accent('📊 SmartLead Shell Status:'));
      console.log('');
      console.log(`${theme.primary('API Key:')} ${config.hasValidApiKey() ? theme.success('✓ Configured') : theme.error('✗ Missing')}`);
      console.log(`${theme.primary('Base URL:')} ${theme.muted(config.getBaseUrl())}`);
      console.log(`${theme.primary('Theme:')} ${theme.accent(config.getTheme())}`);
      console.log(`${theme.primary('Shell Mode:')} ${theme.success('Active')}`);
      console.log(`${theme.primary('Commands Run:')} ${theme.warning(this.commandHistory.length.toString())}`);
      console.log(`${theme.primary('Time:')} ${theme.muted(new Date().toLocaleString())}`);
      
      // Test API connection if available
      if (config.hasValidApiKey()) {
        console.log('');
        console.log(theme.muted('Testing API connection...'));
        try {
          const testResult = await smartLeadApi.testConnection();
          console.log(`${theme.primary('API Status:')} ${testResult ? theme.success('✓ Connected') : theme.error('✗ Failed')}`);
        } catch (error) {
          console.log(`${theme.primary('API Status:')} ${theme.error('✗ Connection failed')}`);
        }
      }
    } catch (error) {
      console.log(theme.error('❌ Error getting status'));
    }
  }

  private async handleShellCampaigns(cmd: ShellCommand): Promise<void> {
    const { CampaignCommands } = await import('./campaign-commands');
    await CampaignCommands.handleShellCommand(cmd);
  }

  private async handleShellLeads(cmd: ShellCommand): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    console.log(theme.warning('👥 Lead commands coming soon!'));
    console.log(theme.muted('Available: leads list, leads search, leads add'));
  }

  private async handleShellEmails(cmd: ShellCommand): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    console.log(theme.warning('✉️  Email commands coming soon!'));
    console.log(theme.muted('Available: emails list, emails warmup, emails health'));
  }

  private async handleShellAnalytics(cmd: ShellCommand): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    console.log(theme.warning('📊 Analytics commands coming soon!'));
    console.log(theme.muted('Available: analytics overview, analytics campaign, analytics export'));
  }

  private async handleShellConfig(cmd: ShellCommand): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    const { args, filters } = cmd;
    
    if (args.length === 0 || args[0] === 'show') {
      const configData = config.getConfig();
      console.log(theme.accent('⚙️  Current Configuration:'));
      console.log('');
      console.log(`${theme.primary('API Key:')} ${configData.apiKey ? theme.success('***' + configData.apiKey.slice(-4)) : theme.error('Not set')}`);
      console.log(`${theme.primary('Base URL:')} ${theme.muted(config.getBaseUrl())}`);
      console.log(`${theme.primary('Theme:')} ${theme.accent(config.getTheme())}`);
      if (configData.lastUsed) {
        console.log(`${theme.primary('Last Used:')} ${theme.muted(new Date(configData.lastUsed).toLocaleString())}`);
      }
    } else if (args[0] === 'set' && filters['api-key']) {
      try {
        config.setApiKey(filters['api-key']);
        console.log(theme.success('✅ API key updated successfully!'));
      } catch (error) {
        console.log(theme.error('❌ Failed to set API key'));
      }
    } else {
      console.log(theme.warning('Usage: config show | config set --api-key=your-key'));
    }
  }

  private async handleShellTheme(cmd: ShellCommand): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    const { args } = cmd;
    
    if (args.length === 0) {
      console.log(theme.accent('🎨 Available Themes:'));
      console.log('');
      console.log(`${theme.primary('smartlead')} - SmartLead brand colors (current: ${config.getTheme() === 'smartlead' ? '✓' : '○'})`);
      console.log(`${theme.primary('default')} - Purple & blue theme (current: ${config.getTheme() === 'default' ? '✓' : '○'})`);
      console.log(`${theme.primary('neon')} - Electric colors (current: ${config.getTheme() === 'neon' ? '✓' : '○'})`);
      console.log(`${theme.primary('matrix')} - Matrix green (current: ${config.getTheme() === 'matrix' ? '✓' : '○'})`);
      console.log('');
      console.log(theme.muted('Usage: theme set <theme-name>'));
    } else if (args[0] === 'set' && args[1]) {
      const validThemes = ['smartlead', 'default', 'neon', 'matrix'];
      if (validThemes.includes(args[1])) {
        try {
          config.setTheme(args[1] as any);
          console.log(theme.success(`✅ Theme changed to: ${args[1]}`));
          console.log(theme.muted('💡 Restart shell to see full theme changes'));
        } catch (error) {
          console.log(theme.error('❌ Failed to set theme'));
        }
      } else {
        console.log(theme.error(`❌ Invalid theme. Valid options: ${validThemes.join(', ')}`));
      }
    } else {
      console.log(theme.warning('Usage: theme set <smartlead|default|neon|matrix>'));
    }
  }
} 