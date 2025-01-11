import { exec } from 'child_process';
import process, { argv, exit } from 'process';

const executor = argv[2];
const motivo = argv[3];

const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                console.error(`Error executing command: ${command}`, error);
                reject(error);
            } else {
                console.log(`Command executed successfully: ${command}`);
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
};

const pushChanges = async () => {
    const githubUser = process.env.github_USR;
    const githubPassword = process.env.github_PSW;

    const gitUsername = `Nekk`;
    const gitUserEmail = "timeresdios@gmail.com";
    try {
        console.log('configurando git');
        await executeCommand(`git config --global user.name "${gitUsername}"`);
        await executeCommand(`git config --global user.email "${gitUserEmail}"`);

        await executeCommand('git add .');
        await executeCommand(`git commit -m "${commitMessage}"`);
        await executeCommand(`git remote remove origin`);
        await executeCommand(`git remote add origin https://${githubUser}:${githubPassword}@github.com/N333kk/practicajenkins.git`);
        await executeCommand(`git remote set-url origin https://${githubUser}:${githubPassword}@github.com/N333kk/practicajenkins.git`);
        await executeCommand('git push origin HEAD:ci_jenkins');
        console.log('Changes pushed successfully.');
    } catch (error) {
        console.error('Failed to push changes:', error);
        exit(1);
    }
};

pushChanges();