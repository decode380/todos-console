import { v4 as uuidv4 } from 'uuid';

export class Todo{
  constructor(desc = ''){
    this.id = uuidv4();
    this.desc = desc;
    this.completedIn = null;
  }
}