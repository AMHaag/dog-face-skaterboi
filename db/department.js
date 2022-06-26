const db = require("./connection");

const department = {
  showAll: function () {
    db.query(`SELECT * FROM department`, (err, rows) => {
      if (err) {
        console.log(`error found: ${err}`);
      } else {
        console.table(rows);
      }
    });
  },
  add: function (name) {
    const sql = `INSERT INTO department (name)VALUES(?)`;
    db.query(sql, name, (err, result) => {
      if (err) {
        console.log("error occured");
      } else {
        console.log("Success!");
        department.showAll();
      }
    });
  },
  remove: function (id) {
    const sql = `DELETE FROM department
    WHERE id = ?`;
    db.query(sql, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return;
      }
    });
  },
  showAsArray: function () {
    db.query(
      {sql:`SELECT CONCAT(id," ",name) AS list FROM department;`,rowsAsArray:true},
      (err, rows) => {
        if (err) {
          console.log(`error found: ${err}`);
        } else {
          return rows;
        }
      }
    );
  },
};

let x = department.showAsArray();
console.log(x);

module.exports = department;
