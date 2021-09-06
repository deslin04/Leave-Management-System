import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import createError from 'http-errors';
import * as session from 'express-session'
import cookieParser from 'cookie-parser';
import * as cors from 'cors';

import userRouter from './routes/user';
import requestRouter from './routes/requsets';



import { request } from "http";



createConnection().then(async connection => {


     //create express app
    const app = express()
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));   
     app.use(cors());


app.use(session({
  secret: 'Auniquerandomtext',
  saveUninitialized: true,
  resave: true
}));


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

   
   app.use(express.static(path.join(__dirname, 'public')));


    //routing
    app.use('/',userRouter);
    app.use('/requests',requestRouter);
    
    
                


   

  
    // catch 404 and forward to error handler  
    app.use(function(req, res, next) {
    next(createError(404));
  });   
  


 

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
  });



app.listen(3000);
/*console.log("server is listening port 3000")
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);*/

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
