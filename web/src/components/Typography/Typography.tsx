import React, {FC} from "react";
import cx from "classnames"

type FontElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"

interface TypographyProps {
  className?: string,
  as?: FontElement
}

export const Typography: FC<TypographyProps> = ({className, as = "span", children, ...props}) => {
  const isValidTag = (tag: string, name: string) => {
    return tag === name
  }

  const classes = cx({
    "text-6xl": isValidTag(as, "h1"),
    "text-5xl": isValidTag(as, "h2"),
    "text-4xl": isValidTag(as, "h3"),
    "text-3xl": isValidTag(as, "h4"),
    "text-2xl": isValidTag(as, "h5"),
    "text-xl": isValidTag(as, "h6"),
    "text-base": isValidTag(as, "span") || isValidTag(as, "p"),
  }, className)

  switch(as) {
    case "h1":
     return <h1 {...props} className={classes}>{children}</h1>
    case "h2":
     return <h2 {...props} className={classes}>{children}</h2>
    case "h3":
     return <h3 {...props} className={classes}>{children}</h3>
    case "h4":
     return <h4 {...props} className={classes}>{children}</h4>
    case "h5":
     return <h5 {...props} className={classes}>{children}</h5>
    case "h6":
     return <h6 {...props} className={classes}>{children}</h6>
    case "span":
     return <span {...props} className={classes}>{children}</span>
    case "p":
     return <p {...props} className={classes}>{children}</p>
    default:
     throw new Error(`Expected one of ["h1", "h2", "h3", "h4", "h5", "h6", "span", "p"] but got ${as}`)
  }
}
