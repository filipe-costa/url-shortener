import React, {FC} from "react";

export const Container: FC = ({children}) => {
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  )
}