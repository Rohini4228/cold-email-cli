import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import Table from 'cli-table3';
import { createSpinner } from 'nanospinner';
import * as readline from 'readline';
import { config } from '../config/config';
import { Theme, TerminalSize } from '../types/smartlead';

export class VisualUtils {
  private static themes: Record<string, Theme> = {
    default: {
      primary: chalk.hex('#6366F1'),
      secondary: chalk.hex('#3B82F6'),
      success: chalk.hex('#10B981'),
      warning: chalk.hex('#F59E0B'),
      error: chalk.hex('#EF4444'),
      muted: chalk.hex('#9CA3AF'),
      accent: chalk.hex('#A855F7'),
      electric: chalk.hex('#0EA5E9'),
      neon: chalk.hex('#8B5CF6')
    },
    smartlead: {
      primary: chalk.hex('#6366F1'),    // SmartLead brand purple
      secondary: chalk.hex('#0EA5E9'),  // SmartLead electric blue
      success: chalk.hex('#10B981'),    // Success teal
      warning: chalk.hex('#F59E0B'),    // Warning amber
      error: chalk.hex('#F43F5E'),      // Error rose
      muted: chalk.hex('#94A3B8'),      // Slate gray
      accent: chalk.hex('#A855F7'),     // Bright purple accent
      electric: chalk.hex('#06B6D4'),   // Electric cyan
      neon: chalk.hex('#8B5CF6')        // Deep neon purple
    },
    neon: {
      primary: chalk.hex('#A855F7'),    // Electric purple
      secondary: chalk.hex('#06B6D4'),  // Electric cyan
      success: chalk.hex('#22C55E'),    // Electric green
      warning: chalk.hex('#FBBF24'),    // Electric yellow
      error: chalk.hex('#F87171'),      // Electric red
      muted: chalk.hex('#9CA3AF'),      // Cool gray
      accent: chalk.hex('#EC4899'),     // Electric pink
      electric: chalk.hex('#0EA5E9'),   // Electric blue
      neon: chalk.hex('#C084FC')        // Light purple
    },
    matrix: {
      primary: chalk.hex('#22C55E'),    // Matrix green
      secondary: chalk.hex('#10B981'),  // Emerald
      success: chalk.hex('#16A34A'),    // Dark green
      warning: chalk.hex('#FBBF24'),    // Matrix yellow
      error: chalk.hex('#EF4444'),      // Matrix red
      muted: chalk.hex('#6B7280'),      // Matrix gray
      accent: chalk.hex('#34D399'),     // Bright matrix green
      electric: chalk.hex('#059669'),   // Electric matrix
      neon: chalk.hex('#4ADE80')        // Neon matrix green
    }
  };

  static getCurrentTheme(): Theme {
    const themeName = config.getTheme();
    return this.themes[themeName] || this.themes.smartlead;
  }

  static getTerminalSize(): TerminalSize {
    return {
      width: process.stdout.columns || 80,
      height: process.stdout.rows || 24
    };
  }

  // Enhanced Banner with Auto-sizing
  static showBanner(): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    console.clear();
    
    try {
      // Responsive title sizing
      let font = 'Big';
      if (terminal.width < 80) font = 'Small';
      if (terminal.width < 60) font = 'Mini';
      
      const title = figlet.textSync('SmartLead CLI', { 
        font: font as any,
        width: terminal.width - 4
      });
      
      const gradientTitle = gradient(['#6366F1', '#A855F7', '#06B6D4', '#8B5CF6'])(title);
      console.log(gradientTitle);
    } catch {
      // Fallback for figlet issues
      console.log(theme.primary('🚀 SmartLead CLI'));
    }
    
    const subtitle = '🚀 Beautiful Interactive CLI for SmartLead API Management';
    const centeredSubtitle = this.centerText(subtitle, terminal.width);
    console.log(theme.primary(centeredSubtitle));
    
