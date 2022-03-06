require('dotenv').config();

const { getInput, inquirerMenu, pauseMenu } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async() => {
  
  let opt = '';
  const searches = new Searches();

  do {

    opt = await inquirerMenu();
    
    switch (opt) {
      case 1:
        //Show message
        const city = await getInput('City: ');
        searches.searchCity(city);

        //Search the places

        //Select a place

        //Weather data

        //Show results
        console.log('\nInfo city\n');
        console.log('City:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temp:');
        console.log('Min:');
        console.log('Max:');


      break;
    }

    if ( opt !== 0 ) await pauseMenu();
    
  } while (opt !== 0);
}

main();