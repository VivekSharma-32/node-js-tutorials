const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-with-mysql", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("MSQL Connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

module.exports = sequelize;
