import axios from "axios"

export const URLService = {
  generate: (data: {}) => axios.post("/api/v1/urls", data)
}