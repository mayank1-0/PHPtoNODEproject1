module.exports = (sequelize, Sequelize) => {
  const Work_Order_TypeModel = sequelize.define("work_order_type", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Work_Order_TypeModel;
};
