import { Builder, By, WebDriver } from "selenium-webdriver";

import * as assert from "assert";

//* SwitchTo
describe("Selenium Mocha Test with switchTo", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    this.timeout(30000); // Set timeout for the test
    driver = await new Builder().forBrowser("firefox").build();
  });

  it("should switch to a new window and verify title", async function () {
    await driver.get("https://example.com"); // Navigate to the initial page

    await driver.sleep(2000);

    // Open a new window
    await driver.executeScript("window.open('https://www.example.org', '_blank');");

    await driver.sleep(2000);

    // Wait for new window to open
    const windows = await driver.getAllWindowHandles();
    // console.log({ windows });

    await driver.sleep(2000);
    await driver.switchTo().window(windows[1]); // Switch to the new window

    await driver.sleep(2000);
    // Verify the title of the new window
    const title = await driver.getTitle();
    // console.log({ title });
    assert.strictEqual(title, "Example Domain"); // Adjust based on the actual title

    await driver.sleep(2000);
    // Close the new window and switch back to the original
    await driver.close();
    await driver.switchTo().window(windows[0]);
  });

  after(async function (): Promise<void> {
    await driver.quit(); // Close the browser after tests
  });
});

//* Frame -> Frames are disabled by Firefox!
// describe("Selenium Mocha Test with switchTo and frames", function (): void {
//   let driver: WebDriver;

//   before(async function (): Promise<void> {
//     this.timeout(30000); // Set timeout for the test
//     driver = await new Builder().forBrowser("firefox").build();
//   });

//   it("should switch to a frame and interact with elements", async function (): Promise<void> {
//     await driver.get("https://www.example.com/page-with-frames");

//     // Switch to the first frame
//     await driver.switchTo().frame(0);

//     // Interact with elements inside the frame
//     const frameElement = await driver.findElement(By.id("frame-element"));
//     const frameText = await frameElement.getText();
//     assert.strictEqual(frameText, "This is inside the frame");

//     // Switch back to the default content
//     await driver.switchTo().defaultContent();

//     // Interact with elements outside the frame
//     const pageElement = await driver.findElement(By.id("page-element"));
//     const pageText = await pageElement.getText();
//     assert.strictEqual(pageText, "This is outside the frame");
//   });

//   after(async function (): Promise<void> {
//     await driver.quit(); // Close the browser after tests
//   });
// });
