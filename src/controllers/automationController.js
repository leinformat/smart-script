import { launchBrowser } from '../services/browserService.js';
import { config } from '../config/config.js';
import { log, error } from '../utils/logger.js';
import { navigateToLogin, fillLoginForm, closeModal } from '../services/index.js';
import { navigateToProgramation, selectPlan, handleIframe } from '../services/index.js';

export const runAutomation = async () => {
  const { browser, page } = await launchBrowser();

  try {
    log('Navegando al sitio de login...');
    await navigateToLogin(page, `${config.baseUrl+config.loginPath}`);
    
    log('Llenando formulario de login...');
    await fillLoginForm(page, config.username, config.password);

    await closeModal(page);

    log('Login exitoso. Realizando otras acciones...');

    // Agrega aquí más acciones si es necesario
    await navigateToProgramation(page);
    await selectPlan(page);
    await handleIframe(page);

  } catch (err) {
    error(`Error durante la automatización: ${err}`);
  } finally {
    //await browser.close();
    //log('Navegador cerrado.');
  }
};