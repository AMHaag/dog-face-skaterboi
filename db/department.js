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
  remove: function (id) {}, //placeholder function
};

module.exports = department;
