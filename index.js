const inq = require("inquirer");
const mysql = require("mysql");
//const showTable = require('console.table');

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

});

const questions = [
{   name: "selection",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add employee", "Update role", "View all employees by department", "View employees by role", "Done"]
},
{   name: "firstName",
    type: "input",
    message: "Please enter the first name of the employee.",
    when: function (answer){
        return answer.selection === "Add employee"
    }
},

{   name: "lastName",
    type: "input",
    message: "Please enter the last name of the employee.",
    when: function (answer){
        return answer.selection === "Add employee"
    }
},

{   name: "role",
    type: "input",
    message: "Please enter the role of the employee.",
    when: function (answer){
        return answer.selection === "Add employee"
    }
}
];


function userInput(){
    inq.prompt(questions).then(function(answer){
        
       /* switch (anwer.selection){
            case "Add employee":

            break;

            case "Update role":

            break;

            case "View all employee by department":

            break;

            case "View all employee by role":

            break;

            case "Done":

            break;
        }*/
        console.log(answer);
    })
};

userInput();

//function addEmployee(){


//}