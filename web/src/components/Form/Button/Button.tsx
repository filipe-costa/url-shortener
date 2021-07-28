import React, {ButtonHTMLAttributes, FC} from "react";
import cx from "classnames";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({className, ...props}) => {
  const classes = cx("bg-blue-500 hover:bg-blue-600 hover:shadow-md rounded text-white p-3", className)
  return (
    <button className={classes} {...props} />
  )
}
