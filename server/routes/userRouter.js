const express = require('express');
const userController = require('../controllers/userController')

const userRouter = express.Router();

// // save a new user
// userRouter.post('/signup',
//   userController.createUser,
// 	cookieController.setSSIDCookie, //Set JWT token when a new user signs up
//   (req, res) => {
//     console.log('--Sending data from userRouter.POST\'s aynonmouns func--');
//     return res.status(200).json(res.locals);
//   }
// );

// //verify login info
// userRouter.post('/login',
//     userController.verifyUser,
// 		// cookieController.setSSIDCookie, //Set JWT token when a new user signs up

//     (req, res) => {
//     console.log('--Sending data from userRouter.GET\'s aynonmouns func--');
//     return res.status(200).json(res.locals); 
//     }
// );

// get a user's info
userRouter.get('/:_id',
		// sessionController.isLoggedIn, //Protect route
    userController.getUser,
    (req, res) => {
    console.log('--Sending data from userRouter.GET\'s aynonmouns func--');
    return res.status(200).json(res.locals.user); //res.locals.userData
    }
);

// // delete user
// userRouter.delete('/:_id',1
//   userController.deleteUser,
//   (req, res) => {
//     console.log('--Sending data from charaRouter.DELETE\'s aynonmouns func--');
//     return res.status(200).json(res.locals.deletedCharacter); // We need to send back the updated character's object (so the client can re-render)
//   }
// );

// EXPORT THE ROUTER!!!
module.exports = userRouter;