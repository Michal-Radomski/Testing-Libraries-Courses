import { it, expect, beforeAll, beforeEach, afterEach, afterAll, describe } from "vitest";

import { User } from "./hooks";

describe("Class User", (): void => {
  const testEmail: string = "test@test.com";
  let user: User;

  beforeAll((): void => {
    user = new User(testEmail);
    console.log("beforeAll()");
  });

  beforeEach((): void => {
    user = new User(testEmail);
    console.log("beforeEach()");
  });

  afterEach((): void => {
    // user = new User(testEmail);
    console.log("afterEach()");
  });

  afterAll((): void => {
    console.log("afterAll()");
  });

  it.concurrent("should update the email", (): void => {
    const newTestEmail: string = "test2@test.com";

    user.updateEmail(newTestEmail);

    expect(user.email).toBe(newTestEmail);
  });

  it.concurrent("should have an email property", (): void => {
    expect(user).toHaveProperty("email");
  });

  it.concurrent("should store the provided email value", (): void => {
    expect(user.email).toBe(testEmail);
  });

  it.concurrent("should clear the email", (): void => {
    user.clearEmail();

    expect(user.email).toBe("");
  });

  it.concurrent("should still have an email property after clearing the email", (): void => {
    user.clearEmail();

    expect(user).toHaveProperty("email");
  });
});
