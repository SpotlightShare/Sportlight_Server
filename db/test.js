var mydb = require("./dbAction");


mydb.dataInsert({
    position:
        {lo: 12,
            la: 12,
            ve: 12,
            ho: 12},
    data: {
        type: 12,
        content: 12
    },
    timestamp: 12,
    id: 12
}, 12);
mydb.userInsert({
    username:"hey",
    id: "1233",
    password: "1s23",
    token: "!23",
    register: 1,
    priority: 2,
}, 12, "123");
id = "1233";
mydb.userSearch(id);
mydb.dataClose();
mydb.userClose();