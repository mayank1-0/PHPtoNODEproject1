module.exports = (sequelize, Sequelize) => {
  const AppointmentModel = sequelize.define("appointment", {
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    technician_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    machine: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      // 0 for inactive, 1 for active, 2 for reject
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return AppointmentModel;
};
