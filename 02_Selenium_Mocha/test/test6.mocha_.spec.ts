import * as assert from "assert";
import { Builder, By, IRectangle, WebDriver, WebElement } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

const opts: firefox.Options = new firefox.Options();
opts.addArguments("--headless");

const startIndex = 0;
const endIndex = 5;
const pdfMagicNumber: string = "JVBER";
const imgMagicNumber: string = "iVBOR";
let base64Code: string;

describe("Interactions - Windows", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = await new Builder().forBrowser("firefox").setFirefoxOptions(opts).build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("Should be able to print page to pdf", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");

    const base64 = (await driver.printPage({ pageRanges: ["1-2"] } as any)) as unknown as string;
    // page can be saved as a PDF as below
    // await fs.writeFileSync('./test.pdf', base64, 'base64');

    base64Code = base64.slice(startIndex, endIndex);
    assert.strictEqual(base64Code, pdfMagicNumber);
  });

  it("Should be able to get text using executeScript", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/javascriptPage.html");
    // Stores the header element
    const header: WebElement = await driver.findElement(By.css("h1"));

    // Executing JavaScript to capture innerText of header element
    const text: void = await driver.executeScript("return arguments[0].innerText", header);
    assert.strictEqual(text, `Type Stuff`);
  });

  it("Should be able to take Element Screenshot", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/javascriptPage.html");

    const header: WebElement = await driver.findElement(By.css("h1"));
    // Captures the element screenshot
    const encodedString: string = await header.takeScreenshot(true);
    // save screenshot as below
    // await fs.writeFileSync('./image.png', encodedString, 'base64');
    base64Code = encodedString.slice(startIndex, endIndex) as string;
    assert.strictEqual(base64Code, imgMagicNumber);
  });

  it("Should be able to takeScreenshot", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/javascriptPage.html");

    // Captures the screenshot
    const encodedString: string = await driver.takeScreenshot();
    // save screenshot as below
    // await fs.writeFileSync('./image.png', encodedString, 'base64');
    base64Code = encodedString.slice(startIndex, endIndex) as string;
    assert.strictEqual(base64Code, imgMagicNumber);
  });

  it("Should be able to switch to newWindow and newTab and close", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/");
    const initialWindow: string[] = await driver.getAllWindowHandles();
    assert.strictEqual(initialWindow.length, 1);

    // Opens a new tab and switches to new tab
    await driver.switchTo().newWindow("tab");
    const browserTabs: string[] = await driver.getAllWindowHandles();
    assert.strictEqual(browserTabs.length, 2);

    // Opens a new window and switches to new window
    await driver.switchTo().newWindow("window");
    const windows: string[] = await driver.getAllWindowHandles();
    assert.strictEqual(windows.length, 3);

    //Close the tab or window
    await driver.close();

    //Switch back to the old tab or window
    await driver.switchTo().window(windows[1]);

    const windowsAfterClose: string[] = await driver.getAllWindowHandles();
    assert.strictEqual(windowsAfterClose.length, 2);
  });

  it("Should be able to getWindow Size", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/");

    // Access each dimension individually
    const { width, height }: { width: number; height: number } = await driver.manage().window().getRect();
    console.log({ width, height });

    // Or store the dimensions and query them later
    const rect: IRectangle = await driver.manage().window().getRect();
    const windowWidth: number = rect.width;
    const windowHeight: number = rect.height;

    assert.ok(windowWidth > 0);
    assert.ok(windowHeight > 0);
  });

  it("Should be able to getWindow position", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/");

    // Access each dimension individually
    const { x, y }: { x: number; y: number } = await driver.manage().window().getRect();
    console.log({ x, y });

    // Or store the dimensions and query them later
    const rect: IRectangle = await driver.manage().window().getRect();
    const x1: number = rect.x;
    const y1: number = rect.y;

    assert.ok(x1 >= 0);
    assert.ok(y1 >= 0);
  });
});
