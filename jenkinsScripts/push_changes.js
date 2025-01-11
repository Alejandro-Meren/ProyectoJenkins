import { exec } from 'child_process';
import process from 'process';

const usuario = process.argv[2];
const motivo = process.argv[3];

function ejecutarComando(comando) {
    return new Promise((resolve, reject) => {
        exec(comando, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el comando: ${comando} Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Error al ejecutar el comando: ${comando} Stderr: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(`El comando ha sido realizado correctamente: ${comando}`);
            resolve(stdout);
        });
    });
}

async function main() {
    try {
        await ejecutarComando('git config --global user.name "Alejandro"');
        await ejecutarComando('git config --global user.email "alemeco2005@gmail.com"');
        await ejecutarComando('git add .');

        const status = await ejecutarComando('git status');
        if (status.includes('nothing to commit, working tree clean')) {
            console.log('No hay cambios para hacer.');
            return;
        }

        await ejecutarComando(`git commit -m "Pipeline va a ser ejecutada por ${usuario}. El motivo es: ${motivo}"`);
        await ejecutarComando('git push origin ci_jenkins');
    } catch (error) {
        console.error('Error al subir los cambios', error);
    }
}

main();