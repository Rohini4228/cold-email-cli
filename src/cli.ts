#!/usr/bin/env node

import { executeCommand, openPlatformShell, showHelp } from "./core/index";
import { getModule, listModules } from "./core/module-selector";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    await showHelp();
    return;
  }

  const command = args[0];

  switch (command) {
    case "help":
    case "--help":
    case "-h":
      await showHelp();
      break;

    case "platforms":
    case "list":
      listModules();
      break;

    case "discord":
      console.log("\n🎮 Join our Discord community:");
      console.log("https://discord.gg/mB76X5QJ\n");
      break;

    case "exec": {
      // Direct command execution: cec exec smartlead campaigns:list --args '{"limit":10}'
      if (args.length < 3) {
        console.log('❌ Usage: cec exec <platform> <command> --args "{...}"');
        return;
      }

      const platform = args[1];
      const commandName = args[2];

      let commandArgs = {};
      const argsIndex = args.indexOf("--args");
      if (argsIndex !== -1 && args[argsIndex + 1]) {
        try {
          commandArgs = JSON.parse(args[argsIndex + 1]);
        } catch (_e) {
          console.log("❌ Invalid JSON in --args parameter");
          return;
        }
      }

      await executeCommand(platform, commandName, commandArgs);
      break;
    }

    default: {
      // Check if it's a platform name
      const module = getModule(command);
      if (module) {
        await openPlatformShell(command);
      } else {
        console.log(`❌ Unknown command: ${command}`);
        console.log('Use "cec help" to see available commands\n');
        listModules();
      }
      break;
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;
