declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

interface Task {
  id?: string;
  title: string;
  summary: string;
  category: string;
}
