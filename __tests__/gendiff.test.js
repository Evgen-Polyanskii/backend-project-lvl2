import getDiff from '../index.js';
import { getFixturePath, getFixture } from './utils.js';

const formatFiles = [
  'json',
  'yml',
];

const resultsOfTest = {
  stylish: getFixture('result_stylish.txt'),
  plain: getFixture('result_plain.txt'),
  json: getFixture('result_json.json'),
};

describe('Проверка gendiff', () => {
  describe.each(formatFiles)('для файлов в формамте %s', (formatFile) => {
    const filepath1 = getFixturePath(`file1.${formatFile}`);
    const filepath2 = getFixturePath(`file2.${formatFile}`);

    it('формат вывода по умолчанию', () => {
      expect(getDiff(filepath1, filepath2)).toEqual(resultsOfTest.stylish);
    });

    it.each(Object.keys(resultsOfTest))('формат вывода %s', (format) => {
      expect(getDiff(filepath1, filepath2, format)).toEqual(resultsOfTest[format]);
    });
  });
});
