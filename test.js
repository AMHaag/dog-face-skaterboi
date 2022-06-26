const department = require("./db/department");
const employee = require("./db/employee");
const role = require('./db/role')
const inquirer = require('inquirer')

department.showAll();
role.showAll()
employee.showAll()
