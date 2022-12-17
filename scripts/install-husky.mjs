/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import ci from 'ci-info';
import { execaCommandSync } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectPath = path.resolve(__dirname, `..`);

const options = {
    cwd: projectPath
};
try {
    if (ci.isCI) {
        console.log('The name of the CI server is:', ci.name);
    } else {
        console.log('Installing husky hooks');

        const { stdout } = execaCommandSync('husky install', options);
        console.log(stdout);

        execaCommandSync('shx rm -rf .git/hooks', options);
        execaCommandSync('shx ln -s ../.husky .git/hooks', options);
    }
} catch (error) {
    console.log(error);
}
