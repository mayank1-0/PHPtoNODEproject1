const db = require("../db/models/index");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const createWorkOrder = async (req, res) => {
  try {
    // const Work_Order = db.Work_Order;
    // const result = await Work_Order.create({
    //   customer_id: ,
    //   start_date: ,
    //   target_date: ,
    //   work_order_type: ,
    //   description: ,
    //   machine: ,
    //   source: 0,
    //   destination: ,
    //   machineasstno: ,
    //   machinemovedate: ,
    //   technician: ,
    //   approval_date:,
    //   status: ,
    //   comment:
    // });
    // res.status(200).send({ success: true, message: "Work Order created successfully", data: result});
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
};

// const createAppointment = async(req, res) => {
// try {
//   const Appointment = db.Appointment;
//   const data = req.body;
//   var result = await Appointment.create({
//     customer_id: 1,
//     technician_id: 1,
//     address: "221B",
//     city: "London",
//     state: "London",
//     machine: "test machine",
//     message: "Hola Ho",
//     status: 0,
//     date: "01-01-2001",
//   });
//   res.status(200).send({ success: true, message: "Data in all tables created successfully", data: { result0, result1, result2, result3, result4, result5, result6 }});
// } catch (error) {
//     res.status(500).send({ success: false, message: "Something went wrong" + error})
// }
// }

const fetchNewWorkOrder = async (req, res) => {
  try {
    const Work_Order = db.Work_Order;
    var newWorkOrder = await Work_Order.findAll({
      where: { technician: null, technician: ""},
    });
    if (!newWorkOrder) {
      res.status(401).send({ success: false, message: "No new work orders" });
    } else {
      let count = newWorkOrder.length;
      res.status(200).send({
        success: true,
        message: "New work orders are there",
        data: newWorkOrder,
        count: count,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
};

const fetchMyWorkOrder = async (req, res) => {
  try {
    const Work_Order = db.Work_Order;
    const token = req.session.token;
    console.log("2122 ", token);
    const decodedToken = jwt.verify(token, config.jwtSecret);
    console.log("4646", decodedToken);
    var myWorkOrder = await Work_Order.findAll({
      where: { technician: decodedToken.name },
    });
    if (!myWorkOrder) {
      res.status(401).send({ success: false, message: "No my work orders" });
    } else {
      let count = myWorkOrder.length;
      res.status(200).send({
        success: true,
        message: "My work orders are there",
        data: myWorkOrder,
        count: count,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
};

const fetchAllWorkOrder = async (req, res) => {
  try {
    const Work_Order = db.Work_Order;
    var allWorkOrder = await Work_Order.findAll();
    if (!allWorkOrder) {
      res.status(401).send({ success: false, message: "No work orders" });
    } else {
      let count = allWorkOrder.length;
      res
        .status(200)
        .send({
          success: true,
          message: "Work orders are there",
          data: allWorkOrder,
          count: count,
        });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
};

const fetchLocationsCustomers = async (req, res) => {
  try {
    const Customers = db.Customer;
    const result = await Customers.findAll({
      attributes: [ "name", "city", "state_name", "phone", "customer_type", "territory" ]
    });
    if( !result ){
      res.status(404).send({success: false, message: "No customer locations are present in the database"});
    }
    else{
      res.status(200).send({success: true, message: "Customer locations fetched successfully", data: result});
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
}

const archiveMyWorkOrder = async (req, res) => {
  try {
    const Work_Order = db.Work_Order;
    const workOrderId = req.params.id;
    const update = await Work_Order.update({ status: 4 },{
      where: { id: workOrderId }
    })
    if( !update ){
      res.status(400).send({ success: false, message: "Work order archive failed."})
    }
    else{
    res.status(200).send({ success: true, message: "Work order archived successfully", data: update});
    }
  } catch (error) {
    res.status(500).send({ succes: false, message: "Something went wrong " + error})
  }
}

module.exports = {
  createWorkOrder,
  fetchNewWorkOrder,
  fetchMyWorkOrder,
  fetchAllWorkOrder,

  fetchLocationsCustomers,

  archiveMyWorkOrder
};
