const express = require('express');
const eventController = require('../controllers/eventController')

const eventRouter = express.Router();


// adding event is not working
// create a new event  // {"user_id":8,"circle_id":2, "event_date":"2023-06-01","daypart":"","event_name":"test","note":"" }
eventRouter.post('/new', eventController.newEvent,
    (req, res) => {
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)


// add self to current event, assumes user sends something like {"user_id":1, "event_id":12} in body of the request
eventRouter.post('/join', eventController.joinEvent,
    (req, res) => {
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)



// remove self from current event //  { "user_id": 1, "event_id": 12 }  

eventRouter.post('/leave', eventController.leaveEvent,
    (req, res) => {
        console.log('got this this part!');
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)


module.exports = eventRouter;