import { exec } from 'child_process';
import process from 'process';

const vercelToken = process.env.vercelToken;

exec(`vercel --token ${vercelToken} --prod --yes --name proyectojenkins`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during deployment: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Deployment stderr: ${stderr}`);
        return;
    }

    console.log(`Deployment stdout: ${stdout}`);
});