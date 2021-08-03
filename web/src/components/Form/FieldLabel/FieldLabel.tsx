import React, { FC, LabelHTMLAttributes } from "react";
import cx from "classnames";

export const FieldLabel: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = cx("flex flex-col", className);
  return (
    <label {...props} className={classes}>
      {children}
    </label>
  );
};
