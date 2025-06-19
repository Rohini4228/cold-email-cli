import chalk from "chalk";
import type { CLICommand, CLIModule } from "../../types/global";

// Detect terminal background (light/dark) for better contrast
function detectTerminalBackground(): "light" | "dark" | "unknown" {
  // Check environment variables that might indicate terminal theme
  const termProgram = process.env.TERM_PROGRAM?.toLowerCase();
  const colorterm = process.env.COLORTERM?.toLowerCase();
  const background = process.env.TERM_BACKGROUND?.toLowerCase();

  if (background === "light" || background === "dark") {
    return background as "light" | "dark";
  }

  // Some terminals set this
  if (termProgram?.includes("light") || colorterm?.includes("light")) {
    return "light";
  }

  // Default to dark (most common for developers)
  return "dark";
}

// Enhanced color palettes with contrast variants
const themes = {
  default: {
    primary: "#ffffff",
    secondary: "#94a3b8",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1f2937", // For light backgrounds
  },
  smartlead: {
    primary: "#0ea5e9", // SmartLead blue
    secondary: "#38bdf8",
    accent: "#0284c7",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e293b",
  },
  instantly: {
    primary: "#8b5cf6", // Instantly purple
    secondary: "#a78bfa",
    accent: "#7c3aed",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e1b4b",
  },
  salesforge: {
    primary: "#f97316", // Salesforge orange
    secondary: "#fb923c",
    accent: "#ea580c",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1c1917",
  },
  apollo: {
    primary: "#f59e0b", // Apollo amber/gold
    secondary: "#fbbf24",
    accent: "#d97706",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1c1917",
  },
  emailbison: {
    primary: "#a16207", // EmailBison brown/amber
    secondary: "#78716c",
    accent: "#f59e0b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1c1917",
  },
  amplemarket: {
    primary: "#2563eb", // Amplemarket professional blue
    secondary: "#64748b",
    accent: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e293b",
  },
  outreach: {
    primary: "#1e40af", // Outreach enterprise blue
    secondary: "#64748b",
    accent: "#2563eb",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e293b",
  },
  salesloft: {
    primary: "#6366f1", // Salesloft modern indigo
    secondary: "#64748b",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e1b4b",
  },
  lemlist: {
    primary: "#ec4899", // lemlist creative pink
    secondary: "#64748b",
    accent: "#f97316",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#1e1b4b",
  },
  quickmail: {
    primary: "#06b6d4", // QuickMail teal/cyan
    secondary: "#14b8a6",
    accent: "#0891b2",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    muted: "#64748b",
    text: "#ffffff",
    textContrast: "#134e4a",
  },
};

export interface ThemeColors {
  primary: (text: string) => string;
  secondary: (text: string) => string;
  accent: (text: string) => string;
  success: (text: string) => string;
  warning: (text: string) => string;
  error: (text: string) => string;
  muted: (text: string) => string;
  text: (text: string) => string;
  gradient: (text: string) => string;
}

// Create gradient effect by alternating colors
function createGradient(text: string, colors: string[]): string {
  if (colors.length < 2 || text.length === 0) {
    return chalk.hex(colors[0] || "#ffffff")(text);
  }

  const chars = text.split("");
  const result = chars.map((char, index) => {
    const colorIndex = Math.floor((index / chars.length) * colors.length);
    const color = colors[Math.min(colorIndex, colors.length - 1)];
    return chalk.hex(color)(char);
  });

  return result.join("");
}

export function getTheme(module?: string): ThemeColors {
  const themeKey = module && themes[module as keyof typeof themes] ? module : "default";
  const colors = themes[themeKey as keyof typeof themes];
  const terminalBg = detectTerminalBackground();

  // Choose text color based on terminal background
  const textColor = terminalBg === "light" ? colors.textContrast : colors.text;

  return {
    primary: (text: string) => chalk.hex(colors.primary)(text),
    secondary: (text: string) => chalk.hex(colors.secondary)(text),
    accent: (text: string) => chalk.hex(colors.accent)(text),
    success: (text: string) => chalk.hex(colors.success)(text),
    warning: (text: string) => chalk.hex(colors.warning)(text),
    error: (text: string) => chalk.hex(colors.error)(text),
    muted: (text: string) => chalk.hex(colors.muted)(text),
    text: (text: string) => chalk.hex(textColor)(text),
    gradient: (text: string) => {
      // Create gradient effect using primary and accent colors
      return createGradient(text, [colors.primary, colors.accent, colors.secondary]);
    },
  };
}

