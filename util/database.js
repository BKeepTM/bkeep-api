import { error } from 'console';
import dotenv from 'dotenv'
import mysql from 'mysql2/promise';

dotenv.config();


console.log("Connecting: ",process.env);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Optional: Test the connection on startup
// Pools are created synchronously, so we test connectivity separately
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release(); // Important: release the connection back to the pool
    })
    .catch(error => {
        console.error('Database connection failed:', error);
        // Depending on your logic, you might want to exit or retry
        // process.exit(1); 
    });

export default pool;
