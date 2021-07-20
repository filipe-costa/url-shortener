import express from "express"
import {createConnection} from "typeorm"
import cors from "cors"
import helmet from "helmet"
import Hashids from "hashids"
import {UrlEntity} from "./db/entity/Url"
import { formatUrl } from "./utils/url"

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
      URLRepository.insert({url: body.url})
        .then((entity) => {
          const baseUrl = formatUrl(req.protocol, "://", req.get("host") as string, "/", hashids.encode(entity.identifiers[0].id))
          res.status(200).json({
            url: baseUrl
          })
        })
        .catch(() => {
          res.sendStatus(404)
        })
    })
  
    return app.listen(process.env.HTTP_PORT, () => {
      console.log(`Listening on port http://localhost:${process.env.HTTP_PORT}`)
    })
  })
    .catch((err) => console.error(err))
}
