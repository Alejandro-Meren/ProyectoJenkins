<!-- # PracticaJenkins

RESULTAT DELS ÚLTIMS TESTS 
![Test result badge](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)

## Introducció a Jenkins

Jenkins és una eina de codi obert per a l'automatització de tasques, especialment útil per a la integració contínua (CI) i el lliurament continu (CD). Ofereix una àmplia gamma de plugins per integrar-se amb diverses tecnologies com GitHub, Docker i Kubernetes.

### Funcionalitats de Jenkins:

- Creació de projectes.
- Proves i lliurament de programari.
- Implementació automatitzada.

Jenkins ajuda els desenvolupadors a detectar errors en etapes primerenques del cicle de desenvolupament, millorant així la qualitat del programari.

## Configuració de la Pipeline a Jenkins

### Pas 1: Accés a Jenkins

Accedeix a Jenkins a través de "localhost:8080" si està configurat així en el teu "docker-compose.yml".

### Pas 2: Crear una nova tasca

A la pantalla principal de Jenkins, selecciona "Nova Tasca" i assigna-li un nom. Tria "Pipeline" com a tipus de tasca.

### Pas 3: Configuració de paràmetres

Configura la pipeline per acceptar paràmetres, seleccionant "Paràmetres de cadena" per a les entrades de text.

### Pas 4: Vinculació amb GitHub

Configura el repositori de GitHub amb l'enllaç correcte i la branca amb la qual treballaràs. Assegura't d'utilitzar les credencials correctes.

### Pas 5: Definir el script de la Pipeline

Defineix les etapes de la pipeline en el fitxer `Jenkinsfile`:

```groovy
pipeline {
    agent any
    environment {
        vercelToken = credentials('vercel-token')
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Alejandro-Meren/ProyectoJenkins.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to Vercel') {
            steps {
                sh 'npm i -g vercel'
                sh 'node jenkinsScripts/deploy.js'
            }
        }
    }
    post {
        always {
            script {
                def chatId = '1454622548'
                def message = "La pipeline ha finalitzat."
                sh "node jenkinsScripts/telegram.js ${chatId} ${message}"
            }
        }
    }
}

### Pas 6: Instal·lar el plugin Build Monitor View
Instal·la el plugin des de l'apartat "Administrar Jenkins" > "Plugins" > "Available plugins".

Pas 7: Creació de la pràctica Jenkins
Crea una branca "ci_jenkins" per treballar sense afectar la branca principal.

Pas 8: Petició de dades
Utilitza el següent element per a la petició de dades al Jenkinsfile:

parameters {
    string(name: 'executor', defaultValue: 'default', description: 'Executor de la pipeline')
    string(name: 'motiu', defaultValue: 'default', description: 'Motiu de l'execució')
}

Pas 9: Linter Stage
Configura el linter per revisar el codi i assegurar que compleix amb les regles establertes.

Pas 10: Test Stage
Realitza tests simples sobre la funció "handler" ubicada en el fitxer "pages/api/users/index.js".

Pas 11: Build Stage
Crea una versió empaquetada del projecte per desplegar-lo a Vercel.

Pas 12: Update Readme
Utilitza el següent script per actualitzar el README.md:

const fs = require('fs');
const path = require('path');

const badge = process.argv[2] === 'success' ? '![Test result badge](https://img.shields.io/badge/tests-passing-brightgreen.svg)' : '![Test result badge](https://img.shields.io/badge/tests-failing-red.svg)';

const readmePath = path.join(__dirname, '../README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const updatedContent = readmeContent.replace(/RESULTAT DELS ÚLTIMS TESTS .*/, `RESULTAT DELS ÚLTIMS TESTS ${badge}`);

fs.writeFileSync(readmePath, updatedContent);

Pas 13: Push Changes
Afegeix els canvis, fes commit i push al repositori remot.

Pas 14: Deploy to Vercel
Desplega el projecte a Vercel utilitzant les credencials configurades.

Pas 15: Notificació Telegram
Utilitza un token de Telegram per enviar notificacions al bot amb el resultat de la pipeline. -->