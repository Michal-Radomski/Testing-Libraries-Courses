import { useEffect, useState } from "react";
import classNames from "classnames";
import Label from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: Error;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ className, label, error, onChange, ...rest }: any): JSX.Element => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    setShowError(true);
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    onChange(event);
  };

  let errorMessage = null;
  if (showError && error && error[rest.name as keyof typeof error]) {
    errorMessage = <div className="mt-0.5 text-red-500 text-sm">{error[rest.name].join(", ")}</div>;
  }

  const classes = classNames(
    "mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm",
    errorMessage && "border-red-500",
    className
  );

  return (
    <div>
      <Label htmlFor={rest.name}>{label}</Label>
      <input {...rest} id={rest.name} className={classes} onChange={handleChange} />
      {errorMessage}
    </div>
  );
};

export default Input;
