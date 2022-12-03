import colors from 'colors';
import inquirer from 'inquirer';

const questions = [
  {
    type: 'list',
    name: 'option',
    message: `${'Select an option'.green}`,
    choices: [
      { value: '1', name: `${'1.'.green} Create todo` },
      { value: '2', name: `${'2.'.green} Show all todos` },
      { value: '3', name: `${'3.'.green} Show completed todos` },
      { value: '4', name: `${'4.'.green} Show pending todos` },
      { value: '5', name: `${'5.'.green} Complete todo(s)` },
      { value: '6', name: `${'6.'.green} Delete todo(s)` },
      { value: '0', name: `${'0.'.green} Exit` },
    ]
  }
];

/**
 *  Show list menu
 * @returns {Promise<string>} selected option id
 */
export const showMenu = async()=>{
  console.clear();
  console.log('======================================='.green);
  console.log(' Manage your todos ');
  console.log('======================================='.green);

  const option = await inquirer.prompt(questions);
  return option.option;
}

/**
 * Wait for input
 */
export const wait = async()=>{
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'none',
      message: `Press ${'ENTER'.green} to continue`,
    }
  ]);
}

/**
 * Wait for input with custom message
 * @param {string} message
 * @returns {Pomise<string>} value
 */
export const getRequiredInput = async(message)=>{
  const question = [{
    type: 'input',
    name: 'value',
    message: message,
    validate(value ){
      if (value.length === 0) return 'Please enter a value';
      return true;
    }
  }];

  const resp = await inquirer.prompt(question);
  return resp.value;
}

export const deleteMenu = async(todos)=>{
  console.log('\n');
  const prompt = [{
      type: 'checkbox',
      name: 'selectedIds',
      message: `Select todos to delete`,
      choices: todos.map((e,i) => ({value: e.id, name: `${(i+1 + '.').green} ${e.desc}`}))
    }];

  const {selectedIds} = await inquirer.prompt(prompt);
  const selectedTodosText = todos
                              .filter(e => selectedIds.includes(e.id))
                              .reduce((acc, cur) => 
                                `${acc}\n   ${cur.desc.green}`, '');

  if (selectedIds.length > 0) {
    const promptConfirm = [{
      type: 'confirm',
      name:'confirmation',
      default: true,
      message: `You will delete following todos: ${selectedTodosText} \n Are you sure?`
    }];
    const {confirmation} = await inquirer.prompt(promptConfirm);
    if(confirmation){
      return selectedIds;
    }
  }
  return [];

}

export const completeMenu = async(todos)=>{
  console.log('\n');
  const prompt = [{
      type: 'checkbox',
      name: 'selectedIds',
      message: `Select todos to complete`,
      choices: todos.map((e,i) => (
        {
          value: e.id, 
          name: `${(i+1 + '.').green} ${e.desc}`,
          checked: e.completedIn
        }
      ))
  }];

  const {selectedIds} = await inquirer.prompt(prompt);
  return selectedIds; 
    
}