import { Builder, Browser, By } from "selenium-webdriver";

(async function test_2(): Promise<void> {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
    await driver.sleep(2500);
    const elem = driver.findElement(By.id("mouse-tracker"));
    await driver.sleep(2500);
    console.log("elem:", elem);
    const actions = driver.actions({ async: true });
    await actions.move({ origin: elem }).pause(2000).perform();
    await driver.sleep(2500);
  } catch (error) {
    console.log("error:", error);
  } finally {
    await driver.quit();
  }
})();
