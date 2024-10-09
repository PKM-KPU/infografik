import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'if.unismuh.ac.id',
  user: 'root',
  password: 'mariabelajar',
  database: 'datapemilih',
  port: 3388
});


db.getConnection()
  .then(() => console.log('Connected to the MySQL database!'))
  .catch((err) => console.error('Error connecting to the database:', err.message));


export default db;
