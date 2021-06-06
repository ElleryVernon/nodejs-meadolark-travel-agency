const handlers = require("./lib/handlers")
const express = require("express")
const expressHandlebars = require("express-handlebars")
const fortune = require("./lib/fourtune")
const app = express()

app.get("/", handlers.home)

app.get("/about", handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.severError)

// 핸들바 뷰 설정
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
)
app.set("view engine", "handlebars")

const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => res.render("home"))

app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() })
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render("404")
})

// custom 500 page.
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render("500")
})
/* eslint-disable no-unused-vars */

if (require.main === module) {
  app.listen(port, () => {
    `Express started on http://localhost: ${port}` +
      `press Ctrl + C to terminate.`
  })
} else {
  module.exports = app
}
