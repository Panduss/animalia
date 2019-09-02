import { ConfigTemplate } from './template';
import { projectConfig } from '../environments/environment';

// @TODO look into why is the complaining about "require"
declare var require: any;

const AppConfig = require('./' + projectConfig).default;

export const AppCustomConfig = AppConfig as ConfigTemplate;
