const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const db = require("../../db/models/index");

const createAllTablesData = async (req, res) => {
    try {
        const Customer = db.Customer;
        const Work_Order_Type = db.Work_Order_Type;
        const Machine = db.Machine;
        const State = db.State;
        const Work_Order = db.Work_Order;
        const Technician = db.Technician;
        const Appointment = db.Appointment;

        const result0 = await Technician.create({
            name: "Mayank",
            mobile: 0070070070,
            email:  "mayanknetmaxims@gmail.com",
            specialization: "engineering",
            territory: "NY",
            password:  "Netmaxims1@",
            status: 0,
            usertoken:  "dnkwnd",
            android_token:  "dadwad",
            ios_token:  "hdwuib",
        });

        const result1 = await Customer.create({
            name: "mayank",
            address_1: "test",
            city: "test",
            state_name: "ny",
            phone: "2222222222",
            email: "mayanknetmaxims@gmail.com",
            customer_type: "customer",
            territory: "NY",
            contact: "2222222222",
            contact_email: "mayanknetmaxims@gmail.com",
            contact_phone: "2222222222",
            usertoken: "example_token",
            status: 1,
            otp: 999000
        });
        const result2 = await Work_Order_Type.create({
            name: "type1"
        });
        const result3 = await Machine.create({
            name: "test",
            make: "test",
            asset: "",
            machineclass: "9999",
            cjj_share_type: 0,
            cjj_amount:0
        });
        const result4 = await State.create({
            state_name: "New York",
            state_code: "NY"
        });
        const result5 = await Work_Order.create({
        customer_id: 1,
        start_date: 12-2-2020,
        target_date: null,
        order_type: 1,
        description: "test",
        machine: "test machine",
        source: 0,
        destination: null,
        machineasstno: null,
        machinemovedate: null,
        technician: "harish kumar",
        approval_date: null,
        status: 0,
        comment: "hahaha"
      });
      const result6 = await Appointment.create({
        customer_id: 1,
        technician_id: 1,
        address: "221B",
        city: "London",
        state: "London",
        machine: "test machine",
        message: "Hola Ho",
        status: 0,
        date: "01-01-2001",
      });
      res.status(200).send({ success: true, message: "Data in all tables created successfully", data: { result0, result1, result2, result3, result4, result5, result6 }});
    } catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong" + error})
    }
}

const fetchWorkOrder = async (req, res) => {
    try {
        const workOrder = req.body.workOrder;
        const Work_Order = db.Work_Order;
        if(workOrder == "New"){
            var newWorkOrder = await Work_Order.findAll({
                where: {status: 0}
            });
            if( !newWorkOrder ){
                res.status(401).send({ success: false, message: "No new work orders"});
            }
            else{
                let count = newWorkOrder.length;
                res.status(200).send({ success: true, message: "New work orders are there", data: newWorkOrder, count: count});
            }
        }
        else if(workOrder == "My"){
            const token = req.session.token;
            console.log("2122 ", token);
            const decodedToken = jwt.verify(token, config.jwtSecret);
            console.log("4646", decodedToken);
            var myWorkOrder = await Work_Order.findAll({
                where: { technician: decodedToken.name }
            });
            if( !myWorkOrder ){
                res.status(401).send({ success: false, message: "No my work orders"});
            }
            else{
                let count = myWorkOrder.length;
                res.status(200).send({ success: true, message: "My work orders are there", data: myWorkOrder, count: count});
            }
        }
        else if(workOrder == "All"){
            var allWorkOrder = await Work_Order.findAll();
            if( !allWorkOrder ){
                res.status(401).send({ success: false, message: "No work orders"});
            }
            else{
                let count = allWorkOrder.length;
                res.status(200).send({ success: true, message: "Work orders are there", data: allWorkOrder, count: count});
            }
            }
        else{
            res.status(401).send({ success: false, message: "No work order with the given order name"})
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong " + error});
    }
}

module.exports = { createAllTablesData, fetchWorkOrder };