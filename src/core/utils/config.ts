import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { CLIConfig, ModuleName, ModuleConfig } from '../../types/global';

export class ConfigManager {
  private static instance: ConfigManager;
  private configDir: string;
  private configFile: string;

  private constructor() {
    this.configDir = path.join(os.homedir(), '.smartlead-cli');
    this.configFile = path.join(this.configDir, 'config.json');
    this.ensureConfigDir();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private ensureConfigDir(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true, mode: 0o700 });
    }
  }

  public loadConfig(): CLIConfig {
    try {
      if (fs.existsSync(this.configFile)) {
        const configData = fs.readFileSync(this.configFile, 'utf8');
        return JSON.parse(configData);
      }
    } catch (error) {
      console.warn('Warning: Could not load config file, using defaults');
    }
    return {};
  }

  public saveConfig(config: CLIConfig): void {
    this.ensureConfigDir();
    try {
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2), { mode: 0o600 });
    } catch (error) {
      throw new Error(`Failed to save configuration: ${error}`);
    }
  }

  public getModuleConfig(moduleName: ModuleName): ModuleConfig | null {
    const config = this.loadConfig();
    const moduleConfigFile = path.join(this.configDir, `${moduleName}.json`);
    
    try {
      if (fs.existsSync(moduleConfigFile)) {
        const moduleData = fs.readFileSync(moduleConfigFile, 'utf8');
        return JSON.parse(moduleData);
      }
    } catch (error) {
      console.warn(`Warning: Could not load ${moduleName} module config`);
    }
    
    return {
      name: moduleName,
      apiKey: config.apiKey || undefined,
      baseUrl: config.baseUrl || undefined
    };
  }

  public saveModuleConfig(config: ModuleConfig): void {
    const moduleConfigFile = path.join(this.configDir, `${config.name}.json`);
    try {
      fs.writeFileSync(moduleConfigFile, JSON.stringify(config, null, 2), { mode: 0o600 });
    } catch (error) {
      throw new Error(`Failed to save ${config.name} configuration: ${error}`);
    }
  }

  public getApiKey(moduleName?: ModuleName): string | undefined {
    if (moduleName) {
      const moduleConfig = this.getModuleConfig(moduleName);
      if (moduleConfig?.apiKey) {
        return moduleConfig.apiKey;
      }
    }

    const config = this.loadConfig();
    return config.apiKey || process.env['SMARTLEAD_API_KEY'];
  }

  public getBaseUrl(moduleName?: ModuleName): string {
    if (moduleName) {
      const moduleConfig = this.getModuleConfig(moduleName);
      if (moduleConfig?.baseUrl) {
        return moduleConfig.baseUrl;
      }
    }

    const config = this.loadConfig();
    const defaultUrls = {
      smartlead: 'https://server.smartlead.ai/api/v1',
      instantly: 'https://api.instantly.ai/api/v1'
    };

    return config.baseUrl || 
           process.env['SMARTLEAD_BASE_URL'] || 
           defaultUrls[moduleName || 'smartlead'];
  }

  public setActiveModule(moduleName: ModuleName): void {
    const config = this.loadConfig();
    config.activeModule = moduleName;
    config.lastUsed = new Date().toISOString();
    this.saveConfig(config);
  }

  public getActiveModule(): ModuleName {
    const config = this.loadConfig();
    return config.activeModule || 'smartlead';
  }

  public getConfigDir(): string {
    return this.configDir;
  }

  public deleteConfig(): void {
    try {
      if (fs.existsSync(this.configFile)) {
        fs.unlinkSync(this.configFile);
      }
    } catch (error) {
      throw new Error(`Failed to delete configuration: ${error}`);
    }
  }

  public resetModuleConfig(moduleName: ModuleName): void {
    const moduleConfigFile = path.join(this.configDir, `${moduleName}.json`);
    try {
      if (fs.existsSync(moduleConfigFile)) {
        fs.unlinkSync(moduleConfigFile);
      }
    } catch (error) {
      throw new Error(`Failed to reset ${moduleName} configuration: ${error}`);
    }
  }
} 