const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const TechnicianModel = sequelize.define(
    "technician",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      specialization: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      territory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usertoken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      android_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ios_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      hooks: {
        //any operation we do before a function
        beforeCreate(user, options) {
          //function called before creating a table.
          // console.log(user.toJSON().password);
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10) //converts password into hash or salt.
              .then((hash) => {
                // console.log(hash);
                // user.toJSON().password = hash;
                user.set("password", hash);
              })
              .catch((err) => {
                console.log(err);
                throw new Error();
              });
          }
        },
        beforeUpdate(user, options) {
          //function called before updating a table.
          // console.log(user.toJSON().password);
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10)
              .then((hash) => {
                // console.log(hash);
                // user.toJSON().password = hash;
                user.set("password", hash);
              })
              .catch((err) => {
                console.log(err);
                throw new Error();
              });
          }
        },
      },
    }
  );

  return TechnicianModel;
};
