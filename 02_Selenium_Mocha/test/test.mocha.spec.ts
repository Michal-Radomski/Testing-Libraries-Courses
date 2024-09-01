import assert from "assert";
import { By, Browser, until, Builder, WebDriver } from "selenium-webdriver";

//* Waits
describe("Waits", async function (): Promise<void> {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = new Builder().forBrowser(Browser.FIREFOX).build();
  });

  after(async () => await driver.quit());

  it("fail", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    await assert.rejects(async () => {
      await driver.findElement(By.id("box0"));
    }, Error);
  });

  it("sleep", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    await driver.sleep(2000);
    let added = await driver.findElement(By.id("box0"));

    assert.equal(await added.getAttribute("class"), "redbox");
  });

  it("implicit", async function (): Promise<void> {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    let added = await driver.findElement(By.id("box0"));

    assert.equal(await added.getAttribute("class"), "redbox");
  });

  it("explicit", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    let revealed = await driver.findElement(By.id("revealed"));
    await driver.findElement(By.id("reveal")).click();
    await driver.wait(until.elementIsVisible(revealed), 2000);
    await revealed.sendKeys("Displayed");
    assert.equal(await revealed.getAttribute("value"), "Displayed");
  });
});
