'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const replaceAnswer = (res, answer) => {
    console.log('00', typeof res.files);
    const files = JSON.parse(res.files) || [];
    const meta = {
        version: res.version,
        company: res.company,
        projectName: answer.projectName || 'demo',
        platformName: answer.platformName || 'XXX管理系统平台',
        description: answer.description || '管理系统描述',
        author: answer.author || 'shangwenxue'
    };
    return { files, meta };
};

exports.default = replaceAnswer;