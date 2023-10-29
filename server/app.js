import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import customer from "./routers/customer.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service healthy" }));
});

const PORT = process.env.PORT || 4040;

// not sure if needed //

const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
app.use(cors);
app.use(express.json());
app.use(logging);

app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});

app.get("/weather/:city", (request, response) => {
  const city = request.params.city;

  let cloudy = "clear";
  let rainy = false;
  let lowTemp = 32;

  if ("cloudy" in request.query) {
    cloudy = request.query.cloudy;
  }
  if ("rainy" in request.query && request.query.rainy === "true") {
    rainy = request.query.rainy;
  }
  if ("lowtemp" in request.query) {
    lowTemp = Number(request.query.lowtemp);
  }
  const min = 70;
  const max = 90;
  const temp = Math.floor(Math.random() * (max - min + 1) + min);
  response.send(
    JSON.stringify({
      current: `The weather in ${city} is ${temp} degrees today.`,
      cloudy: cloudy,
      rainy,
      temp: {
        current: temp,
        low: lowTemp
      }
    })
  );
});

app.use("/customer", customer);

// not sure ^^^ //

app.listen(4040, () => console.log(`Listening on port ${PORT}`));
