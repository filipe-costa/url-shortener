import express from "express"
import {createConnection} from "typeorm"
import cors from "cors"
import helmet from "helmet"
import Hashids from "hashids"
import {UrlEntity} from "./db/entity/Url"
import { formatUrl, isValidUrl } from "./utils/url"

export default async() => {
  return createConnection().then(async(connection) => {
    const URLRepository = connection.getRepository(UrlEntity)
    const app = express()
    const hashids = new Hashids()
  
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    
    // Browsers try to get this icon
    app.get('/favicon.ico', (_, res) => { 
      res.status(204);
      res.end();
    });

    app.get("/healthz", (_, res) => {
      res.sendStatus(200)
    })
  
    app.get("/:id", (req, res) => {
      const {id} = req.params
      URLRepository.findOne(hashids.decode(id).toString())
        .then((entity) => {
          if (entity) res.redirect(entity?.url as string)
          else res.sendStatus(404)
        })
        .catch(() => {
          res.sendStatus(404)
        })
    })
  
    app.post("/urls", (req, res) => {
      const body = req.body
      const url = body.url
      if(isValidUrl(url)) {
          return URLRepository.insert({url})
          .then((entity) => {
            // If it has a scheme we are using NGINX
            const hasScheme = ["http","https"].find((str) => req.get("host")?.includes(str)) as string
            const url = hasScheme ? req.get("host") as string : `${req.protocol}://localhost:${process.env.HTTP_PORT}/`
            const baseUrl = formatUrl(url, hashids.encode(entity.identifiers[0].id))
            res.status(200).json({
              url: baseUrl
            })
          })
          .catch((err) => {
            console.log({err})
            res.sendStatus(404)
          })
      }
      return res.status(404).json({message: "Invalid url"})
    })

    return app.listen(process.env.HTTP_PORT, () => {
      console.log(`Listening on port http://localhost:${process.env.HTTP_PORT}`)
    })
  })
    .catch((err) => console.error(err))
}
