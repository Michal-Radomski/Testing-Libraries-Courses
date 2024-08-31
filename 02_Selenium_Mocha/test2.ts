import { Builder, Browser, By } from "selenium-webdriver";

(async function test_2(): Promise<void> {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("https://www.onet.pl");
    const elem = driver.findElement(By.tagName("footer"));
    await driver.sleep(2500);
    console.log("elem:", elem);
    await driver.sleep(2500);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();
