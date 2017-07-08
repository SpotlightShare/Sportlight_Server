var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var database = require('./db/dbAction');
var fs = require('fs');

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
    database.userSearch(req.body.email, (user) => {
        if (user === []) {
            console.log(user);
            res.send(JSON.stringify({status: false}));
        }
        else if (user.length > 1) {
            res.send(JSON.stringify({status: false}));
        }
        else {
            var token = req.body.email + req.body.password;
            var username = req.body.username;
            database.userInsert(req.body, midUser, token);
            midUser += 1;
            res.send(JSON.stringify({
                status: true,
                token: token,
                id: req.body.email
            }))
        }
    })
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/html/login.html");
});

app.post('/login', (req, res) => {
   var id = req.body.email;
   var password = req.body.password;
   database.userSearch(id, (user) => {
       console.log(user[0]);
       if (user && user.length === 1) {
           if (user[0].password === password){
               var token = user[0].token;
               var username = user[0].username;
               res.send(JSON.stringify({status: true,
                   token: token,
                   username: username}))
           }
           else if(user.length > 1){
               res.send(JSON.stringify({status: false,
                                        detail: "Same ID"}))
           }
           else {
               res.send(JSON.stringify({status: false,
                   detail: "password wrong"}))
           }
       }
       else {
           res.send(JSON.stringify({status: false,
               detail: "id wrong"}))
       }
   });
});

app.get('/editor', (req, res) => {
    res.sendFile(__dirname + "/public/html/editor.html")
});

app.post('editor', (req, res) => {
    if (req.body.type == 1) {
        fs.writeFile()
    }
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

app.post('/get', (req, res) => {
    if (req.body.token != undefined && req.body.id != undefined) {
        database.userSearch(req.body.id, (user) => {
            if (user.length < 1) return;
            if (req.body.token == user[0].token) {
                var area = {
                    center: [req.body.position.lo, req.body.position.la],
                    radius: req.body.radius,
                    unique: false
                };
                database.dbCircle(area, (data) => {
                    console.log(data);
                    res.send(JSON.stringify(data));
                });
            }
            else {
                res.send(JSON.stringify({status: false}));
            }

        });
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
