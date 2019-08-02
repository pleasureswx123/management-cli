'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _package = require('../../package.json');

var VERSION = exports.VERSION = _package.version;

var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

var RC = exports.RC = HOME + '/.vkdmcrc';

var DEFAULTS = exports.DEFAULTS = {
    registry: 'github:pleasureswx123/managementScaffold',
    type: 'users',
    version: _package.version,
    company: 'companyName',
    files: ['README.md', 'package.json', 'vue.config.js', 'agile.yaml', 'public/index.html', 'src/config/hosts.js', 'src/config/constant.js', 'src/config/baseConfig.js']
};