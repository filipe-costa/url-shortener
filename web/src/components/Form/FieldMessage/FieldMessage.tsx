import React, { FC, HTMLAttributes } from "react";
import cx from "classnames";

type FieldMessageProps = HTMLAttributes<HTMLDivElement> & {
  variant: "success" | "error";
};

export const FieldMessage: FC<FieldMessageProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  const isValidVariant = (variant: string, selected: string) => {
    return variant === selected;
  };

  const classes = cx(
    {
      "bg-red-300": isValidVariant(variant, "error"),
      "bg-green-300": isValidVariant(variant, "success"),
    },
    "rounded border py-2 px-4",
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
