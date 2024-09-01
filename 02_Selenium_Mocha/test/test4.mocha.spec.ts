import assert from "assert";
import { WebDriver, By, Builder, WebElementPromise, until, Alert, WebElement } from "selenium-webdriver";

//* Interactions - Alerts
describe("Interactions - Alerts", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = await new Builder().forBrowser("firefox").build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("Should be able to getText from alert and accept", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");
    await driver.findElement(By.id("alert")).click();
    await driver.wait(until.alertIsPresent());
    const alert: Alert = await driver.switchTo().alert();
    const alertText: string = await alert.getText();
    await alert.accept();
    // Verify
    assert.equal(alertText, "cheese");
  });

  it("Should be able to getText from alert and dismiss", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");
    await driver.findElement(By.id("confirm")).click();
    await driver.wait(until.alertIsPresent());
    const alert: Alert = await driver.switchTo().alert();
    const alertText: string = await alert.getText();
    await alert.dismiss();
    // Verify
    assert.equal(alertText, "Are you sure?");
  });

  it("Should be able to enter text in alert prompt", async function (): Promise<void> {
    const text: string = "Selenium";
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");
    await driver.findElement(By.id("prompt")).click();
    await driver.wait(until.alertIsPresent());
    const alert: Alert = await driver.switchTo().alert();
    //Type your message
    await alert.sendKeys(text);
    await alert.accept();

    const enteredText: WebElement = await driver.findElement(By.id("text"));
    assert.equal(await enteredText.getText(), text);
  });
});
