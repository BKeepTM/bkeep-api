import { error } from 'console';
import dotenv from 'dotenv'
import mysql from 'mysql2/promise';

dotenv.config();


console.log("Connecting: ",process.env);

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).catch (error => {
  console.log(error)
  process.exit(1);
})

export default connection;