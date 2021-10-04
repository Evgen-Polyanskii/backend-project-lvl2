import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parse.js';
import getOutputFormat from './formatters/index.js';

const readFile = (file) => {
  const path = resolve(file);
  const format = extname(path);
  const contentsFile = readFileSync(path, 'utf8');
  return [contentsFile, format];
};

export default (file1, file2, requiredFormat = 'stylish') => {
  const [contentsFile1, formatFile1] = readFile(file1);
  const [contentsFile2, formatFile2] = readFile(file2);
  const dataFile1 = parse(contentsFile1, formatFile1);
  const dataFile2 = parse(contentsFile2, formatFile2);
  const diffTree = buildDiffTree(dataFile1, dataFile2);
  const outputFormat = getOutputFormat(requiredFormat);
  return outputFormat(diffTree);
};
