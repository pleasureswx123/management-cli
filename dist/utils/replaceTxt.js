"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const f = res => {
    const files = JSON.parse(res.files) || [];
    const meta = {
        version: res.version,
        company: res.company,
        projectName,
        platformName: answer.platformName,
        description: answer.description,
        author: answer.author
    };
    return { files, meta };
};

exports.default = f;