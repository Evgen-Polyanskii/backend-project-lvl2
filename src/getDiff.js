import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parse.js';
import formatObjDiff from './formatters/index.js';

const readFile = (file) => readFileSync(resolve(file), 'utf8');

const getFileData = (file) => {
  const fileContent = readFile(file);
  const fileExtension = extname(file).slice(1);
  return parse(fileContent, fileExtension);
};

export default (file1, file2, requiredFormat = 'stylish') => {
  const dataFile1 = getFileData(file1);
  const dataFile2 = getFileData(file2);
  const diffTree = buildDiffTree(dataFile1, dataFile2);
  return formatObjDiff(diffTree, requiredFormat);
};
