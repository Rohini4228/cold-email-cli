import inquirer from 'inquirer';
import { ModuleName, ModuleInfo, CLIModule } from '../types/global';
import { ConfigManager } from './utils/config';
import { ThemeManager } from './utils/theme';

export class ModuleSelector {
  private modules: Map<ModuleName, ModuleInfo>;
  private configManager: ConfigManager;
  private theme: ThemeManager;

  constructor() {
    this.configManager = ConfigManager.getInstance();
    this.theme = new ThemeManager();
    this.modules = new Map();
    
    this.registerModules();
  }

  private registerModules(): void {
    // SmartLead Module
    this.modules.set('smartlead', {
      name: 'smartlead',
      displayName: 'SmartLead',
      description: 'Complete email campaign management and automation',
      version: '2.0.0',
      available: true
    });

    // Instantly Module (Coming Soon)
    this.modules.set('instantly', {
      name: 'instantly',
      displayName: 'Instantly',
      description: 'Cold email outreach and lead generation (Coming Soon)',
      version: '1.0.0',
      available: false
    });
  }

  public async selectModule(): Promise<ModuleName> {
    const currentModule = this.configManager.getActiveModule();
    
    console.log(this.theme.createBanner('Multi-Module CLI', 'Select Your Platform'));
    
    const choices = Array.from(this.modules.values()).map(module => ({
      name: this.formatModuleChoice(module, module.name === currentModule),
      value: module.name,
      disabled: !module.available ? 'Coming Soon' : false
    }));

    const { selectedModule } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedModule',
        message: this.theme.primary('🎯 Choose a module to work with:'),
        choices,
        default: currentModule,
        pageSize: 10
      }
    ]);

    if (selectedModule !== currentModule) {
      this.configManager.setActiveModule(selectedModule);
      this.theme.setModule(selectedModule);
      
      console.log(this.theme.successMessage(
        `Switched to ${this.modules.get(selectedModule)?.displayName} module`
      ));
    }

    return selectedModule;
  }

  private formatModuleChoice(module: ModuleInfo, isCurrent: boolean): string {
    const statusIcon = module.available ? '🟢' : '🟡';
    const currentBadge = isCurrent ? this.theme.accent(' (CURRENT)') : '';
    const versionInfo = this.theme.muted(`v${module.version}`);
    
    return `${statusIcon} ${this.theme.primary(module.displayName)} ${versionInfo}${currentBadge}\n   ${this.theme.muted(module.description)}`;
  }

  public async showModuleInfo(): Promise<void> {
    const currentModule = this.configManager.getActiveModule();
    const moduleInfo = this.modules.get(currentModule);
    
    if (!moduleInfo) {
      console.log(this.theme.errorMessage('No module information available'));
      return;
    }

    console.log(this.theme.createBanner(moduleInfo.displayName, moduleInfo.description));
    
    console.log(this.theme.primary('📋 Module Information:'));
    console.log(this.theme.muted('─'.repeat(40)));
    console.log(`${this.theme.text('Name:')} ${this.theme.primary(moduleInfo.displayName)}`);
    console.log(`${this.theme.text('Version:')} ${this.theme.secondary(moduleInfo.version)}`);
    console.log(`${this.theme.text('Status:')} ${moduleInfo.available ? this.theme.success('Available') : this.theme.warning('Coming Soon')}`);
    console.log(`${this.theme.text('Description:')} ${this.theme.muted(moduleInfo.description)}`);
    console.log();
  }

  public getAvailableModules(): ModuleInfo[] {
    return Array.from(this.modules.values()).filter(module => module.available);
  }

  public getAllModules(): ModuleInfo[] {
    return Array.from(this.modules.values());
  }

  public getModuleInfo(moduleName: ModuleName): ModuleInfo | undefined {
    return this.modules.get(moduleName);
  }

  public isModuleAvailable(moduleName: ModuleName): boolean {
    const module = this.modules.get(moduleName);
    return module?.available ?? false;
  }

  public async switchModule(): Promise<ModuleName> {
    const availableModules = this.getAvailableModules();
    
    if (availableModules.length <= 1) {
      console.log(this.theme.warningMessage('No other modules available to switch to'));
      return this.configManager.getActiveModule();
    }

    return await this.selectModule();
  }

  public async showAllModules(): Promise<void> {
    console.log(this.theme.primary('\n🧩 Available Modules:'));
    console.log(this.theme.muted('─'.repeat(50)));
    
    const headers = ['Module', 'Version', 'Status', 'Description'];
    const rows = Array.from(this.modules.values()).map(module => [
      module.displayName,
      module.version,
      module.available ? 'Available' : 'Coming Soon',
      module.description
    ]);

    this.theme.formatTable(headers, rows);
    
    const currentModule = this.configManager.getActiveModule();
    const currentModuleInfo = this.modules.get(currentModule);
    
    console.log(this.theme.infoMessage(
      `Currently active: ${currentModuleInfo?.displayName || 'Unknown'}`
    ));
    console.log();
  }

  public async loadModule(moduleName: ModuleName): Promise<CLIModule | null> {
    if (!this.isModuleAvailable(moduleName)) {
      console.log(this.theme.errorMessage(`Module '${moduleName}' is not available`));
      return null;
    }

    try {
      // Dynamic import based on module name
      const moduleClass = await import(`../modules/${moduleName}/index`);
      const moduleInstance = new moduleClass.default();
      
      await moduleInstance.initialize();
      
      console.log(this.theme.successMessage(
        `Successfully loaded ${this.modules.get(moduleName)?.displayName} module`
      ));
      
      return moduleInstance;
    } catch (error) {
      console.log(this.theme.errorMessage(
        `Failed to load module '${moduleName}': ${error}`
      ));
      return null;
    }
  }

  public getCurrentModule(): ModuleName {
    return this.configManager.getActiveModule();
  }
} 