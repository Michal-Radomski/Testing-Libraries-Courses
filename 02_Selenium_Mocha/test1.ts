import { Builder, Browser, By, Key, until, WebDriver } from "selenium-webdriver";

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
    await driver.wait(until.titleIs("webdriver - Google Search"), 10000);
    await pause(2500);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();
