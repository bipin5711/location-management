export const locationData = [];

export const getAllLocations = (req, res) => {
  res.status(200).send(locationData);
};

export const postLocation = (req, res) => {
  console.log(req.body);

  const { name, lat, lng } = req.body;

  if (!name || !lat || !lng) {
    return res.status(400).send("Please send name, latitude and longitude");
  }
  locationData.push({ name, lat, lng, id: locationData.length + 1 });
  res.status(201).send("Location added successfully!");
};

export const getLocation = (req, res) => {
  const { id } = req.params;
  const location = locationData.filter((loc) => loc.id == id);
  if (!location || location.length == 0) {
    return res.status(404).send(`Location with id ${id} not found`);
  }

  res.status(200).send(location[0]);
};

export const updateLocation = (req, res) => {
  const { id } = req.params;

  const { name, lat, lng } = req.body;
  const locationIndex = locationData.findIndex((loc) => loc.id == id);
  if (locationIndex == -1) {
    return res.status(404).send(`Location with id ${id} not found`);
  }
  locationData[locationIndex] = {
    id,
    name,
    lat,
    lng,
  };

  res.status(200).send("Location updated successfully!");
};

export const deleteLocation = (req, res) => {
  const { id } = req.params;

  const locationIndex = locationData.findIndex((loc) => loc.id == id);
  if (locationIndex == -1) {
    return res.status(404).send(`Location with id ${id} not found`);
  }
  locationData.splice(locationIndex, 1);
  res.status(200).send("Location deleted successfully!");
};
