import jwt from "jsonwebtoken";

const secret: string = "secret123";

export function generateToken(userEmail: string, doneFn: jwt.SignCallback): void {
  // console.log("doneFn.toString():", doneFn.toString());
  jwt.sign({ email: userEmail }, secret, doneFn);
}

export function generateTokenPromise(userEmail: string): Promise<string | unknown> {
  const promise = new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, secret, (error: Error | null, token: unknown | string) => {
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
  console.log(1, { token });
});

generateTokenPromise("test@test.com")
  .then((token) => console.log(2, { token }))
  .catch((err) => console.log({ err }));
