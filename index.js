const inq = require("inquirer");
const mysql = require("mysql");
const showTable = require('console.table');

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
    userInput();
});




function userInput(){
    inq.prompt({
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add employee", "Update role", "View all employees", "View all employees by department", "View employees by role", "Done"]
    }).then(function(answer){
        
        switch (answer.selection){
            case "Add employee":
                addEmployee();
            break;

            case "View all employees":
                allEmployee();            
            break;

          /*  case "Update role":
                updateRole();
            break;

            case "View all employee by department":
                byDepartment();
            break;

            case "View all employee by role":
                byRole();
            break;
*/
            case "Done":
                database_conn.end();
            break;
        }
        
        
    })
};

function addEmployee(){
    const questions = [
        {   name: "firstName",
            type: "input",
            message: "Please enter the first name of the employee.",
            
        },

        {   name: "lastName",
            type: "input",
            message: "Please enter the last name of the employee.",
        },
        
        {   name: "department",
            type: "list",
            message: "Please enter the deparment of the employee.",
            choices: ["Sales", "Finance", "Legal", "Housekeeping", "Engineering"],
        },
        
        {   name: "role",
            type: "list",
            message: "Please enter the role of the employee.",
            choices: ["Salesperson", "Sales Team Lead", "Sales Manager"],
            when: function (answer){
                return answer.department === "Sales"}
        },

        {   name: "role",
            type: "list",
            message: "Please enter the role of the employee.",
            choices: ["Engineer", "Lead Engineer", "Engineering Manager"],
            when: function (answer){
                return answer.department === "Engineering"}
        },

        {   name: "role",
            type: "list",
            message: "Please enter the role of the employee.",
            choices: ["Accountant", "Financial Analyst", "Chief Accountant"],
            when: function (answer){
                return answer.department === "Finance"}
        },

        {   name: "role",
            type: "list",
            message: "Please enter the role of the employee.",
            choices: ["Attorney", "Legal Assistant", "Paralegal"],
            when: function (answer){
                return answer.department === "Legal"}
        },

        {   name: "role",
            type: "list",
            message: "Please enter the role of the employee.",
            choices: ["Housekeeper", "Janitor", "Lead Housekeeper"],
            when: function (answer){
                return answer.department === "Housekeeping"}
        }
    ];

    inq.prompt(questions).then(function(answer){
        let roleId, deptId, sal;

        switch(answer.department){

            case "Sales": 
                deptId = 1;
            break;

            case "Engineering": 
                deptId = 2;
            break;

            case "Legal": 
                deptId = 3;
            break;

            case "Finance": 
                deptId = 4;
            break;

            case "Housekeeping": 
                deptId = 5;
            break;
        }; 

        switch(answer.role){

            case "Salesperson": 
                roleId = 1;
                sal = 50000;
            break;

            case "Sales Lead": 
                roleId = 2;
                sal = 65000;
            break;

            case "Sales Manager": 
                roleId = 3;
                sal = 75000
            break;

            case "Engineer": 
                roleId = 4;
                sal = 80000
            break;

            case "Lead Engineer": 
                roleId = 5;
                sal = 95000;
            break;

            case "Engineering Manager": 
                roleId = 6;
                sal = 100000
            break;

            case "Attorney": 
                roleId = 7;
                sal = 80000;
            break;

            case "Legal Assistant": 
                roleId = 8;
                sal = 45000
            break;

            case "Paralegal": 
                roleId = 9;
                sal = 60000;
            break;

            case "Accountant": 
                roleId = 10;
                sal = 76000;
            break;

            case "Financial Analyst": 
                roleId = 11;
                sal = 72000;
            break;

            case "Chief Accountant": 
                roleId = 12;
                sal = 95000;
            break;

            case "Housekeeper": 
                roleId = 13;
                sal = 40000;
            break;
            
            case "Janitor": 
                roleId = 14;
                sal = 40000;
            break;
            
            case "Chief Housekeeper":
                roleId = 15;
                sal = 55000;
            break;
        }; 

        let addNames = "INSERT INTO employee(first_name, last_name, role_id) values(?,?,?)";
        let addRole = "INSERT INTO role(id, title, salary, department_id) values(?, ?, ?, ?)";
        let addDept = "INSERT INTO department(id, name) values(?, ?)";
        
        database_conn.query(addNames, [answer.firstName, answer.lastName, roleId], function(err){
            if (err) throw err;
            //console.log("EMPLOYEE ADDED!");
        });
        
       database_conn.query(addRole, [roleId, answer.role, sal, deptId], function(err){
            if (err) throw err;
            //console.log("ROLE ADDED!");
        });

        database_conn.query(addDept, [deptId, answer.department], function(err){
            if (err) throw err;
            //console.log("DEPARTMENT ADDED!");
        });
       
        userInput();     
    });
};

function allEmployee(){
    
    let showResult = "select * from employee join role on employee.role_id = role.id join department on role.department_id = department.id";
        database_conn.query(showResult, function(err, res){
            if (err) throw err;
            console.table(res);
        });    
        userInput();

};

