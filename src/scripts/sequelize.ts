import { Sequelize } from 'sequelize-typescript';
//import { EscolasEstaduaisDeSP } from './models/escolasEstaduaisDeSP';
import Escolas from '../models/EscolasSP';


const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'equipaescolas',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
});




export { sequelize };
