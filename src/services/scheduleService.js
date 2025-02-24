export const navigateToProgramation = async (page) => {
  await page.waitForSelector('img#IMAGE18', { visible: true });
  await page.click("img#IMAGE18");
};

export const selectPlan = async (page) => {
  await page.waitForSelector("#W0030Grid1ContainerTbl", { visible: true });
  await page.click("#W0030Grid1ContainerTbl > tbody");
  await page.click("#W0030BUTTON1");
};

export const handleIframe = async (page) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  const iframeSelector = "iframe#gxp0_ifrm";

  const iframeElementHandle = await page.$(iframeSelector);
  const iframe = await iframeElementHandle.contentFrame();

  const x = await iframe.$eval("#vTPEAPROBO", (el) => {
    el.selectedIndex = 2;
    el.dispatchEvent(new Event("change"));
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  await iframe.$$eval("span", (spans) => {
    const encontrado = spans.find(
      (span) => span.textContent.trim() === "CLASE 67"
    );
    if (encontrado) {
      const trPadre = encontrado.closest("tr"); // Buscar el padre <tr>
      if (trPadre) {
        console.log(trPadre);
        trPadre.click(); // Hacer click en el <tr>
      }
    }
  });

  // Selecciona el span con el texto específico
  await iframe.evaluate(async () => {
    const spans = [...document.querySelectorAll("span")]; // Obtiene todos los <span>
    const finded = spans.find(
      (span) => span.textContent.trim() === "CLASE 67"
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
  });
  

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });



  const iframeSelector2 = "iframe#gxp1_ifrm";
  const iframeElementHandle2 = await page.$(iframeSelector2);
  const iframe2 = await iframeElementHandle2.contentFrame();

  await iframe2.evaluate(() => {
    const selects = document.querySelectorAll("select"); // Selecciona el <select>
    console.log(selects)
    selects.forEach( async(select) => {
      if (select && select.id === "vREGCONREG") {
        console.log("Seleccionando SANTAFE en el <select>");
        const option = [...select.options].find(
          (opt) => opt.textContent.trim() === "SANTAFE"
        );
        console.log(select.options);
        if (option) {
          select.value = option.value; // Cambia el valor del select
          select.dispatchEvent(new Event("change", { bubbles: true })); // Dispara el evento change
          console.log("Seleccionado:", option.textContent);
        } else {
          console.log("No se encontró la opción SANTAFE");
        }
      } else if (select && select.id === "vDIA") {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
        console.log("Seleccionando día en el", select);
          select.value = 3; // Cambia el valor del select
          select.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        console.log("No se encontró el <select>");
      }
    });

  });

};
