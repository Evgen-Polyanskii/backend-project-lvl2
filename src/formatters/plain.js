import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getPropertyName = (key, pathToParents) => (pathToParents ? `${pathToParents}.${key}` : key);

const buildersStr = {
  removed: ({ key }, pathToParents) => `Property '${getPropertyName(key, pathToParents)}' was removed`,
  added: ({ key, value }, pathToParents) => (
    `Property '${getPropertyName(key, pathToParents)}' was added with value: ${stringify(value)}`
  ),
  modified: ({ key, value, newValue }, pathToParents) => (
    `Property '${getPropertyName(key, pathToParents)}' was updated. From ${stringify(value)} to ${stringify(newValue)}`
  ),
  nested: ({ key, children }, pathToParents, iter) => (
    iter(children, getPropertyName(key, pathToParents))
  ),
};

const plain = (diff) => {
  const iter = (diffArr, parent) => {
    const lines = diffArr
      .filter((node) => node.type !== 'unmodified')
      .flatMap((node) => buildersStr[node.type](node, parent, iter));
    return lines.join('\n');
  };
  return iter(diff, null);
};

export default plain;
