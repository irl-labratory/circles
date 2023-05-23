// const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../queries')


const secretKey='This-is-a-secret-key';


const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

const userController = {};

// userController.createUser = (req, res, next) => {

//   //waiting on oauth..

// }

userController.verifyUser = (req,res,next) => {
  // req.body will contain information about the username, id, access id?
  // obj deconstruct the body
  // check to see if the informations matches what's in the database
  // do this by querying the database for username and check if the password exists
  // if it exists send a message through res.locals to say verified user

}

/* 
res.locals.data will look like
res.locals.data = {
  user: {
    username: user,
    circles:[...]
  }
  circles: {
    dance:{
      name: dance,
      members: [...]
      Events: {
        name: [...]
      }
    }
  events: {
    event1: {event info},
    event2: {event info}
  }å
}

*/
userController.getUser = (req,res,next) => {
  const {_id} = req.params;
  console.log('this is the id', _id)
  // create a string that will query the data

  const qString = `
    select * 
    from circles.users a
    where a.id = 1 
    limit 4;
    `;
    db.query(qString)
    .then((data)=> {
      console.log('this is our data, ',data)
      res.locals.user = data.rows;
      return next()
    })
  //req.params will contain information on the user's id
  // may need multiple querys to get info from database
  // query the database per the ID and use join tables
  // throw into res.locals.data after manipulation

}

userController.deleteUser = (req, res, next) => {
  // takes the req.params and querys the database for the user and then removes them
  // const {id} = req.params
  const qString = ''

}


// Export the Controller
module.exports = userController; 