let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "127.0.0.1",
  user: "user_name",
  password: "your_pw",
  database: "db_name"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;