module.exports = (sequelize, Sequelize) => {
    const Work_OrderModel = sequelize.define("work_order", {
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_date: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      order_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      machine: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      machineasstno: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      machinemovedate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      technician: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      approval_date: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    );

    return Work_OrderModel;
  };