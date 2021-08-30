import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Сhecking to get the difference between files', () => {
  test('Expansion .json and format stylish', () => {
    const file1 = getFixturePath('before1.json');
    const file2 = getFixturePath('before2.json');
    const diff = readFileSync(getFixturePath('stylishResult1'), 'utf8');
    expect(getDiff(file1, file2)).toEqual(diff);
  });

  test('Expansion .yaml and format stylish', () => {
    const file1 = getFixturePath('before1.yml');
    const file2 = getFixturePath('before2.yaml');
    const diff = readFileSync(getFixturePath('stylishResult2'), 'utf8');
    expect(getDiff(file1, file2)).toEqual(diff);
  });

  test('Checking the output in the format plain', () => {
    const file1 = getFixturePath('before1.json');
    const file2 = getFixturePath('before2.json');
    const diff = readFileSync(getFixturePath('plainResult'), 'utf8');
    expect(getDiff(file1, file2, 'plain')).toEqual(diff);
  });

  test('Checking the output in the format json', () => {
    const file1 = getFixturePath('before3.yml');
    const file2 = getFixturePath('before4.yml');
    const diff = readFileSync(getFixturePath('jsonResult'), 'utf8');
    expect(getDiff(file1, file2, 'json')).toEqual(diff);
  });
});
