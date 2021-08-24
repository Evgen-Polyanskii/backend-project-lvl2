import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default (properties) => {
  const pathToFile = resolve(__dirname, '../', 'package.json');
  const file = readFileSync(pathToFile, 'utf8');
  const parseFile = JSON.parse(file);
  return parseFile[properties];
};
