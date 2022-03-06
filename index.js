require('dotenv').config();

const { getInput, inquirerMenu, pauseMenu, listPlaces } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async() => {
  
  let opt = '';
  const searches = new Searches();

  do {

    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        //Show message
        const inputSearch = await getInput('City: ');
        
        //Search the places
        const places = await searches.searchCity(inputSearch);
        
        //Select a place
        const idSelected = await listPlaces(places);
        const objSelectedPlace = places.find( p => p.id === idSelected );

        //Weather data
        const weather = await searches.weatherCity(objSelectedPlace.lat, objSelectedPlace.lng);

        //Show results
        console.clear();
        console.log('======================'.blue);
        console.log('   🌧  Info City  🌧 '.bold);
        console.log('======================'.blue);
        console.log('City:', objSelectedPlace.name.green);
        console.log('Lat:', objSelectedPlace.lat);
        console.log('Lng:', objSelectedPlace.lng);
        console.log('Temp:', weather.temp);
        console.log('Min:', weather.min);
        console.log('Max:', weather.max);
        console.log('Desc:', weather.desc.green);

      break;
    }

    if ( opt !== 0 ) await pauseMenu();
    
  } while (opt !== 0);
}

main();