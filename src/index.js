if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
require('./db/mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/users')
require('./services/passport') 

const app = express()
app.use(cookieSession({
    maxAge:30 * 24 * 60 * 60 * 1000,
    keys:[process.env.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routers/authRoutes')(app)
app.use(require('./routers/productRouter'))

app.use(express.json())

app.get('/',(req,res)=>{
    res.send({"greeting":"Hello there!"})
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})