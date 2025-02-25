import { launchBrowser } from '../services/browserService.js';
import { config } from '../config/config.js';
import { formatData } from '../utils/formatData.js';
import { error,log } from '../utils/logger.js';
import { wait } from '../utils/wait.js';
import { updateSheet } from "../services/google/sheets.js";

import {
  navigateToLogin,
  fillLoginForm,
  closeModal,
  navigateToProgramation,
  selectPlan,
  handleIframe,
  getSheets,
} from "../services/index.js";


export const runAutomation = async () => {
  try {
    // Obtener los datos de la hoja de cálculo
    const sheets = await getSheets({
      spreadsheetId: config.googleCredentials.sheetID,
      range: config.googleCredentials.range,
    });

    const { formattedData } = formatData(sheets);
    console.log(formattedData);

    for (const classData of formattedData) {
      const { browser, page } = await launchBrowser();

      log("Navegando al sitio de login...");
      await navigateToLogin(page, `${config.baseUrl + config.loginPath}`);

      log("Llenando formulario de login...");

      const userData = config.usersData[1];
      await fillLoginForm(page, userData.username, userData.password);

      await closeModal(page);

      log("Login exitoso. Realizando otras acciones...");

      // Add more actions if needed
      await navigateToProgramation(page);
      await selectPlan(page);
      
      await wait(3000);

      const { error } = await handleIframe({ page, classes: classData });

      if (!error){
        console.log('NO ERROR',error)
        await updateSheet({ spreadsheetId: config.googleCredentials.sheetID, data: classData });
       }else{
        console.log('WAS AN ERROR', error)
       };

       await browser.close();
    }

  } catch (err) {
    error(`Error durante la automatización---> thgis: ${err}`);
  } 
};