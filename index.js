const inq = require("inquirer");
const mysql = require("mysql");

const database_conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "organization_db"  
});

database_conn.connect(function(err){
    if (err) {
        console.log(err);
        throw err;
    };

    console.log("Database connected!");

})