const mysql = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'realestate'
})
db.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('Database connected successfully!')
})

module.exports=db;