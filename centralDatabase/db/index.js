// Database Setup Instructions
// http://docs.sequelizejs.com/en/latest/docs/getting-started/


const DB_PASSWORD = require('../../config/config.privatekeys.js').DB_PASSWORD;

const config = {
  database: 'Envoyous_db',
  username: 'admin',
  password: DB_PASSWORD,
  host: 'localhost'
}

// option 1 => use sequalize

// set up Envoyous PostgresQL database
const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then( (err) => {
    console.log('Connection has been established successfully.');
  })
  .catch( (err) => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = db;







  // option 2 => use pg library

  // var pg = require("pg");
  //
  // var conString = "pg://admin:guest@localhost:5432/Employees";
  //
  // var client = new pg.Client(conString);
  // client.connect();
  //
  // // client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
  // // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
  // // client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
  //
  // var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
  // query.on("row", (row, result) => {
  //     result.addRow(row);
  // });
  // query.on("end", (result) => {
  //     console.log(JSON.stringify(result.rows, null, "    "));
  //     client.end();
  // });





















//
