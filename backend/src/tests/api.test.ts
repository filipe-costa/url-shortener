import { Connection, Repository, getConnection} from "typeorm";
import axios from "axios"
import { Server } from "http"
import { Url, UrlEntity } from "../db/entity/Url";
import server from "../server"

describe("API Testing module", () => {
  const BASE_URL = `http://localhost:${process.env.HTTP_PORT}`
  let app: Server
  let connection: Connection
  let URLRepository: Repository<Url>

  beforeAll(async() => {
    // App will create a connection for us
    app = await server() as Server
    connection = await getConnection()
    // Get url repository
    URLRepository = await connection.getRepository(UrlEntity)
    // Drop database and create new one
    await connection.synchronize(true)
  })
  
  afterAll(async() => {
    // Close connections
    await connection.dropDatabase()
    await connection.close()
    await app.close()
  })

  describe("API tests", () => {
    beforeAll(async() => {
      await connection.synchronize(true)
    })
    it("creates a new url and returns its hash", async() => {
      const res = await axios.post(`${BASE_URL}/urls`, {url: `${BASE_URL}/healthz`})
      expect(res.status).toBe(200)
      expect(res.data.url).toEqual(`${BASE_URL}/jR`)
    })
  
    it("gets url using a hash", async() => {
      const res = await axios.get(`${BASE_URL}/jR`)
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

  describe("Database tests", () => {
    beforeAll(async() => {
      await connection.synchronize(true)
    })

    afterEach(async() => {
      await URLRepository.clear()
    })

    it("inserts a new url", async() => {
      const mockURL = {
        id: 1,
        url: "https://google.com"
      }
      await URLRepository.insert({url: "https://google.com"})
      const url = await URLRepository.findOne()
      expect(url).toEqual(mockURL)
    })
  
    it("inserts two new urls", async() => {
      const mockURLs = [
        {
          id: 1,
          url: "https://google.com"
        },
        {
          id: 2,
          url: "https://news.ycombinator.com/"
        }
      ]
  
      await URLRepository.insert({url: "https://google.com"})
      await URLRepository.insert({url: "https://news.ycombinator.com/"})
  
      const urls = await URLRepository.findAndCount()
  
      expect(urls[1]).toEqual(2)
      expect(urls[0][0].url).toEqual(mockURLs[0].url)
      expect(urls[0][1].url).toEqual(mockURLs[1].url)
    })
  })
})




