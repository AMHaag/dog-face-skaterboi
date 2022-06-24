const db = require("./connection");

const employee = {
  showAll: function () {
    const sql = `
    SELECT
    e.id,e.first_name, e.last_name,
    role.title,role.salary,
    department.name AS department,
    CONCAT(m.first_name,' ',m.last_name) AS manager
    FROM employee e
    INNER JOIN
    employee m ON m.id = e.manager_id
    LEFT JOIN role ON role.id = e.role_id
    LEFT JOIN department ON department.id = role.department_id;
    `;

    const sqlb = `SELECT
    e.first_name, e.last_name
    FROM employee e;`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(`error found: ${err}`);
      } else {
        console.table(rows);
      }
    });
  },
  showByManager: function () {
    const sql = `SELECT
    CONCAT(e.first_name,' ',e.last_name) AS employee,
    CONCAT(m.first_name,' ',m.last_name) AS manager
    FROM employee e
    INNER JOIN
    employee m ON m.id = e.manager_id
    ORDER BY manager;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log("an error has occured");
      } else {
        console.table(rows);
      }
    });
  },
  showByDepartment:function(){},
  add: function (firstName, lastName, role, managerId) {
    const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id)VALUES(?,?,?,?)`;
    const params = [firstName, lastName, role, managerId];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("error occured");
      } else {
        console.log("Success!" + result);
      }
    });
  },
  remove: function (id) {
    const sql = `DELETE FROM employee
    WHERE id = ?`;
    db.query(sql, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  },
  updateRole: function (id, newRoleId) {
    const sql = `UPDATE employee
    SET role_id = ${newRoleId}
    WHERE id = ${id}`;

    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        employee.showAll();
      }
    });
  },
  updateManager: function (id, newManagerId) {
    const sql = `UPDATE employee
    SET manager_id = ${newManagerId}
    WHERE id = ${id}`;

    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        employee.showAll();
      }
    });
  },
};

module.exports = employee;
