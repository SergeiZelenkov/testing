import puppeteer from "puppeteer";
import { fork } from "child_process";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

jest.setTimeout(30000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("should validate Visa card and highlight the correct card image", async () => {
    await page.goto(baseUrl);

    const inputSelector = ".pay-input";
    const buttonSelector = ".pay-button";
    const cardSelector = 'img[alt="visa"]';

    await page.type(inputSelector, "4111111111111111");
    await page.click(buttonSelector);

    await page.waitForTimeout(500);

    const className = await page.$eval(cardSelector, (el) => el.className);
    expect(className).toContain("activ");
  });

  test("should show alert and remove highlight for invalid card number", async () => {
    await page.goto(baseUrl);

    const inputSelector = ".pay-input";
    const buttonSelector = ".pay-button";

    await page.type(inputSelector, "1234567890123456");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Некорректный номер карты");
      await dialog.dismiss();
    });

    await page.click(buttonSelector);

    await page.waitForTimeout(500);

    const highlightedCards = await page.$$eval(
      ".pay-card.activ",
      (cards) => cards.length
    );
    expect(highlightedCards).toBe(0);
  });
});
