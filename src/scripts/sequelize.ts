import { Sequelize } from 'sequelize-typescript';
//import { EscolasEstaduaisDeSP } from './models/escolasEstaduaisDeSP';
import Escolas from '../models/EscolasSP';


const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'equipaescolas',
  username: 'root',
  password: '^R5jsbJ2U8Jkh%f7wFT#o6u9vF^U^dM',
  host: 'localhost',
  port: 3306,
});




export { sequelize };
