/* eslint operator-linebreak: 0 */
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import getDifference from '../src/getDifference';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Сhecking to get the difference between files', () => {
  test('files.json', () => {
    const diff =
      '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
    const file1 = readFileSync(getFixturePath('file1.json'), 'utf-8');
    const file2 = readFileSync(getFixturePath('file2.json'), 'utf-8');
    expect(getDifference(file1, file2)).toEqual(diff);
  });

  test('files.yaml', () => {
    const diff =
      '{\n- name: Andrey\n+ name: Sergey\n- age: 25\n+ age: 24\n  married: true\n  job: driver\n+ number: 55-55-55}';
    const file1 = readFileSync(getFixturePath('file1.yml'), 'utf-8');
    const file2 = readFileSync(getFixturePath('file2.yaml'), 'utf-8');
    expect(getDifference(file1, file2)).toEqual(diff);
  });
});
