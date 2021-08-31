import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildDiffTree from './buildDiffTree.js';
import parsers from './parsers.js';
import getOutputFormat from './formatters/index.js';

const readFile = (file) => {
  const path = resolve(file);
  const extension = extname(path);
  const contentsFile = readFileSync(path, 'utf8');
  return [contentsFile, extension];
}

export default (file1, file2, requiredFormat = 'stylish') => {
  const [contentsFile1, extensionFile1] = readFile(file1);
  const [contentsFile2, extensionFile2] = readFile(file2);
  const dataFile1 = parsers(contentsFile1, extensionFile1);
  const dataFile2 = parsers(contentsFile2, extensionFile2);
  const diffTree = buildDiffTree(dataFile1, dataFile2);
  const outputFormat = getOutputFormat(requiredFormat);
  return outputFormat(diffTree);
};
