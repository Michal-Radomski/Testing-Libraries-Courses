import { Builder, Browser, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";

const pause = (time: number): Promise<number> => new Promise((resolve) => setTimeout(resolve, time));

(async function example(): Promise<void> {
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

    await driver.navigate().to("https:onet.pl");
    await driver.sleep(2500);
    await driver.navigate().back();
    await driver.sleep(2500);
    await driver.navigate().forward();
    await driver.sleep(2500);
    await driver.navigate().refresh();
    await driver.sleep(2500);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();
