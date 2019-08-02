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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var init = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
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
                        }]).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                                var loading, projectName, templateName;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                loading = (0, _ora2.default)('downloading template ...');

                                                loading.start();
                                                projectName = answer.projectName;

                                                if (!_fs2.default.existsSync(projectName)) {
                                                    templateName = '';

                                                    (0, _get.downloadLocal)(templateName, projectName).then(function (res) {
                                                        var files = res.files || [];
                                                        var meta = {
                                                            version: res.version,
                                                            company: res.company,
                                                            projectName: projectName,
                                                            platformName: answer.platformName,
                                                            description: answer.description,
                                                            author: answer.author
                                                        };
                                                        var len = files.length;
                                                        var replaceFile = function replaceFile() {
                                                            return new Promise(function (resolve, reject) {
                                                                files.forEach(function (file, sn) {
                                                                    var fileName = projectName + '/' + file;
                                                                    if (_fs2.default.existsSync(fileName)) {
                                                                        var content = _fs2.default.readFileSync(fileName).toString();
                                                                        var result = _handlebars2.default.compile(content)(meta);
                                                                        _fs2.default.writeFileSync(fileName, result);
                                                                        if (sn === len - 1) {
                                                                            resolve();
                                                                        }
                                                                    }
                                                                });
                                                            });
                                                        };
                                                        replaceFile().then(function () {
                                                            loading.succeed();
                                                            console.log(_logSymbols2.default.success, _chalk2.default.cyan('\u8FDB\u5165\u9879\u76EE\uFF1Acd ' + projectName));
                                                            console.log(_logSymbols2.default.success, _chalk2.default.cyanBright('\u5B89\u88C5\u9879\u76EE\u4F9D\u8D56\uFF1Anpm run init:install'));
                                                            console.log(_logSymbols2.default.success, _chalk2.default.cyan('\u542F\u52A8\u9879\u76EE\uFF1Anpm run dev:serve'));
                                                            console.log(_logSymbols2.default.success, _chalk2.default.cyanBright('\u6253\u5305\u9879\u76EE\uFF1Anpm run online:build'));
                                                            console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                                                        });
                                                    }, function () {
                                                        loading.fail();
                                                    });
                                                } else {
                                                    //项目已经存在
                                                    console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
                                                }

                                            case 4:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = init;