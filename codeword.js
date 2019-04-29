var express = require('express');
var path = require('path');
var cors = require('cors');
var register= require('./DB_Operations/register');
require('./config/database');
//const formidable = require('express-formidable');
var userRouter = require('./routes/user.route');
require('dotenv').config();
var app = express();
const bodyParser = require('body-parser');
var tokencheck = require('./middleware/tokencheck');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(formidable());

// view engine setup
app.set('views', path.join(__dirname, 'views/dist/codeword'));
app.use(express.static(path.join(__dirname, 'views/dist/codeword')));
app.engine("html", require('ejs').renderFile)
app.set('view engine', 'html');

app.use(tokencheck.tokencheck);
app.use(express.json());

app.post("/register",function(request,response){
    console.log("-----------------Register---------------");
    register.registeruser(request.body, function(registerResponse){
        response.send(registerResponse);
    });

});

app.get("/",function(req,res){
    res.render('index.html', { title: 'Express' });
});

app.use('/codeword', userRouter);


// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data

// start Express app
//app.listen(app.get('port'), () => {
//    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
//    console.log('  Press CTRL-C to stop\n')
//  })

module.exports = app;
