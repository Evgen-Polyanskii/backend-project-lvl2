import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  '.yaml': yaml.load,
  '.yml': yaml.load,
  '.json': JSON.parse,
};

export default (data, extension) => {
  if (!_.has(parsers, extension)) {
    throw new Error(`Unknown extension: '${extension}'!`);
  }
  const parse = parsers[extension];
  return parse(data);
};
