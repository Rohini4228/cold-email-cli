import { ConfigManager } from '../../../src/core/utils/config';
import { ModuleName } from '../../../src/types/global';
import * as fs from 'fs';
import * as path from 'path';

describe('ConfigManager', () => {
  let configManager: ConfigManager;
  let testConfigDir: string;

  beforeEach(() => {
    // Create a test config directory
    testConfigDir = path.join(__dirname, '../../.test-config');
    if (!fs.existsSync(testConfigDir)) {
      fs.mkdirSync(testConfigDir, { recursive: true });
    }

    // Mock the config directory to use test directory
    configManager = ConfigManager.getInstance();
    (configManager as any).configDir = testConfigDir;
    (configManager as any).configFile = path.join(testConfigDir, 'config.json');
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testConfigDir)) {
      fs.rmSync(testConfigDir, { recursive: true, force: true });
    }
  });

  describe('loadConfig', () => {
    it('should return empty object when no config file exists', () => {
      const config = configManager.loadConfig();
      expect(config).toEqual({});
    });

    it('should load existing config file', () => {
      const testConfig = { apiKey: 'test-key', activeModule: 'smartlead' as ModuleName };
      const configFile = path.join(testConfigDir, 'config.json');
      fs.writeFileSync(configFile, JSON.stringify(testConfig));

      const config = configManager.loadConfig();
      expect(config).toEqual(testConfig);
    });

    it('should handle corrupted config file gracefully', () => {
      const configFile = path.join(testConfigDir, 'config.json');
      fs.writeFileSync(configFile, 'invalid json');

      const config = configManager.loadConfig();
      expect(config).toEqual({});
    });
  });

  describe('saveConfig', () => {
    it('should save config to file', () => {
      const testConfig = { apiKey: 'test-key', activeModule: 'smartlead' as ModuleName };
      
      configManager.saveConfig(testConfig);
      
      const configFile = path.join(testConfigDir, 'config.json');
      expect(fs.existsSync(configFile)).toBe(true);
      
      const savedConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      expect(savedConfig).toEqual(testConfig);
    });

    it('should create config directory if it does not exist', () => {
      // Remove the test directory
      if (fs.existsSync(testConfigDir)) {
        fs.rmSync(testConfigDir, { recursive: true, force: true });
      }

      const testConfig = { apiKey: 'test-key' };
      configManager.saveConfig(testConfig);

      expect(fs.existsSync(testConfigDir)).toBe(true);
    });
  });

  describe('getActiveModule', () => {
    it('should return default module when no config exists', () => {
      const activeModule = configManager.getActiveModule();
      expect(activeModule).toBe('smartlead');
    });

    it('should return saved active module', () => {
      const testConfig = { activeModule: 'instantly' as ModuleName };
      configManager.saveConfig(testConfig);

      const activeModule = configManager.getActiveModule();
      expect(activeModule).toBe('instantly');
    });
  });

  describe('setActiveModule', () => {
    it('should save active module to config', () => {
      configManager.setActiveModule('instantly');

      const config = configManager.loadConfig();
      expect(config.activeModule).toBe('instantly');
      expect(config.lastUsed).toBeDefined();
    });
  });

  describe('getApiKey', () => {
    it('should return API key from config', () => {
      const testConfig = { apiKey: 'test-api-key' };
      configManager.saveConfig(testConfig);

      const apiKey = configManager.getApiKey();
      expect(apiKey).toBe('test-api-key');
    });

    it('should return API key from environment variable', () => {
      process.env['SMARTLEAD_API_KEY'] = 'env-api-key';
      
      const apiKey = configManager.getApiKey();
      expect(apiKey).toBe('env-api-key');
      
      delete process.env['SMARTLEAD_API_KEY'];
    });

    it('should prioritize config over environment', () => {
      process.env['SMARTLEAD_API_KEY'] = 'env-api-key';
      const testConfig = { apiKey: 'config-api-key' };
      configManager.saveConfig(testConfig);

      const apiKey = configManager.getApiKey();
      expect(apiKey).toBe('config-api-key');
      
      delete process.env['SMARTLEAD_API_KEY'];
    });
  });

  describe('getBaseUrl', () => {
    it('should return default URL for smartlead module', () => {
      // Clear environment variable to test default
      delete process.env['SMARTLEAD_BASE_URL'];
      const baseUrl = configManager.getBaseUrl('smartlead');
      expect(baseUrl).toBe('https://server.smartlead.ai/api/v1');
    });

    it('should return default URL for instantly module', () => {
      // Clear environment variable to test default
      delete process.env['SMARTLEAD_BASE_URL'];
      const baseUrl = configManager.getBaseUrl('instantly');
      expect(baseUrl).toBe('https://api.instantly.ai/api/v1');
    });

    it('should return custom URL from config', () => {
      const testConfig = { baseUrl: 'https://custom.api.url' };
      configManager.saveConfig(testConfig);

      const baseUrl = configManager.getBaseUrl();
      expect(baseUrl).toBe('https://custom.api.url');
    });
  });
}); 