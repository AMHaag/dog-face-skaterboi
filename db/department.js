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
      `SELECT CONCAT(id," ",name) AS list FROM department;`,
      (err, rows) => {
        if (err) {
          console.log(`error found: ${err}`);
        } else {
          let array = [];
          for (i = 0; i < rows.length; i++) {
            array.push(rows[i].list);
          }
          console.log(array);
        }
      }
    );
  },
  update: function (id, newName) {
    const sql = `
    UPDATE department
    SET name = '${newName}'
    WHERE id = ${id}`;
    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

module.exports = department;
