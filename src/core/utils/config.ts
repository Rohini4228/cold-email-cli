import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Config, ModuleConfig } from "../../types/global";

export class ConfigManager {
  private configDir: string;
  private configFile: string;

  constructor() {
    this.configDir = path.join(os.homedir(), ".cold-email-cli");
    this.configFile = path.join(this.configDir, "config.json");
    this.ensureConfigDir();
  }

  private ensureConfigDir(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  getConfig(): Config {
    try {
      if (fs.existsSync(this.configFile)) {
        const content = fs.readFileSync(this.configFile, "utf8");
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn(`Warning: Failed to read config file: ${error}`);
    }

    return {
      modules: {},
    };
  }

  saveConfig(config: Config): void {
    try {
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
    } catch (error) {
      throw new Error(`Failed to save configuration: ${error}`);
    }
  }

  getModuleConfig(moduleName: string): ModuleConfig {
    const config = this.getConfig();
    return config.modules[moduleName] || {};
  }

  saveModuleConfig(moduleName: string, moduleConfig: ModuleConfig): void {
    const config = this.getConfig();
    config.modules[moduleName] = moduleConfig;
    this.saveConfig(config);
  }

  setDefaultModule(moduleName: string): void {
    const config = this.getConfig();
    config.defaultModule = moduleName;
    this.saveConfig(config);
  }

  setLastUsed(moduleName: string): void {
    const config = this.getConfig();
    config.lastUsed = moduleName;
    this.saveConfig(config);
  }

  getApiKey(moduleName: string): string | undefined {
    const moduleConfig = this.getModuleConfig(moduleName);
    return moduleConfig.apiKey;
  }

  setApiKey(moduleName: string, apiKey: string): void {
    const moduleConfig = this.getModuleConfig(moduleName);
    moduleConfig.apiKey = apiKey;
    this.saveModuleConfig(moduleName, moduleConfig);
  }

  getBaseUrl(moduleName: string): string {
    const moduleConfig = this.getModuleConfig(moduleName);
    if (moduleConfig.baseUrl) {
      return moduleConfig.baseUrl;
    }

    // Default URLs for each platform
    const defaultUrls: Record<string, string> = {
      smartlead: "https://server.smartlead.ai",
      instantly: "https://api.instantly.ai",
      salesforge: "https://api.salesforge.ai",
    };

    return defaultUrls[moduleName] ?? "https://server.smartlead.ai";
  }

  setBaseUrl(moduleName: string, baseUrl: string): void {
    const moduleConfig = this.getModuleConfig(moduleName);
    moduleConfig.baseUrl = baseUrl;
    this.saveModuleConfig(moduleName, moduleConfig);
  }
}
