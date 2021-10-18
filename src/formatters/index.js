import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatObjDiff = (diffTree, requiredFormat) => {
  if (formatters[requiredFormat] === undefined) {
    throw new Error(`Unknown format "${requiredFormat}"`);
  }
  return formatters[requiredFormat](diffTree);
};

export default formatObjDiff;
