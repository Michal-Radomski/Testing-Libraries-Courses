import * as assert from "assert";
import { Builder, WebDriver } from "selenium-webdriver";
import addContext from "mochawesome/addContext";

describe("Selenium Mocha Test with executeScript", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    this.timeout(30000); // Set timeout for the test
    driver = await new Builder().forBrowser("firefox").build();
  });

  it("should execute a script and manipulate the DOM", async function (): Promise<void> {
    await addContext(this as Mocha.Context, new Date().toLocaleDateString());

    await driver.get("https://example.com"); // Navigate to the page

    await driver.sleep(2000);
    // Execute a script to change the background color of the body
    await driver.executeScript("document.body.style.backgroundColor = 'lightblue';");

    await driver.sleep(2000);
    // Verify the change by checking the background color
    const bgColor: string = await driver.executeScript("return document.body.style.backgroundColor;");
    assert.strictEqual(bgColor, "lightblue"); // Assert that the background color is lightblue
  });

  after(async function (): Promise<void> {
    await driver.quit(); // Close the browser after tests
  });
});
