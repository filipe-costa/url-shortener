import React, { FC, InputHTMLAttributes } from "react";
import cx from "classnames";

export const FieldInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  const classes = cx(
    "flex flex-col rounded border py-2 px-4 border-gray-800 focus:text-blue-500 focus:border-blue-500",
    className
  );
  return <input {...props} className={classes} />;
};
