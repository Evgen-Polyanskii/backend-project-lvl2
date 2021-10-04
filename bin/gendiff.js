#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2')
  .arguments('<file1> <file2>')
  .option('-f, --format <type>', 'Output format', 'stylish')
  .action((file1, file2, options) => console.log(getDiff(file1, file2, options.format)));

program.parse(process.argv);
