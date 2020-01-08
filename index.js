const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const navigationPromise = page.waitForNavigation({waitUntil: ['networkidle2'] });

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

  await page.goto('https://stackoverflow.com/users/login');
  
  await page.waitForSelector('input#email');
  await page.type('input#email', '')
  await page.waitForSelector('input#password');
  await page.type('input#password', '');
  
  // await navigationPromise;
  
  await Promise.all([
    page.keyboard.press("Enter"),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  
    await page.screenshot({path: `img/${new Date()}.png`});

  await browser.close();
}

run();