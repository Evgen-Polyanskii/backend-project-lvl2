import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => readFileSync(filePath, 'utf8');
const getFixture = (fileName) => readFile(getFixturePath(fileName));

export { getFixturePath, getFixture };
