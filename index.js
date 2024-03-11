import express from "express";
import 'dotenv/config'
import locationRoute from "./routes/location.js";
import weatherRoute from "./routes/weather.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/locations", locationRoute);

app.use("/weather", weatherRoute);

app.listen(port, () => {
  console.log(`App is listening to Port: ${port}`);
});
