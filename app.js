import colors from 'colors';
import { saveData, getData } from './helpers/db.js';
import { showMenu, wait, getRequiredInput, deleteMenu, completeMenu } from './helpers/inquirer.js';
import { Todos } from './models/todos.js';

console.clear();

const main = async()=>{
  let resp = '';
  const todos = new Todos(getData());

  do{
    resp = await showMenu();

    switch (resp) {
      case '1':
        const todoDesc =  await getRequiredInput('Enter todo description:(Press 0 to return)');
        if (todoDesc !== '0') {
          todos.createTodo(todoDesc);
        }
        break;

      case '2':
        todos.toListTodos();
        break;

      case '3':
        todos.toListTodosWithDate((e) => e.completedIn);
        break;

      case '4':
        todos.toListTodos((e)=> !e.completedIn);
        break;

      case '5':
        const idsToComplete = await completeMenu(todos.todosArray);
        todos.markCompleted(idsToComplete);
        break;

      case '6':
        const idsToDelete = await deleteMenu(todos.todosArray);
        todos.deleteTodos(idsToDelete);
        break;

      case '0':
        return;
      }
            
      saveData(todos._todosMap);
      await wait();
    } while(resp != '0')
    }

main();