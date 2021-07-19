const path = require("path")

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": path.join(__dirname, "..", "/db/storage/dev.sqlite")
  },
  "test": {
    "dialect": "sqlite",
    "storage": path.join(__dirname, "..", "/db/storage/test.sqlite")
  },
  "production": {
    "dialect": "sqlite",
    "storage": path.join(__dirname, "..", "/db/storage/prod.sqlite")
  }
}
