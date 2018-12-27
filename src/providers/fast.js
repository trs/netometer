const puppeteer = require('puppeteer');

const {delay} = require('../helpers');

const URL = 'https://fast.com';

function readSpeedFactory(page) {
  async function waitForElement(element) {
    const success = Boolean(await page.$(`#${element}-value.succeeded`));

    if (!success) {
      await delay(100);
      return waitForElement(element);
    }
  }

  async function getSpeedFromElement(element) {
    return page.evaluate(elem => {
      // eslint-disable-next-line no-undef
      const $ = document.querySelector.bind(document);

      return {
        value: Number($(`#${elem}-value`).textContent),
        unit: $(`#${elem}-units`).textContent.trim(),
      };
    }, element);
  }

  async function waitGetSpeedFromElement(element) {
    await waitForElement(element);
    const result = await getSpeedFromElement(element);
    return result;
  }

  return async function readSpeed() {
    const [down, up, ping] = await Promise.all([
      waitGetSpeedFromElement('speed'),
      waitGetSpeedFromElement('upload'),
      waitGetSpeedFromElement('latency')
    ]);

    return {down, up, ping};
  };
}

async function test() {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(URL);

    const readSpeed = readSpeedFactory(page);
    const result = await readSpeed();
    return result;
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = {
  test,

  readSpeedFactory
};
