import { Router } from "express";
import { locationData } from "../controllers/location.js";
import axios from "axios";
import redis from "redis";

const router = Router();

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

async function fetchWeatherData(lat, lng, res) {
  try {
    const { data } = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}`
    );
    await redisClient.set("weather", JSON.stringify(data));
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("error while fetching weather data");
  }
}
async function fetchHistory(lat, lng, res) {
  try {
    // const date = new Date().toISOString().substring(0,10);
    var oneWeekAgoDate = new Date();
    oneWeekAgoDate = new Date(
      oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7)
    )
      .toISOString()
      .substring(0, 10);
    const { data } = await axios.get(
      `${process.env.WEATHER_API_BASE_URL}/history.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}&dt=${oneWeekAgoDate}`
    );
    await redisClient.set("history", JSON.stringify(data));
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("error while fetching weather data");
  }
}

router.get("/weather/:id", async (req, res) => {
  const { id } = req.params;
  const location = locationData.filter((loc) => loc.id == id);
  if (!location || location.length == 0) {
    return res.status(404).send(`Location with id ${id} not found`);
  }
  const { lat, lng } = location[0];
  const cachedData = await redisClient.get("weather");
  if (JSON.parse(cachedData) != null) {
    res.send(JSON.parse(cachedData));
    return;
  }
  fetchWeatherData(lat, lng, res);
});

router.get("/history/:id", async (req, res) => {
  const { id } = req.params;
  const location = locationData.filter((loc) => loc.id == id);
  if (!location || location.length == 0) {
    return res.status(404).send(`Location with id ${id} not found`);
  }
  const { lat, lng } = location[0];
  const cachedData = await redisClient.get("history");
  if (JSON.parse(cachedData) != null) {
    res.send(JSON.parse(cachedData));
    return;
  }
  fetchHistory(lat, lng, res);
});

export default router;
