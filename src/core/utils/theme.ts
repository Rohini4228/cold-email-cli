import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { ThemeColors, ModuleName } from '../../types/global';

export const themes: Record<ModuleName, ThemeColors> = {
  smartlead: {
    primary: '#2563eb',    // SmartLead Blue
    secondary: '#0ea5e9',  // Light Blue
    accent: '#06b6d4',     // Cyan
    success: '#10b981',    // Green
    warning: '#f59e0b',    // Amber
    error: '#ef4444',      // Red
    text: '#1f2937',       // Dark Gray
    muted: '#6b7280'       // Gray
  },
  instantly: {
    primary: '#7c3aed',    // Purple
    secondary: '#a855f7',  // Light Purple
    accent: '#ec4899',     // Pink
    success: '#10b981',    // Green
    warning: '#f59e0b',    // Amber
    error: '#ef4444',      // Red
    text: '#1f2937',       // Dark Gray
    muted: '#6b7280'       // Gray
  }
};

export class ThemeManager {
  private currentTheme: ThemeColors;

  constructor(moduleName: ModuleName = 'smartlead') {
    this.currentTheme = themes[moduleName];
  }

  public setModule(moduleName: ModuleName): void {
    this.currentTheme = themes[moduleName];
  }

  public getColors(): ThemeColors {
    return { ...this.currentTheme };
  }

  public primary(text: string): string {
    return chalk.hex(this.currentTheme.primary)(text);
  }

  public secondary(text: string): string {
    return chalk.hex(this.currentTheme.secondary)(text);
  }

  public accent(text: string): string {
    return chalk.hex(this.currentTheme.accent)(text);
  }

  public success(text: string): string {
    return chalk.hex(this.currentTheme.success)(text);
  }

  public warning(text: string): string {
    return chalk.hex(this.currentTheme.warning)(text);
  }

  public error(text: string): string {
    return chalk.hex(this.currentTheme.error)(text);
  }

  public text(text: string): string {
    return chalk.hex(this.currentTheme.text)(text);
  }

  public muted(text: string): string {
    return chalk.hex(this.currentTheme.muted)(text);
  }

  public gradient(text: string): string {
    return gradient(
      this.currentTheme.primary,
      this.currentTheme.secondary,
      this.currentTheme.accent
    )(text);
  }

  public createBanner(title: string, subtitle?: string): string {
    try {
      const asciiTitle = figlet.textSync(title, { font: 'Big' });
      const gradientTitle = this.gradient(asciiTitle);
      
      if (subtitle) {
        return `${gradientTitle}\n${this.secondary(`🚀 ${subtitle}`)}\n`;
      }
      return `${gradientTitle}\n`;
    } catch {
      return this.gradient(`=== ${title.toUpperCase()} ===`) + '\n';
    }
  }

  public formatTable(headers: string[], rows: string[][]): void {
    const colWidths = headers.map((header, index) => {
      return Math.max(
        header.length,
        ...rows.map(row => String(row[index] || '').length)
      );
    });

    const separator = '─'.repeat(colWidths.reduce((sum, width) => sum + width + 3, -1));
    
    console.log(this.muted(separator));
    console.log(headers.map((header, index) => 
      this.primary(header.padEnd(colWidths[index] || 0))
    ).join(' │ '));
    console.log(this.muted(separator));
    
    rows.forEach(row => {
      console.log(row.map((cell, index) => 
        String(cell || '').padEnd(colWidths[index] || 0)
      ).join(' │ '));
    });
    
    console.log(this.muted(separator));
  }

  public formatStatus(status: string): string {
    const statusLower = status.toLowerCase();
    
    switch (statusLower) {
      case 'active':
      case 'success':
      case 'completed':
      case 'sent':
        return this.success(status);
      
      case 'paused':
      case 'pending':
      case 'warning':
        return this.warning(status);
      
      case 'stopped':
      case 'failed':
      case 'error':
      case 'bounced':
        return this.error(status);
      
      case 'drafted':
      case 'draft':
      case 'inactive':
        return this.muted(status);
      
      default:
        return this.text(status);
    }
  }

  public loading(text: string): string {
    return `${this.warning('⏳')} ${this.text(text)}`;
  }

  public successMessage(text: string): string {
    return `${this.success('✅')} ${this.text(text)}`;
  }

  public errorMessage(text: string): string {
    return `${this.error('❌')} ${this.text(text)}`;
  }

  public warningMessage(text: string): string {
    return `${this.warning('⚠️')} ${this.text(text)}`;
  }

  public infoMessage(text: string): string {
    return `${this.primary('ℹ️')} ${this.text(text)}`;
  }
}

export const defaultTheme = new ThemeManager('smartlead'); 