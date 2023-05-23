const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const secretKey='This-is-a-secret-key';


const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

const userController = {};

userController.createUser = (req, res, next) => {

}

userController.verifyUser = (req,res,next) => {
  // req.body will contain information about the username and password 
  // obj deconstruct the username and password, check with jasmine about the password
  // check to see if the username and password match what's in the database
  // do this by querying the database for username and check if the password exists
  // if it exists send a message through res.locals to say verified user

}

userController.getData = (req,res,next) => {
  //

}


// Export the Controller
module.exports = userController; 