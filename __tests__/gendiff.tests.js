/* eslint operator-linebreak: 0 */
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Сhecking to get the difference between files', () => {
  test('files.json', () => {
    const diff =
      '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2)).toEqual(diff);
  });

  test('files.yaml', () => {
    const diff =
      '{\n- age: 25\n+ age: 24\n  job: driver\n  married: true\n- name: Andrey\n+ name: Sergey\n+ number: 55-55-55\n}';
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yaml');
    expect(gendiff(file1, file2)).toEqual(diff);
  });
});
