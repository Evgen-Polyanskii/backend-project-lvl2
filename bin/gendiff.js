#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../index.js';
import getProjectProperties from '../src/getProjectProperties.js';

const program = new Command();

program
  .description(getProjectProperties('description'))
  .version(getProjectProperties('version'))
  .arguments('<file1> <file2>')
  .option('-f, --format <type>', 'Output format', 'stylish')
  .action((file1, file2) => console.log(getDiff(file1, file2, program.opts().format)));

program.parse(process.argv);
