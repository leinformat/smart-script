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

  // Selecciona el span con el texto específico
  const spanEspecifico = await iframe.$$eval("span", spans => {
    const encontrado = spans.find(span => span.textContent.trim() === "CLASE 62");
    if (encontrado) {
      console.log(encontrado.textContent);
      encontrado.click();
    }
    console.log('here->',spans);
  });// Cambia 'Bienvenido' por el texto que buscas

  // Selecciona el valor '2' en el select dentro del iframe
  //await iframeContent.select("#vTPEAPROBO", "2");

  /*
 await new Promise((resolve) => {
   setTimeout(() => {
     resolve();
   }, 5000);
  });
  
  const frames = await page.frames();
  const iframeContent = frames[1];
  const x = await iframeContent.$eval(".TextBlock", el => el.innerText);
  console.log(x)
  */
};
