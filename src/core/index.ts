#!/usr/bin/env node

import { selectModule } from './module-selector';
import { getTheme, formatCommandList, showCommandHelp, showError } from './utils/theme';

async function main() {
  try {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('🚀 Cold Email CLI v1.0.0\n');
      console.log('Usage: cold-email-cli <module> <command> [options]');
      console.log('   or: cec <module> <command> [options]\n');
      console.log('Available modules:');
      console.log('  smartlead.ai    - Advanced Campaign Management & Analytics (68 commands)');
      console.log('  instantly.ai    - High-Volume Automation & Deliverability (35 commands)');
      console.log('  salesforge.ai   - AI-Powered Multi-Channel Sequences (42 commands)');
      console.log('  apollo.io       - Email Sequences & Outreach Automation (42 commands)\n');
      console.log('Examples:');
      console.log('  cold-email-cli smartlead.ai campaigns:list');
      console.log('  cec instantly.ai leads:add --email john@company.com');
      console.log('  cold-email-cli salesforge.ai templates:generate --persona "VP Sales"');
      console.log('  cec apollo.io sequences:create --name "Enterprise Outreach"');
      return;
    }

    if (args[0] === '--help' || args[0] === '-h') {
      console.log('🚀 Cold Email CLI v1.0.0 - Professional Cold Email Automation\n');
      console.log('USAGE:');
      console.log('  cold-email-cli <module> <command> [options]');
      console.log('  cec <module> <command> [options]  # Short alias\n');
      
      console.log('MODULES:');
      console.log('  smartlead.ai    Advanced Campaign Management & Analytics');
      console.log('  instantly.ai    High-Volume Automation & Deliverability'); 
      console.log('  salesforge.ai   AI-Powered Multi-Channel Sequences');
      console.log('  apollo.io       Email Sequences & Outreach Automation\n');
      
      console.log('EXAMPLES:');
      console.log('  cold-email-cli smartlead.ai campaigns:list --status active');
      console.log('  cec instantly.ai campaigns:create --name "Q1 Outreach"');
      console.log('  cold-email-cli salesforge.ai templates:generate --persona "Enterprise VP"');
      console.log('  cec apollo.io sequences:start --id seq_12345\n');
      
      console.log('For module-specific help:');
      console.log('  cold-email-cli <module> --help');
      return;
    }

    const moduleName = args[0];
    const command = args[1];

    if (!moduleName) {
      showError('Module name is required');
      return;
    }

    if (!command) {
      const module = await selectModule(moduleName);
      if (!module) {
        return;
      }
      
      const theme = getTheme(moduleName);
      console.log(`\n${theme.primary(`🎯 ${module.name} v${module.version}`)}`);
      console.log(`${theme.secondary(module.description)}\n`);
      
      formatCommandList(module.commands, moduleName);
      return;
    }

    if (command === '--help' || command === '-h') {
      const module = await selectModule(moduleName);
      if (!module) {
        return;
      }
      
      showCommandHelp(module, moduleName);
      return;
    }

    const module = await selectModule(moduleName);
    if (!module) {
      return;
    }

    // Parse command line arguments
    const commandArgs: Record<string, any> = {};
    for (let i = 2; i < args.length; i++) {
      const arg = args[i];
      if (arg && arg.startsWith('--')) {
        const key = arg.slice(2);
        const value = args[i + 1];
        if (value && !value.startsWith('--')) {
          commandArgs[key] = value;
          i++; // Skip the value
        } else {
          commandArgs[key] = true;
        }
      }
    }

    await module.execute(command, commandArgs);
    
  } catch (error: any) {
    showError(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
} 