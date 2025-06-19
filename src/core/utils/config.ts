import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Config, ModuleConfig } from "../../types/global";

// Environment variable mappings for each platform
const ENV_MAPPINGS: Record<string, Record<string, string>> = {
  smartlead: {
    apiKey: "SMARTLEAD_API_KEY",
    baseUrl: "SMARTLEAD_BASE_URL",
  },
  instantly: {
    apiKey: "INSTANTLY_API_KEY",
    baseUrl: "INSTANTLY_BASE_URL",
  },
  apollo: {
    apiKey: "APOLLO_API_KEY",
    baseUrl: "APOLLO_BASE_URL",
  },
  salesforge: {
    apiKey: "SALESFORGE_API_KEY",
    baseUrl: "SALESFORGE_BASE_URL",
  },
  emailbison: {
    apiKey: "EMAILBISON_API_KEY",
    baseUrl: "EMAILBISON_BASE_URL",
  },
  amplemarket: {
    apiKey: "AMPLEMARKET_API_KEY",
    baseUrl: "AMPLEMARKET_BASE_URL",
  },
  lemlist: {
    apiKey: "LEMLIST_API_KEY",
    baseUrl: "LEMLIST_BASE_URL",
  },
  outreach: {
    apiKey: "OUTREACH_API_KEY",
    baseUrl: "OUTREACH_BASE_URL",
  },
  quickmail: {
    apiKey: "QUICKMAIL_API_KEY",
    baseUrl: "QUICKMAIL_BASE_URL",
  },
  salesloft: {
    apiKey: "SALESLOFT_API_KEY",
    baseUrl: "SALESLOFT_BASE_URL",
  },
};

// Default API URLs for each platform
const DEFAULT_URLS: Record<string, string> = {
  smartlead: "https://server.smartlead.ai",
  instantly: "https://api.instantly.ai",
  apollo: "https://api.apollo.io",
  salesforge: "https://api.salesforge.ai",
  emailbison: "https://api.emailbison.com",
  amplemarket: "https://api.amplemarket.com",
  lemlist: "https://api.lemlist.com",
  outreach: "https://api.outreach.io",
  quickmail: "https://api.quickmail.io",
  salesloft: "https://api.salesloft.com",
};

export class ConfigManager {
  private configDir: string;
  private configFile: string;
  private envLoaded: boolean = false;

  constructor() {
    this.configDir = path.join(os.homedir(), ".cold-email-cli");
    this.configFile = path.join(this.configDir, "config.json");
    this.ensureConfigDir();
    this.loadEnv();
  }

  private ensureConfigDir(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  /**
   * Load environment variables from multiple sources
   */
  private loadEnv(): void {
    if (this.envLoaded) return;

    // Load from .env file in project root
    const envFiles = [
      ".env",
      ".env.local",
      path.join(os.homedir(), ".cold-email-cli", ".env"),
      path.join(this.configDir, ".env"),
    ];

    for (const envFile of envFiles) {
      this.loadEnvFile(envFile);
    }

    this.envLoaded = true;
  }

  private loadEnvFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        content.split("\n").forEach((line) => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            const [key, ...valueParts] = trimmed.split("=");
            if (key && valueParts.length > 0) {
              const value = valueParts.join("=").replace(/^["']|["']$/g, "");
              process.env[key.trim()] = value;
            }
          }
        });
      }
    } catch (error) {
      // Silently fail - env files are optional
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
    const moduleConfig = config.modules[moduleName] || {};

    // Merge with environment variables
    const envMapping = ENV_MAPPINGS[moduleName];
    if (envMapping) {
      Object.entries(envMapping).forEach(([configKey, envKey]) => {
        const envValue = process.env[envKey];
        if (envValue && !moduleConfig[configKey as keyof ModuleConfig]) {
          (moduleConfig as any)[configKey] = envValue;
        }
      });
    }

    return moduleConfig;
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
    // Update timestamp for better UX
    config.lastUsed = moduleName;
    config.lastUsedAt = new Date().toISOString();
    this.saveConfig(config);
  }

  getApiKey(moduleName: string): string | undefined {
    const moduleConfig = this.getModuleConfig(moduleName);
    return moduleConfig.apiKey || process.env[ENV_MAPPINGS[moduleName]?.apiKey || ""];
  }

  setApiKey(moduleName: string, apiKey: string): void {
    const moduleConfig = this.getModuleConfig(moduleName);
    moduleConfig.apiKey = apiKey;
    this.saveModuleConfig(moduleName, moduleConfig);
  }

  getBaseUrl(moduleName: string): string {
    const moduleConfig = this.getModuleConfig(moduleName);

    // Priority: module config > env var > default
    return (
      moduleConfig.baseUrl ||
      process.env[ENV_MAPPINGS[moduleName]?.baseUrl || ""] ||
      DEFAULT_URLS[moduleName] ||
      DEFAULT_URLS.smartlead
    ); // fallback
  }

  setBaseUrl(moduleName: string, baseUrl: string): void {
    const moduleConfig = this.getModuleConfig(moduleName);
    moduleConfig.baseUrl = baseUrl;
    this.saveModuleConfig(moduleName, moduleConfig);
  }

  /**
   * Get all configuration for a platform (including env vars)
   */
  getPlatformConfig(platformName: string): ModuleConfig & { isConfigured: boolean } {
    const config = this.getModuleConfig(platformName);
    const apiKey = this.getApiKey(platformName);
    const baseUrl = this.getBaseUrl(platformName);

    return {
      ...config,
      apiKey,
      baseUrl,
      isConfigured: !!apiKey,
    };
  }

  /**
   * Clear all configuration for a platform
   */
  clearPlatformConfig(platformName: string): void {
    const config = this.getConfig();
    delete config.modules[platformName];
    this.saveConfig(config);
  }

  /**
   * List all configured platforms
   */
  getConfiguredPlatforms(): string[] {
    const config = this.getConfig();
    const configured: string[] = [];

    // Check saved configs
    Object.keys(config.modules).forEach((platform) => {
      if (this.getApiKey(platform)) {
        configured.push(platform);
      }
    });

    // Check environment variables
    Object.keys(ENV_MAPPINGS).forEach((platform) => {
      const apiKey = process.env[ENV_MAPPINGS[platform].apiKey];
      if (apiKey && !configured.includes(platform)) {
        configured.push(platform);
      }
    });

    return configured;
  }

  /**
   * Validate platform configuration
   */
  validatePlatformConfig(platformName: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const apiKey = this.getApiKey(platformName);
    const baseUrl = this.getBaseUrl(platformName);

    if (!apiKey) {
      errors.push(`Missing API key for ${platformName}`);
    }

    if (!baseUrl) {
      errors.push(`Missing base URL for ${platformName}`);
    }

    // Validate URL format
    if (baseUrl) {
      try {
        new URL(baseUrl);
      } catch {
        errors.push(`Invalid base URL format for ${platformName}: ${baseUrl}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const configManager = new ConfigManager();

// Helper functions for easy access
export function loadEnv(): void {
  // Already handled in ConfigManager constructor - this is a no-op for backwards compatibility
}

export function getApiKey(platform: string): string | undefined {
  return configManager.getApiKey(platform);
}

export function setApiKey(platform: string, apiKey: string): void {
  configManager.setApiKey(platform, apiKey);
}

export function getPlatformConfig(platform: string): ModuleConfig & { isConfigured: boolean } {
  return configManager.getPlatformConfig(platform);
}
