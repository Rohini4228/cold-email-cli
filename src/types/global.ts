export interface CLIConfig {
  apiKey?: string;
  baseUrl?: string;
  lastUsed?: string;
  activeModule?: ModuleName;
}

export type ModuleName = 'smartlead' | 'instantly';

export interface ModuleInfo {
  name: ModuleName;
  displayName: string;
  description: string;
  version: string;
  available: boolean;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  options?: CommandOption[];
  examples?: string[];
}

export interface CommandOption {
  flag: string;
  description: string;
  required?: boolean;
  default?: string | number | boolean;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  statusCode?: number;
}

export interface APIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  muted: string;
}

export interface ModuleConfig {
  name: ModuleName;
  apiKey?: string | undefined;
  baseUrl?: string | undefined;
  customSettings?: Record<string, any>;
}

export interface CLIModule {
  name: ModuleName;
  displayName: string;
  description: string;
  version: string;
  commands: Command[];
  initialize(): Promise<void>;
  getCommands(): Command[];
  executeCommand(commandName: string, args: string[]): Promise<void>;
}

export interface InstallationConfig {
  globalInstall: boolean;
  createSymlinks: boolean;
  installPath?: string;
  permissions?: number;
}

export interface TestConfig {
  testDir: string;
  coverage: boolean;
  reporters: string[];
  setupFiles?: string[];
} 