#!/usr/bin/env bun

import { build } from 'bun';
import { existsSync, rmSync, mkdirSync } from 'fs';
import chalk from 'chalk';

console.log(chalk.cyan('🏗️  Building Cold Email CLI with Bun...'));

// Clean dist directory
if (existsSync('dist')) {
  rmSync('dist', { recursive: true });
}
mkdirSync('dist', { recursive: true });

try {
  // Build the main CLI
  await build({
    entrypoints: ['src/cli.ts'],
    outdir: 'dist',
    target: 'node',
    format: 'esm',
    splitting: false,
    minify: false,
    sourcemap: false,
    external: ['ink', 'react', 'chalk', 'commander', 'figlet', 'axios', 'zod']
  });

  // Build each module separately for better tree-shaking
  const modules = ['smartlead', 'instantly', 'salesforge', 'apollo'];
  
  for (const module of modules) {
    await build({
      entrypoints: [`src/modules/${module}/index.ts`],
      outdir: `dist/modules/${module}`,
      target: 'node',
      format: 'esm',
      splitting: false,
      minify: false,
      sourcemap: false,
      external: ['axios', 'zod']
    });
  }

  // Build core utilities
  await build({
    entrypoints: ['src/core/index.ts'],
    outdir: 'dist/core',
    target: 'node',
    format: 'esm',
    splitting: false,
    minify: false,
    sourcemap: false
  });

  console.log(chalk.green('✅ Build completed successfully!'));
  console.log(chalk.gray('📦 Output: dist/'));
  console.log(chalk.gray('🚀 Run: bun dist/cli.js'));

} catch (error) {
  console.error(chalk.red('❌ Build failed:'), error);
  process.exit(1);
} 