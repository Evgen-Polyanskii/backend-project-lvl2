import _ from 'lodash';

export default (object1, object2) => {
  const keysFromFile1 = Object.keys(object1);
  const keysFromFile2 = Object.keys(object2);
  const keys = _.union(keysFromFile1.concat(keysFromFile2));
  const sortKeys = _.sortBy(keys);
  const diff = sortKeys.reduce((acc, key) => {
    if (keysFromFile1.includes(key) && !keysFromFile2.includes(key)) {
      acc.push(`- ${key}: ${object1[key]}\n`);
      return acc;
    }
    if (!keysFromFile1.includes(key) && keysFromFile2.includes(key)) {
      acc.push(`+ ${key}: ${object2[key]}\n`);
      return acc;
    }
    if (object1[key] !== object2[key]) {
      acc.push(`- ${key}: ${object1[key]}\n+ ${key}: ${object2[key]}\n`);
      return acc;
    }
    acc.push(`  ${key}: ${object1[key]}\n`);
    return acc;
  }, []);
  return `{\n${diff.join('')}}`;
};
