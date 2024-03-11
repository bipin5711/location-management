import express from "express";
import "dotenv/config";
import locationRoute from "./routes/location.js";
import weatherRoute from "./routes/weather.js";
import logger from "./middleware/logger.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(logger);

app.use("/locations", locationRoute);

app.use(weatherRoute);

app.listen(port, () => {
  console.log(`App is listening to Port: ${port}`);
});
