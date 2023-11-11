const express = require('express');
const cors = require('cors')
const { join } = require("path");
const cookieParser = require('cookie-parser'); 
const fs = require('fs');
const app = express();
const https = require('https');
const port = process.env.PORT || 5001

//////Express MiddleWares//////////////
const corsOptions = {
    origin: 'http://127.0.0.1:5173', 
    credentials: true
  };

app.use(cors(corsOptions))
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

// Load SSL certificates
// const privateKey = fs.readFileSync('./Certs/server.key', 'utf8');
// const certificate = fs.readFileSync('./Certs/server.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// console.log(credentials)


app.listen(port, ()=>{
    console.log(`HTTP Server listening on port ${port}}`);
})

// https.createServer(credentials, app).listen(port, ()=>{
//     console.log(`HTTPS Server listening on port ${port}`);
// })