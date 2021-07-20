import { Connection, getConnection} from "typeorm";
import axios from "axios"
import dotenv from "dotenv"
import { Server } from "http"
import path from "path"

import { UrlEntity } from "../../db/entity/Url";
import server from "../../server"

dotenv.config({path: path.join(__dirname, "../../../", "test.env")})

describe("API tests", () => {
  const BASE_URL = `http://localhost:${process.env.HTTP_PORT}`
  let app: Server
  let connection: Connection
  
  beforeAll(async() => {
    app = await server() as Server
    connection = await getConnection()
  })

  afterAll(async() => {
    await connection.getRepository(UrlEntity).clear()
    await app.close()
  })
  
  it("creates a new url and returns its hash", async() => {
    const res = await axios.post(`${BASE_URL}/urls`, {url: `${BASE_URL}/healthz`})
    expect(res.status).toBe(200)
    expect(res.data.url).toEqual(`${BASE_URL}/mO`)
  })

  it("gets url using a hash", async() => {
    const res = await axios.get(`${BASE_URL}/mO`)
    expect(res.status).toBe(200)
  })

  it("throws error when using unexistent hash", async() => {
    try {
      await axios.get(`${BASE_URL}/foo`)
    } catch(err) {
      if(err.response) {
        expect(err.response.status).toBe(404)
      }
    }
  })
})