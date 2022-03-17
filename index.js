const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const { type } = require("os");
const table = require("console.table")
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeeTrack_db",
  },
  console.log(`Connected to the employeeTrack_db database.`)
);

empTrackPrompt();

function empTrackPrompt() {
  inquirer
    .prompt([
      {
        message: "Choose one of the following",
        name: "menu",
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Finish"
        ],
      },
    ])
    .then((data) => {
      if (data.menu === "View all departments") {
        depView();
      } else if (data.menu === "View all roles") {
        roleView();
      } else if (data.menu === "View all employees") {
        empView();
      } else if (data.menu === "Add a department") {
        addDep();
      } else if (data.menu === "Add a role") {
        addRole();
      } else if (data.menu === "Add an employee") {
        addEmp();
      } else if (data.menu === "Update an employee role") {
        updateRole();
      } else if (data.menu === "Finish") {
        finishDB();
      }
    });
}

function depView() {
  console.log("Here are the departments in your Employee Tracking System");

//  inquirer
//     .alert([
//       {
//         message: "Here are the departments in your Employee Tracking System",
//         name: "depView",
//       },
//     ])
  
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        empTrackPrompt();
      });
      
}

function roleView() {
  db.query("SELECT * FROM role", function (err, results) {
    console.log(results);
    empTrackPrompt();
  });
  
}
function empView() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
    empTrackPrompt();
  });
}
function addDep() {
  inquirer
    .prompt([
      {
        message: "What is the name of the department you would like to create?",
        name: "addDep",
        type: "input",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) VALUES (?);`,
        [data.addDep],
        function (err, results) {
          console.log(results);
          console.log("Department Added");
        }

      );
      empTrackPrompt();
    });
}
function addRole() {
    inquirer
    .prompt([
        {
            message: "What is the title of the role you would like to create?",
            name: "roleTitle",
            type: "input",
        },
        {
            message: "What is the salary of the new role?",
            name: "roleSal",
            type: "input",
        },
        {
            message: "What is the corresponding department id?",
            name: "depID",
            type: "input",
        },

    ]).then((data)=> {
        db.query(
            `INSERT INTO role(title, salary, department_id) VALUES(?,?,?);`, [data.roleTitle, data.roleSal, data.depID], 
            function (err, results) {
              console.log("Role added!");
              console.log(results);
              
            }
            );
            empTrackPrompt();
          });
      }

function addEmp() {
    inquirer
    .prompt([
        {
            message: "What is the first name of the employee you would like to create?",
            name: "firstEmp",
            type: "input",
        },
        {
            message: "What is the last name of the employee you would like to create?",
            name: "lastEmp",
            type: "input",
        },
        {
            message: "What is the corresponding role id?",
            name: "roleID",
            type: "input",
        },
        {
            message: "What is the corresponding manager id?",
            name: "manID",
            type: "input",
        },

    ]).then((data)=> {
        db.query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?);`, [data.firstEmp, data.lastEmp, data.roleID, data.manID], 
            function (err, results) {
              console.log("Employee added!");
              console.log(results);
              empTrackPrompt();
            }
            );
            
          });
        
      }

     function finishDB() {
          process.exit();
      }
