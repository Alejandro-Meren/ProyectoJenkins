// import { exec } from 'child_process';
// import process, { argv, exit } from 'process';

// const executor = argv[2];
// const motivo = argv[3];

// const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

// const executeCommand = (command) => {
//     return new Promise((resolve, reject) => {
//         exec(command, (error, stdout) => {
//             if (error) {
//                 console.error(`Error executing command: ${command}`, error);
//                 reject(error);
//             } else {
//                 console.log(`Command executed successfully: ${command}`);
//                 console.log(stdout);
//                 resolve(stdout);
//             }
//         });
//     });
// };

// const pushChanges = async () => {
//     const githubUser_Alejandro = process.env.github_token_USR;
//     const githubPassword_Alejandro = process.env.github_token_PSW;

//     const gitUsername = `Alejandro`;
//     const gitUserEmail = "alemeco2005@gmail.com";
//     try {
//         console.log('configurando git');
//         await executeCommand(`git config --global user.name "${gitUsername}"`);
//         await executeCommand(`git config --global user.email "${gitUserEmail}"`);

//         await executeCommand('git add .');
//         await executeCommand(`git commit -m "${commitMessage}"`);
//         await executeCommand(`git remote remove origin`);
//         await executeCommand(`git remote add origin https://${githubUser_Alejandro}:${githubPassword_Alejandro}@github.com/Alejandro-Meren/ProyectoJenkins.git`);
//         await executeCommand(`git remote set-url origin https://${githubUser_Alejandro}:${githubPassword_Alejandro}@github.com/Alejandro-Meren/ProyectoJenkins.git`);
//         await executeCommand('git push origin HEAD:ci_jenkins');
//         console.log('Changes pushed successfully.');
//     } catch (error) {
//         console.error('Failed to push changes:', error);
//         exit(1);
//     }
// };

// pushChanges();
import { exec } from 'child_process';
import process, { argv, exit } from 'process';

const usuario = argv[2];
const motivo = argv[3];

const commitMessage = `Pipeline va a ser ejecutada por ${usuario}. El motivo es: ${motivo}`;

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el comando: ${command}`, error);
                reject(error);
            } else {
                console.log(`El comando ha sido realizado correctamente: ${command}`);
                console.log(stdout);
                resolve({ stdout, stderr });
            }
        });
    });
};

const pushChanges = async () => {
    const githubUser_Alejandro = process.env.github_token_USR;
    const githubPassword_Alejandro = process.env.github_token_PSW;

    const gitUsername_Alejandro = `Alejandro`;
    const gitUserEmail_Alejandro = "alemeco2005@gmail.com";
    try {
        console.log('configurando git');
        await executeCommand(`git config --global user.name "${gitUsername_Alejandro}"`);
        await executeCommand(`git config --global user.email "${gitUserEmail_Alejandro}"`);

        await executeCommand('git add .');
        const { stdout: statusBefore } = await executeCommand('git status');

        if (!statusBefore.includes('Nada para hacer el commit')) {
        await executeCommand(`git commit -m "${commitMessage}"`);

        await executeCommand(`git remote remove origin`);
        await executeCommand(`git remote add origin https://${githubUser_Alejandro}:${githubPassword_Alejandro}@github.com/N333kk/practicajenkins.git`);
        await executeCommand(`git remote set-url origin https://${githubUser_Alejandro}:${githubPassword_Alejandro}@github.com/N333kk/practicajenkins.git`);
        await executeCommand('git push origin HEAD:ci_jenkins');
        console.log('Cambios subido correctamente.');
        } else {
        console.log('No hay cambios para subir.');
        }
    } catch (error) {
        console.error('Error al subir los cambios', error);
        exit(1);
    }
};

pushChanges();