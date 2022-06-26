const db = require("./connection");

const role = {
  showAll: function () {
    //id, title, salary, department
    const sql = `
    SELECT role.title,role.id,department.name AS department,role.salary 
    FROM role
    LEFT JOIN
    department ON department.id = role.department_id;`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.table(rows);
      }
    });
  },
  add: function (title, salary, departmentId) {
    const sql = `
    INSERT INTO role (title,salary,department_id)
    VALUES ('${title}',${salary},${departmentId});
`;
    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  updateTitle: function (id, newTitle) {
    const sql = `UPDATE role
    SET title = '${newTitle}'
    WHERE id = ${id}`;
    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        role.showAll();
      }
    });
  },
  updateSalary: function (id, newSalary) {
    const sql = `UPDATE role
    SET salary = ${newSalary}
    WHERE id = ${id}`;
    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        role.showAll();
      }
    });
  },
  updateDepartment: function (id, newDepartment) {
    const sql = `UPDATE role
    SET department_id = ${newDepartment}
    WHERE id = ${id}`;
    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        role.showAll();
      }
    });
  },
  remove: function (id) {
    const sql = `DELETE FROM role
    WHERE id = ?`;
    db.query(sql, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Role has been deleted");
      }
    });
  },
};

module.exports = role;
