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


// Export the Controller
module.exports = userController; 