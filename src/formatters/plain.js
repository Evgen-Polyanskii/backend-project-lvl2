import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getFullKey = (parent, key) => (parent ? `${parent}.${key}` : key);

const buildersStr = {
  removed: ({ key }, { parent }) => `Property '${getFullKey(parent, key)}' was removed`,
  added: ({ key, value }, { parent }) => (
    `Property '${getFullKey(parent, key)}' was added with value: ${stringify(value)}`
  ),
  modified: ({ key, value, newValue }, { parent }) => (
    `Property '${getFullKey(parent, key)}' was updated. From ${stringify(value)} to ${stringify(newValue)}`
  ),
  nested: ({ key, children }, { plainIter, parent }) => (
    plainIter(children, getFullKey(parent, key))
  ),
};

const getStr = (node, options) => {
  const buildStr = buildersStr[node.type];
  return buildStr(node, options);
};

const plain = (diff) => {
  const iter = (obj, parent) => {
    const lines = obj
      .filter((node) => node.type !== 'unchangeable')
      .flatMap((node) => getStr(node, { parent, plainIter: iter }));
    return lines.join('\n');
  };
  return iter(diff, null);
};

export default plain;
