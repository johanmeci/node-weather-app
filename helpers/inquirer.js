const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [
      {
        value: 1,
        name: `${'1.'.green.bold} Search city`
      },
      {
        value: 2,
        name: `${'2.'.green.bold} History`
      },
      {
        value: 0,
        name: `${'0.'.green.bold} Exit`
      }
    ]
  }
]

const inquirerMenu = async() => {

  console.clear();
  console.log('======================'.rainbow);
  console.log('   Select an option  '.bold);
  console.log('======================'.rainbow);

  const { option } = await inquirer.prompt(questions);

  return option;

}

const pauseMenu = async() => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green.bold} to continue`
    }
  ]

  console.log('\n');
  await inquirer.prompt(question);

}

const getInput = async( message ) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if (value.length === 0) {
          return 'Empty value';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listDeleteTasks = async( tasks = [] ) => {

  const choices = tasks.map( (task, index) => {

    const i = `${index + 1}.`.green;

    return {
      value: task.id,
      name: `${i} ${task.description}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions);

  return id;

}

const confirmAction = async(message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;

}

const checkListTasks = async( tasks = [] ) => {

  const choices = tasks.map( (task, index) => {

    const i = `${index + 1}.`.green;

    return {
      value: task.id,
      name: `${i} ${task.description}`,
      checked: ( task.completeIn ) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question);

  return ids;

}

module.exports = {
  inquirerMenu,
  pauseMenu,
  getInput,
  listDeleteTasks,
  confirmAction,
  checkListTasks
}