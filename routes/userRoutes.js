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

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req,res)=> {
    console.log(req.session)
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

export { router };