    const separator = gradient(['#6366F1', '#8B5CF6'])('━'.repeat(Math.min(terminal.width - 4, 80)));
    console.log(this.centerText(separator, terminal.width));
    console.log();
  }

  // Enhanced Box with Responsive Design
  static createBox(content: string, title?: string, options?: {
    width?: number;
    color?: string;
    padding?: number;
  }): string {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const boxWidth = options?.width || Math.min(terminal.width - 4, 80);
    const boxColor = options?.color || '#6366F1';
    
    return boxen(content, {
      title: title ? theme.accent(`✨ ${title} ✨`) : undefined,
      titleAlignment: 'center',
      padding: options?.padding || 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: boxColor,
      float: 'center'
    } as any);
  }

  // Enhanced Table with Better Formatting
  static createTable(headers: string[], rows: string[][], options?: {
    compact?: boolean;
    maxWidth?: number;
  }): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const table = new Table({
      head: headers.map(h => theme.primary.bold(`⚡ ${h} ⚡`)),
      style: {
        head: [],
        border: ['magenta'],
        compact: options?.compact || false
      },
      chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│'
      },
      colWidths: options?.maxWidth ? 
        headers.map(() => Math.floor((options.maxWidth! - headers.length * 3) / headers.length)) :
        undefined
    });

    // Process rows with text wrapping for narrow terminals
    const processedRows = terminal.width < 100 ? 
      rows.map(row => row.map(cell => this.truncateText(cell, 20))) :
      rows;

    processedRows.forEach(row => table.push(row));
    console.log(table.toString());
  }

  // Enhanced Status Formatting
  static formatStatus(status: string): string {
    const theme = this.getCurrentTheme();
    const statusColors: Record<string, any> = {
      'ACTIVE': theme.success,
      'PAUSED': theme.warning,
      'STOPPED': theme.error,
      'DRAFTED': theme.muted,
      'COMPLETED': theme.primary,
      'SENT': theme.accent,
      'OPENED': theme.warning,
      'CLICKED': theme.electric,
      'REPLIED': theme.success,
      'BOUNCED': theme.error,
      'UNSUBSCRIBED': theme.muted,
      'FAILED': theme.error,
      'healthy': theme.success,
      'partial': theme.warning,
      'failed': theme.error
    };
    
    const icon = this.getStatusIcon(status);
    const color = statusColors[status.toUpperCase()] || theme.muted;
    return color(`${icon} ${status}`);
  }

  private static getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      'ACTIVE': '🟢',
      'PAUSED': '⏸️',
      'STOPPED': '⏹️',
      'DRAFTED': '📝',
      'COMPLETED': '✅',
      'SENT': '📧',
      'OPENED': '📖',
      'CLICKED': '🖱️',
      'REPLIED': '💬',
      'BOUNCED': '🚫',
      'UNSUBSCRIBED': '📤',
      'FAILED': '❌',
      'healthy': '✅',
      'partial': '⚠️',
      'failed': '❌'
    };
    return icons[status.toUpperCase()] || '●';
  }

  // Enhanced Spinner with Better Messaging
  static async showSpinner<T>(text: string, task: () => Promise<T>): Promise<T> {
    const theme = this.getCurrentTheme();
    const spinner = createSpinner(theme.accent(text)).start();
    
    try {
      const startTime = Date.now();
      const result = await task();
      const duration = Date.now() - startTime;
      
      spinner.success({ 
        text: theme.success(`✅ ${text} completed in ${duration}ms`) 
      });
      return result;
    } catch (error) {
      spinner.error({ 
        text: theme.error(`❌ ${text} failed: ${error instanceof Error ? error.message : 'Unknown error'}`) 
      });
      throw error;
    }
  }

  // Progress Bar with Animation
  static createProgressBar(
    progress: number, 
    width: number = 40, 
    options?: {
      showPercent?: boolean;
      color?: any;
      bgColor?: any;
      style?: 'basic' | 'modern' | 'minimal';
    }
  ): string {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    // Responsive width
    const actualWidth = Math.min(width, terminal.width - 20);
    const filled = Math.floor(progress * actualWidth);
    const empty = actualWidth - filled;
    
    const color = options?.color || theme.primary;
    const bgColor = options?.bgColor || chalk.gray;
    
    let bar: string;
    switch (options?.style || 'modern') {
      case 'minimal':
        bar = color('█'.repeat(filled)) + bgColor('░'.repeat(empty));
        break;
      case 'basic':
        bar = color('='.repeat(filled)) + bgColor('-'.repeat(empty));
        break;
      default: // modern
        bar = color('█'.repeat(filled)) + bgColor('░'.repeat(empty));
    }
    
    const percent = options?.showPercent !== false ? 
      ` ${Math.round(progress * 100)}%` : '';
    
    return `[${bar}]${percent}`;
  }

  // Interactive Loading Animation
  static async showLoadingAnimation(
    text: string, 
    duration: number = 3000,
    style: 'dots' | 'spinner' | 'progress' = 'dots'
  ): Promise<void> {
    const theme = this.getCurrentTheme();
    
    return new Promise((resolve) => {
      let frame = 0;
      const frames = {
        dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        spinner: ['|', '/', '-', '\\'],
        progress: Array.from({ length: 10 }, (_, i) => (i + 1) / 10)
      };
      
      const interval = setInterval(() => {
        process.stdout.write('\r');
        
        if (style === 'progress') {
          const progress = frames.progress[frame % frames.progress.length];
          process.stdout.write(theme.accent(`${text} ${this.createProgressBar(progress)}`));
        } else {
          const spinner = frames[style][frame % frames[style].length];
          process.stdout.write(theme.accent(`${spinner} ${text}`));
        }
        
        frame++;
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(text.length + 10) + '\r');
        resolve();
      }, duration);
    });
  }

  // Typewriter Effect
  static async typeWriter(text: string, delay: number = 50): Promise<void> {
    for (let i = 0; i < text.length; i++) {
      process.stdout.write(text[i]);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Enhanced Text Effects
  static pulse(text: string, color1: string = '#6366F1', color2: string = '#A855F7'): string {
    const time = Date.now();
    const phase = Math.sin(time / 500) * 0.5 + 0.5;
    
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * phase);
    const g = Math.round(g1 + (g2 - g1) * phase);
    const b = Math.round(b1 + (b2 - b1) * phase);
    
    return chalk.rgb(r, g, b)(text);
  }

  static rainbow(text: string): string {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    return text.split('').map((char, i) => 
      chalk.hex(colors[i % colors.length])(char)
    ).join('');
  }

  // Utility Methods
  static centerText(text: string, width?: number): string {
    const terminal = this.getTerminalSize();
    const actualWidth = width || terminal.width;
    const padding = Math.max(0, Math.floor((actualWidth - text.length) / 2));
    return ' '.repeat(padding) + text;
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
  }

  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
    return `${(ms / 3600000).toFixed(1)}h`;
  }

  // Auto-complete Utilities
  static createAutoComplete(options: string[]): (input: string) => string[] {
    return (input: string) => {
      const lowercaseInput = input.toLowerCase();
      return options.filter(option => 
        option.toLowerCase().startsWith(lowercaseInput)
      ).sort();
    };
  }

  // Enhanced Error Display
  static showError(error: Error | string, context?: string): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const errorMessage = error instanceof Error ? error.message : error;
    const title = context ? `Error in ${context}` : 'Error';
    
    const content = [
      theme.error('❌ ' + errorMessage),
      '',
      theme.muted('For help, run: smartlead help'),
      theme.muted('For support, visit: https://smartlead.ai/support')
    ].join('\n');
    
    console.log(this.createBox(content, title, { 
      color: '#EF4444',
      width: Math.min(terminal.width - 4, 60)
    }));
  }

  // Success Display
  static showSuccess(message: string, details?: string): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const content = [
      theme.success('✅ ' + message),
      details ? '' : null,
      details ? theme.muted(details) : null
    ].filter(Boolean).join('\n');
    
    console.log(this.createBox(content, 'Success', {
      color: '#10B981',
      width: Math.min(terminal.width - 4, 60)
    }));
  }

  // Information Display
  static showInfo(title: string, items: Array<{ label: string; value: string; color?: any }>): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const maxLabelLength = Math.max(...items.map(item => item.label.length));
    const content = items.map(item => {
      const label = item.label.padEnd(maxLabelLength);
      const color = item.color || theme.primary;
      return `${theme.muted(label + ':')} ${color(item.value)}`;
    }).join('\n');
    
    console.log(this.createBox(content, title, {
      width: Math.min(terminal.width - 4, 80)
    }));
  }

  // Statistics Display
  static showStats(stats: Record<string, number | string>): void {
    const theme = this.getCurrentTheme();
    const terminal = this.getTerminalSize();
    
    const items = Object.entries(stats).map(([key, value]) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: typeof value === 'number' ? value.toLocaleString() : value,
      color: typeof value === 'number' && value > 0 ? theme.success : theme.muted
    }));
    
    this.showInfo('Statistics', items);
  }
} 