import {getAll} from './rc';
import {DEFAULTS} from './constants';
import downloadGit from 'download-git-repo';

export const downloadLocal = async (templateName, projectName) => {
    const config = await getAll();
    const api = `${config.registry || DEFAULTS.registry}`;
    // [github/gitlab/Bitbucket]:[账户名]/[仓库名]
    return new Promise((resolve, reject) => {
        downloadGit(api, projectName, {clone: true}, (err) => {
            if (err) {
                reject(err);
            }
            resolve(config);
        });
    });
}
