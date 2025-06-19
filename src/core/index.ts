#!/usr/bin/env node

import { render } from "ink";
import React from "react";
import type { CLICommand } from "../types/global";
import { getCommandByName, getModule, listModules, modules } from "./module-selector";
import { formatCommandList, getTheme, showCommandHelp, showError } from "./utils/theme";
import { writeFileSync } from "fs";

async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      console.log("❄️ Cold Email CLI v2.0.0\n");
      console.log("Professional command-line interface for cold email automation\n");
      console.log("Usage: cold-email-cli <module> <command> [options]");
      console.log("   or: cec <module> <command> [options]\n");
      console.log("Available modules:");
      console.log("  smartlead     - Advanced Campaign Management & Analytics (68 commands)");
      console.log("  instantly     - High-Volume Automation & Deliverability (45 commands)");
      console.log("  salesforge    - AI-Powered Multi-Channel Sequences (42 commands)");
      console.log("  apollo        - Email Sequence & Outreach Automation (42 commands)\n");
      console.log("Examples:");
      console.log("  cold-email-cli smartlead campaigns:list");
      console.log("  cec instantly leads:add --email john@company.com");
      console.log('  cold-email-cli salesforge sequences:create --persona "VP Sales"');
      console.log('  cec apollo sequences:create --name "Enterprise Outreach"');
      return;
    }

    if (args[0] === "--help" || args[0] === "-h") {
      console.log("❄️ Cold Email CLI v2.0.0 - Professional Email Sequence Automation\n");
      console.log("USAGE:");
      console.log("  cold-email-cli <module> <command> [options]");
      console.log("  cec <module> <command> [options]  # Short alias\n");

      console.log("MODULES:");
      console.log("  smartlead     Advanced Campaign Management & Analytics");
      console.log("  instantly     High-Volume Automation & Deliverability");
      console.log("  salesforge    AI-Powered Multi-Channel Sequences");
      console.log("  apollo        Email Sequence & Outreach Automation\n");

      console.log("EXAMPLES:");
      console.log("  cold-email-cli smartlead campaigns:list --status active");
      console.log('  cec instantly campaigns:create --name "Q1 Outreach"');
      console.log('  cold-email-cli salesforge sequences:create --persona "Enterprise VP"');
      console.log("  cec apollo sequences:start --id seq_12345\n");

      console.log("For module-specific help:");
      console.log("  cold-email-cli <module> --help");
      return;
    }

    const moduleName = args[0];
    const command = args[1];

    if (!moduleName) {
      showError("Module name is required");
      return;
    }

    if (!command) {
      const module = await getModule(moduleName);
      if (!module) {
        return;
      }

      const theme = getTheme(moduleName);
      const version = module.platformInfo.version || "2.0.0";
      console.log(`\n${theme.primary(`🎯 ${module.platformInfo.name} v${version}`)}`);
      console.log(`${theme.secondary(module.platformInfo.description)}\n`);

      formatCommandList(module.commands, moduleName);
      return;
    }

    if (command === "--help" || command === "-h") {
      const module = await getModule(moduleName);
      if (!module) {
        return;
      }

      // Create a proper CLIModule object for showCommandHelp
      const cliModule = {
        name: module.platformInfo.name,
        description: module.platformInfo.description,
        version: module.platformInfo.version || "2.0.0",
        commands: module.commands,
        execute: async (command: string, args: Record<string, any>) => {
          const cmd = module.commands.find((c) => c.name === command);
          if (!cmd) throw new Error(`Command '${command}' not found`);
          return cmd.handler(args);
        },
      };

      showCommandHelp(cliModule, moduleName);
      return;
    }

    const module = await getModule(moduleName);
    if (!module) {
      return;
    }

    // Parse command line arguments
    const commandArgs: Record<string, any> = {};
    for (let i = 2; i < args.length; i++) {
      const arg = args[i];
      if (arg?.startsWith("--")) {
        const key = arg.slice(2);
        const value = args[i + 1];
        if (value && !value.startsWith("--")) {
          commandArgs[key] = value;
          i++; // Skip the value
        } else {
          commandArgs[key] = true;
        }
      }
    }

    await module.commands.find((c) => c.name === command)?.handler(commandArgs);
  } catch (error: any) {
    showError(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export async function showHelp() {
  console.log("\n❄️ Cold Email CLI v2.0.0 - Built by the community\n");
  console.log("Usage: cec <command> [options]\n");
  console.log("Commands:");
  console.log("  platforms          List available platforms");
  console.log("  <platform>         Enter interactive shell for platform");
  console.log('  exec <platform> <command> --args "{...}"   Execute command directly');
  console.log("  discord            Join our Discord community");
  console.log("  help               Show this help message\n");
  console.log("Examples:");
  console.log("  cec platforms");
  console.log("  cec smartlead");
  console.log("  cec exec smartlead campaigns:list --args '{\"limit\":10}'");
  console.log("  cec discord\n");
}

export async function runCommandByName(commandName: string, args: Record<string, any>) {
  const command = getCommandByName(commandName);
  if (!command) {
    console.log(`❌ Command "${commandName}" not found`);
    return;
  }

  try {
    await command.handler(args);
  } catch (error: any) {
    console.error(`❌ Error executing ${commandName}: ${error.message}`);
  }
}

export async function openPlatformShell(platformName: string) {
  const theme = getTheme(platformName);
  
  try {
    const module = modules[platformName as keyof typeof modules];
    if (!module) {
      console.log(theme.error(`❌ Platform "${platformName}" not found\n`));
      listModules();
      return;
    }

    // Check if module is active (support both old and new structure)
    const status = (module as any).platformInfo?.status || "active";
    if (status !== "active") {
      const name = (module as any).platformInfo?.name || module.name;
      const description = (module as any).platformInfo?.description || module.description;
      console.log(theme.warning(`🚧 ${name} is coming soon!\n`));
      console.log(`${description}\n`);
      return;
    }

    // Handle different shell imports based on platform
    let ShellComponent: any;
    
    switch (platformName) {
      case "smartlead": {
        const { SmartLeadShell } = await import("../modules/smartlead/shell");
        ShellComponent = SmartLeadShell;
        break;
      }
      case "instantly": {
        const { InstantlyShell } = await import("../modules/instantly/shell");
        ShellComponent = InstantlyShell;
        break;
      }
      case "salesforge": {
        const { SalesforgeShell } = await import("../modules/salesforge/shell");
        ShellComponent = SalesforgeShell;
        break;
      }
      case "apollo": {
        const { ApolloShell } = await import("../modules/apollo/shell");
        ShellComponent = ApolloShell;
        break;
      }
      case "emailbison": {
        const { EmailBisonShell } = await import("../modules/emailbison/shell");
        ShellComponent = EmailBisonShell;
        break;
      }
      case "amplemarket": {
        const { AmplemarketShell } = await import("../modules/amplemarket/shell");
        ShellComponent = AmplemarketShell;
        break;
      }
      case "outreach": {
        const { OutreachShell } = await import("../modules/outreach/shell");
        ShellComponent = OutreachShell;
        break;
      }
      case "salesloft": {
        const { SalesloftShell } = await import("../modules/salesloft/shell");
        ShellComponent = SalesloftShell;
        break;
      }
      case "lemlist": {
        const { lemlistShell } = await import("../modules/lemlist/shell");
        ShellComponent = lemlistShell;
        break;
      }
      default:
        console.log(theme.error(`❌ Shell not implemented for ${platformName}`));
        return;
    }

    // Render shell using React Ink
    const { render } = await import("ink");
    const { createElement } = await import("react");
    
    const app = render(
      createElement(ShellComponent, {
        onBack: () => {
          process.exit(0);
        }
      })
    );

    // Handle cleanup
    process.on('SIGINT', () => {
      app.unmount();
      process.exit(0);
    });

  } catch (error) {
    console.log(theme.error(`❌ Error opening ${platformName} shell: ${error}`));
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
  const module = getModule(platformName);

  if (!module) {
    console.log(`❌ Platform "${platformName}" not found`);
    return;
  }

  if (module.platformInfo.status !== "active") {
    console.log(`🚧 ${module.platformInfo.name} is coming soon!`);
    return;
  }

  const cmd = module.commands.find((c) => c.name === command);
  if (!cmd) {
    console.log(`❌ Command "${command}" not found in ${platformName}`);
    return;
  }

  try {
    await cmd.handler(commandArgs);
  } catch (error: any) {
    console.error(`❌ Error executing ${command}: ${error.message}`);
  }
}

export async function listCommands(platformName: string) {
  try {
    const module = modules[platformName as keyof typeof modules];
    if (!module) {
      console.log(theme.error(`❌ Platform '${platformName}' not found`));
      return;
    }

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
        status: "active",
        lastUpdated: new Date().toISOString(),
      },
      commands: module.commands.map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        usage: cmd.usage,
        category: cmd.category,
        options: cmd.options || [],
        examples: cmd.examples || [],
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
