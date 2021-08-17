#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('v0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format')
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)));

program.parse(process.argv);
