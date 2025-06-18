import { SmartLeadModule } from '../modules/smartlead/index';
import { InstantlyModule } from '../modules/instantly/index';
import { SalesForgeModule } from '../modules/salesforge/index';
import { ApolloModule } from '../modules/apollo/index';
import { CLIModule } from '../types/global';
import { getTheme } from './utils/theme';

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  commandCount: number;
  status: 'Available' | 'Coming Soon' | 'Beta';
  focus: string;
  color: string;
  icon: string;
  module?: CLIModule;
}

// Keep each module completely separate - no merging or combining
const modules: Record<string, () => CLIModule> = {
  'smartlead.ai': () => new SmartLeadModule(),
  'smartlead': () => new SmartLeadModule(),
  'instantly.ai': () => new InstantlyModule(),
  'instantly': () => new InstantlyModule(),
  'salesforge.ai': () => new SalesForgeModule(),
  'salesforge': () => new SalesForgeModule(),
  'apollo.io': () => new ApolloModule(),
  'apollo': () => new ApolloModule()
};

export async function selectModule(moduleName: string): Promise<CLIModule | null> {
  const normalizedName = moduleName.toLowerCase();
  
  // Check if module exists
  if (!modules[normalizedName]) {
    const theme = getTheme('default');
    console.log(theme.error(`❌ Module "${moduleName}" not found`) + '\n');
    console.log('Available modules:');
    console.log('  • smartlead.ai  (68 commands) - Advanced Campaign Management & Analytics');
    console.log('  • instantly.ai  (35 commands) - High-Volume Automation & Deliverability');
    console.log('  • salesforge.ai (42 commands) - AI-Powered Email Sequences');
    console.log('  • apollo.io     (42 commands) - Email Sequences & Outreach Automation');
    return null;
  }

  // Create and return a fresh instance of the selected module
  // Each module operates completely independently
  return modules[normalizedName]();
}

export function listAllModules(): Array<{ name: string; description: string; commands: number }> {
  return [
    {
      name: 'smartlead.ai',
      description: 'Advanced Campaign Management & Analytics',
      commands: 68
    },
    {
      name: 'instantly.ai', 
      description: 'High-Volume Automation & Deliverability',
      commands: 35
    },
    {
      name: 'salesforge.ai',
      description: 'AI-Powered Email Sequences',
      commands: 42
    },
    {
      name: 'apollo.io',
      description: 'Email Sequences & Outreach Automation', 
      commands: 42
    }
  ];
}

export function getAvailableModules(): ModuleInfo[] {
  return [
    {
      id: 'smartlead',
      name: 'smartlead.ai',
      description: 'Advanced Campaign Management & Analytics',
      version: '2.0.0',
      commandCount: 68,
      status: 'Available',
      focus: 'Enterprise-grade email campaign automation with advanced analytics',
      color: '#2563eb',
      icon: '🎯',
      module: new SmartLeadModule()
    },
    {
      id: 'instantly',
      name: 'instantly.ai', 
      description: 'High-Volume Automation & Deliverability',
      version: '2.0.0',
      commandCount: 35,
      status: 'Available',
      focus: 'Scale email outreach with industry-leading deliverability',
      color: '#7c3aed',
      icon: '⚡',
      module: new InstantlyModule()
    },
    {
      id: 'salesforge',
      name: 'salesforge.ai',
      description: 'AI-Powered Email Sequences',
      version: '1.0.0', 
      commandCount: 42,
      status: 'Available',
      focus: 'AI-driven email personalization and sequence automation',
      color: '#ea580c',
      icon: '🤖',
      module: new SalesForgeModule()
    },
    {
      id: 'apollo',
      name: 'apollo.io',
      description: 'Email Sequences & Outreach Automation',
      version: '1.0.0',
      commandCount: 42,
      status: 'Available', 
      focus: 'Professional email sequencing and outreach automation',
      color: '#f59e0b',
      icon: '🚀',
      module: new ApolloModule()
    }
  ];
}

export function getModuleById(id: string): ModuleInfo | undefined {
  return getAvailableModules().find(mod => mod.id === id);
} 