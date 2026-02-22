const db = require('../DBconnection/db');
const express=require('express');
const jwt = require('jsonwebtoken');
const activeTokens=require('../authToken');
const JWT_SECRET='9eac032b704a445a7e13225488f7ac9dabb944c0f2a238b8822e54b90dff458d035780b27c33f24af5d2b8f82a1560de0052c9221d7fd9f04b46a5abf92a36ff';
const router=express.Router();

let authebticateToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('No token provided');
    }
    let token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');

        req.user = decoded;
        next();
    });
};


// Get Users
router.get('/', (req, res) => {
    let user_id = req.query.id;
    if (user_id == '%' || !user_id) {
        db.query('SELECT * FROM users WHERE is_deleted = 0', (err, result) => {
            if (err) {
                res.status(500).send('Error getting user!')
                res.status(404).send('User not found!')
            }
            res.send(result)
        })
    }
    else {
        db.query('SELECT * FROM users WHERE id=? AND is_deleted = 0', [user_id], (err, result) => {
            if (err) {
                res.status(500).send('Error getting user!')
                res.status(404).send('User not found!')
            }
            res.send(result)
        })
    }
})

// Add User
router.post('/signup', (req, res) => {
    let { first_name, last_name, address, email, password, phone } = req.body;
    let query = `INSERT INTO users (first_name, last_name, address, email, password, phone) VALUES (?,?,?,?,?,?)`;
    if (!first_name || !last_name || !address || !email || !password || !phone) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [first_name, last_name, address, email, password, phone], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding user!')
        }
        res.send(`${first_name} ${last_name} added successfully!`)
        console.log('User added successfully!')
    })
})

// Update User
router.put('/updateuser', (req, res) => {
    let user_id = req.query.id;
    let { first_name, last_name, address, email, password, phone } = req.body;
    let query = `UPDATE users SET first_name=?, last_name=?, address=?, email=?, password=?, phone=? WHERE id=?`;
    if (!first_name || !last_name || !address || !email || !password || !phone) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [first_name, last_name, address, email, password, phone, user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating user!')
        }
        const updatedUser = {
            id: user_id,
            first_name,
            last_name,
            address,
            email,
            phone,
            password
        };

        const token = jwt.sign(updatedUser, JWT_SECRET);
        return res.json({
            message: "User updated successfully!",
            token
        });
    })
})


// Delete User Smoothly
router.delete('/deleteuser', (req, res) => {
    let user_id = req.query.id;
    let query = `UPDATE users SET is_deleted = 1 WHERE id=?`;
    db.query(query, [user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting user!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("User not found!");
        else {
            res.send(`${user_id} deleted successfully!`)
            console.log('User deleted successfully!')
        }
    })
})

// Login User
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    let query = `SELECT * FROM users WHERE email=? AND password=? AND is_deleted = 0`;
    if(!email || !password) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error logging in!')
        }
        if (result.length === 0) {
            return res.status(404).send('Invalid email or password!')
        }
        else {
            const user={'id':result[0].id,'first_name':result[0].first_name,'last_name':result[0].last_name,'email':result[0].email,'phone':result[0].phone,'address':result[0].address,'password':result[0].password}
            const token=jwt.sign(user,JWT_SECRET,{expiresIn:'1h'});
            activeTokens.add(token);
            return res.send({'token':token})
        }
    })
})



// Logout User
router.post('/logout', authebticateToken, (req, res) => {
    let authHeader = req.headers.authorization;

    let token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    activeTokens.delete(token);

    res.send('User logged out successfully!');
});


// Active Tokens
router.get('/activetokens',(req,res)=>{
    res.json({activeUsers:activeTokens.size})
    console.log([...activeTokens])
})

module.exports=router;