const puppeteer = require('puppeteer')
const CronJob = require('cron').CronJob
const dotenv = require('dotenv')

dotenv.config()

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // const navigationPromise = page.waitForNavigation({waitUntil: ['networkidle2'] });

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })

  await page.goto('https://stackoverflow.com/users/login')

  await page.waitForSelector('input#email')
  await page.type('input#email', process.env.EMAIL)
  await page.waitForSelector('input#password')
  await page.type('input#password', process.env.PASS)
  

  // await navigationPromise;

  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }),
  ])

  await page.screenshot({ path: `img/${new Date()}.png` })

  await browser.close()
}

// run()

const task = new CronJob({
  cronTime: '* * 0 * * *',
  onTick: run,
  start: false,
  timeZone: 'Europe/London',
})

task.start()
