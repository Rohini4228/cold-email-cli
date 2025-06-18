import { SmartLeadModule } from '../modules/smartlead/index';
import { InstantlyModule } from '../modules/instantly/index';
import { SalesforgeModule } from '../modules/salesforge/index';
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
  color: string;
  icon: string;
  module: CLIModule;
}

const availableModules: ModuleInfo[] = [
  {
    id: 'smartlead',
    name: 'smartlead',
    description: 'Advanced Campaign Management & Analytics',
    version: '2.0.0',
    commandCount: 68,
    status: 'Available',
    color: '#0088ff',
    icon: '⚡',
    module: new SmartLeadModule()
  },
  {
    id: 'instantly',
    name: 'instantly',
    description: 'High-Volume Automation & Deliverability',
    version: '2.0.0',
    commandCount: 45,
    status: 'Available',
    color: '#ff6b35',
    icon: '🚀',
    module: new InstantlyModule()
  },
  {
    id: 'salesforge',
    name: 'salesforge',
    description: 'AI-Powered Multi-Channel Sequences',
    version: '2.0.0',
    commandCount: 42,
    status: 'Available',
    color: '#9b59b6',
    icon: '🤖',
    module: new SalesforgeModule()
  },
  {
    id: 'apollo',
    name: 'apollo',
    description: 'Email Sequence & Outreach Automation',
    version: '2.0.0',
    commandCount: 42,
    status: 'Available',
    color: '#27ae60',
    icon: '🎯',
    module: new ApolloModule()
  }
];

export function getAvailableModules(): ModuleInfo[] {
  return availableModules;
}

export function getModule(id: string): ModuleInfo | undefined {
  return getAvailableModules().find(mod => mod.id === id);
}

export function listModules(): void {
  console.log('\n❄️ Cold Email CLI - Available Platforms:\n');
  
  availableModules.forEach(module => {
    console.log(`${module.icon} ${module.name}`);
    console.log(`   Description: ${module.description}`);
    console.log(`   Version: ${module.version}`);
    console.log(`   Commands: ${module.commandCount}`);
    console.log(`   Status: ${module.status}\n`);
  });
}

export async function selectModule(moduleName: string): Promise<CLIModule | null> {
  const normalizedName = moduleName.toLowerCase();
  
  // Check if module exists
  if (!availableModules.find(mod => mod.name === normalizedName)) {
    const theme = getTheme('default');
    console.log(theme.error(`❌ Module "${moduleName}" not found`) + '\n');
    console.log('Available modules:');
    listModules();
    return null;
  }

  // Create and return a fresh instance of the selected module
  return availableModules.find(mod => mod.name === normalizedName)?.module || null;
}

export default {
  selectModule,
  listModules,
  availableModules
}; 