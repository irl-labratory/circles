const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Routers
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');
const groupRouter = require('./routes/groupRouter');


const PORT = 8080;
const app = express();
app.use(cookieParser()); // important for cookies!!


// Parse all requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // important for forms!!


// define route handlers 
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)
app.use('/api/group', groupRouter)


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send("Big ol' fail"));

app.use((err, req, res, next) => {
  // this is the default error obj
  // console.log('We have entered the twightlight Zone!');
  res.locals.message = err.message;
  console.log('Our error log is: ', err.log)
  console.log('Our error message is: ', err.message);
  const errorStatus = err.status || 500;
  return res.status(errorStatus).send(res.locals.message);
});

//  start server
app.listen(PORT, () => {
  console.log(`Beep boop: Server listening on port: ${PORT}`);
});