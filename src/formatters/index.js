import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormater = (diffTree, requiredFormat) => {
  const formatters = {
    stylish,
    plain,
    json,
  };

  if (formatters[requiredFormat] === undefined) {
    throw new Error(`Unknown format "${requiredFormat}"`);
  }
  return formatters[requiredFormat](diffTree);
};

export default getFormater;
