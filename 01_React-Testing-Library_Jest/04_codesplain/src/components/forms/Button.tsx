import classNames from "classnames";
import { IssueDraftIcon as Spinner } from "@primer/octicons-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  wide?: boolean; // Optional prop to indicate if the button should be wide
  className?: string; // Optional CSS class name
  loading?: boolean; // Optional loading state
  children: React.ReactNode; // Children can be any valid React node
}

const Button: React.FC<ButtonProps> = ({ wide, className, children, loading, ...rest }): JSX.Element => {
  const classes = classNames(
    "rounded-md border bg-blue-600 py-3 text-sm font-medium text-white",
    {
      "opacity-50": loading,
    },
    wide ? "px-12" : "px-6",
    loading ? "border-blue-300" : "border-blue-600",
    className
  );

  const spinner = <Spinner className="animate-spin w-10" />;

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? spinner : children}
    </button>
  );
};

export default Button;
