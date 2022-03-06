const fs = require('fs');
const axios = require('axios').default;

class Searches {

  history = [];
  dbPath = './db/database.json';

  constructor() {
    //Read DB
    this.readDB();
  }

  get historyCapitalize() {

    return this.history.map( place => {
      let words = place.split(' ');
      words = words.map( w => w[0].toUpperCase() + w.substring(1));

      return words.join(' ');
    });
    
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    };
  }

  get paramsWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async searchCity(inputCity = '') {

    try {
      
      //Http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCity}.json`,
        params: this.paramsMapbox
      });

      const response = await instance.get();

      return response.data.features.map( place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }));

    } catch (error) {
      return [];
    }

  }

  async weatherCity(lat, lon) {
    try {
      
      //Http request
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {...this.paramsWeather, lat, lon}
      });

      const response = await instance.get();
      const { main, weather } = response.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      };

    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = '') {

    if (this.history.includes(place.toLowerCase())) {
      return;
    }

    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLowerCase());

    this.addDB();
  }

  addDB() {

    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {

    if (!fs.existsSync(this.dbPath)) {
      return;
    }

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    this.history = data.history;
  }
  
}

module.exports = Searches;