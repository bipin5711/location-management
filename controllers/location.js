export const locationData = [];

export const getAllLocations = (req, res) => {
  try {
    res.status(200).send(locationData);
  } catch (error) {
    console.log(error);
  }
};

export const postLocation = (req, res) => {
  try {
    const { name, lat, lng } = req.body;

    if (!name || !lat || !lng) {
      return res.status(400).send("Please send name, latitude and longitude");
    }
    locationData.push({ name, lat, lng, id: locationData.length + 1 });
    res.status(201).send("Location added successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = (req, res) => {
  try {
    const { id } = req.params;
    const location = locationData.filter((loc) => loc.id == id);
    if (!location || location.length == 0) {
      return res.status(404).send(`Location with id ${id} not found`);
    }

    res.status(200).send(location[0]);
  } catch (error) {
    console.log(error);
  }
};

export const updateLocation = (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocation = (req, res) => {
  try {
    const { id } = req.params;

    const locationIndex = locationData.findIndex((loc) => loc.id == id);
    if (locationIndex == -1) {
      return res.status(404).send(`Location with id ${id} not found`);
    }
    locationData.splice(locationIndex, 1);
    res.status(200).send("Location deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};
