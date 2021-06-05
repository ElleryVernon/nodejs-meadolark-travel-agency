const express = require("express")
const expressHandlebars = require("express-handlebars")
const app = express()
const fortunes = [
  "Conquer your fears or thy will conquer you.",
  "Rivers need springs.",
  "Do net fear what you don't know.",
  "You wil have a plleasant surprise.",
  "Whenever possible, keep it simple.",
]
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
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render("about", { fortune: randomFortune })
})

// custom 404 page
app.use((req, res) => {
  res.type("text/plain")
  res.status(404)
  res.render("404")
})

// custom 500 page.
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type("text/plain")
  res.status(500)
  res.render("500")
})

app.listen(port, () => {
  ;`Express started on http://localhost: ${port}` +
    `press Ctrl + C to terminate`
})
