const dbConfig = require('../../config/db.config');
const Sequelize = require('sequelize');

const TechnicianModel = require('../models/Technician.model');
const Work_OrderModel = require('../models/Work_Order.model');
const CustomerModel = require('../models/Customer.model');
const Work_Order_TypeModel = require('../models/Work_Order_Type.model');
const StateModel = require('../models/State.model');
const MachineModel = require('../models/Machine.model');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Technician = TechnicianModel(sequelize, Sequelize);
const Work_Order = Work_OrderModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Work_Order_Type = Work_Order_TypeModel(sequelize, Sequelize);
const State = StateModel(sequelize, Sequelize);
const Machine = MachineModel(sequelize, Sequelize);

// P.K - F.K. 1
Customer.hasMany(Work_Order, {
  foreignKey: "customer_id"
});
Work_Order.belongsTo(Customer, {
  foreignKey: "customer_id",
});

// P.K - F.K. 2
Work_Order_Type.hasMany(Work_Order, {
  foreignKey: "order_type"
});
Work_Order.belongsTo(Work_Order_Type, {
  foreignKey: "order_type",
});

// P.K - F.K. 3
State.hasMany(Customer, {
  foreignKey: "state_name"
});
Customer.belongsTo(State, {
  foreignKey: "state_name",
});

db.Technician = require('../models/Technician.model')(sequelize, Sequelize);
db.Work_Order = require('../models/Work_Order.model')(sequelize, Sequelize);
db.Customer = require('../models/Customer.model')(sequelize, Sequelize);
db.Work_Order_Type = require('../models/Work_Order_Type.model')(sequelize, Sequelize);
db.State = require('../models/State.model')(sequelize, Sequelize);
db.Machine = require('../models/Machine.model')(sequelize, Sequelize);

module.exports = db;
