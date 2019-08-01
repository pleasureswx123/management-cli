'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadLocal = undefined;

var _rc = require('./rc');

var _constants = require('./constants');

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = exports.downloadLocal = async (templateName, projectName) => {
    const config = await (0, _rc.getAll)();
    const api = `${config.registry || _constants.DEFAULTS.registry}`;
    // [github/gitlab/Bitbucket]:[账户名]/[仓库名]
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(api, projectName, { clone: true }, err => {
            if (err) {
                reject(err);
            }
            resolve(config);
        });
    });
};