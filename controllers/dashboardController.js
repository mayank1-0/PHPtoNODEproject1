const db = require("../db/models/index");

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
      res.status(500).send({ success: false, message: "Something went wrong " + error});
    }
}

module.exports = { createWorkOrder }