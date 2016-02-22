# bikesantiago-client

## Introduction
Scraping data from [bikesantiago][1], this npm module expose a function for get a geojson object whit
all bike station  available in the sistem.

## Usage

```javascript
var bksantiago = require('bikesantiago-client');

// async function call
bksantiago(function(geojson){
    // do something...
    console.log(JSON.stringify(geojson));
});
```

## Geojson object result
The geojson object is a standar geojson object:
```json
{
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "EPSG:4326"
    }
  },
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -70.59037999999998,
          -33.40296
        ]
      },
      "properties": {
        "type": "bikesantiago",
        "docker": {
          "title": "El Ciruelillo", // direction
          "dir": "Alonso de Córdova / El Ciruelillo",  // details direction
          "docks": 10,  // dockers available
          "bikes": 5    // bikes available
        }
      }
    },
    .
    .
    .

```



[1]: "http://www.bikesantiago.cl/"
