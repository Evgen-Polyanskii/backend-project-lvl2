import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildDiffTree from './buildDiffTree.js';
import parsers from './parsers.js';
import getOutputFormat from './formatters/index.js';

const getPathToFileAndFormat = (file) => {
  const path = resolve(file);
  const format = extname(path);
  return [path, format];
};

const getFileContents = (file) => readFileSync(file, 'utf8');

export default (file1, file2, requiredFormat = 'stylish') => {
  const [filePath1, formatFile1] = getPathToFileAndFormat(file1);
  const [filePath2, formatFile2] = getPathToFileAndFormat(file2);
  const contentsFile1 = getFileContents(filePath1);
  const contentsFile2 = getFileContents(filePath2);
  const parseFile1 = parsers(contentsFile1, formatFile1);
  const parseFile2 = parsers(contentsFile2, formatFile2);
  const diffTree = buildDiffTree(parseFile1, parseFile2);
  const outputFormat = getOutputFormat(requiredFormat);
  return outputFormat(diffTree);
};
