import colors from 'colors';
import { Todo } from "./todo.js";

export class Todos{
  constructor(todos){
    this._todosMap = todos;
  }

  get todosArray(){
    return Object.keys(this._todosMap).map(key => this._todosMap[key]);
  }

  createTodo(desc = ''){
    const newTodo = new Todo(desc);
    this._todosMap[newTodo.id] = newTodo;
  }

  deleteTodos(ids){
    ids.forEach(id => {
      if (this._todosMap[id]) {
        delete this._todosMap[id];
      }
    });
  }

  markCompleted(ids){
    Object.keys(this._todosMap).forEach(e => {
      const todo = this._todosMap[e];
      if (ids.includes(todo.id)){
        if (!todo.completedIn) {
          todo.completedIn = new Date();
        }
      }
      else{
        todo.completedIn = null;
      } 
    });    
  }

  toListTodos = (filter = (e)=>true) => {
    console.log('\n');
    this.todosArray
      .forEach((e, i) => {
        const index = `${i+1}.`.green;
        const { desc ,completedIn } = e;
        const status = (completedIn) ? 'Completed'.green : 'Pending'.red;
        const outputText =  `${index} ${desc} :: ${status}`;

        if (filter(e)) {
          console.log(outputText);
        }
      });
  }

  toListTodosWithDate = (filter = (e)=>true) => {
    console.log('\n');
    this.todosArray
    .forEach((e, i) => {
      const index = `${i+1}.`.green;
      const { desc ,completedIn } = e;
      const dateToLocale =
         new Date(completedIn).toLocaleDateString('es-CO', {hour: "2-digit", minute: "2-digit"})
      const outputText =  `${index} ${desc} :: ${dateToLocale}`;

      if (filter(e)) {
        console.log(outputText);
      }
    });
  }

}