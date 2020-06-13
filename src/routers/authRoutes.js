const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }))
    
    app.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
         res.redirect('/');
      }
    
    )

    app.get('/api/logout',(req,res)=>{
        req.logout()
        res.send("logged out")
    })

    app.get('/api/current_user',(req,res)=>{
        if(req.user){
           return res.send(req.user)
        } else {
            return res.send('You need to login')
        }
    })
}