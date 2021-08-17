import yaml from 'js-yaml';

export default (data, format) => {
  if (format === '.yml' || format === '.yaml') {
    const parse = yaml.load;
    return parse(data);
  }
  return JSON.parse(data);
};
