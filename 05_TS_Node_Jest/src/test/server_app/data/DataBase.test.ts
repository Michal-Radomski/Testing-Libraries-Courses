import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suite", (): void => {
  let sut: DataBase<SomeTypeWithId>;

  const fakeId = "1234";

  const someObject1: SomeTypeWithId = {
    id: "",
    name: "someName",
    color: "blue",
  };

  const someObject2: SomeTypeWithId = {
    id: "",
    name: "someOtherName",
    color: "blue",
  };

  beforeEach((): void => {
    sut = new DataBase<SomeTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after inset", async (): Promise<void> => {
    const actual = await sut.insert({
      id: "",
    } as any);

    expect(actual).toBe(fakeId);
  });

  it("should get element after inset", async (): Promise<void> => {
    const id = await sut.insert(someObject1);
    const actual = await sut.getBy("id", id);

    expect(actual).toBe(someObject1);
  });

  it("should find all elements with the same property", async (): Promise<void> => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const expected = [someObject1, someObject2];

    const actual = await sut.findAllBy("color", "blue");

    expect(actual).toEqual(expected);
  });

  it("should change color on object", async (): Promise<void> => {
    const id = await sut.insert(someObject1);
    const expectedColor = "red";

    await sut.update(id, "color", expectedColor);
    const object = await sut.getBy("id", id);
    const actualColor = object?.color;

    expect(actualColor).toBe(expectedColor);
  });

  it("should delete object", async (): Promise<void> => {
    const id = await sut.insert(someObject1);
    await sut.delete(id);

    const actual = await sut.getBy("id", id);

    expect(actual).toBeUndefined();
  });

  it("should get all elements", async (): Promise<void> => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);
    const expected = [someObject1, someObject2];

    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});
