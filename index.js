const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto('https://stackoverflow.com/');
  await page.screenshot({path: `img/${new Date()}.png`});

  await browser.close();
}

run();