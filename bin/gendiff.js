#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import getDifference from '../src/getDifference.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('v0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format')
  .action((filepath1, filepath2) => {
    const path1 = resolve(filepath1);
    const path2 = resolve(filepath2);
    const file1 = readFileSync(path1, 'utf8');
    const file2 = readFileSync(path2, 'utf8');
    console.log(getDifference(file1, file2));
  });

program.parse(process.argv);
