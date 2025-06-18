import { select, intro, outro, cancel, isCancel } from '@clack/prompts';
import { SmartLeadModule } from '../modules/smartlead/index.js';
import { InstantlyModule } from '../modules/instantly/index.js';
import { SalesForgeModule } from '../modules/salesforge/index.js';
import { ApolloModule } from '../modules/apollo/index.js';
import { CLIModule } from '../types/global.js';
import { getTheme } from './utils/theme.js';

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'Available' | 'Coming Soon';
  commandCount: number;
  focus: string;
  module?: CLIModule;
}

const modules: ModuleInfo[] = [
  {
    id: 'smartlead',
    name: 'smartlead.ai',
    description: 'Advanced Cold Email Campaign Management & Analytics',
    version: '2.0.0',
    status: 'Available',
    commandCount: 82,
    focus: 'Scale, Analytics, Infrastructure',
    module: new SmartLeadModule()
  },
  {
    id: 'instantly',
    name: 'instantly.ai',
    description: 'High-Volume Cold Email Automation & Deliverability',
    version: '2.0.0', 
    status: 'Available',
    commandCount: 35,
    focus: 'Volume, Deliverability, Automation',
    module: new InstantlyModule()
  },
  {
    id: 'salesforge',
    name: 'salesforge.ai',
    description: 'AI-Powered Cold Email Automation',
    version: '1.0.0',
    status: 'Available',
    commandCount: 12,
    focus: 'AI, Multi-Channel, Personalization',
    module: new SalesForgeModule()
  },
  {
    id: 'apollo',
    name: 'apollo.io',
    description: 'Professional Email Sequencing & Outreach Automation',
    version: '1.0.0',
    status: 'Available',
    commandCount: 6,
    focus: 'Email Sequences, Contact Management',
    module: new ApolloModule()
  }
];

export async function selectModule(): Promise<CLIModule | null> {
  const theme = getTheme();
  
  intro(theme.gradient('❄️ LeadMagic Professional Cold Email CLI'));
  
  console.log(`
${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${theme.secondary('🎯 Professional Multi-Platform Cold Email Automation Suite')}
${theme.muted('   Professional-grade CLI for scaling cold outreach campaigns')}

${theme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
`);

  const moduleChoices = modules.map(mod => ({
    value: mod.id,
    label: `${mod.name} ${theme.accent(`v${mod.version}`)}`,
    hint: `${mod.description} • ${theme.success(`${mod.commandCount} commands`)} • ${theme.secondary(mod.focus)}`
  }));

  const selectedModuleId = await select({
    message: `${theme.secondary('Choose your cold email platform:')}`,
    options: moduleChoices
  });

  if (isCancel(selectedModuleId)) {
    cancel('Operation cancelled');
    return null;
  }

  const selectedModule = modules.find(mod => mod.id === selectedModuleId);
  
  if (!selectedModule?.module) {
    outro(theme.error('❌ Module not available'));
    return null;
  }

  // Show module-specific welcome message
  const moduleTheme = getTheme(selectedModule.id);
  console.log(`
${moduleTheme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${moduleTheme.gradient(`🎯 ${selectedModule.name} Cold Email Platform`)}
${moduleTheme.secondary(`   ${selectedModule.description}`)}

${moduleTheme.accent(`📊 ${selectedModule.commandCount} Commands Available`)} • ${moduleTheme.secondary(`${selectedModule.focus}`)}
${moduleTheme.muted('   Type "help" to see all commands or "help <command>" for details')}

${moduleTheme.primary('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
`);

  return selectedModule.module;
}

export function getAvailableModules(): ModuleInfo[] {
  return modules;
}

export function getModuleById(id: string): ModuleInfo | undefined {
  return modules.find(mod => mod.id === id);
} 