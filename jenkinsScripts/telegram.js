import process from "process";
import TelegramBot from 'node-telegram-bot-api';

const chatID = process.argv[2];
const botToken = process.env.botToken;

let LINTER_RESULT = process.argv[3].toString();
let TEST_RESULT = process.argv[4].toString();
let UPDATE_README_RESULT = process.argv[5]
let DEPLOY_RESULT = process.argv[6]

const bot = new TelegramBot(botToken, {polling: true});

console.log(`
    - Linter_stage: ${LINTER_RESULT} \n
    - Test_stage: ${TEST_RESULT} \n
    - Update_Readme_stage: ${UPDATE_README_RESULT} \n
    - Deploy_stage: ${DEPLOY_RESULT}`);
  
  (LINTER_RESULT.toString() === '0') ? LINTER_RESULT = 'Linter se ejecuto correctamente - ✅' : LINTER_RESULT = 'Linter fallo - ❌';
  (TEST_RESULT.toString() === '0') ? TEST_RESULT = 'Test se ejecuto correctamente - ✅' : TEST_RESULT = 'Test fallo - ❌';
  (UPDATE_README_RESULT.toString() === '0') ? UPDATE_README_RESULT = 'Update_Readme se ejecuto correctamente - ✅' : UPDATE_README_RESULT = 'Update_readme fallo - ❌';
  (DEPLOY_RESULT.toString() === '0') ? DEPLOY_RESULT = 'Deploy Vercel se ejecuto correctamente - ✅' : DEPLOY_RESULT = 'Deploy ha fallado - ❌';
  
  const msg = `Se ejecuto la pipelino con los siguientes resultados: \n 
  - Linter_stage: ${LINTER_RESULT} \n
  - Tests_stage: ${TEST_RESULT} \n
  - Update_Readme_stage: ${UPDATE_README_RESULT} \n
  - Deploy_to_Vercel_stage: ${DEPLOY_RESULT}`;
  
  bot.sendMessage(chatID, msg)
    .then(() => {
      console.log('Message sent');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });