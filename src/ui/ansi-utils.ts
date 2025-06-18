import chalk from 'chalk';
import { TerminalSize } from '../types/smartlead';

export class ANSIUtils {
  // Terminal Control
  static clearScreen(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  static clearLine(): void {
    process.stdout.write('\x1B[2K');
  }

  static clearToEndOfLine(): void {
    process.stdout.write('\x1B[0K');
  }

  static clearToStartOfLine(): void {
    process.stdout.write('\x1B[1K');
  }

  // Cursor Control
  static hideCursor(): void {
    process.stdout.write('\x1B[?25l');
  }

  static showCursor(): void {
    process.stdout.write('\x1B[?25h');
  }

  static moveTo(row: number, col: number): void {
    process.stdout.write(`\x1B[${row};${col}H`);
  }

  static moveUp(lines: number = 1): void {
    process.stdout.write(`\x1B[${lines}A`);
  }

  static moveDown(lines: number = 1): void {
    process.stdout.write(`\x1B[${lines}B`);
  }

  static moveLeft(cols: number = 1): void {
    process.stdout.write(`\x1B[${cols}D`);
  }

  static moveRight(cols: number = 1): void {
    process.stdout.write(`\x1B[${cols}C`);
  }

  static saveCursor(): void {
    process.stdout.write('\x1B[s');
  }

  static restoreCursor(): void {
    process.stdout.write('\x1B[u');
  }

  static getCursorPosition(): Promise<{ row: number; col: number }> {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      
      stdin.setRawMode(true);
      stdin.resume();
      
      const onData = (data: Buffer) => {
        const response = data.toString();
        const match = response.match(/\x1B\[(\d+);(\d+)R/);
        
        if (match) {
          const row = parseInt(match[1]);
          const col = parseInt(match[2]);
          
          stdin.removeListener('data', onData);
          stdin.setRawMode(false);
          stdin.pause();
          
          resolve({ row, col });
        }
      };
      
      stdin.on('data', onData);
      stdout.write('\x1B[6n'); // Request cursor position
    });
  }

  // Terminal Information
  static getTerminalSize(): TerminalSize {
    return {
      width: process.stdout.columns || 80,
      height: process.stdout.rows || 24
    };
  }

  static isTerminalSupported(): boolean {
    return !!(process.stdout.isTTY && process.env.TERM !== 'dumb');
  }

  // Screen Buffer Control
  static enterAlternateScreen(): void {
    process.stdout.write('\x1B[?1049h');
  }

  static exitAlternateScreen(): void {
    process.stdout.write('\x1B[?1049l');
  }

  // Drawing Utilities
  static drawBorder(
    width: number, 
    height: number, 
    options?: {
      color?: any;
      style?: 'single' | 'double' | 'rounded' | 'thick';
      title?: string;
    }
  ): void {
    const color = options?.color || chalk.hex('#6366F1');
    const chars = this.getBorderChars(options?.style || 'rounded');
    
    // Top border
    this.moveTo(1, 1);
    let topLine = chars.topLeft + chars.horizontal.repeat(width - 2) + chars.topRight;
    
    if (options?.title) {
      const titleText = ` ${options.title} `;
      const titleStart = Math.floor((width - titleText.length) / 2);
      if (titleStart > 0 && titleStart + titleText.length < width) {
        topLine = chars.topLeft + 
                 chars.horizontal.repeat(titleStart - 1) +
                 titleText +
                 chars.horizontal.repeat(width - titleStart - titleText.length - 1) +
                 chars.topRight;
      }
    }
    
    process.stdout.write(color(topLine));
    
    // Side borders
    for (let i = 2; i < height; i++) {
      this.moveTo(i, 1);
      process.stdout.write(color(chars.vertical));
      this.moveTo(i, width);
      process.stdout.write(color(chars.vertical));
    }
    
    // Bottom border
    this.moveTo(height, 1);
    const bottomLine = chars.bottomLeft + chars.horizontal.repeat(width - 2) + chars.bottomRight;
    process.stdout.write(color(bottomLine));
  }

