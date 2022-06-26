const inquirer = require("inquirer");
const department = require("../db/department");
const role = require("../db/role");
const employee = require("../db/employee");
const questions = require("./questions");

// console.log(questions);

mainMenuPrompt();
function mainMenuPrompt() {
  inquirer.prompt(questions.mainMenu).then((answers) => {
    console.log(answers);
    let view = answers.view;
    let remove = answers.remove;
    let add = answers.add;
    let update = answers.update;
    if (view) {
      if (answers.empView) {
        if (answers.empView === "all") {
          employee.showAll();
          answers = "";
          setTimeout(mainMenuPrompt, 500);
        }
        if (answers.empView === "manager") {
          employee.showByManager();
          answers = "";
          setTimeout(mainMenuPrompt, 500);
        }
      }
      if (view === "Departments") {
        department.showAll();
        answers = "";
        setTimeout(mainMenuPrompt, 500);
      }
      if (view === "Roles") {
        role.showAll();
        answers = "";
        setTimeout(mainMenuPrompt, 500);
      }
      if (view === "Return to main menu") {
        answers = "";
        setTimeout(mainMenuPrompt, 500);
      }
    }
    if (remove == true) {
      removeRecord();
    }
    if (remove == false) {
      answers = {};
      mainMenuPropmt();
    }
    if (add) {
      addRecord(add);
    }
  });
}

function addRecord(content) {
  if (content == "department") {
    inquirer.prompt(questions.addDeparment).then((answers) => {
      console.log(answers);
    });
  }
  if (content == "role") {
    department.showAsArray();
    inquirer.prompt(questions.addRole).then((answers) => {
      role.add(answers.title, answers.salary, answers.id);
      console.log("Complete!");
      mainMenuPrompt();
    });
  }
  if (content == "employee") {
    const newEmployee = { firstName: "", lastName: "", role: "", manager: "" };
    inquirer.prompt(questions.addEmployee.askNames).then((answers) => {
      newEmployee.firstName = answers.firstName;
      newEmployee.lastName = answers.lastName;
      role.showAll();
      inquirer.prompt(questions.addEmployee.askRole).then((answers) => {
        newEmployee.role = answers.role;
        department.showAll();
        inquirer.prompt(questions.addEmployee.askManager).then((answers) => {
          newEmployee.manager = answers.manager;
          // console.log(newEmployee);
          employee.add(
            newEmployee.firstName,
            newEmployee.lastName,
            newEmployee.role,
            newEmployee.manager
          );
          mainMenuPrompt();
        });
      });
    });
  }
  if (content == "main") {
    mainMenuPrompt();
  }
}

function removeRecord() {
  inquirer.prompt(questions.removeMenu).then((answers) => {
    let remove = answers.remove;
    if (remove === "exit") {
      mainMenuPrompt();
    }
    if (remove === "role") {
      role.showAll();
      setTimeout(() => {
        inquirer.prompt(questions.askId).then((answer) => {
          role.remove(answer.id);
          console.log("This record has been removed");
          answers = {};
          mainMenuPrompt();
        });
      }, 100);
    }
    if (remove === "department") {
      department.showAll();
      setTimeout(() => {
        inquirer.prompt(questions.askId).then((answer) => {
          department.remove(answer.id);
          console.log("This record has been removed");
          answers = {};
          mainMenuPrompt();
        });
      }, 100);
    }
    if (remove === "employee") {
      employee.showAll();
      setTimeout(() => {
        inquirer.prompt(questions.askId).then((answer) => {
          employee.remove(answer.id);
          console.log("This record has been removed");
          answers = {};
          mainMenuPrompt();
        });
      }, 100);
    }
  });
}

module.exports = mainMenuPrompt;
