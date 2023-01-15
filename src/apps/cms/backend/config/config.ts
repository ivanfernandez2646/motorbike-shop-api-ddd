import { accessSync } from 'fs';
import convictConfig from '../../../../contexts/shared/infrastructure/convict/config';
import { F_OK } from 'constants';

const files: string[] = [];

try {
  const env = convictConfig.get('env');

  accessSync(`${__dirname}/${env}.json`, F_OK);
  files.push(`${__dirname}/${env}.json`);
} catch (e) {}

convictConfig.loadFile(files);

export default convictConfig;
