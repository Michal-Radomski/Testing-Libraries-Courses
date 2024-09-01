import assert from "assert";
import { By, Browser, until, Builder, WebDriver } from "selenium-webdriver";

describe("Waits", async function () {
  let driver: WebDriver;

  before(async function () {
    driver = new Builder().forBrowser(Browser.FIREFOX).build();
  });

  after(async () => await driver.quit());

  it("fail", async function () {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    await assert.rejects(async () => {
      await driver.findElement(By.id("box0"));
    }, Error);
  });

  it("sleep", async function () {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    await driver.sleep(2000);
    let added = await driver.findElement(By.id("box0"));

    assert.equal(await added.getAttribute("class"), "redbox");
  });

  it("implicit", async function () {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    await driver.findElement(By.id("adder")).click();

    let added = await driver.findElement(By.id("box0"));

    assert.equal(await added.getAttribute("class"), "redbox");
  });

  it("explicit", async function () {
    await driver.get("https://www.selenium.dev/selenium/web/dynamic.html");
    let revealed = await driver.findElement(By.id("revealed"));
    await driver.findElement(By.id("reveal")).click();
    await driver.wait(until.elementIsVisible(revealed), 2000);
    await revealed.sendKeys("Displayed");
    assert.equal(await revealed.getAttribute("value"), "Displayed");
  });
});