  private static getBorderChars(style: 'single' | 'double' | 'rounded' | 'thick') {
    const styles = {
      single: {
        topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘',
        horizontal: '─', vertical: '│'
      },
      double: {
        topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝',
        horizontal: '═', vertical: '║'
      },
      rounded: {
        topLeft: '╭', topRight: '╮', bottomLeft: '╰', bottomRight: '╯',
        horizontal: '─', vertical: '│'
      },
      thick: {
        topLeft: '┏', topRight: '┓', bottomLeft: '┗', bottomRight: '┛',
        horizontal: '━', vertical: '┃'
      }
    };
    
    return styles[style];
  }

  static drawBox(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    content?: string,
    options?: {
      color?: any;
      style?: 'single' | 'double' | 'rounded' | 'thick';
      title?: string;
      padding?: number;
    }
  ): void {
    const color = options?.color || chalk.hex('#6366F1');
    const padding = options?.padding || 1;
    const chars = this.getBorderChars(options?.style || 'rounded');
    
    // Save current cursor position
    this.saveCursor();
    
    // Draw border
    for (let row = 0; row < height; row++) {
      this.moveTo(y + row, x);
      
      if (row === 0) {
        // Top border
        let topLine = chars.topLeft + chars.horizontal.repeat(width - 2) + chars.topRight;
        
        if (options?.title && row === 0) {
          const titleText = ` ${options.title} `;
          const titleStart = Math.floor((width - titleText.length) / 2);
          if (titleStart > 0) {
            topLine = chars.topLeft + 
                     chars.horizontal.repeat(titleStart - 1) +
                     titleText +
                     chars.horizontal.repeat(width - titleStart - titleText.length - 1) +
                     chars.topRight;
          }
        }
        
        process.stdout.write(color(topLine));
      } else if (row === height - 1) {
        // Bottom border
        const bottomLine = chars.bottomLeft + chars.horizontal.repeat(width - 2) + chars.bottomRight;
        process.stdout.write(color(bottomLine));
      } else {
        // Side borders
        process.stdout.write(color(chars.vertical));
        process.stdout.write(' '.repeat(width - 2));
        process.stdout.write(color(chars.vertical));
      }
    }
    
    // Add content if provided
    if (content) {
      const lines = content.split('\n');
      const contentWidth = width - 2 - (padding * 2);
      const contentHeight = height - 2 - (padding * 2);
      
      for (let i = 0; i < Math.min(lines.length, contentHeight); i++) {
        this.moveTo(y + padding + 1 + i, x + padding + 1);
        const line = lines[i];
        const truncated = line.length > contentWidth ? 
          line.substring(0, contentWidth - 3) + '...' : 
          line;
        process.stdout.write(truncated);
      }
    }
    
    // Restore cursor position
    this.restoreCursor();
  }

  // Text Positioning
  static centerText(text: string, width?: number): string {
    const terminal = this.getTerminalSize();
    const actualWidth = width || terminal.width;
    const padding = Math.max(0, Math.floor((actualWidth - text.length) / 2));
    return ' '.repeat(padding) + text;
  }

  static rightAlign(text: string, width?: number): string {
    const terminal = this.getTerminalSize();
    const actualWidth = width || terminal.width;
    const padding = Math.max(0, actualWidth - text.length);
    return ' '.repeat(padding) + text;
  }