export function createBanner(title: string, subtitle?: string, module?: string): string {
  const theme = getTheme(module);
  const width = 80;
  const border = "━".repeat(width);

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
    smartlead: "SmartLead",
    instantly: "Instantly",
    salesforge: "Salesforge",
    apollo: "Apollo",
    emailbison: "EmailBison",
    amplemarket: "Amplemarket",
    outreach: "Outreach",
    salesloft: "Salesloft",
    lemlist: "lemlist",
    quickmail: "QuickMail",
  };

  const moduleName = moduleNames[module as keyof typeof moduleNames] || "Cold Email CLI";

  console.log(createBanner(`${moduleName} Platform`, "Professional Cold Outreach Automation", module));

  console.log(theme.secondary("🎯 Platform Features:"));
  console.log(theme.muted("   • Campaign Management & Automation"));
  console.log(theme.muted("   • Lead Generation & Segmentation"));
  console.log(theme.muted("   • Email Deliverability Optimization"));
  console.log(theme.muted("   • Advanced Analytics & Reporting"));
  console.log(theme.muted("   • Multi-Channel Outreach Sequences"));
  console.log();

  console.log(theme.accent("💡 Quick Start:"));
  console.log(theme.muted('   Type "help" to see all available commands'));
  console.log(theme.muted('   Type "help <command>" for detailed usage'));
  console.log(theme.muted('   Type "config" to setup your API credentials'));
  console.log();
}

export function formatCommandList(commands: CLICommand[], module?: string): void {
  const theme = getTheme(module);

  // Group commands by category, normalizing category names
  const categories = commands.reduce(
    (acc, cmd) => {
      const category = normalizeCategory(cmd.category) || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(cmd);
      return acc;
    },
    {} as Record<string, CLICommand[]>,
  );

  Object.entries(categories).forEach(([category, categoryCommands]) => {
    console.log(theme.primary(`\n📂 ${category}:`));
    console.log(theme.muted("─".repeat(50)));

    categoryCommands.forEach((cmd: CLICommand) => {
      console.log(`  ${theme.accent(cmd.name.padEnd(25))} ${theme.secondary(cmd.description)}`);
      if (cmd.usage) {
        console.log(`  ${theme.muted(" ".repeat(25))} ${theme.muted(cmd.usage)}`);
      }
    });
  });

  console.log();
}

// Normalize category names for consistent matching
function normalizeCategory(category: string): string {
  return category.replace(/^[^\w]+\s*/, "").trim(); // Remove emoji prefixes
}

export function showCommandHelp(moduleInstance: CLIModule, module?: string): void {
  const theme = getTheme(module);

  console.log(theme.primary(`\n📖 ${moduleInstance.name} Commands`));
  console.log(theme.muted("─".repeat(50)));
  console.log(`${theme.secondary("Description:")} ${moduleInstance.description}`);
  console.log(`${theme.secondary("Version:")} ${moduleInstance.version}`);
  console.log(`${theme.secondary("Total Commands:")} ${moduleInstance.commands.length}`);

  formatCommandList(moduleInstance.commands, module);
}

export function showError(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.error("❌ Error:")} ${theme.text(message)}\n`);
}

export function showSuccess(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.success("✅ Success:")} ${theme.text(message)}\n`);
}

export function showWarning(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.warning("⚠️  Warning:")} ${theme.text(message)}\n`);
}

export function showInfo(message: string, module?: string): void {
  const theme = getTheme(module);
  console.log(`\n${theme.accent("ℹ️  Info:")} ${theme.text(message)}\n`);
}

export const platformNames = {
  smartlead: "SmartLead",
  instantly: "Instantly",
  salesforge: "Salesforge",
  apollo: "Apollo",
  emailbison: "EmailBison",
  amplemarket: "Amplemarket",
  outreach: "Outreach",
  salesloft: "Salesloft",
  lemlist: "lemlist",
  quickmail: "QuickMail",
} as const;
