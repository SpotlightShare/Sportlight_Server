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
    id: "123",
    password: "123",
    token: "!23",
    register: 1,
    priority: 2,
}, 12);
mydb.dataClose();
mydb.userClose();