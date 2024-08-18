import classNames from "classnames";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className, ...props }): JSX.Element => {
  const classes = classNames("block text-sm font-medium text-gray-700", className);

  return (
    <label {...props} className={classes}>
      {children}
    </label>
  );
};

export default Label;
