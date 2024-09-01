import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

//* Chai test
describe("Google Search", function (): void {
  let driver: WebDriver;

  before(async function () {
    driver = await new Builder().forBrowser("firefox").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should display the correct title", async function () {
    await driver.get("https://www.google.com");
    await driver.sleep(2500);
    const title = await driver.getTitle();
    expect(title).to.equal("Google");
  });

  it("should search for Selenium", async function () {
    await driver.get("https://www.google.com");
    await driver.sleep(2500);
    await driver.findElement(By.name("q")).sendKeys("Selenium WebDriver", Key.RETURN);
    await driver.wait(until.titleContains("Selenium WebDriver"), 1000);
    const title = await driver.getTitle();
    expect(title).to.include("Selenium WebDriver");
  });
});
