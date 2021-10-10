import _ from 'lodash';

const tab = '    ';

function getIndent(depth) {
  const indent = tab.repeat(depth);
  return `\n${indent}`;
}

function stringify(values, depth) {
  if (!_.isPlainObject(values)) {
    return `${values}`;
  }
  const indent = getIndent(depth);
  const keysAndValues = Object.entries(values);
  const str = keysAndValues.map(([key, value]) => `${tab}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...str, '}'].join(indent);
}

const diffByKeyType = {
  removed: ({ key, value }, depth) => `  - ${key}: ${stringify(value, depth)}`,
  added: ({ key, value }, depth) => `  + ${key}: ${stringify(value, depth)}`,
  modified: ({ key, value, newValue }, depth) => [
    `  - ${key}: ${stringify(value, depth)}`,
    `  + ${key}: ${stringify(newValue, depth)}`,
  ],
  unmodified: ({ key, value }, depth) => `    ${key}: ${stringify(value, depth)}`,
  nested: ({ key, children }, depth, iter) => `    ${key}: ${iter(children, depth)}`,
};

export default (object) => {
  const iter = (obj, depth) => {
    const indent = getIndent(depth);
    const lines = obj.flatMap((node) => diffByKeyType[node.type](node, depth + 1, iter));
    return ['{', ...lines, '}'].join(indent);
  };
  return iter(object, 0);
};
