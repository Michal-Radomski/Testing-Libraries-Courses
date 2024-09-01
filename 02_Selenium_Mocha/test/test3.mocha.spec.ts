import assert from "assert";
import { WebDriver, By, Builder, WebElement, WebElementPromise, Actions, IRectangle } from "selenium-webdriver";

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
