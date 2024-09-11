declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

interface RootSubState {
  value: string;
  blurred: boolean;
}
interface RootState {
  [key: string]: RootSubState;
}

interface Action {
  type: string;
  input: string | number;
  value?: string;
}
