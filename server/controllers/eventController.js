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


// had to make this just one action
eventController.newEvent = (req, res, next) => {
    // console.log(req.params)
    let { user_id, circle_id, event_date, daypart, event_name, note } = req.body;
    if (!note) { note = null }
    if (!event_name) { event_name = null }
    if (!daypart) { daypart = null }

    const qString = `
    
	INSERT INTO circles.events (circle_id, event_date,daypart, event_name, note) 
	VALUES(${circle_id}, '${event_date}','${daypart}', '${event_name}', '${note}')
    `;
    db.query(qString)
        .then((data) => {
            res.locals.user = data.rows;
            return next()
        }).catch(e => {
            console.log(e)
            next(e)
        })

    //     BEGIN;
    // INSERT INTO circles.events(circle_id, event_date, daypart, note, event_name)
    //     VALUES(3, '2023-06-11', 'n/a', 'plzzz', 'n/a');
    // INSERT INTO circles.event_users(event_id, user_id)
    //     VALUES(lastval(), 8);
    //     COMMIT;

}




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

    BEGIN;
	DELETE FROM circles.event_users
	WHERE user_id = ${user_id} AND event_id = ${event_id};
	DELETE FROM circles.events 
	where id in (
	select b.id
	from circles.event_users a
	FULL OUTER JOIN circles.events b on a.event_id = b.id
	where b.id in (${event_id}) 
	group by 1
	having count(a.event_id) = 0);
	COMMIT;
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