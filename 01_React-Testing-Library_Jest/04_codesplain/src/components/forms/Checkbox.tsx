import classNames from "classnames";
import Label from "./Label";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // Optional CSS class name
  label?: string; // Optional label text
}

const Checkbox: React.FC<CheckboxProps> = ({ className, label, ...rest }): JSX.Element => {
  const classes = classNames("h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm", className);

  return (
    <div className="flex gap-4">
      <input type="checkbox" id={rest.name} {...rest} className={classes} />
      <Label htmlFor={rest.name}>{label}</Label>
    </div>
  );
};

export default Checkbox;
