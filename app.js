import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from "express";
import  path  from "path";
import ejsMate from 'ejs-mate';
import session from 'express-session'
import mongoose from 'mongoose';
import {router as userRoute}  from './routes/userRoutes.js';
import {router as bookRoute } from './routes/bookRoutes.js';
import User from './models/users.js';
import passport from 'passport';
import localStrategy from 'passport-local'
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';
import flash from 'express-flash';
import ApiError from './utils/ApiError.js';
import apiErrorHandler from './utils/apiErrorHandler.js';
const app = express();
const port = 3000;
const __dirname = path.resolve();
const db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs' );
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/semantic')));

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret:'123',
    secure: true,
    resave: false,
    saveUninitialized: false,
    maxAge: 86400000 // 24hours in miliseconds
}));

//passport config
app.use(passport.initialize());
app.use(passport.session());

//passport-locale config
passport.use(new localStrategy(User.authenticate()));

//passport google config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
        const newUser = {
            username: profile._json.name,
            email: profile.email,
            googleId: profile.id
        }
        try{
            let user = await User.findOne({googleId: profile.id})
            if(user){
                return done(null, user)
            } else{
                user = await User.create(newUser)
                return done(null,user)
            }
            
        } catch (err) {
            return done(new ApiError(err.message), null);
        }
    }
));
passport.serializeUser(function (user,done){
    done(null,user)
})
passport.deserializeUser(function (user,done){
    done(null,user)
})

//connect to mongoose server
mongoose.connect('mongodb://localhost:27017/StockTracker', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex:true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB Connected!")
});

app.use(flash());
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    next();
})

app.get('/', (req,res) => {
    res.render('home');
});

app.use('/', userRoute);
app.use('/books', bookRoute );

app.all('*', (req,res,next) => {
    next(new ApiError(404, 'Something went wrong!'));

})

app.use(apiErrorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
