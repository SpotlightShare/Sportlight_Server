var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var database = require('./db/dbAction');

var app = express();

var midData = 0;
var midUser = 0;
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
 app.use(function(err, req, res, next) {
   // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

         // render the error page
           res.status(err.status || 500);
             res.send(JSON.stringify({status:false}));
             });

app.get('/register', (req, res) => {
   res.sendFile(__dirname + '/public/html/register.html');
});
app.post('/register', (req, res) => {
   if (database.userSearch(req.body.email)) {
       res.send(JSON.stringify({status: false}));
   }
   else{
       var token = req.body.email + req.body.password;
       var username = req.body.username;
       database.userInsert(req.body, midUser, token);
       midUser += 1;
       res.send(JSON.stringify({status: true,
                 token: token,
                  id: req.body.email}))
   }
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/html/login.html");
});

app.post('/login', (req, res) => {
    console.log(req);
   var id = req.body.email;
   var password = req.body.password;
    var user = database.userSearch(id);
    if (user) {
        if (user.password === password){
            var token = user.token;
            res.send(JSON.stringify({status: true,
                       token: token,
                        id: id}))
        }
        else {
            res.send(JSON.stringify({status: false,
                       detail: "password wrong"}))
        }
    }
    else {
        res.send(JSON.stringify({status: false,
                    detail: "id wrong"}.stringify()))
    }
});

app.get('/editor', (req, res) => {
    res.sendFile(__dirname + "/public/html/editor.html")
});

app.post('/add', (req, res) => {
    if (req.body !== null) {
        database.dataInsert(req.body);
        res.send(JSON.stringify({status: true}));
    }
    else {
        res.send(JSON.stringify({status: false}));
    }
});

app.post('/modify', (req, res) => {
    if (req.body !== null) {
        var myCata = {};

        database.dataDelete(req.body.email);
        database.dataInsert(req.body);
        res.send(JSON.stringify({status: true}));
    }
    else {
        res.send(JSON.stringify({status: false}));
    }
});

app.get('/get', (req, res) => {
    if (req.body.token === database.userSearch(req.body.email).token) {
        var area = { center: [req.body.data.x, req.body.data.y], radius: req.body.radius, unique: false };
        query.circle('datas', area);
    }
    else {
        res.send(JSON.stringify({status: false}));
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3389);
