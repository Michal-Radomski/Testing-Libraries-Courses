import assert from "assert";
import { WebDriver, By, Builder, Browser, IRectangle, WebElement, ThenableWebDriver } from "selenium-webdriver";
import Firefox from "selenium-webdriver/firefox";

describe("Element Information Test", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = await new Builder().forBrowser("firefox").build();
  });

  beforeEach(async () => {
    await driver.get("https://www.selenium.dev/selenium/web/inputs.html");
  });

  it("Check if element is displayed", async function (): Promise<void> {
    // Resolves Promise and returns boolean value
    const result: boolean = await driver.findElement(By.name("email_input")).isDisplayed();

    assert.equal(result, true);
  });

  it("Check if button is enabled", async function (): Promise<void> {
    // Resolves Promise and returns boolean value
    const element: boolean = await driver.findElement(By.name("button_input")).isEnabled();

    assert.equal(element, true);
  });

  it("Check if checkbox is selected", async function (): Promise<void> {
    // Returns true if element ins checked else returns false
    const isSelected: boolean = await driver.findElement(By.name("checkbox_input")).isSelected();

    assert.equal(isSelected, true);
  });

  it("Should return the tagname", async function (): Promise<void> {
    // Returns TagName of the element
    const value: string = await driver.findElement(By.name("email_input")).getTagName();

    assert.equal(value, "input");
  });

  it("Should be able to fetch element size and position ", async function (): Promise<void> {
    // Returns height, width, x and y position of the element
    const object: IRectangle = await driver.findElement(By.name("range_input")).getRect();

    assert.ok(object.height !== null);
    assert.ok(object.width !== null);
    assert.ok(object.y !== null);
    assert.ok(object.x !== null);
  });

  it("Should be able to fetch attributes and properties ", async function (): Promise<void> {
    // identify the email text box
    const emailElement: WebElement = await driver.findElement(By.xpath('//input[@name="email_input"]'));

    //fetch the attribute "name" associated with the textbox
    const nameAttribute: string = await emailElement.getAttribute("name");

    assert.equal(nameAttribute, "email_input");
  });

  after(async () => await driver.quit());
});

describe("Element Information Test", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = await new Builder().forBrowser("firefox").build();
  });

  it("Should return the css specified CSS value", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/colorPage.html");
    // Returns background color of the element
    const value: string = await driver.findElement(By.id("namedColor")).getCssValue("background-color");

    // assert.equal(value, "rgba(0, 128, 0, 1)");
    assert.equal(value, "rgb(0, 128, 0)");
  });

  it("Should return the css specified CSS value", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/linked_image.html");
    // Returns text of the element
    const text: string = await driver.findElement(By.id("justanotherLink")).getText();

    assert.equal(text, "Just another link.");
  });

  after(async () => await driver.quit());
});

describe("Service Test", function (): void {
  it("Default service", async function (): Promise<void> {
    const service: Firefox.ServiceBuilder = new Firefox.ServiceBuilder();
    const driver: ThenableWebDriver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxService(service).build();
    // console.log({ service, driver });

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });

  it("Set port", async function (): Promise<void> {
    const service: Firefox.ServiceBuilder = new Firefox.ServiceBuilder().setPort(1234);
    const driver: ThenableWebDriver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxService(service).build();

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });
});
