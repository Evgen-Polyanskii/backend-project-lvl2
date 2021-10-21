import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  'yaml': yaml.load,
  'yml': yaml.load,
  'json': JSON.parse,
};

export default (data, format) => {
  if (!_.has(parsers, format)) {
    throw new Error(`Unknown extension: '${format}'!`);
  }
  const parse = parsers[format];
  return parse(data);
};
