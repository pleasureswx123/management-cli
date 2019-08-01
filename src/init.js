import {downloadLocal, get} from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import handlebars from 'handlebars';
import symbol from 'log-symbols';

let init = async () => {
    inquirer.prompt([
        {
            name: 'projectName',
            message: 'Please enter the project name: '
        },
        {
            name: 'description',
            message: 'Please enter the project description: '
        },
        {
            name: 'author',
            message: 'Please enter the author name: '
        },
        {
            name: 'platformName',
            message: '请输入管理平台的中文名称，如：XXX管理平台'
        }
    ]).then(async (answer) => {
        let loading = ora('downloading template ...');
        loading.start();
        const projectName = answer.projectName;
        if (!fs.existsSync(projectName)) {
            const templateName = '';
            downloadLocal(templateName, projectName).then((res) => {
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
                            if (fs.existsSync(fileName)) {
                                const content = fs.readFileSync(fileName).toString();
                                const result = handlebars.compile(content)(meta);
                                fs.writeFileSync(fileName, result);
                                if (sn === len - 1) {
                                    resolve();
                                }
                            }
                        });
                    })
                };
                replaceFile().then(() => {
                    loading.succeed();
                    console.log(symbol.success, chalk.cyan(`进入项目：cd ${projectName}`));
                    console.log(symbol.success, chalk.cyanBright(`安装项目依赖：npm run init:install`));
                    console.log(symbol.success, chalk.cyan(`启动项目：npm run dev:serve`));
                    console.log(symbol.success, chalk.cyanBright(`打包项目：npm run online:build`));
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                });
            }, () => {
                loading.fail();
            });
        } else {
            //项目已经存在
            console.log(symbol.error, chalk.red('The project already exists'));
        }
    });
}

module.exports = init;
