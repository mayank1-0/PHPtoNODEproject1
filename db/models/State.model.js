module.exports = (sequelize, Sequelize) => {
  const StateModel = sequelize.define("state", {
    state_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return StateModel;
};
