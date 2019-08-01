'use strict';

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let init = async () => {
    _inquirer2.default.prompt([{
        name: 'projectName',
        message: 'Please enter the project name: '
    }, {
        name: 'description',
        message: 'Please enter the project description: '
    }, {
        name: 'author',
        message: 'Please enter the author name: '
    }, {
        name: 'platformName',
        message: '请输入管理平台的中文名称，如：XXX管理平台'
    }]).then(async answer => {
        let loading = (0, _ora2.default)('downloading template ...');
        loading.start();
        const projectName = answer.projectName;
        if (!_fs2.default.existsSync(projectName)) {
            const templateName = '';
            (0, _get.downloadLocal)(templateName, projectName).then(res => {
                const files = res.files || [];
                const meta = {
                    version: res.version,
                    company: res.company,
                    projectName,
                    platformName: answer.platformName,
                    description: answer.description,
                    author: answer.author
                };
                const len = files.length;
                const replaceFile = () => {
                    return new Promise((resolve, reject) => {
                        files.forEach((file, sn) => {
                            const fileName = `${projectName}/${file}`;
                            if (_fs2.default.existsSync(fileName)) {
                                const content = _fs2.default.readFileSync(fileName).toString();
                                const result = _handlebars2.default.compile(content)(meta);
                                _fs2.default.writeFileSync(fileName, result);
                                if (sn === len - 1) {
                                    resolve();
                                }
                            }
                        });
                    });
                };
                replaceFile().then(() => {
                    loading.succeed();
                    console.log(_logSymbols2.default.success, _chalk2.default.cyan(`进入项目：cd ${projectName}`));
                    console.log(_logSymbols2.default.success, _chalk2.default.cyanBright(`安装项目依赖：npm run init:install`));
                    console.log(_logSymbols2.default.success, _chalk2.default.cyan(`启动项目：npm run dev:serve`));
                    console.log(_logSymbols2.default.success, _chalk2.default.cyanBright(`打包项目：npm run online:build`));
                    console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                });
            }, () => {
                loading.fail();
            });
        } else {
            //项目已经存在
            console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
        }
    });
};

module.exports = init;