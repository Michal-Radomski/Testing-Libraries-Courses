import classNames from "classnames";

interface CustomError extends Error {
  message: string;
}

function FormError({ error, className }: { error: CustomError; className: string }): JSX.Element {
  if (error instanceof Error || (error && (error as CustomError).message)) {
    const classes = classNames("text-red-500", className);

    return <div className={classes}>Something went wrong: {error.message}</div>;
  }
  return null as any;
}

export default FormError;
