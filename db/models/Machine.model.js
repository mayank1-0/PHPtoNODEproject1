module.exports = (sequelize, Sequelize) => {
    const MachineModel = sequelize.define("machine", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      make: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      machineclass: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cjj_share_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cjj_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return MachineModel;
  };
  