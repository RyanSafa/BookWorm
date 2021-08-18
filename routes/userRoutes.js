import express from "express";
const router = express.Router();

router.get('/register', (req,res) => {
    res.render('../views/users/register')
});

export { router };