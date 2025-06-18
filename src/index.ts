#!/usr/bin/env node

import { config } from './config/config';
import { VisualUtils } from './ui/visual-utils';
import { ANSIUtils } from './ui/ansi-utils';
import { SmartLeadCLI } from './commands/cli';

// Production-ready error handling
process.on('uncaughtException', (error) => {
  config.log('error', 'Uncaught Exception', { error: error.message, stack: error.stack });
  VisualUtils.showError(error, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  config.log('error', 'Unhandled Rejection', { reason, promise });
  VisualUtils.showError(new Error(String(reason)), 'Unhandled Promise Rejection');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n');
  VisualUtils.showInfo('Goodbye!', [
    { label: 'Session Ended', value: new Date().toLocaleString() },
    { label: 'Thank You', value: 'For using SmartLead CLI' }
  ]);
  
  // Clean up any active terminal modes
  ANSIUtils.showCursor();
  ANSIUtils.exitRawMode();
  
  process.exit(0);
});

async function main() {
  try {
    const cli = new SmartLeadCLI();
    await cli.run();
  } catch (error) {
    config.log('error', 'CLI Startup Error', { error: error instanceof Error ? error.message : String(error) });
    VisualUtils.showError(error instanceof Error ? error : new Error(String(error)), 'CLI Startup');
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main();
} 