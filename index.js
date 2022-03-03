const { getInput, inquirerMenu } = require("./helpers/inquirer")

const main = async() => {
  
  let opt = '';

  do {

    opt = await inquirerMenu();
    console.log({ opt });
    
  } while (opt !== 0);
}

main();