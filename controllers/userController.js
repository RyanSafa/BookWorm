import User from '../models/users.js'
import passport from 'passport';

export const renderRegisterForm = (req,res) => {
    res.render('../views/users/register');
};

export const register =  async(req,res) => {
    const { email, username, password } = req.body;
    const user = new User({username, email});
    await User.register(user, password);
    await user.save();
    res.send('User saved');
};

export const rednerLoginForm = (req,res) => {
    res.render('../views/users/login');
};

export const logout = function(req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.clearCookie('connect.sid', {path: '/'}).redirect('/')
        } else {
            console.log(err);
        }

    });
};