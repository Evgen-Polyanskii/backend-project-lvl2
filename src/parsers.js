import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  '.yaml': (data) => yaml.load(data),
  '.yml': (data) => yaml.load(data),
  '.json': (data) => JSON.parse(data),
};

export default (data, extension) => {
  if (!_.has(parsers, extension)) {
    throw new Error(`Unknown extension: '${extension}'!`);
  }
  const parser = parsers[extension];
  return parser(data);
};
