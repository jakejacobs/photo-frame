if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID:process.env.googleClientID,
    clientSecret:process.env.googleClientSecret,
    callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(!currentUser){
            new User({
        googleId:profile.id,
        username:profile.username
    }).save().then((user)=>{
        done(null,user)
    })} else {
        done(null,currentUser)
    }
    })
}))
