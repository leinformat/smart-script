import { runAutomation } from './controllers/automationController.js';
import cron from 'node-cron';

// Programar la tarea para que corra todos los días a las 12:40 PM
/*
cron.schedule('40 12 * * *', () => {
  log('Ejecutando la automatización programada...');
  runAutomation();
});
*/

// También puedes ejecutar manualmente si quieres probar ahora mismo
runAutomation();