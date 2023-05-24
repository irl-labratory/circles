// const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../queries')
const secretKey = 'This-is-a-secret-key';


const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return {
        log: `eventController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: `Error occurred in eventController.${method}. Check server logs for more details.` }
    };
};

const eventController = {};




eventController.joinEvent = (req, res, next) => {
    // console.log(req.params)
    const { user_id, event_id } = req.body;
    // console.log(user_id)

    const qString = `

    INSERT INTO circles.event_users(event_id, user_id)
    VALUES(${event_id}, ${user_id})
    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        }).catch(e => {
            console.log(e)
            next(e)
        })


}

eventController.leaveEvent = (req, res, next) => {
    // console.log(req.params)
    console.log(req.body)
    const { user_id, event_id } = req.body;
    // console.log(user_id)

    const qString = `
	DELETE FROM circles.event_users
	WHERE user_id = ${user_id} AND event_id = ${event_id}
    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        }).catch(e => {
            console.log(e)
            next(e)
        })

    // issues with intended behavior of having both the event removed and checking if we need to delete the event so going to just have it remove the event
    // BEGIN;
    // 	DELETE FROM circles.event_users
    // 	WHERE user_id = ${ user_id } AND event_id = ${ event_id };
    // 	DELETE FROM circles.events 
    // 	where id in (
    //     select b.id
    // 	from circles.event_users a
    // 	FULL OUTER JOIN circles.events b on a.event_id = b.id
    // 	where b.id in (${ event_id }) 
    // 	group by 1
    // 	having count(a.event_id) = 0);
    // COMMIT;

}



// stuck on leaving an event DOES NOT WORK YET
eventController.newEvent = (req, res, next) => {
    // console.log(req.params)
    let { user_id, circle_id, event_date, daypart, event_name, note } = req.body;
    if (!note) { note = "" }
    if (!event_name) { event_name = "" }
    if (!daypart) { daypart = "" }

    const qString = `
    BEGIN;
	INSERT INTO circles.events (circle_id, event_date,daypart, event_name, note)
	VALUES(${circle_id}, ${event_date},${daypart}, ${event_name}, ${note});
	INSERT INTO circles.event_users (event_id, user_id)
	VALUES (lastval(), ${user_id});
	COMMIT
    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        }).catch(e => {
            console.log(e)
            next(e)
        })


}




// Export the Controller
module.exports = eventController; 