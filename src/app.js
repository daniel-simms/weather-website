const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Initialise express
const app = express();
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Config HBS
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Serve directory
app.use(express.static(publicDirectoryPath));
// Routes
//
// Home
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Daniel Simms"
  });
});
// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Daniel Simms"
  });
});
// Help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message",
    name: "Daniel Simms"
  });
});
// Weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }
  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});
// Sub 404
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Daniel Simms"
  });
});
// 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Daniel Simms"
  });
});

app.listen(3000, () => {
  console.log(chalk.cyan.bold.inverse(" Server is up on port 3000 "));
});
