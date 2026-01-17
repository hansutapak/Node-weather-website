process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "hbs";
import { geocode } from "./utils/geocode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__dirname);

//define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partialDir = path.join(__dirname, "../templates/partials");

const app = express();

//setup handlesbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialDir);

//static directory
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "hola",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Jake",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help here!",
    name: "jake",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     { name: "jack", class: 12 },
//     { name: "julia", class: 10 },
//     { name: "Mark", class: 8 },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({ forcast: "-1 degree celcius", location: "Edinburgh" });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Write a correct address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, full_address } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        full_address,
        address: req.query.address,
      });
    },
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*path", (req, res) => {
  res.render("404", {
    title: "404",
    name: "hola",
    error: "help article not found",
  });
});

app.get("/*path", (req, res) => {
  res.render("404", {
    title: "404",
    name: "hola",
    error: "page Not Found",
  });
});

// app.com
// app.com/help
// app.com/about

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is on with port ${port}`);
});
