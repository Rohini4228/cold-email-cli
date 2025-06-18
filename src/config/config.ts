import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Config } from '../types/smartlead';

const CONFIG_DIR = path.join(os.homedir(), '.smartlead-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const LOG_FILE = path.join(CONFIG_DIR, 'smartlead-cli.log');

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config = {};

  private constructor() {
    this.ensureConfigDir();
    this.loadConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private ensureConfigDir(): void {
    try {
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
      }
    } catch (error) {
      console.warn('Warning: Could not create config directory');
    }
  }

  private loadConfig(): void {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const data = fs.readFileSync(CONFIG_FILE, 'utf8');
        this.config = JSON.parse(data);
      }
    } catch (error) {
      console.warn('Warning: Could not load config file, using defaults');
      this.config = {};
    }
  }

  private saveConfig(): void {
    try {
      this.ensureConfigDir();
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error('Error: Could not save config file');
    }
  }

  // API Key Management
  getApiKey(): string | undefined {
    return this.config.apiKey || process.env.SMARTLEAD_API_KEY;
  }

  setApiKey(apiKey: string): void {
    if (!apiKey || apiKey.trim().length === 0) {
      throw new Error('API key cannot be empty');
    }
    this.config.apiKey = apiKey.trim();
    this.config.lastUsed = new Date().toISOString();
    this.saveConfig();
  }

  hasValidApiKey(): boolean {
    const apiKey = this.getApiKey();
    return !!(apiKey && apiKey.length > 10);
  }

  // Base URL Management
  getBaseUrl(): string {
    return this.config.baseUrl || 
           process.env.SMARTLEAD_BASE_URL || 
           'https://server.smartlead.ai/api/v1';
  }

  setBaseUrl(baseUrl: string): void {
    if (!baseUrl || !this.isValidUrl(baseUrl)) {
      throw new Error('Invalid base URL');
    }
    this.config.baseUrl = baseUrl;
    this.saveConfig();
  }

  // Theme Management
  getTheme(): string {
    return this.config.theme || 'smartlead';
  }

  setTheme(theme: 'default' | 'smartlead' | 'neon' | 'matrix'): void {
    const validThemes = ['default', 'smartlead', 'neon', 'matrix'];
    if (!validThemes.includes(theme)) {
      throw new Error(`Invalid theme. Valid options: ${validThemes.join(', ')}`);
    }
    this.config.theme = theme;
    this.saveConfig();
  }

  // General Config Management
  getConfig(): Config {
    return { ...this.config };
  }

  updateConfig(updates: Partial<Config>): void {
    this.config = { ...this.config, ...updates };
    this.config.lastUsed = new Date().toISOString();
    this.saveConfig();
  }

  clearConfig(): void {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        fs.unlinkSync(CONFIG_FILE);
      }
      this.config = {};
    } catch (error) {
      console.error('Error: Could not clear config file');
    }
  }

  // Validation Helpers
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Logging
  log(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level,
        message,
        data: data ? JSON.stringify(data) : undefined
      };
      
      const logLine = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(LOG_FILE, logLine);
    } catch (error) {
      // Silently fail - logging shouldn't break the app
    }
  }

  // Config Status
  getConfigStatus(): {
    hasApiKey: boolean;
    hasValidBaseUrl: boolean;
    theme: string;
    lastUsed?: string;
    configPath: string;
  } {
    return {
      hasApiKey: this.hasValidApiKey(),
      hasValidBaseUrl: this.isValidUrl(this.getBaseUrl()),
      theme: this.getTheme(),
      lastUsed: this.config.lastUsed,
      configPath: CONFIG_FILE
    };
  }

  // Development helpers
  isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  getLogPath(): string {
    return LOG_FILE;
  }
}

// Export singleton instance
export const config = ConfigManager.getInstance(); 