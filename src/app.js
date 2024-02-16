const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cors = require('cors');

const app = express();
const port = 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(cors());

app.get("", (req, res) => {
  res.render("index", {
    title: "Kris",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a message.",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) return res.send({ error: "No address given." });

  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
    address,
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({ error: "You must provide a search term" });

  res.send([]);
});

app.get("/help/*", (req, res) => {
  res.send("Help article not found.");
});

app.get("*", (req, res) => {
  res.render("404", {});
});

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}.`);
});
