import passport from "passport";
export const notLoggedIn  =  ((req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You have to be logged in to do that')
        res.redirect('/')
    }
    else{
        next()
    }
})

export const loggedIn  =  ((req,res,next) => {
    if(req.isAuthenticated()){
        req.flash('error', 'You are alreaddy logged in')
        res.redirect('/')
    }
    else{
        next()
    }
})
