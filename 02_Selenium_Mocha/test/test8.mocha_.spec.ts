import assert from "assert";
import { Browser, Builder, By, ThenableWebDriver, WebDriver, WebElement } from "selenium-webdriver";
import Firefox from "selenium-webdriver/firefox";
import { VirtualAuthenticatorOptions, Transport, Protocol } from "selenium-webdriver/lib/virtual_authenticator";

//* 1
describe("Page loading strategies", function (): void {
  const options = new Firefox.Options();

  it("Navigate using eager page loading strategy", async function (): Promise<void> {
    const driver: ThenableWebDriver = new Builder()
      .forBrowser(Browser.FIREFOX)
      // @ts-ignore
      .setFirefoxOptions(options.setPageLoadStrategy("eager"))
      .build();

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });

  it("Navigate using none page loading strategy", async function (): Promise<void> {
    const driver: ThenableWebDriver = new Builder()
      .forBrowser(Browser.FIREFOX)
      // @ts-ignore
      .setFirefoxOptions(options.setPageLoadStrategy("none"))
      .build();

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });

  it("Navigate using normal page loading strategy", async function (): Promise<void> {
    const driver: ThenableWebDriver = new Builder()
      .forBrowser(Browser.FIREFOX)
      // @ts-ignore
      .setFirefoxOptions(options.setPageLoadStrategy("normal"))
      .build();

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });

  it("Should be able to accept certs", async function (): Promise<void> {
    const driver: ThenableWebDriver = new Builder()
      .forBrowser(Browser.FIREFOX)
      // @ts-ignore
      .setFirefoxOptions(options.setAcceptInsecureCerts(true))
      .build();

    await driver.get("https://www.selenium.dev/selenium/web/blank.html");
    await driver.quit();
  });
});

//* 2.
describe("Element Interactions", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = new Builder().forBrowser(Browser.FIREFOX).build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("should Clear input and send keys into input field", async function (): Promise<void> {
    try {
      await driver.get("https://www.selenium.dev/selenium/web/inputs.html");
      const inputField: WebElement = await driver.findElement(By.name("no_type"));
      await inputField.clear();
      await inputField.sendKeys("Selenium");
      const text: string = await inputField.getAttribute("value");
      assert.strictEqual(text, "Selenium");
    } catch (error) {
      console.log("error:", error);
    }
  });
});

//* 3.
describe("Cookies", function (): void {
  let driver: WebDriver;

  before(async function (): Promise<void> {
    driver = new Builder().forBrowser(Browser.FIREFOX).build();
  });

  after(async (): Promise<void> => await driver.quit());

  it("Create a cookie", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // set a cookie on the current domain
    await driver.manage().addCookie({ name: "key", value: "value" });
  });

  it("Create cookies with sameSite", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // set a cookie on the current domain with sameSite 'Strict' (or) 'Lax'
    await driver.manage().addCookie({ name: "key", value: "value", sameSite: "Strict" });
    await driver.manage().addCookie({ name: "key", value: "value", sameSite: "Lax" });
  });

  it("Read cookie", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // set a cookie on the current domain
    await driver.manage().addCookie({ name: "foo", value: "bar" });

    // Get cookie details with named cookie 'foo'
    await driver
      .manage()
      .getCookie("foo")
      .then(function (cookie) {
        console.log("cookie details => ", cookie);
      });
  });

  it("Read all cookies", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // Add few cookies
    await driver.manage().addCookie({ name: "test1", value: "cookie1" });
    await driver.manage().addCookie({ name: "test2", value: "cookie2" });

    // Get all Available cookies
    await driver
      .manage()
      .getCookies()
      .then(function (cookies) {
        console.log("cookie details => ", cookies);
      });
  });

  it("Delete a cookie", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // Add few cookies
    await driver.manage().addCookie({ name: "test1", value: "cookie1" });
    await driver.manage().addCookie({ name: "test2", value: "cookie2" });

    // Delete a cookie with name 'test1'
    await driver.manage().deleteCookie("test1");

    // Get all Available cookies
    await driver
      .manage()
      .getCookies()
      .then(function (cookies) {
        console.log("cookie details => ", cookies);
      });
  });

  it("Delete all cookies", async function (): Promise<void> {
    await driver.get("https://www.selenium.dev/selenium/web/blank.html");

    // Add few cookies
    await driver.manage().addCookie({ name: "test1", value: "cookie1" });
    await driver.manage().addCookie({ name: "test2", value: "cookie2" });

    // Delete all cookies
    await driver.manage().deleteAllCookies();
  });
});

//* 4.
describe("Virtual authenticator options", function (): void {
  let options: VirtualAuthenticatorOptions;

  it("Virtual options", async function (): Promise<void> {
    options = new VirtualAuthenticatorOptions();
    options.setIsUserVerified(true);
    options.setHasUserVerification(true);
    options.setIsUserConsenting(true);
    options.setTransport(Transport["USB"]);
    options.setProtocol(Protocol["U2F"]);
    options.setHasResidentKey(false);
    // console.log("options:", options);

    assert(Object.keys(options).length === 6);
  });

  it("User verified", async function (): Promise<void> {
    options.setIsUserVerified(true);

    assert((options as any).toDict()["isUserVerified"]);
  });
});
