const inquirer = require("inquirer");
const department = require("../db/department");
const role = require("../db/role");
const employee = require("../db/employee");
const questions = require("./questions");

// console.log(questions);

mainMenuPrompt();
function mainMenuPrompt() {
  answers = "";
  inquirer.prompt(questions.mainMenu).then((answers) => {

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
    if (update) {
      updateRecord(update);
    }
  });
}

function addRecord(content) {
  if (content == "department") {
    inquirer.prompt(questions.addDeparment).then((answers) => {
      department.add(answers.newDepartment);
      setTimeout(() => {
        mainMenuPrompt();
      }, 50);
    });
  }
  if (content == "role") {
    department.showAsArray();
    inquirer.prompt(questions.addRole).then((answers) => {
      role.add(answers.title, answers.salary, answers.id);
      console.log("Complete!");
      role.showAll();
      setTimeout(() => {
        mainMenuPrompt();
      }, 50);
    });
  }
  if (content == "employee") {
    const newEmployee = { firstName: "", lastName: "", role: "", manager: "" };
    inquirer.prompt(questions.addEmployee.askNames).then((answers) => {
      newEmployee.firstName = answers.firstName;
      newEmployee.lastName = answers.lastName;
      role.showAll();
      setTimeout(() => {
        inquirer.prompt(questions.addEmployee.askRole).then((answers) => {
          newEmployee.role = answers.role;
          employee.showAll();
          setTimeout(() => {
            inquirer
              .prompt(questions.addEmployee.askManager)
              .then((answers) => {
                newEmployee.manager = answers.manager;
                // console.log(newEmployee);
                employee.add(
                  newEmployee.firstName,
                  newEmployee.lastName,
                  newEmployee.role,
                  newEmployee.manager
                );
                employee.showAll();
                setTimeout(() => {
                  mainMenuPrompt();
                }, 50);
              });
          }, 50);
        });
      }, 50);
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

function updateRecord(category) {
  console.log(category);
  if (category === "main") {
    answers = {};
    mainMenuPrompt();
  }
  if (category === "department") {
    department.showAll();
    let newId = "";
    let newName = "";
    setTimeout(() => {
      inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
        newId = answers.id;
        inquirer.prompt(questions.updateRecord.department).then((answers) => {
          newName = answers.newName;
          department.update(newId, newName);
          setTimeout(() => {
            department.showAll(), 150;
          });
          setTimeout(() => {
            answers = {};
            mainMenuPrompt();
          }, 250);
        });
      });
    }, 150);
  }
  if (category === "role") {
    role.showAll();
    let roleId = "";
    setTimeout(() => {
      inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
        roleId = answers.id;
        inquirer.prompt(questions.updateRecord.role).then((answers) => {
          if (answers.role === "main") {
            answers = {};
            mainMenuPrompt();
          }
          if (answers.newSalary) {
            role.updateSalary(roleId, answers.newSalary);
            setTimeout(() => {
              role.showAll();
            }, 150);
            setTimeout(() => {
              mainMenuPrompt();
            }, 250);
          }
          if (answers.newDepartment) {
            role.updateDepartment(roleId, answers.newDepartment);
            setTimeout(() => {
              role.showAll();
            }, 150);
            setTimeout(() => {
              mainMenuPrompt();
            }, 250);
          }
          if (answers.newTitle) {
            role.updateTitle(roleId, answers.newTitle);
            setTimeout(() => {
              role.showAll();
            }, 150);
            setTimeout(() => {
              mainMenuPrompt();
            }, 250);
          }
        });
      });
    }, 50);
  }
  if (category === "employee") {
    employee.showAll();
    let employeeId = "";
    setTimeout(() => {
      inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
        employeeId = answers.id;
        inquirer.prompt(questions.updateRecord.employee).then((answers) => {
          if (answers.employee === "main") {
            answers = {};
            mainMenuPrompt();
          }
          if (answers.newRole) {
            employee.updateRole(employeeId, answers.newSRole);
            setTimeout(() => {
              employee.showAll();
            }, 150);
            setTimeout(() => {
              mainMenuPrompt();
            }, 250);
          }
          if (answers.newManager) {
            employee.updateManager(employeeId, answers.newManager);
            setTimeout(() => {
              employee.showAll();
            }, 150);
            setTimeout(() => {
              mainMenuPrompt();
            }, 250);
          }
        });
      });
    }, 50);
  }
}

module.exports = mainMenuPrompt;
