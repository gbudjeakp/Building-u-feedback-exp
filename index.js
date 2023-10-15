const express = require('express');
const cors = require('cors')
const { join } = require("path");
const cookieParser = require('cookie-parser'); 
const app = express();
const port = process.env.PORT || 5001

//////Express MiddleWares//////////////
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.static(join(__dirname, "public")));
app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  
app.use(cookieParser());


const usersRouter = require('./Routes/User');
const feedbackRouter = require('./Routes/Feedback')


app.use('/api/users', usersRouter);
app.use('/api/feedback', feedbackRouter);







app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})