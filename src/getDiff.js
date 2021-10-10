import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parse.js';
import getFormater from './formatters/index.js';

const readFile = (file) => {
  const fullPath = resolve(file);
  const fileContent = readFileSync(fullPath, 'utf8');
  return fileContent;
};

const getFileData = (file) => {
  const fileContent = readFile(file);
  const fileExtension = extname(file);
  const fileData = parse(fileContent, fileExtension);
  return fileData;
};

export default (file1, file2, requiredFormat = 'stylish') => {
  const dataFile1 = getFileData(file1);
  const dataFile2 = getFileData(file2);
  const diffTree = buildDiffTree(dataFile1, dataFile2);
  return getFormater(diffTree, requiredFormat);
};
