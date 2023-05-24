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
  select z.user_id, z.user_name, z.email, json_agg(json_build_object(
    'circle_id', z.circle_id,
    'circle_name',z.circle_name,
    'events', z.event)) as groups
    from (select
    y.user_id as user_id, y.user_name, y.email, y.access_token,y.access_token_expiry,
     y.circle_id, y.circle_name, json_agg(json_build_object (
    'id', y.event_id, 'event_info', y.event_info)) as event
    from
    (select x.user_id as user_id, x.name as user_name, x.email, x.access_token,x.access_token_expiry, x.circle_id, x.circle_name, x.event_id, json_build_object(
    'event_date', x.event_date,
    'event_name', x.event_name,
    'daypart', x.daypart,
    'note', x.note,
    'attendees', x.attendees) as event_info
    from ( select a.id as user_id, a.name, a.email, a.access_token, a.access_token_expiry, c.id as circle_id, c.name as circle_name, d.id as event_id, d.event_name as event_name, d.event_date as event_date, d.daypart as daypart, d.note as note, array_agg(f.name) as "attendees"
    from circles.users a
    left join circles.circle_users b on a.id = b.user_id
    left join circles.circles c on c.id = b.circle_id
    left join circles.events d on d.circle_id = c.id
    left join circles.event_users e on e.event_id = d.id
    left join circles.users f on f.id = e.user_id
    where a.id = ${_id} 
    and d.event_date >= CURRENT_DATE
    group by 1,2,3,4,5,6,7,8,9,10,11) as x) as y 
    group by 1,2,3,4,5,6,7) as z
    group by 1,2,3
    ;`;
    db.query(qString)
    .then((data)=> {
      const {rows} = data
      const [userData] = rows;
      const {user_id, user_name, groups} = userData
      // console.log('user data: \n', userData)
      const userObj = {
        username: user_name,
        circle: groups
      }
      const circleObj = {
      }
      console.log('user obj, \n', userObj)
      for (circle of groups){
        const {circle_name, events} = circle;
        // console.log('circle_name: ', circle_name)
        // const {event_info} = events;
        // [event_name] = event_info;
        const eventsArr =[]
        for (ev of events) {
          const {event_info} = ev
          eventsArr.push(event_info.event_name) 
        }
        circleObj[circle_name] = {
          name: circle_name,
          members:[`need to add thru sql`],
          events: eventsArr
        }
      }
      console.log('this is the circle obj: \n', circleObj)




      // rows returns a an array with 1 object, this means we can pull  it from the first element of the array
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