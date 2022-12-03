require('colors');

class MenuOption {
  constructor(option, text){
    this.option = option;
    this.text = text;
  }
} 

const options = [
  new MenuOption('1', 'Create todo'),
  new MenuOption('2', 'Show all todos'),
  new MenuOption('3', 'Show completed todos'),
  new MenuOption('4', 'Show pending todos'),
  new MenuOption('5', 'Complete todos'),
  new MenuOption('6', 'Delete todo'),
  new MenuOption('0', 'Exit'),
];

const showMenu = ()=>{
  return new Promise(async (resolve) =>{
    
    console.clear();
    console.log('======================================='.green);
    console.log(' Select an option '.green);
    console.log('=======================================\n'.green);
  
    for (const item of options) {
      console.log(`${item.option.green} ${item.text}`);
    }

    let resp = '';
    do{
      if(resp !== '') console.log('Invalid option');
      resp = await selectOption();
    } while (!options.some(e => e.option === resp))
    resolve(resp);

  });
};

const selectOption = ()=>{
  return new Promise((resolve)=>{
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`Select an option: `, (opt)=>{
      readline.close();
      resolve(opt);
    });

  });
};

const wait = ()=>{
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(`Press ${'ENTER'.green} to continue`, ()=>{
    readline.close();
  });
};

module.exports = {
  showMenu,
  wait
};