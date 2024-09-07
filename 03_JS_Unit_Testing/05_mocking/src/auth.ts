import jwt from "jsonwebtoken";

export function generateToken(userEmail: string, doneFn: jwt.SignCallback): void {
  jwt.sign({ email: userEmail }, "secret123", doneFn);
}
