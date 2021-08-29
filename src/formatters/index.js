import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getOutputFormat = (requiredFormat) => {
  const formats = {
    stylish: (tree) => stylish(tree),
    plain: (tree) => plain(tree),
    json: (tree) => json(tree),
  };
  return formats[requiredFormat];
};

export default getOutputFormat;
