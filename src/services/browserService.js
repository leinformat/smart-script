import puppeteer from 'puppeteer';
import { log } from '../utils/logger.js';

export const launchBrowser = async () => {
  log('Iniciando el navegador...');
  const browser = await puppeteer.launch({
    headless: false, // Puedes configurarlo en true si no necesitas la interfaz gráfica
    args: [
      '--disable-infobars ','--disable-web-security'
    ]
  });
  const page = await browser.newPage();
  return { browser, page };
};