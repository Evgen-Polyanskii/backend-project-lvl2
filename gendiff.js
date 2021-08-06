#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'Output the current version');

program.parse();

const options = program.opts();
if (options.version) {
  console.log('v0.0.1');
}
