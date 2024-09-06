import jwt from "jsonwebtoken";

export function generateToken(userEmail: string, doneFn: jwt.SignCallback): void {
  jwt.sign({ email: userEmail }, "secret123", doneFn);
}

export function generateTokenPromise(userEmail: string): Promise<string | unknown> {
  const promise = new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, "secret123", (error: Error | null, token: unknown | string) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });

  return promise;
}

generateToken("test@test.com", (error: Error | null, token: unknown | string) => {
  if (error) {
    console.log({ error });
  }
  console.log(token);
});

generateTokenPromise("test@test.com").then((token) => console.log({ token }));
