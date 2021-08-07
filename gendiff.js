#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('v0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
