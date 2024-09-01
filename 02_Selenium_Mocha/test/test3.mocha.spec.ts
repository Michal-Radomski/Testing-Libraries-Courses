import assert from "assert";
import { platform } from "process";
import { WebDriver, By, Builder, WebElement, WebElementPromise, Actions, IRectangle, Key } from "selenium-webdriver";

//* Actions - Drag and Drop
describe("Drag and Drop", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = new Builder().forBrowser("firefox").build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("By Offset", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
    const draggable: WebElementPromise = driver.findElement(By.id("draggable"));
    const start: IRectangle = await draggable.getRect();
    const finish: IRectangle = await driver.findElement(By.id("droppable")).getRect();
    const actions = driver.actions({ async: true });
    await actions.dragAndDrop(draggable, { x: finish.x - start.x, y: finish.y - start.y }).perform();

    const result: string = await driver.findElement(By.id("drop-status")).getText();
    assert.deepStrictEqual("dropped", result);
  });

  it("Onto Element", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
    const draggable: WebElementPromise = driver.findElement(By.id("draggable"));
    const droppable: WebElement = await driver.findElement(By.id("droppable"));
    const actions: Actions = driver.actions({ async: true });
    await actions.dragAndDrop(draggable, droppable).perform();

    const result: string = await driver.findElement(By.id("drop-status")).getText();
    assert.deepStrictEqual("dropped", result);
  });
});

//* Actions - Double Click
describe("Double click", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = new Builder().forBrowser("firefox").build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("Double-click on an element", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
    const clickable: WebElementPromise = driver.findElement(By.id("clickable"));
    const actions: Actions = driver.actions({ async: true });
    await actions.doubleClick(clickable).perform();

    await driver.sleep(500);
    const status: string = await driver.findElement(By.id("click-status")).getText();
    assert.deepStrictEqual(status, `double-clicked`);
  });
});

//* Actions - Keys Test
describe("Keyboard Action - Keys test", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = await new Builder().forBrowser("firefox").build();
  });

  after((): Promise<void> => driver.quit());

  it("KeyDown", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/single_text_input.html");

    await driver.actions().keyDown(Key.SHIFT).sendKeys("a").perform();

    const textField: WebElementPromise = driver.findElement(By.id("textInput"));
    assert.deepStrictEqual(await textField.getAttribute("value"), "A");
  });

  it("KeyUp", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/single_text_input.html");

    const textField: WebElementPromise = driver.findElement(By.id("textInput"));
    await textField.click();

    await driver.actions().keyDown(Key.SHIFT).sendKeys("a").keyUp(Key.SHIFT).sendKeys("b").perform();

    assert.deepStrictEqual(await textField.getAttribute("value"), "Ab");
  });

  it("sendKeys", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/single_text_input.html");

    const textField: WebElementPromise = driver.findElement(By.id("textInput"));
    await textField.click();

    await driver.actions().sendKeys("abc").perform();

    assert.deepStrictEqual(await textField.getAttribute("value"), "abc");
  });

  it("Designated Element", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/single_text_input.html");

    await driver.findElement(By.css("body")).click();
    const textField: WebElement = await driver.findElement(By.id("textInput"));
    await driver
      .actions()
      .sendKeys(textField as unknown as string, "abc" as string)
      .perform();

    assert.deepStrictEqual(await textField.getAttribute("value"), "abc");
  });

  it("Copy and Paste", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/single_text_input.html");

    const textField: WebElement = await driver.findElement(By.id("textInput"));

    const cmdCtrl: string = platform.includes("darwin") ? Key.COMMAND : Key.CONTROL;

    await driver
      .actions()
      .click(textField)
      .sendKeys("Selenium!")
      .sendKeys(Key.ARROW_LEFT)
      .keyDown(Key.SHIFT)
      .sendKeys(Key.ARROW_UP)
      .keyUp(Key.SHIFT)
      .keyDown(cmdCtrl)
      .sendKeys("xvv")
      .keyUp(cmdCtrl)
      .perform();

    assert.deepStrictEqual(await textField.getAttribute("value"), "SeleniumSelenium!");
  });
});
