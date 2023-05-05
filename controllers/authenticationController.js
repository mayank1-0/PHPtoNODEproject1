const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randtoken = require("rand-token");
const nodemailer = require("nodemailer");
const config = require("../config.json");
const db = require("../db/models/index");
const Technician = db.Technician;

const createTechnician = async (req, res) => {
  try {
    const result = await Technician.create({
      name: "mayank",
      mobile: 1234567890,
      email: "mayanknetmaxims@gmail.com",
      specialization: "test",
      territory: "18",
      password: "text",
      status: 0,
      usertoken: "token",
      android_token: "token",
      ios_token: "token",
    });
    res
      .status(200)
      .send({
        success: true,
        message: "Technician created successfully",
        data: result,
      });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong " + error });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log("0000 ", Technician);
    let userData = await Technician.findOne({
      where: {
        email: req.body.email,
      },
      attributes: ["id", "name", "status", ["password", "hashedPass"]],
    });
    console.log("1111 ", userData);
    if (!userData) {
      res.status(401).send({ message: "User not found. Please try again" });
    } else {
      userData = userData.toJSON();
      console.log("2222 ", userData);
      if (userData.status == 0) {
        const match = await bcrypt.compare(
          req.body.password,
          userData.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              userId: userData.id,
              name: userData.name,
            },
            config.jwtSecret,
            { expiresIn: "24h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.token = token;
          sessionData.user.name = userData.name;
          sessionData.user.email = req.body.email;
          console.log("5555 ", sessionData);
          console.log("9999 ", req.session);
          res.status(200).send({
            token: token,
            message: "Login Successfull",
          });
        }
      } else {
        res
          .status(400)
          .send({
            data: userData,
            message: "User account with the provided email is inactive",
          });
      }
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: e, message: "Something went wrong. Login failed" });
  }
};

const logout = async (req, res) => {
  try {
    let sessionData = req.session;
    const logout = await sessionData.destroy();
    res.status(200).send({ success: true, message: "Logout successful" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: e, message: "Logout Failed. Please try again" });
  }
};

//send email for password reset
async function sendEmail(email, token) {
  var email = email;
  var token = token;

  var mail = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "mayanknetmaxims@gmail.com", // Your email id
      pass: "mYaV1kMSjdc3t42v", // Your password
    },
  });

  var mailOptions = {
    from: "mayanknetmaxims@gmail.com",
    to: email,
    subject: "Reset Password Link - cjjventures.com",
    html:
      "You requested for reset password, kindly use this link to reset your password. https://cjjventures.com/api/v1/technician/reset-password/" +
      token,
  };
  await mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("1", error);
      return 1;
    } else {
      console.log("0", info);
      return 0;
    }
  });
}

const sendResetPasswordEmail = async (req, res) => {
  try {
    var email = req.body.email; // good
    const Technician = db.Technician;
    var technician_data = await Technician.findOne({
      where: {
        email: email,
      },
    });
    if (!technician_data) {
      res
        .status(401)
        .send({
          success: false,
          message:
            "No technician with the given email exists in the database. Kindly register first",
        });
    } else {
      var generated_token = randtoken.generate(20);
      console.log("---- ", generated_token);
      const result = await Technician.update(
        { usertoken: generated_token },
        {
          where: { email: email },
        }
      );
      if (!result) {
        res
          .status(400)
          .send({
            success: false,
            message: "Unable to update generated token in database.",
          });
      } else {
        var sent = await sendEmail(email, generated_token);
        var type = "";
        var msg = "";
        if (sent != 1) {
          let data = {
            email: email,
            token: generated_token,
          };
          type = "Success";
          msg =
            "The token value is updated in the database and reset password link has been sent to the provided email address";
          res
            .status(200)
            .send({ success: true, data: data, message: type + ". " + msg });
        } else {
          let data = {
            email: email,
            token: generated_token,
          };
          type = "Failed";
          msg =
            "The token is updated in the database but reset password link mail not sent";
          res
            .status(400)
            .send({ success: false, data: data, message: type + ". " + msg });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong " + error,
    });
  }
};

const passwordUpdate = async (req, res) => {
  try {
    const token = req.params.token;
    const update_data = req.body;
    const Technician = db.Technician;
    const result = await Technician.findOne({
      where: {
        token: token,
      },
    });
    var type;
    var msg;
    if (!result) {
      res
        .status(404)
        .send({
          success: false,
          message: "No such technician with the given token exists",
        });
    } else {
      var saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(update_data.newPassword, salt);
      const data = {
        password: hash,
      };
      const result1 = await Technician.update(
        { password: data.password },
        {
          where: { token: token },
        }
      );
      type = "success";
      msg = "Your password has been updated successfully";
      res.status(200).send({ success: type, data: result1, message: msg });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error,
      message: "Something went wrong. Please try again " + error,
    });
  }
};

module.exports = {
  createTechnician,
  userLogin,
  logout,
  sendResetPasswordEmail,
  passwordUpdate,
};
