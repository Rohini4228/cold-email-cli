import inquirer from 'inquirer';
import { smartLeadApi } from '../api/smartlead-client';
import { VisualUtils } from '../ui/visual-utils';
import { Campaign, CampaignFilters, ShellCommand } from '../types/smartlead';

export class CampaignCommands {
  static async listCampaigns(options: CampaignFilters = {}): Promise<void> {
    const theme = VisualUtils.getCurrentTheme();
    
    // Enhanced filtering interface
    if (!options.skipFilters) {
      const filterAnswers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'filters',
          message: '🔍 Select filters to apply:',
          choices: [
            { name: 'Filter by Status', value: 'status' },
            { name: 'Limit Results', value: 'limit' },
            { name: 'Sort by Date', value: 'sort' },
            { name: 'Show Advanced Stats', value: 'stats' },
            { name: 'No filters - Show all', value: 'none' }
          ]
        }
      ]);

      if (filterAnswers.filters.includes('status')) {
        const statusAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'status',
            message: '📊 Filter by status:',
            choices: [
              { name: '🟢 Active Campaigns', value: 'ACTIVE' },
              { name: '⏸️  Paused Campaigns', value: 'PAUSED' },
              { name: '⏹️  Stopped Campaigns', value: 'STOPPED' },
              { name: '📝 Draft Campaigns', value: 'DRAFTED' },
              { name: '✅ Completed Campaigns', value: 'COMPLETED' }
            ]
          }
        ]);
        options.status = statusAnswer.status;
      }

      if (filterAnswers.filters.includes('limit')) {
        const limitAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'limit',
            message: '📋 Number of results:',
            choices: [
              { name: 'Top 10', value: 10 },
              { name: 'Top 25', value: 25 },
              { name: 'Top 50', value: 50 },
              { name: 'Show All', value: null }
            ]
          }
        ]);
        options.limit = limitAnswer.limit;
      }

      if (filterAnswers.filters.includes('sort')) {
        const sortAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'sort',
            message: '🔄 Sort order:',
            choices: [
              { name: 'Newest First', value: 'newest' },
              { name: 'Oldest First', value: 'oldest' },
              { name: 'Most Active First', value: 'activity' },
              { name: 'Alphabetical', value: 'name' }
            ]
          }
        ]);
        options.sort = sortAnswer.sort;
      }

      options.showStats = filterAnswers.filters.includes('stats');
    }
    
    const campaigns: Campaign[] = await VisualUtils.showSpinner(
      'Loading campaigns with filters...',
      () => smartLeadApi.getCampaigns()
    );
    
    if (campaigns.length === 0) {
      console.log(VisualUtils.createBox('📢 No campaigns found', 'Campaigns'));
      return;
    }

    // Apply filters
    let filteredCampaigns = this.applyFilters(campaigns, options);

    // Show filter summary
    this.showFilterSummary(filteredCampaigns.length, campaigns.length, options);

    // Create enhanced table
    this.createCampaignTable(filteredCampaigns, options);

    // Show available actions
    console.log('\n' + theme.muted('💡 Available actions: Start/Pause/Stop campaigns, View details, Create new'));
  }

  static async createCampaign(options: any = {}): Promise<void> {
    const campaignData = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '📢 Campaign name:',
        default: options.name,
        validate: (input) => input.length > 0 || 'Campaign name is required'
      },
      {
        type: 'number',
        name: 'maxLeads',
        message: '🎯 Max leads per day:',
        default: options.leads || 50,
        validate: (input) => input > 0 || 'Must be greater than 0'
      },
      {
        type: 'confirm',
        name: 'aiEsp',
        message: '🤖 Enable AI ESP matching?',
        default: options.aiEsp !== undefined ? options.aiEsp : true
      },
      {
        type: 'confirm',
        name: 'plainText',
        message: '📝 Send as plain text?',
        default: options.plainText || false
      }
    ]);

    const data = {
      name: campaignData.name,
      max_leads_per_day: campaignData.maxLeads,
      enable_ai_esp_matching: campaignData.aiEsp,
      send_as_plain_text: campaignData.plainText
    };

    const result = await VisualUtils.showSpinner(
      `Creating campaign "${campaignData.name}"`,
      () => smartLeadApi.createCampaign(data)
    );

    console.log(VisualUtils.createBox(
      `Campaign created successfully!\nID: ${result.id}\nName: ${result.name}\nStatus: ${result.status}`,
      'Success'
    ));
  }

  static async controlCampaign(id: string, action: string): Promise<void> {
    const statusMap = {
      'START': 'START',
      'PAUSED': 'PAUSED',
      'STOPPED': 'STOPPED'
    };

    await VisualUtils.showSpinner(
      `${action}ing campaign ${id}`,
      () => smartLeadApi.updateCampaignStatus(parseInt(id), statusMap[action as keyof typeof statusMap] as any)
    );

    console.log(VisualUtils.createBox(
      `Campaign ${id} ${action.toLowerCase()}ed successfully!`,
      'Success'
    ));
  }

  static async deleteCampaign(id: string, options: any = {}): Promise<void> {
    if (!options.force) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `⚠️  Are you sure you want to delete campaign ${id}?`,
          default: false
        }
      ]);

      if (!confirm) {
        VisualUtils.showSuccess('Operation cancelled');
        return;
      }
    }

    await VisualUtils.showSpinner(
      `Deleting campaign ${id}`,
      () => smartLeadApi.deleteCampaign(parseInt(id))
    );

    console.log(VisualUtils.createBox(
      `Campaign ${id} deleted successfully!`,
      'Success'
    ));
  }

  static async viewAnalytics(id: string, options: any = {}): Promise<void> {
    const analytics = await VisualUtils.showSpinner(
      `Loading analytics for campaign ${id}`,
      () => smartLeadApi.getCampaignAnalytics(parseInt(id))
    );

    const theme = VisualUtils.getCurrentTheme();
    let analyticsText = [
      theme.accent('📧 Email Stats:'),
      `  Sent: ${theme.success(analytics.sent_count || '0')}`,
      `  Opens: ${theme.warning(analytics.open_count || '0')} (${analytics.unique_open_count || '0'} unique)`,
      `  Clicks: ${theme.primary(analytics.click_count || '0')} (${analytics.unique_click_count || '0'} unique)`,
      `  Replies: ${theme.accent(analytics.reply_count || '0')}`,
      `  Bounces: ${theme.error(analytics.bounce_count || '0')}`,
      `  Unsubscribes: ${theme.muted(analytics.unsubscribed_count || '0')}`
    ];

    if (options.extended && analytics.campaign_lead_stats) {
      analyticsText.push(
        '',
        theme.accent('🎯 Lead Stats:'),
        `  Total: ${analytics.campaign_lead_stats.total}`,
        `  Completed: ${theme.success(analytics.campaign_lead_stats.completed)}`,
        `  In Progress: ${theme.warning(analytics.campaign_lead_stats.inprogress)}`,
        `  Not Started: ${theme.muted(analytics.campaign_lead_stats.notStarted)}`,
        `  Blocked: ${theme.error(analytics.campaign_lead_stats.blocked)}`
      );
    }

    if (options.charts) {
      const sentCount = parseInt(analytics.sent_count) || 1;
      const openCount = parseInt(analytics.open_count) || 0;
      const clickCount = parseInt(analytics.click_count) || 0;
      const openRate = (openCount / sentCount) * 100;
      const clickRate = (clickCount / sentCount) * 100;
      
      analyticsText.push(
        '',
        theme.accent('📊 Performance Charts:'),
        `  Open Rate: ${VisualUtils.createProgressBar(openRate / 100, 40, { color: theme.warning })}`,
        `  Click Rate: ${VisualUtils.createProgressBar(clickRate / 100, 40, { color: theme.primary })}`
      );
    }

    console.log(VisualUtils.createBox(analyticsText.join('\n'), `Analytics for Campaign #${id}`));
  }

  static async handleShellCommand(cmd: ShellCommand): Promise<void> {
    const { args, filters } = cmd;

    if (args.length === 0 || args[0] === 'list') {
      await this.shellListCampaigns(filters);
    } else if (args[0] === 'create') {
      await this.shellCreateCampaign(filters);
    } else if (['start', 'pause', 'stop'].includes(args[0])) {
      await this.shellControlCampaign(args[0], args[1]);
    } else if (args[0] === 'analytics') {
      await this.viewAnalytics(args[1], filters);
    } else {
      VisualUtils.showError(new Error('Usage: campaigns [list|create|start|pause|stop|analytics]'), 'Shell Command');
    }
  }

  // Private helper methods
  private static applyFilters(campaigns: Campaign[], options: CampaignFilters): Campaign[] {
    let filtered = campaigns;

    if (options.status) {
      filtered = filtered.filter(c => c.status === options.status);
    }

    if (options.sort) {
      switch (options.sort) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          break;
        case 'name':
          filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          break;
      }
    }

    if (options.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  private static showFilterSummary(filtered: number, total: number, options: CampaignFilters): void {
    const theme = VisualUtils.getCurrentTheme();
    const filterSummary = [];
    
    if (options.status) filterSummary.push(`Status: ${options.status}`);
    if (options.limit) filterSummary.push(`Limit: ${options.limit}`);
    if (options.sort) filterSummary.push(`Sort: ${options.sort}`);
    
    if (filterSummary.length > 0) {
      console.log(theme.muted(`🔍 Filters applied: ${filterSummary.join(', ')}`));
      console.log(theme.success(`📊 Showing ${filtered} of ${total} campaigns\n`));
    }
  }

  private static createCampaignTable(campaigns: Campaign[], options: CampaignFilters): void {
    const headers = ['ID', 'Name', 'Status', 'Created'];
    
    if (options.showStats) {
      headers.push('Leads/Day', 'Min Time', 'AI ESP');
    } else {
      headers.push('Leads/Day');
    }

    const rows = campaigns.map((campaign: Campaign) => {
      const baseRow = [
        String(campaign.id),
        campaign.name || 'Untitled',
        VisualUtils.formatStatus(campaign.status),
        new Date(campaign.created_at).toLocaleDateString()
      ];

      if (options.showStats) {
        baseRow.push(
          String(campaign.max_leads_per_day || 'N/A'),
          String(campaign.min_time_btwn_emails || 'N/A') + 'h',
          campaign.enable_ai_esp_matching ? '✅' : '❌'
        );
      } else {
        baseRow.push(String(campaign.max_leads_per_day || 'N/A'));
      }

      return baseRow;
    });

    console.log(VisualUtils.createBox(`Found ${campaigns.length} campaigns`, 'Campaigns'));
    VisualUtils.createTable(headers, rows);
  }

  private static async shellListCampaigns(filters: Record<string, any>): Promise<void> {
    const options: CampaignFilters = {
      status: filters.status,
      limit: filters.limit ? parseInt(filters.limit) : undefined,
      sort: filters.sort,
      showStats: filters.stats,
      skipFilters: true
    };

    await this.listCampaigns(options);
  }

  private static async shellCreateCampaign(filters: Record<string, any>): Promise<void> {
    if (!filters.name) {
      VisualUtils.showError(new Error('Usage: campaigns create --name="Campaign Name" [--leads=50]'), 'Shell Command');
      return;
    }

    const options = {
      name: filters.name,
      leads: filters.leads ? parseInt(filters.leads) : 50,
      aiEsp: true
    };

    await this.createCampaign(options);
  }

  private static async shellControlCampaign(action: string, campaignId: string): Promise<void> {
    if (!campaignId) {
      VisualUtils.showError(new Error(`Usage: campaigns ${action} <campaign-id>`), 'Shell Command');
      return;
    }

    await this.controlCampaign(campaignId, action.toUpperCase());
  }
} 