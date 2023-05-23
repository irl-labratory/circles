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
      select a.id as user_id, a.name as user_name, c.id as circle_id, c.name as circle_name, d.id as event_id, d.event_date as event_date, d.daypart as daypart, d.note as note, STRING_AGG(f.name, ',') as "attendees"
      from circles.users a
      left join circles.circle_users b on a.id = b.user_id 
      left join circles.circles c on c.id = b.circle_id
      left join circles.events d on d.circle_id = c.id 
      left join circles.event_users e on e.event_id = d.id
      left join circles.users f on f.id = e.user_id
      where a.id = 1 
      and d.event_date >= CURRENT_DATE
      group by 1,2,3,4,5,6,7,8
      limit 1000
    ;
    `;
    db.query(qString)
    .then((data)=> {
      const {rows} = data
      console.log(rows)

      res.locals.user = rows;
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