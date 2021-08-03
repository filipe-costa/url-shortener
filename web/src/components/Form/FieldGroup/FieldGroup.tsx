import React, { FC, HTMLAttributes } from "react";
import cx from "classnames";

export const FieldGroup: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  const classes = cx("flex flex-col", className);
  return <div className={classes}>{children}</div>;
};
