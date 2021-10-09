const passport = require('passport')
const localStratge = require('passport-local').Strategy;
const User = require('../models/User')

passport.serializeUser((user , done)=>{
    return done(null , user.id)
})

passport.deserializeUser((id , done)=>{
    User.findById(id , (err ,user)=>{
        return done(err , user)
    })
})

passport.use('local-Suinin', new localStratge({
    usernameField : 'email', 
    passwordField : 'password',
    passReqToCallback : true 
},(req , email , password, done)=>{
    User.findOne({email : email}, (err , user)=>{
        if(err){
            return done(err)
        }
        if(! user){
           return done(null,false,req.flash('SuininError', 'This User Not Found'))
        }
        if(! user.comperPassword(password)){
            return done(null , false , req.flash('SuininError', 'worgen password'))
        }
        return done(null , user)
    })
}))





passport.use('local-Suinup', new localStratge({
    usernameField : 'email', 
    passwordField : 'password',
    passReqToCallback : true 
},(req , email , password, done)=>{
    User.findOne({email : email}, (err , user)=>{
        if(err){
            return done(err)
        }
        if(user){
           return done(null,false,req.flash('SuinupError', 'The email is already registered'))
        }
        const user1 = new User({
            email : email , 
            password : new User().hashPassword(req.body.password)
        })
        user1.save((err , user)=>{
            if(err){
                return done(err)
            }
            return done(null , user)
        })
        
    })
}))