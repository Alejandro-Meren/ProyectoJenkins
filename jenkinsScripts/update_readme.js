import { promises as fs } from 'fs';
import process from 'node:process';

async function main() {
    try {        
        const resultado_test = process.env.RESULTADO_TEST_JEST;
        console.log('Los resultdos de los test son los siguientes: ', resultado_test);
        
        const img_error = 'https://img.shields.io/badge/test-failure-red';
        const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
        const badge = resultado_test === '0' ? img_exit : img_error;
        const mensaje_badge = `RESULTADO DE LOS ULTIMOS TESTS \n ![Test result badge](${badge})`;

        const oldReadmePath = './OldREADME.md';
        let oldReadmeContent = await fs.readFile(oldReadmePath, 'utf-8');
        let newReadmeContent = mensaje_badge + "\n" + oldReadmeContent;
        const readmePath = './README.md';
        await fs.writeFile(readmePath, newReadmeContent);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

}

main();