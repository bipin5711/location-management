# location-management

Project Setup

*Run npm install to install the packages
*Run npm run dev to run project on localhost (nodemon)
*Run npm start to run project on server (node)

CURL

1. POST Location

curl --location 'http://localhost:5000/locations' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Kolkata",
    "lat": 23.003290,
    "lng": 57.681511
}'


2. GET All Locations

curl --location 'http://localhost:5000/locations'


3. Update Existing Location

curl --location --request PUT 'http://localhost:5000/locations/1' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Navi Mumbai",
    "lat": 43.003290,
    "lng": 57.681511
}'


4. Get individual Location

curl --location 'http://localhost:5000/locations/1'


5. Delete Location

curl --location --request DELETE 'http://localhost:5000/locations/2'


6. Get Weather 

curl --location 'http://localhost:5000/weather/1'


7. Get History

curl --location 'http://localhost:5000/history/1'




