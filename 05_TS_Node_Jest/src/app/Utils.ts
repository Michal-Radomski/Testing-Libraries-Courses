export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return toUpperCase(arg);
  }
}

export function toUpperCase(arg: string): string {
  return arg.toUpperCase();
}
