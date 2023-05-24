// const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../queries')
const secretKey = 'This-is-a-secret-key';


const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return {
        log: `groupController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: `Error occurred in groupController.${method}. Check server logs for more details.` }
    };
};

const groupController = {};




groupController.joinGroup = (req, res, next) => {
    // console.log(req.params)
    const { user_id, circle_id } = req.body;

    const qString = `

    INSERT INTO circles.circle_users(user_id, circle_id)
    VALUES(${user_id}, ${circle_id})

    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        })

}

groupController.leaveGroup = (req, res, next) => {
    // console.log(req.params)
    console.log(req.body)
    const { user_id, circle_id } = req.body;
    // console.log(user_id)

    const qString = `

     BEGIN;
	 DELETE FROM circles.event_users WHERE event_id in (select id from circles.events where circle_id = ${circle_id}) and user_id = ${user_id}; 
	 DELETE FROM circles.circle_users WHERE user_id = ${user_id} AND circle_id = ${circle_id};
	 COMMIT
    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        })

}



groupController.newGroup = (req, res, next) => {
    // console.log(req.params)
    let { user_id, group_name } = req.body;


    const qString = `

    BEGIN;
    INSERT INTO circles.circles(id, name)
    VALUES(DEFAULT, '${group_name}'); 
    INSERT INTO circles.circle_users(user_id, circle_id)
    VALUES(${user_id}, lastval());
    COMMIT`;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        })

}




// Export the Controller 
module.exports = groupController; 