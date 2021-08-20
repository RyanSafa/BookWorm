import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from "express";
import  path  from "path";
import ejsMate from 'ejs-mate';
import session from 'express-session'
import mongoose from 'mongoose';
import {router as userRoute} from './routes/userRoutes.js';
import User from './models/users.js';
import passport from 'passport';
import localStrategy from 'passport-local'
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';
const app = express();
const port = 3000;
const __dirname = path.resolve();
const db = mongoose.connection;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs' );
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret:'123',
    secure: true,
    resave: false,
    saveUninitialized: false
}))

//passport config
app.use(passport.initialize());
app.use(passport.session());

//passport-locale config
passport.use(new localStrategy(User.authenticate()));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ username: profile._json.name, email: profile.email, accessToken: accessToken, refreshToken: refreshToken}, function (err, user) {
          return done(err, user);
        });
      }
    
));


passport.serializeUser(function (user,done){
    done(null,user)
})
passport.deserializeUser(function (user,done){
    done(null,user)
})
mongoose.connect('mongodb://localhost:27017/StockTracker', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex:true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB Connected!")
});

//middleware
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req,res) => {
    res.render('home');
});

app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
