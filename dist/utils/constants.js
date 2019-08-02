'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _package = require('../../package.json');

const VERSION = exports.VERSION = _package.version;

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const RC = exports.RC = `${HOME}/.vkdmcrc`;

const DEFAULTS = exports.DEFAULTS = {
    registry: 'github:pleasureswx123/managementScaffold',
    type: 'users',
    version: _package.version,
    company: 'companyName',
    files: ['README.md', 'package.json', 'vue.config.js', 'agile.yaml', 'public/index.html', 'src/config/hosts.js', 'src/config/constant.js', 'src/config/baseConfig.js']
};