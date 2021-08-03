import React, { FC, FormHTMLAttributes } from "react";
import cx from "classnames";

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  className,
  children,
  onSubmit,
  ...props
}) => {
  const classes = cx(className, "flex flex-col w-full max-w-screen-sm");

  return (
    <form {...props} className={classes} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
