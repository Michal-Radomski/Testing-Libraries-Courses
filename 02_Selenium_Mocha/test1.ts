import * as assert from "assert";
import { Builder, Browser, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";

const pause = (time: number): Promise<number> => new Promise((resolve) => setTimeout(resolve, time));

//* Test_1
(async function test_1(): Promise<void> {
  // const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
  const driver: WebDriver = await new Builder().forBrowser(Browser.FIREFOX).build();
  // console.log("driver:", driver);

  try {
    await driver.get("https://www.google.com/ncr");
    await pause(2500);
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await pause(2500);
    const results: WebElement = await driver.wait(until.titleIs("webdriver - Google Search"), 10000);
    console.log("results:", results);
    await pause(2500);

    await driver.navigate().to("https://www.onet.pl");
    await driver.sleep(2500);
    await driver.navigate().back();
    await driver.sleep(2500);
    await driver.navigate().forward();
    await driver.sleep(2500);
    await driver.navigate().refresh();
    await driver.manage().window().maximize();
    await driver.manage().window().minimize();
    await driver.manage().window().fullscreen();
    await driver.manage().window().setSize(200, 100);
    const windowSize = await driver.manage().window().getSize();
    console.log("windowSize:", windowSize);

    await driver.executeScript("console.log('test')");

    await driver.sleep(2500);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();

(async function firstTest(): Promise<void> {
  let driver: WebDriver = null as any;

  try {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    const title = await driver.getTitle();
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    const textBox = await driver.findElement(By.name("my-text"));
    const submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys("Selenium");
    await submitButton.click();

    const message = await driver.findElement(By.id("message"));
    const value = await message.getText();
    assert.equal("Received!", value);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();
