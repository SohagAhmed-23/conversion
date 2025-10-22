const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Conversion functions
function convertLength(value, from, to) {
  const units = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
  };
  return value * (units[from] / units[to]);
}

function convertWeight(value, from, to) {
  const units = {
    milligram: 0.001,
    gram: 1,
    kilogram: 1000,
    ounce: 28.3495,
    pound: 453.592,
  };
  return value * (units[from] / units[to]);
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius;
  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
  else if (from === "Kelvin") celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return (celsius * 9 / 5) + 32;
  if (to === "Kelvin") return celsius + 273.15;
}


app.get("/", (req, res) => {
  res.render("length", { result: null });
});

app.post("/length", (req, res) => {
  const { value, from_unit, to_unit } = req.body;
  const result = convertLength(parseFloat(value), from_unit, to_unit);
  res.render("length", { result });
});

app.get("/weight", (req, res) => {
  res.render("weight", { result: null });
});

app.post("/weight", (req, res) => {
  const { value, from_unit, to_unit } = req.body;
  const result = convertWeight(parseFloat(value), from_unit, to_unit);
  res.render("weight", { result });
});

app.get("/temperature", (req, res) => {
  res.render("temperature", { result: null });
});

app.post("/temperature", (req, res) => {
  const { value, from_unit, to_unit } = req.body;
  const result = convertTemperature(parseFloat(value), from_unit, to_unit);
  res.render("temperature", { result });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
