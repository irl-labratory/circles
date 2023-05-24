const express = require('express');
const groupController = require('../controllers/groupController')

const groupRouter = express.Router();



// add self to current event, assumes user sends something like  {"user_id":8, "circle_id":3} in body of the request
groupRouter.post('/join', groupController.joinGroup,
    (req, res) => {
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)


// remove self from current group //   {"user_id":8, "circle_id":3}  

groupRouter.post('/leave', groupController.leaveGroup,
    (req, res) => {
        console.log('got this this part!');
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)


// create a new group  //   {"user_id":8, "group_name":"testName"} 
groupRouter.post('/new', groupController.newGroup,
    (req, res) => {
        return res.status(200).json(res.locals.user); //res.locals.userData
    }
)








module.exports = groupRouter; 