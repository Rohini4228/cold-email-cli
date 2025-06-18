// Global TypeScript definitions for Professional Cold Email CLI

export interface CLIModule {
  name: string;
  description: string;
  version: string;
  commands: Command[];
  execute(command: string, args: Record<string, any>): Promise<void>;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  category?: string;
}

export interface ModuleConfig {
  apiKey?: string;
  baseUrl?: string;
  [key: string]: any;
}

export interface Config {
  defaultModule?: string;
  modules: Record<string, ModuleConfig>;
  lastUsed?: string;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  statusCode?: number;
} 