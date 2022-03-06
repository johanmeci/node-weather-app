const axios = require('axios').default;

class Searches {

  constructor() {
    //Read DB
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    };
  }

  async searchCity(inputCity = '') {

    try {
      
      //Http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCity}.json`,
        params: this.paramsMapbox
      });

      const response = await instance.get();
      console.log(response.data);
  
      //Return an array with all the matches found
      return [];

    } catch (error) {
      return [];
    }

  }
  
}

module.exports = Searches;