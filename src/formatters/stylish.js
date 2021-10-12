import _ from 'lodash';

const tab = '    ';

const wrap = (lines, openingCurlyBrace, closingCurlyBrace, indent) => (
  [openingCurlyBrace, ...[...lines, closingCurlyBrace].map((line) => `${indent}${line}`)].join('\n')
);

const getIndent = (depth) => {
  const indent = tab.repeat(depth);
  return indent;
};

const stringify = (values, depth) => {
  if (!_.isPlainObject(values)) {
    return `${values}`;
  }
  const indent = getIndent(depth);
  return wrap(Object.entries(values)
    .map(([key, value]) => `${tab}${key}: ${stringify(value, depth + 1)}`), '{', '}', indent);
};

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
    return wrap(obj.flatMap((node) => diffByKeyType[node.type](node, depth + 1, iter)), '{', '}', indent);
  };
  return iter(object, 0);
};
