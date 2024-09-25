interface Person {
  firstName: string;
  lastName: string;
  job?: Job;
  isVisitor?: boolean;
}

type Job = "Engineer" | "Programmer";

function generateEmail(input: Person, force?: boolean): string | undefined {
  if (input.isVisitor && !force) {
    return undefined;
  } else {
    return `${input.firstName}.${input.lastName}@email.com`;
  }
}

const abc: string | undefined = generateEmail({} as Person);
console.log("abc:", abc);

//* Guards
function isPerson(potentialPerson: Person): boolean {
  if ("firstName" in potentialPerson && "lastName" in potentialPerson) {
    return true;
  } else {
    return false;
  }
}

function printEmailIfPerson(potentialPerson: Person): void {
  if (isPerson(potentialPerson)) {
    console.log(generateEmail(potentialPerson));
  } else {
    console.log("Input is not a person");
  }
}

printEmailIfPerson({
  firstName: "John",
  lastName: "Doe",
});

//* Classes
interface IServer {
  startServer(): void;
  stopServer(): void;
}

class Server implements IServer {
  // private port: number;
  protected address: string;
  public date: string = "";

  constructor(private port: number, address: string) {
    this.port = port;
    this.address = address;
    this.date = "";
  }

  async startServer() {
    const data = await this.getData(123);
    console.log(`Starting server at: ${this.address}: ${this.port}, ${data}`);
    return function () {};
  }

  stopServer(): void {}

  async getData(id: number): Promise<string> {
    return "some SPecial Data" + id;
  }
}

const someServer: IServer = new Server(8080, "localhost");
someServer.startServer();

class BDServer extends Server {
  constructor(port: number, address: string) {
    super(port, address);
    console.log({ port, address });
  }
}

const dbServer = new BDServer(80, "localhost");
console.log("dbServer:", dbServer);
dbServer.startServer();

//* Abstract Class
// Interface definition
interface Book {
  title: string;
  author: string;
  getBookInfo(): string;
}

// Abstract class implementing the interface
abstract class Publication implements Book {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  abstract getFormat(): string;

  getBookInfo(): string {
    return `${this.title} by ${this.author}`;
  }
}

// Concrete subclass extending the abstract class
class Ebook extends Publication {
  getFormat(): string {
    return "ebook";
  }
}

// Concrete subclass extending the abstract class
class Paperback extends Publication {
  getFormat(): string {
    return "paperback";
  }
}

// Usage
const book1 = new Ebook("The Great Gatsby", "F. Scott Fitzgerald");
console.log(book1.getBookInfo()); // Output: The Great Gatsby by F. Scott Fitzgerald
console.log(book1.getFormat()); // Output: ebook

const book2 = new Paperback("To Kill a Mockingbird", "Harper Lee");
console.log(book2.getBookInfo()); // Output: To Kill a Mockingbird by Harper Lee
console.log(book2.getFormat()); // Output: paperback

{
  //* Generics
  function returnKeys<T extends Object>(arg: T): T {
    console.log("Object.keys(arg):", Object.keys(arg));
    return arg;
  }

  const a = returnKeys({
    abc: "def",
  });

  console.log("a:", a);

  interface Person<T> {
    name: string;
    age: number;
    special: T;
  }

  const John: Person<string> = {
    special: "This is my special property",
    name: "John",
    age: 20,
  };

  console.log("John:", John);

  class Observable<T extends Person<string>> {
    subscribe(arg: T): void {
      console.log(`Subscribed to ${arg.name}`);
    }
  }

  new Observable<typeof John>().subscribe(John); // Subscribed to John
}

{
  //* Undefined, null, never, unknown
  let abc = undefined;
  const def = null;
  console.log({ abc, def });

  function getData(): string | undefined {
    return "";
  }

  const data = getData();

  if (data) {
    const someOtherData = data;
    console.log({ someOtherData });
  }
  console.log("data:", data);

  let input: unknown;
  input = "someInput";
  let someSensitiveValue: string;

  if (typeof input === "string") {
    someSensitiveValue = input;
    console.log("someSensitiveValue:", someSensitiveValue);
  }
  console.log("input:", input);

  function doTasks(tasks: number): void | never | undefined {
    if (tasks > 3) {
      throw new Error("Too many tasks!");
    }
  }

  const stuff = doTasks(2);
  console.log("stuff:", stuff);
}

{
  //* Enums and Switch statements
  enum AuthError {
    WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
    SERVER_FAIL = "SERVER_FAIL",
    EXPIRED_SESSION = "EXPIRED_SESSION",
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  }

  console.log("AuthError[AuthError.WRONG_CREDENTIALS]:", AuthError[AuthError.WRONG_CREDENTIALS]);
  console.log("AuthError?.WRONG_CREDENTIALS:", AuthError?.WRONG_CREDENTIALS);

  function handleError(error: AuthError): void {
    switch (error) {
      case AuthError.EXPIRED_SESSION:
        console.log("Get a new session!");
        break;
      case AuthError.SERVER_FAIL:
        console.log("Restart the server!");
        break;
      case AuthError.WRONG_CREDENTIALS:
      case AuthError.UNEXPECTED_ERROR:
        console.log("Check your input!");
        break;
      default:
        break;
    }
  }
  handleError(AuthError.SERVER_FAIL); // Restart the server!
}

//* Decorators
const someObject: Manager = {
  someProperty: "initialValue",
};

class Manager {
  @watchChange
  // @linkValue(someObject)
  someProperty!: string;
}

// watchChange(Manager.prototype, "someProperty");

const manager: Manager = new Manager();
manager.someProperty = "123";
console.log("someObject.someProperty:", someObject.someProperty);
manager.someProperty = "435";
console.log("someObject.someProperty:", someObject.someProperty);

// function linkValue(otherObject: Manager): (target: Manager, key: string) => void {
//   return function (target: Manager, key: string) {
//     let property = target[key as keyof Manager];

//     const getter = (): string => {
//       return property;
//     };

//     const setter = (newVal: string): void => {
//       property = newVal;
//       otherObject[key as keyof Manager] = newVal;
//     };

//     Object.defineProperty(target, key, {
//       get: getter,
//       set: setter,
//       configurable: true,
//       enumerable: true,
//     });
//   };
// }

function watchChange(target: Manager, key: string): void {
  let property = target[key as keyof Manager];

  const getter = (): string => {
    return property;
  };

  const setter = (newVal: string): void => {
    console.log(`${key as string} changed from ${property} to ${newVal}`);
    property = newVal;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    configurable: true,
    enumerable: true,
  });
}

// Example 2
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    console.log(`Hello, ${this.greeting}`);
  }
}

const greeter = new Greeter("world");
console.log("greeter:", greeter);
