import { ValidationError } from "./errors";

export function validateNotEmpty(text: string, errorMessage: string): void {
  if (!text || text.trim().length === 0) {
    throw new ValidationError(errorMessage);
  }
}
