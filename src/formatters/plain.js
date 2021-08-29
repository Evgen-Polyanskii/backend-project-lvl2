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

const buildStr = (node) => {
  switch (node.type) {
    case 'removed':
      return 'removed';
    case 'added':
      return `added with value: ${stringify(node.value)}`;
    case 'modified':
      return `updated. From ${stringify(node.value)} to ${stringify(node.newValue)}`;
    default:
      return null;
  }
};

const getStr = (node, { parent, plainIter }) => {
  if (node.type === 'nested') {
    return plainIter(node.children, getFullKey(parent, node.key));
  }
  return node.type !== 'unchangeable'
    ? `Property '${getFullKey(parent, node.key)}' was ${buildStr(node)}\n`
    : '';
};

const plain = (diff) => {
  const iter = (obj, parent) => {
    const lines = obj.flatMap((node) => getStr(node, { parent, plainIter: iter }));
    return lines.join('');
  };
  return iter(diff, null);
};

export default plain;
