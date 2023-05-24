const express = require('express');
const GoogleOauthMiddleware = require('../controllers/GoogleOauthController')

const oAuthRouter = express.Router();


oAuthRouter.post('/', GoogleOauthMiddleware.getGoogleAccesToken, GoogleOauthMiddleware.getUserInfo, (req, res) => {
    console.log('We have entered the Oauth route handler!');
    res.status(200).send(res.locals.userInfo);
  });

  module.exports = oAuthRouter;