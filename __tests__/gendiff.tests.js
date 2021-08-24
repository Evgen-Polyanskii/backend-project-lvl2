import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Сhecking to get the difference between files', () => {
  test('Expansion .json and format stylish', () => {
    const file1 = getFixturePath('before1.json');
    const file2 = getFixturePath('before2.json');
    const diff = readFileSync(getFixturePath('after1(json)'), 'utf8');
    expect(gendiff(file1, file2)).toEqual(diff);
  });

  test('Expansion .yaml and format stylish', () => {
    const file1 = getFixturePath('before1.yml');
    const file2 = getFixturePath('before2.yaml');
    const diff = readFileSync(getFixturePath('after1(yaml)'), 'utf8');
    expect(gendiff(file1, file2)).toEqual(diff);
  });
});
