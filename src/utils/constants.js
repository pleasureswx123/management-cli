import {version} from '../../package.json';

export const VERSION = version;

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const RC = `${HOME}/.vkdmcrc`;

export const DEFAULTS = {
    registry: 'github:pleasureswx123/managementScaffold',
    type: 'users',
    version: version,
    company: 'companyName',
    files: ['README.md', 'package.json', 'vue.config.js', 'agile.yaml', 'public/index.html', 'src/config/hosts.js', 'src/config/constant.js', 'src/config/baseConfig.js']
};
