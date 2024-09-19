export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (arg: string) => void;

export function calculateComplexity(stringInfo: StringInfo): number {
  return Object.keys(stringInfo.extraInfo!).length * stringInfo.length;
}

export function toUpperCaseWithCb(arg: string, callBack: LoggerServiceCallBack): string | undefined {
  if (!arg) {
    callBack("Invalid argument!");
    return;
  }
  callBack(`called function with ${arg}`);
  return arg.toUpperCase();
}

export class OtherStringUtils {
  public callExternalService(): void {
    console.log("Calling external service!!!");
  }

  public toUpperCase(arg: string): string {
    return arg.toUpperCase();
  }

  public logString(arg: string): void {
    console.log(arg);
  }
}
