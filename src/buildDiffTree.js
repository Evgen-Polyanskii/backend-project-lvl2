import _ from 'lodash';

const buildDiffTree = (object1, object2) => {
  const keysFromFile1 = Object.keys(object1);
  const keysFromFile2 = Object.keys(object2);
  const sortKeys = _.sortBy(_.union(keysFromFile1, keysFromFile2));
  return sortKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!_.has(object2, key)) {
      return { key, value: value1, type: 'removed' };
    }
    if (!_.has(object1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchangeable' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiffTree(value1, value2) };
    }
    return {
      key, value: value1, newValue: value2, type: 'modified',
    };
  });
};

export default buildDiffTree;
