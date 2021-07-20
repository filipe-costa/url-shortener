import {EntitySchema} from "typeorm"

export interface Url {
  id: number
  url: string
}

export const UrlEntity = new EntitySchema<Url>({
  name: "Url",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    url: {
      type: String
    }
  }
})