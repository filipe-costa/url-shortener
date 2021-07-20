import { createConnection, Connection, Repository } from "typeorm";
import path from "path"
import dotenv from "dotenv"
import { Url, UrlEntity } from "../../db/entity/Url";

dotenv.config({path: path.join(__dirname, "../../../", "test.env")})

describe("Database tests", () => {
  let connection: Connection
  let URLRepository: Repository<Url>
  
  beforeAll(async() => {
    // Create connection
    connection = await createConnection()
    // Create database schema for connection
    await connection.synchronize(true)
    // Get url repository
    URLRepository = await connection.getRepository(UrlEntity)
  })

  afterAll(async() => {
    // Close connection
    await connection.close()
  })

  afterEach(async() => {
    // Clears the table
    await URLRepository.clear()
  })

  it("inserts a new url", async() => {
    const mockURL = {
      id: 1,
      url: "https://google.com"
    }
    await URLRepository.insert({url: "https://google.com"})
    const url = await URLRepository.findOne(mockURL.id)
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