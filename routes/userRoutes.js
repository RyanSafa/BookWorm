import express from "express";
import {default as User} from '../models/users.js';
import passport from 'passport';
const router = express.Router();

router.get('/register', (req,res) => {
    res.render('../views/users/register');
});

router.post('/register', async(req,res) => {
    const { email, username, password } = req.body;
    const user = new User({username, email});
    await User.register(user, password);
    await user.save();
    res.send('User saved');
});
router.get('/login', (req,res) => {
    res.render('../views/users/login');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile' ]}));

router.get('/google/callback', passport.authenticate('google',{
successRedirect: '/login',
failreRedirect: '/lol'}))

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



export { router };