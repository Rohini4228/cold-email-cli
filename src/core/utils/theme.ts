import chalk from 'chalk';

// Core theme colors for each platform
const themes = {
  default: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    accent: '#06b6d4',
    success: '#10b981', 
    warning: '#f59e0b',
    error: '#ef4444',
    muted: '#64748b'
  },
  smartlead: {
    primary: '#2563eb',
    secondary: '#0ea5e9', 
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    muted: '#64748b'
  },
  instantly: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a855f7', 
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    muted: '#64748b'
  },
  salesforge: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    success: '#10b981',
    warning: '#f59e0b', 
    error: '#ef4444',
    muted: '#64748b'
  },
  apollo: {
    primary: '#f59e0b',
    secondary: '#f97316',
    accent: '#fb923c',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    muted: '#64748b'
  }
};

export interface ThemeColors {
  primary: (text: string) => string;
  secondary: (text: string) => string;
  accent: (text: string) => string;
  success: (text: string) => string;
  warning: (text: string) => string;
  error: (text: string) => string;
  muted: (text: string) => string;
  gradient: (text: string) => string;
}

export function getTheme(module?: string): ThemeColors {
  const themeKey = module && themes[module as keyof typeof themes] ? module : 'default';
  const colors = themes[themeKey as keyof typeof themes];

  return {
    primary: (text: string) => chalk.hex(colors.primary)(text),
    secondary: (text: string) => chalk.hex(colors.secondary)(text),
    accent: (text: string) => chalk.hex(colors.accent)(text),
    success: (text: string) => chalk.hex(colors.success)(text),
    warning: (text: string) => chalk.hex(colors.warning)(text),
    error: (text: string) => chalk.hex(colors.error)(text),
    muted: (text: string) => chalk.hex(colors.muted)(text),
    gradient: (text: string) => {
      // Create gradient effect using primary colors
      if (themeKey === 'smartlead') {
        return chalk.hex('#2563eb').bold(text);
      } else if (themeKey === 'instantly') {
        return chalk.hex('#7c3aed').bold(text);
      } else if (themeKey === 'salesforge') {
        return chalk.hex('#ea580c').bold(text);
      } else if (themeKey === 'apollo') {
        return chalk.hex('#f59e0b').bold(text);
      }
      return chalk.hex('#06b6d4').bold(text);
    }
  };
}

export function createBanner(title: string, subtitle?: string, module?: string): string {
  const theme = getTheme(module);
  const width = 80;
  const border = '━'.repeat(width);
  
  let banner = `\n${theme.primary(border)}\n`;
  banner += `${theme.gradient(` 🚀 ${title.toUpperCase()}`)}\n`;
  
  if (subtitle) {
    banner += `${theme.secondary(`    ${subtitle}`)}\n`;
  }
  
  banner += `${theme.primary(border)}\n`;
  
  return banner;
}

export function showWelcomeMessage(module: string): void {
  const theme = getTheme(module);
  const moduleNames = {
    smartlead: 'smartlead.ai',
    instantly: 'instantly.ai', 
    salesforge: 'salesforge.ai',
    apollo: 'apollo.io'
  };
  
  const moduleName = moduleNames[module as keyof typeof moduleNames] || 'Cold Email CLI';
  
  console.log(createBanner(`${moduleName} Cold Email Platform`, 'Professional Cold Outreach Automation', module));
  
  console.log(theme.secondary('🎯 Advanced Features:'));
  console.log(theme.muted('   • Campaign Management & Automation'));
  console.log(theme.muted('   • Lead Generation & Segmentation')); 
  console.log(theme.muted('   • Email Deliverability Optimization'));
  console.log(theme.muted('   • Advanced Analytics & Reporting'));
  console.log(theme.muted('   • Multi-Channel Outreach Sequences'));
  console.log();
  
  console.log(theme.accent('💡 Quick Start:'));
  console.log(theme.muted('   Type "help" to see all available commands'));
  console.log(theme.muted('   Type "help <command>" for detailed usage'));
  console.log(theme.muted('   Type "config" to setup your API credentials'));
  console.log();
}

export function formatCommandList(commands: any[], module?: string): void {
  const theme = getTheme(module);
  
  // Group commands by category
  const categories = commands.reduce((acc, cmd) => {
    const category = cmd.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(cmd);
    return acc;
  }, {} as Record<string, any[]>);
  
  Object.entries(categories).forEach(([category, categoryCommands]) => {
    console.log(theme.primary(`\n📂 ${category}:`));
    console.log(theme.muted('─'.repeat(50)));
    
    (categoryCommands as any[]).forEach((cmd: any) => {
      console.log(`  ${theme.accent(cmd.name.padEnd(25))} ${theme.secondary(cmd.description)}`);
      if (cmd.usage) {
        console.log(`  ${theme.muted(' '.repeat(25))} ${theme.muted(cmd.usage)}`);
      }
    });
  });
  
  console.log();
}

export function showCommandHelp(command: any, module?: string): void {
  const theme = getTheme(module);
  
  console.log(theme.primary(`\n📖 Command: ${command.name}`));
  console.log(theme.muted('─'.repeat(50)));
  console.log(`${theme.secondary('Description:')} ${command.description}`);
  
  if (command.usage) {
    console.log(`${theme.secondary('Usage:')} ${theme.accent(command.usage)}`);
  }
  
  if (command.category) {
    console.log(`${theme.secondary('Category:')} ${command.category}`);
  }
  
  console.log();
}

export function showError(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.error('❌ Error:')} ${message}\n`);
}

export function showSuccess(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.success('✅ Success:')} ${message}\n`);
}

export function showWarning(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.warning('⚠️  Warning:')} ${message}\n`);
}

export function showInfo(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.accent('ℹ️  Info:')} ${message}\n`);
} 