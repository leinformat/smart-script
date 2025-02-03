// loginService.js
export const navigateToLogin = async (page, url) => {
  await page.goto(url, { waitUntil: "networkidle2" });
};

export const fillLoginForm = async (page, username, password) => {
  await page.type("#vUSUCOD", username);
  await page.type("#vPASS", password);
  await page.click("#BUTTON1");
};

export const closeModal = async (page) => {
  await page.waitForSelector(".PopupHeaderButton.gx-popup-close", {
    visible: true,
  });
  await page.click(".PopupHeaderButton.gx-popup-close");
};