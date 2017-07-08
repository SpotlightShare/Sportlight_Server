var express = require('express');
var path = require('path');
var database = require('/db/dbAction');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var midData = 0;
var midUser = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', (req, res) => {
   res.sendFile('../public/html/register.html');
});
app.post('/register', (req, res) => {
   if (database.userSearch(req.body.id)) {
       res.send({status: false})
   }
   else{
       var token = req.body.id + req.body.password;
       database.userInsert(req.body, midUser, token);
       midUser += 1;
       res.send({status: true,
                 token: token,
                  id: req.body.id})
   }
});
app.get('/login', (req, res) => {
    res.sendFile("../public/html/login.html");
});

app.post('/login', (req, res) => {
   var id = req.body.id;
   var password = req.body.password;
    var user = database.userSearch(id)[0];
    if (user) {
        if (user.password === password){
            var token = user.token;
            res.send({status: true,
                       token: token,
                        id: id})
        }
        else {
            res.send({status: false,
                       detail: "password wrong"})
        }
    }
    else {
        res.send({status: false,
                    detail: "id wrong"})
    }
});

app.post('/add', (req, res) => {
    if (req.body !== null) {
        database.dataInsert(req.body);
        res.send({status: true});
    }
    else {
        res.send({status: false});
    }
});

app.post('/modify', (req, res) => {
    if (req.body !== null) {
        database.dataDelete(req.body.id);
        database.dataInsert(req.body);
        res.send({status: true});
    }
    else {
        res.send({status: false});
    }
});

app.get('/get', (req, res) => {
    if (req.body.token === database.userSearch(req.body.id).token) {

    }
    else {
        res.send({status: false})
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
