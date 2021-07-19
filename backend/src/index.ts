import express from "express"
import dotenv from "dotenv"
import path from "path"
import {Sequelize} from "sequelize"
import cors from "cors"
import helmet from "helmet"
import Hashids from "hashids"
import URLModel from "./db/models/url"
import { getDBNameForEnvironment } from "./utils/utils"

dotenv.config()

const app = express()

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, `./db/storage/${getDBNameForEnvironment()}.sqlite`)
})

const hashids = new Hashids()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/favicon.ico', (_, res) => { 
  res.status(204);
  res.end();
});

app.get("/:id", (req, res) => {
  const {id} = req.params
  const client = URLModel(sequelize)
  client.findByPk(hashids.decode(id).toString())
    .then((db_res) => {
      if(db_res) {
        res.redirect(db_res?.url as string)
      } else {
        res.sendStatus(200)
      }
    })
    .catch((err) => {
      // No-op
      console.error(err)
      res.sendStatus(200)
    })
})

app.post("/urls", (req, res) => {
  const body = req.body
  const client = URLModel(sequelize)
  client.create({url: body.url})
    .then((db_res) => {
      const id = db_res.getDataValue("id")
      const baseUrl = `${req.protocol}://${req.get("host")}/${hashids.encode(id)}`
      res.status(200).json({
        url: baseUrl
      })
    })
    .catch((err) => {
      // No-op
      console.error(err)
      res.sendStatus(200)
    })
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.APP_PORT}`)
})