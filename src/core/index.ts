#!/usr/bin/env node

import { writeFileSync } from "fs";
import { render } from "ink";
import React from "react";
import type { CLICommand } from "../types/global";
import { CLIError } from "../types/global";
import {
  getCommandByName,
  getModule,
  getShellComponent,
  initializePlatforms,
  listModules,
  performHealthCheck,
} from "./module-selector";
import { getPlatformSafe, getShellSafe, platformRegistry } from "./registry";
import { formatCommandList, getTheme, showCommandHelp, showError } from "./utils/theme";

// Initialize platforms on module load
let platformsInitialized = false;

async function ensurePlatformsInitialized() {
  if (!platformsInitialized) {
    await initializePlatforms();
    platformsInitialized = true;
  }
}

async function main() {
  try {
    // Ensure platforms are initialized
    await ensurePlatformsInitialized();

    const args = process.argv.slice(2);

    if (args.length === 0) {
      await showHelp();
      return;
    }

    if (args[0] === "--help" || args[0] === "-h" || args[0] === "help") {
      await showHelp();
      return;
    }

    if (args[0] === "platforms") {
      listModules();
      return;
    }

    if (args[0] === "health") {
      await performHealthCheck();
      return;
    }

    if (args[0] === "discord") {
      console.log("🚀 Join our Discord community: https://discord.gg/coldemail");
      return;
    }

    if (args[0] === "exec") {
      if (args.length < 3) {
        showError("Usage: cec exec <platform> <command> --args '{...}'");
        return;
      }

      const platformName = args[1];
      const commandName = args[2];

      // Parse --args parameter
      let commandArgs = {};
      const argsIndex = args.indexOf("--args");
      if (argsIndex !== -1 && args[argsIndex + 1]) {
        try {
          commandArgs = JSON.parse(args[argsIndex + 1]);
        } catch (error) {
          showError("Invalid JSON in --args parameter");
          return;
        }
      }

      await executeCommand(platformName, commandName, commandArgs);
      return;
    }

    // Handle platform shell opening
    const platformName = args[0];

    if (!platformRegistry.get(platformName)) {
      showError(`Platform "${platformName}" not found`);
      listModules();
      return;
    }

    if (!platformRegistry.isActive(platformName)) {
      const status = platformRegistry.getStatus(platformName);
      showError(`Platform "${platformName}" is not active`);
      if (status?.error) {
        console.log(`Error: ${status.error}`);
      }
      return;
    }

    // Open platform shell
    await openPlatformShell(platformName);
  } catch (error: any) {
    if (error instanceof CLIError) {
      showError(`${error.code}: ${error.message}`);
      if (error.platform) {
        console.log(`Platform: ${error.platform}`);
      }
      if (error.command) {
        console.log(`Command: ${error.command}`);
      }
    } else {
      showError(`Unexpected error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export async function showHelp() {
  console.log("\n❄️ Cold Email CLI v2.0.0 - Built by the community\n");
  console.log("Usage: cec <command> [options]\n");
  console.log("Commands:");
  console.log("  platforms          List available platforms");
  console.log("  <platform>         Enter interactive shell for platform");
  console.log('  exec <platform> <command> --args "{...}"   Execute command directly');
  console.log("  health             Perform platform health check");
  console.log("  discord            Join our Discord community");
  console.log("  help               Show this help message\n");
  console.log("Examples:");
  console.log("  cec platforms");
  console.log("  cec smartlead");
  console.log("  cec exec smartlead campaigns:list --args '{\"limit\":10}'");
  console.log("  cec health");
  console.log("  cec discord\n");
}

export async function runCommandByName(commandName: string, args: Record<string, any>) {
  try {
    await ensurePlatformsInitialized();

    const command = getCommandByName(commandName);
    if (!command) {
      console.log(`❌ Command "${commandName}" not found`);
      return;
    }

    await command.handler(args);
  } catch (error: any) {
    console.error(`❌ Error executing ${commandName}: ${error.message}`);
  }
}

export async function openPlatformShell(platformName: string) {
  try {
    await ensurePlatformsInitialized();

    // Get platform module safely
    const platformModule = getPlatformSafe(platformName);

    // Get shell component with lazy loading
    const ShellComponent = await getShellComponent(platformName);

    if (!ShellComponent) {
      const theme = getTheme(platformName);
      console.log(theme.error(`❌ Shell not available for ${platformName}`));
      return;
    }

    // Render shell using React Ink with direct imports
    const app = render(
      React.createElement(ShellComponent, {
        onBack: () => {
          process.exit(0);
        },
      }),
    );

    // Handle cleanup
    process.on("SIGINT", () => {
      app.unmount();
      process.exit(0);
    });
  } catch (error) {
    const theme = getTheme(platformName);

    if (error instanceof CLIError) {
      console.log(theme.error(`❌ ${error.code}: ${error.message}`));
    } else {
      console.log(theme.error(`❌ Error opening ${platformName} shell: ${error}`));
    }
  }
}

function _showCommandHelp(commands: CLICommand[], moduleName: string) {
  const theme = getTheme("default");
  console.log(`\n📖 ${moduleName} Commands:\n`);

  // Group commands by category
  const categorized: Record<string, CLICommand[]> = {};
  commands.forEach((cmd) => {
    if (!categorized[cmd.category]) {
      categorized[cmd.category] = [];
    }
    categorized[cmd.category].push(cmd);
  });

  // Display commands by category
  Object.entries(categorized).forEach(([category, categoryCommands]) => {
    console.log(theme.accent(`${category}:`));
    categoryCommands.forEach((cmd) => {
      console.log(`  ${theme.primary(cmd.name.padEnd(25))} ${cmd.description}`);
    });
    console.log("");
  });
}

export async function executeCommand(platformName: string, command: string, commandArgs: Record<string, any>) {
  try {
    await ensurePlatformsInitialized();

    const module = getModule(platformName);

    if (!module) {
      console.log(`❌ Platform "${platformName}" not found`);
      return;
    }

    if (!platformRegistry.isActive(platformName)) {
      const status = platformRegistry.getStatus(platformName);
      console.log(`❌ Platform "${platformName}" is not active`);
      if (status?.error) {
        console.log(`Error: ${status.error}`);
      }
      return;
    }

    const cmd = module.commands.find((c) => c.name === command);
    if (!cmd) {
      console.log(`❌ Command "${command}" not found in ${platformName}`);
      return;
    }

    await cmd.handler(commandArgs);
  } catch (error: any) {
    if (error instanceof CLIError) {
      console.error(`❌ ${error.code}: ${error.message}`);
    } else {
      console.error(`❌ Error executing ${command}: ${error.message}`);
    }
  }
}

export async function listCommands(platformName: string) {
  try {
    await ensurePlatformsInitialized();

    const platformModule = platformRegistry.get(platformName);
    if (!platformModule) {
      const theme = getTheme(platformName);
      console.log(theme.error(`❌ Platform '${platformName}' not found`));
      return;
    }

    const module = platformModule.platform;
    const theme = getTheme(platformName);
    const version = module.version || "2.0.0";
    console.log(`\n${theme.primary(`🎯 ${module.name} v${version}`)}`);
    console.log(`${theme.secondary(module.description)}\n`);

    // Export platform info
    const exportData = {
      platform: platformName,
      metadata: {
        name: module.name,
        description: module.description,
        version: module.version || "2.0.0",
        totalCommands: module.totalCommands,
        categories: module.categories,
        status: platformRegistry.isActive(platformName) ? "active" : "inactive",
        lastUpdated: new Date().toISOString(),
      },
      commands: module.commands.map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        usage: cmd.usage,
        category: cmd.category,
        options: cmd.options || [],
        examples: cmd.examples || [],
        aliases: cmd.aliases || [],
      })),
    };

    // Save to docs folder with platform name
    writeFileSync(`docs/${platformName}-commands.json`, JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error(`❌ Error exporting commands for ${platformName}: ${error}`);
  }
}

export default {
  showHelp,
  runCommandByName,
  openPlatformShell,
  executeCommand,
  listCommands,
};
