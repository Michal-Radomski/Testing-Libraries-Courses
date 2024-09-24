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

function doTasks(tasks: number): void | never | undefined {
  if (tasks > 3) {
    throw new Error("Too many tasks!");
  }
}

const stuff = doTasks(2);
console.log("stuff:", stuff);

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
