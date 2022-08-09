const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.connect({ timeout: 0, wsEndpoint: 'ws://moon.aandd.io/playwright/firefox/playwright-1.23.3' });
  const page = await browser.newPage();
  await page.goto('https://aerokube.com/moon/');
  await page.screenshot({ path: `screenshot.png` });
  await browser.close();
})();