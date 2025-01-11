import { exec } from 'child_process';
import process from 'process';

const vercelToken = process.env.vercelToken;

exec(`vercel --token ${vercelToken} --prod --yes`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error durante el despliegue: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Despliegue fallido: ${stderr}`);
        return;
    }

    console.log(`Despliegue correcto: ${stdout}`);
});