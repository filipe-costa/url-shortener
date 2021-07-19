import sqlite3 from "sqlite3"
import path from "path"
import { getDBNameForEnvironment } from "../../utils/utils"

const getPathToDB = () => {
  return path.resolve(__dirname, `../storage/${getDBNameForEnvironment()}.sqlite`)
}

const createDB = () => {
  const client = new sqlite3.Database(getPathToDB(), sqlite3.OPEN_CREATE, (err) => {
    if(err) {
      return err
    }

    console.log("Sqlite Database created...")
  })
  client.close()
}

createDB()