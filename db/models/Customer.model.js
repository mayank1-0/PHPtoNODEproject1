module.exports = (sequelize, Sequelize) => {
  const CustomerModel = sequelize.define("customer", {
    name: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    address_1: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    state_name: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null,
      validate: {
        isEmail: true,
      },
    },
    customer_type: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    territory: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    contact: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    contact_email: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    contact_phone: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    usertoken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    otp: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  });

  return CustomerModel;
};
