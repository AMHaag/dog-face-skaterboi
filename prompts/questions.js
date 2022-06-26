const department = require('../db/department')

let x = department.showAsArray()

console.log(x)
const addDeparment= [
  {
    prefix: "",
    type: "input",
    name: "newDepartment",
    message: "What is the name of the new department?",
  },
];

const addRole = [
  {
    prefix: "",
    type: "input",
    name: "title",
    message: "What is the title for this new role?",
  },
  {
    prefix: "",
    type: "input",
    name: "salary",
    message: "What is the salary for this new role?",
  },
  {
    prefix: "",
    type: "",
    name: "departmentId",
    message: "What is the ",
  },
];
const addEmployee=[]

const removeMenu = [
  {
    prefix: "",
    type: "list",
    name: "remove",
    message: "What would you like to remove?",
    choices: ["A department", "A role", "An employee", "Return to main menu"],
    filter(val) {
      let valParse = val.split(" ");
      if (valParse[1] === "department") {
        return "department";
      }
      if (valParse[1] === "role") {
        return "role";
      }
      if (valParse[1] === "employee") {
        return "employee";
      } else {
        return "exit";
      }
    },
  },
];

const askId = [
  {
    prefix: "",
    type: "input",
    name: "id",
    message: `Please enter the id of the record you would like to remove `,
  },
];

const mainMenu = [
  {
    prefix: "",
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: [
      "View Information",
      "Add Information",
      "Update a record",
      "Remove a record",
      "Exit Application",
    ],
    filter(val) {
      let valParse = val.split(" ");
      if (valParse[0] == "View") {
        return "View";
      }
      if (valParse[0] == "Add") {
        return "Add";
      }
      if (valParse[0] == "Update") {
        return "Update";
      }
      if (valParse[0] == "Remove") {
        return "remove";
      }
      if (valParse[0] == "Exit") {
        return "exit";
      }
    },
  },
  {
    // View Menu
    prefix: "",
    type: "list",
    name: "view",
    message: "What would you like to view",
    choices: ["Departments", "Roles", "Employees", "Return to main menu"],
    when(answers) {
      if (answers.main === "View") {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    // Employee Views Submenu
    prefix: "",
    type: "list",
    name: "empView",
    message: "How would you like to view employees?",
    choices: [
      "Show all employees",
      "Show all by Manager",
      "Return to main menu",
    ],
    filter(val) {
      let valParse = val.split(" ");
      if (valParse[2] === "employees") {
        return "all";
      }
      if (valParse[3] === "Manager") {
        return "manager";
      } else {
        return "exit";
      }
    },
    when(answers) {
      if (answers.view === "Employees") {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    // Add Menu
    prefix: "",
    type: "list",
    name: "add",
    message: "What would you like to add?",
    choices: [
      "A new department",
      "A new role",
      "A new employee",
      "Return to main menu",
    ],
    filter(val) {
      let valParse = val.split(" ");
      if (valParse[2] === "department") {
        return "department";
      }
      if (valParse[2] === "role") {
        return 'role';
      }
      if (valParse[2] === "employee") {
        return 'employee';
      }
      if (valParse[2] === "main") {
        return 'main';
      }
    },
    when(answers) {
      if (answers.main === "Add") {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    // Remove Menu
    prefix: "!",
    type: "confirm",
    name: "remove",
    message: `WARNING: This action can not be undone,please confirm before continuing\nDo you want to continue and delete a record?`,
    default: false,
    when(answers) {
      if (answers.main === "remove") {
        return true;
      } else {
        return false;
      }
    },
  },
];

module.exports = { addDeparment, removeMenu, askId, mainMenu };