  // Progress Indicators
  static createProgressBar(
    progress: number, 
    width: number = 40, 
    options?: {
      showPercent?: boolean;
      color?: any;
      bgColor?: any;
      style?: 'blocks' | 'smooth' | 'dots' | 'bars';
      label?: string;
    }
  ): string {
    const color = options?.color || chalk.hex('#6366F1');
    const bgColor = options?.bgColor || chalk.gray;
    const filled = Math.floor(progress * width);
    const empty = width - filled;
    
    let bar: string;
    switch (options?.style || 'blocks') {
      case 'smooth':
        const smoothChars = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
        const smoothFilled = Math.floor(progress * width * 8) / 8;
        const fullBlocks = Math.floor(smoothFilled);
        const partialIndex = Math.floor((smoothFilled - fullBlocks) * 8);
        bar = color('█'.repeat(fullBlocks) + (partialIndex > 0 ? smoothChars[partialIndex] : '')) +
              bgColor('░'.repeat(width - fullBlocks - (partialIndex > 0 ? 1 : 0)));
        break;
      case 'dots':
        bar = color('●'.repeat(filled)) + bgColor('○'.repeat(empty));
        break;
      case 'bars':
        bar = color('▌'.repeat(filled)) + bgColor('░'.repeat(empty));
        break;
      default: // blocks
        bar = color('█'.repeat(filled)) + bgColor('░'.repeat(empty));
    }
    
    const percent = options?.showPercent !== false ? 
      ` ${Math.round(progress * 100)}%` : '';
    const label = options?.label ? `${options.label} ` : '';
    
    return `${label}[${bar}]${percent}`;
  }

  // Animation Utilities
  static async animateText(
    text: string, 
    options?: {
      delay?: number;
      style?: 'typewriter' | 'fadeIn' | 'slideIn';
      color?: any;
    }
  ): Promise<void> {
    const delay = options?.delay || 50;
    const color = options?.color || chalk.white;
    
    switch (options?.style || 'typewriter') {
      case 'typewriter':
        for (let i = 0; i < text.length; i++) {
          process.stdout.write(color(text[i]));
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        break;
      case 'fadeIn':
        // Simulate fade-in by changing brightness
        const steps = 5;
        for (let step = 0; step <= steps; step++) {
          this.clearLine();
          process.stdout.write('\r');
          const opacity = step / steps;
          const fadedColor = step === steps ? color : chalk.gray;
          process.stdout.write(fadedColor(text));
          await new Promise(resolve => setTimeout(resolve, delay * 2));
        }
        break;
      case 'slideIn':
        for (let i = 0; i <= text.length; i++) {
          this.clearLine();
          process.stdout.write('\r');
          process.stdout.write(color(text.substring(0, i)));
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        break;
    }
  }

  // Color and Style Utilities
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

  static gradient(text: string, colors: string[]): string {
    if (colors.length < 2) return text;
    
    const chars = text.split('');
    const step = 1 / (chars.length - 1);
    
    return chars.map((char, i) => {
      const position = i * step;
      const colorIndex = Math.floor(position * (colors.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
      const localPosition = (position * (colors.length - 1)) - colorIndex;
      
      const color1 = colors[colorIndex];
      const color2 = colors[nextColorIndex];
      
      // Interpolate between colors
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);
      
      const r = Math.round(r1 + (r2 - r1) * localPosition);
      const g = Math.round(g1 + (g2 - g1) * localPosition);
      const b = Math.round(b1 + (b2 - b1) * localPosition);
      
      return chalk.rgb(r, g, b)(char);
    }).join('');
  }

  // Utility Functions
  static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async flashText(
    text: string, 
    times: number = 3, 
    interval: number = 500,
    color?: any
  ): Promise<void> {
    const colorFn = color || chalk.white;
    
    for (let i = 0; i < times; i++) {
      this.clearLine();
      process.stdout.write('\r');
      process.stdout.write(colorFn(text));
      await this.sleep(interval / 2);
      
      this.clearLine();
      process.stdout.write('\r');
      await this.sleep(interval / 2);
    }
    
    // Show final text
    process.stdout.write(colorFn(text));
  }

  // Screen Management
  static setupFullScreen(): void {
    this.enterAlternateScreen();
    this.clearScreen();
    this.hideCursor();
  }

  static exitFullScreen(): void {
    this.showCursor();
    this.exitAlternateScreen();
  }

  // Input Handling
  static setupRawMode(): void {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      process.stdin.resume();
    }
  }

  static exitRawMode(): void {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }
  }
} 