import process from "process";
import TelegramBot from 'node-telegram-bot-api';

const chatID = process.argv[2];
const botTelegramToken = process.env.botTelegramToken;

let LINTER_RESULT = process.argv[3].toString();
let TEST_RESULT = process.argv[4].toString();
let UPDATE_README_RESULT = process.argv[5]
let DEPLOY_RESULT = process.argv[6]

const bot = new TelegramBot(botTelegramToken, {polling: true});

console.log(`
    - Linter_stage: ${LINTER_RESULT} \n
    - Test_stage: ${TEST_RESULT} \n
    - Update_Readme_stage: ${UPDATE_README_RESULT} \n
    - Deploy_stage: ${DEPLOY_RESULT}`);
  
  (LINTER_RESULT.toString() === '0') ? LINTER_RESULT = ' El Linter se ha ejecutado correctamente - 💪' : LINTER_RESULT = ' El Linter se ha ejecutado indebidamente - 👎';
  (TEST_RESULT.toString() === '0') ? TEST_RESULT = ' El Test se ha ejecutado correctamente - 💪' : TEST_RESULT = ' El Test se ha ejecutado indebidamente - 👎';
  (UPDATE_README_RESULT.toString() === '0') ? UPDATE_README_RESULT = ' El Update_Readme se ha ejecutado correctamente - 💪' : UPDATE_README_RESULT = ' El Update_readme se ha ejecutado indebidamente - 👎';
  (DEPLOY_RESULT.toString() === '0') ? DEPLOY_RESULT = ' El Deploy Vercel se ha ejecutado correctamente - 💪' : DEPLOY_RESULT = ' El Deploy se ha ejecutado indebidamente - 👎';
  
  const msg = `La pipeline ha sacado los siguientes resultados:  \n 
  - Linter: ${LINTER_RESULT} \n
  - Tests: ${TEST_RESULT} \n
  - Update_Readme: ${UPDATE_README_RESULT} \n
  - Deploy_to_Vercel: ${DEPLOY_RESULT}`;
  
  bot.sendMessage(chatID, msg)
    .then(() => {
      console.log('Mensaje enviado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });