import { formatDate } from '../utils/formatDate.js';
import { wait } from '../utils/wait.js';
import { error } from '../utils/logger.js';

export const navigateToProgramation = async (page) => {
  await page.waitForSelector('img#IMAGE18', { visible: true });
  await page.click("img#IMAGE18");
};

export const selectPlan = async (page) => {
  await page.waitForSelector("#W0030Grid1ContainerTbl", { visible: true });
  await page.click("#W0030Grid1ContainerTbl > tbody");
  await page.click("#W0030BUTTON1");
};

const selectClass = async (iframe, className) => {
  await iframe.evaluate(async (className) => {
    const spans = [...document.querySelectorAll("span")]; 
    const finded = spans.find(
      (span) => span.textContent.trim().toLowerCase() === className.toLowerCase().trim()
    );

    if (finded) {
      const tr = finded.closest("tr");
      tr.focus();
      const events = ["mousedown", "mouseout", "click"];
      events.forEach((evento) => {
        const event = new MouseEvent(evento, {
          bubbles: true,
          cancelable: true,
        });
        tr.dispatchEvent(event);
        console.log(`Evento ${evento} disparado en el <tr>`);
      });

      console.log("Haciendo click en Padre:", tr);

      const input = document.querySelector('input[value="Asignar"]');
      console.log(input);

      if (input) {
        input.click();
        tr.focus();
      } else {
        console.log("No se encontró el input");
      }
    }
  }, className);
};

const sheduleIframe = async ({ iframe, FECHA, SEDE }) => {
  const newDate = formatDate(FECHA);
  await iframe.evaluate((newDate, SEDE) => {
    const selects = document.querySelectorAll("select"); // Selecciona el <select>
    console.log(selects)

    for (const select of selects) {
      if (select && select.id === "vREGCONREG") {
        console.log(`Seleccionando ${SEDE} en el <select>`);
        const option = [...select.options].find(
          (opt) => opt.textContent.toLowerCase().trim() === SEDE.toLowerCase().trim()
        );
        
        if (option) {
          select.value = option.value; // Cambia el valor del select
          select.dispatchEvent(new Event("change", { bubbles: true })); // Dispara el evento change
          console.log("Seleccionado:", option.textContent);

        } else {
          console.log("No se encontró la opción SANTAFE");
        }
      } else if (select && select.id === "vDIA") {
        
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });

        const option = [...select.options].find(
          (opt) => opt.textContent.includes(newDate)
        );
        
        if (option) {
          select.value = option.value; // Cambia el valor del select
          select.dispatchEvent(new Event("change", { bubbles: true })); // Dispara el evento change
          console.log("Seleccionado:", option.textContent);
          
        } else {
          console.log("No se encontró la opción SANTAFE");
        }
      }
    }
  },newDate, SEDE);
};

const selectHour = async (iframe, hour) => {
  const selectanHour = await iframe.evaluate(async (hour) => {
    const spans = [...document.querySelectorAll("span")];
    const finded = spans.find((span) => {
      const parentTd = span.closest("td"); // Encuentra el td más cercano
      return (
        span.textContent.toLowerCase().includes(hour.toLowerCase()) &&
        parentTd?.getAttribute("data-colindex") === "2"
      );
    });

    if (finded) {
      const tr = finded.closest("tr");
      tr.focus();
      const events = ["mousedown", "mouseout", "click"];
      events.forEach((evento) => {
        const event = new MouseEvent(evento, {
          bubbles: true,
          cancelable: true,
        });
        tr.dispatchEvent(event);
        console.log(`Evento ${evento} disparado en el <tr>`);
      });

      const input = document.querySelector('input[value="Confirmar"]');
      input.click();   
    }
  }, hour);

  return iframe;
};

export const handleIframe = async ({page,classes}) => {
  const classData = classes;

  // Select Pendiente por Programar option
  const iframeSelector = "iframe#gxp0_ifrm";
  const iframeElementHandle = await page.$(iframeSelector);
  const iframe = await iframeElementHandle.contentFrame();
  await iframe.$eval("#vTPEAPROBO", (el) => {
    el.selectedIndex = 2;
    el.dispatchEvent(new Event("change"));
  });

  await wait(3000);

  // Select class
  const { CLASE, FECHA, HORA, SEDE } = classData;
  await selectClass(iframe, CLASE);

  await wait(3000);

  // Select date and sede
  const iframeSelectHour = "iframe#gxp1_ifrm";
  const iframeElementHandle2 = await page.$(iframeSelectHour);
  const iframe2 = await iframeElementHandle2.contentFrame();
  await sheduleIframe({
    iframe: iframe2,
    FECHA,
    SEDE,
  });

  await wait(2000);

  // Select hour
  await selectHour(iframe2, HORA);
  await wait(3000);

  // Check if iframe exists
  const iframeExists = await page.$(iframeSelectHour);

  // Return error if iframe doesn't exist , if exists return true
  return{
    error: !!iframeExists,
  }
};