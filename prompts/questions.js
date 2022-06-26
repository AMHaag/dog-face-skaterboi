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
        return "role";
      }
      if (valParse[2] === "employee") {
        return "employee";
      }
      if (valParse[2] === "main") {
        return "main";
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
  {
    // Update Menu
    prefix: "",
    type: "list",
    name: "update",
    message: "What would you like to update",
    choices: [
      "A department name",
      "An employee",
      "A role",
      "Return to main menu",
    ],
    when(answers) {
      if (answers.main === "Update") {
        return true;
      }
    },
    filter(val) {
      let valParse = val.split(" ");
      if (valParse[1] === "department") {
        return "department";
      }
      if (valParse[1] === "employee") {
        return "employee";
      }
      if (valParse[1] === "role") {
        return "role";
      }
      if (valParse[1] === "to") {
        return "main";
      }
    },
  },
];

// These three things are the questions used to add records
const addDeparment = [
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
    type: "",
    name: "id",
    message: `What department ID should be used?`,
  },
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
];
const addEmployee = {
  askNames: [
    {
      prefix: "",
      type: "input",
      name: "firstName",
      message: "What is their first name?",
    },
    {
      prefix: "",
      type: "input",
      name: "lastName",
      message: "What is their last name?",
    },
  ],
  askRole: [
    {
      prefix: "",
      type: "input",
      name: "role",
      message: "What role will they be taking (use ID)?",
    },
  ],
  askManager: [
    {
      prefix: "",
      type: "input",
      name: "manager",
      message: "Who is their supervisor (use managers employee ID)?",
    },
  ],
};

// Both of these are the questions to remove records
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

//TODO These are the questions to update records
const updateRecord = {
  recordId: [
    {
      prefix: "",
      type: "input",
      name: "id",
      message: "Please enter the ID of the record you want to update:",
    },
  ],
  department: [
    {
      prefix: "",
      type: "input",
      name: "newName",
      message: "What should be the new name be?",
    },
  ],
  role: [
    {
      prefix: "",
      type: "list",
      name: "role",
      message: "What would like to update?",
      choices: [
        "A role's title",
        "A role's salary",
        "A role's department",
        "Return to main menu",
      ],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[2] === "title") {
          return "title";
        }
        if (valParse[2] === "salary") {
          return "salary";
        }
        if (valParse[2] === "department") {
          return "department";
        }
        if (valParse[2] === "main") {
          return "main";
        }
      },
    },
    {
      prefix: "",
      type: "input",
      name: "newTitle",
      message: "What is the new name for this role?",
      when(answers) {
        if (answers.role === "title") {
          return true;
        }
      },
    },
    {
      prefix: "",
      type: "input",
      name: "newSalary",
      message: "What is the new salary for this role?",
      when(answers) {
        if (answers.role === "salary") {
          return true;
        }
      },
    },
    {
      prefix: "",
      type: "input",
      name: "newDepartment",
      message: "What is the new department for this role (Use ID)?",
      when(answers) {
        if (answers.role === "department") {
          return true;
        }
      },
    },
  ],
  employee: [
    {
      prefix: "",
      type: "list",
      name: "employee",
      message: "What would like to update?",
      choices: [
        "An employee's role",
        "An employee's manager",
        "Return to main menu",
      ],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[2] === "manager") {
          return "manager";
        }
        if (valParse[2] === "role") {
          return "role";
        }
        if (valParse[2] === "main") {
          return "main";
        }
      },
    },
    {
      prefix: "",
      type: "input",
      name: "newRole",
      message: "What is their new role (use ID)?",
      when(answers) {
        if (answers.employee === "role") {
          return true;
        }
      },
    },
    {
      prefix: "",
      type: "input",
      name: "newManager",
      message: "Who is their new manager (use manager's employee ID)?",
      when(answers) {
        if (answers.employee === "manager") {
          return true;
        }
      },
    },
  ],
};

module.exports = {
  addDeparment,
  removeMenu,
  askId,
  mainMenu,
  addRole,
  addEmployee,
  updateRecord,
};
