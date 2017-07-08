var mongoose = require('mongoose');
var Query = mongoose.Query;


var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var db1 = mongoose.connect('mongodb://localhost/spot');
var db2 = mongoose.createConnection('mongodb://localhost/users');
var data = new Schema({
    position: Schema.Types.Mixed,
        // {lo: Schema.Types.Number,
        //     la: Schema.Types.Number,
        //     ve: Schema.Types.Number,
        //     ho: Schema.Types.Number},
    data: Schema.Types.Mixed,
    //     {
    //     type: Schema.Types.Number,
    //     content: Schema.Types.Number
    // },
    timestamp: Schema.Types.Number,
    mid: Schema.Types.Number,
    id: Schema.Types.String
});

var user = new Schema({
    email: Schema.Types.String,
   id: Schema.Types.String,
   password: Schema.Types.String,
   token: Schema.Types.String,
   register: Schema.Types.Date,
   priority: Schema.Types.Number,
    mid: Schema.Types.Number
});

var User = mongoose.model('User', user);

var Data = mongoose.model('Data', data);

var db1Insert = (recData, mid) => {
    var data = new Data({
        position: recData.position,
        data: recData.data,
        timestamp: recData.timestamp,
        mid: mid,
        id: recData.id
    });
    data.save(function (err) {
        if (err) {
            console.log('ERROR: ' + err);
        }
        else {
            console.log("DONE");
        }
    })
};

var db1Delete = (id) => {
    Data.remove({id: id}, (err, res) => {
        if (err) {
            console.log('ERROR: ' + err);
        }
        else {
            console.log("RES: " + res);
        }
    })
};

var db1Search = (id, callback) => {
    User.find({id: id}, (err, result) => {
        if (err) {
            console.log("ERR: " + err)
        }
        else {
            //console.log(result);
            callback(result);
        }
    })
};

var db1Update = (id, cata, value) => {
    var myCata = {};
    myCata[cata] = value;
    Data.update({id: id}, myCata, (err, res) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log("res " + res);
        }
    })
};

var db1Close = () => {
    db1.disconnect();
};


var db2Insert = (recData, mid, token) => {
    var user = new User({
        email: recData.username,
        id: recData.email,
        password: recData.password,
        token: token,
        register: Date.now(),
        priority: 1,
        mid: mid
    });
    user.save(function (err) {
        if (err) {
            console.log('ERROR: ' + err);
        }
        else {
            console.log("DONE");
        }
    })
};

var db2Delete = (id) => {
    User.remove({id: id}, (err, res) => {
        if (err) {
            console.log('ERROR: ' + err);
        }
        else {
            console.log("RES: " + res);
        }
    })
};

var db2Search = (id, callback) => {
    User.find({id: id}, (err, result) => {
        if (err) {
            console.log("ERR: " + err)
        }
        else {
            callback(result);
        }
    })
};

var db2Update = (id, cata, value) => {
    var myCata = {};
    myCata[cata] = value;
    Data.update({id: id}, myCata, (err, res) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log("res " + res);
        }
    })
};

var db2Close = () => {
    db2.close();
};

var dbCircle = (area, callback) => {
    User.find({}, (err, result) => {
        if (err) {
            console.log("ERR: " + err)
        }
        else {
            console.log(result);
            callback(result);
        }
    })
    // var query = new Query();
    // query.circle('Data', area).exec((err, data) => {
    //     callback(data);
    // });
}

module.exports = {
    'dataInsert': db1Insert,
    'dataDelete': db1Delete,
    'dataSearch': db1Search,
    "dataUpdate": db1Update,
    "dataClose": db1Close,
    "userInsert": db2Insert,
    "userDelete": db2Delete,
    "userSearch": db2Search,
    "userUpdate": db2Update,
    "userClose": db2Close,
    "dbCircle": dbCircle
};
