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
