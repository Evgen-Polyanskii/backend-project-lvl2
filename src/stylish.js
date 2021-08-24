/* eslint implicit-arrow-linebreak: 0 */
import _ from 'lodash';

function getMargins(depth) {
  const marginsSize = 4;
  const indent = ' '.repeat(marginsSize * depth);
  return `\n${indent}`;
}

function stringify(values, depth) {
  if (!_.isPlainObject(values)) {
    return `${values}`;
  }
  const margins = getMargins(depth);
  const keysAndValues = Object.entries(values);
  const str = keysAndValues.map(([key, value]) => `    ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...str, '}'].join(margins);
}

const buildersStr = {
  deleted: ({ key, value }, { depth }) => `  - ${key}: ${stringify(value, depth)}`,
  added: ({ key, value }, { depth }) => `  + ${key}: ${stringify(value, depth)}`,
  modified: ({ key, value, newValue }, { depth }) => [
    `  - ${key}: ${stringify(value, depth)}`,
    `  + ${key}: ${stringify(newValue, depth)}`,
  ],
  unchangeable: ({ key, value }, { depth }) => `    ${key}: ${stringify(value, depth)}`,
  nested: ({ key, children }, { stylishIter, depth }) =>
    `    ${key}: ${stylishIter(children, depth)}`,
};

const getStr = (node, options) => {
  const buildStr = buildersStr[node.type];
  return buildStr(node, options);
};

export default (object) => {
  const iter = (obj, depth) => {
    const margins = getMargins(depth);
    const lines = obj.flatMap((node) => getStr(node, { depth: depth + 1, stylishIter: iter }));
    return ['{', ...lines, '}'].join(margins);
  };
  return iter(object, 0);
};
