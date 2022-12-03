import {writeFileSync, readFileSync, existsSync} from 'fs';

const filePath = './db/data.json';

export const getData = ()=>{
  if (!existsSync(filePath)) return {};

  const stringData = readFileSync(filePath).toString();
  return JSON.parse(stringData === '' ? '{}': stringData);
}

export const saveData = (data)=>{
  try{
    writeFileSync(filePath, JSON.stringify(data));
  } catch(err){
    throw `An error as occurred saving data: ${err}`;
  }
}