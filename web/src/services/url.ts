import axios from "axios"

export const URLService = {
  generate: (data: {}) => axios.post("/urls", data)
}