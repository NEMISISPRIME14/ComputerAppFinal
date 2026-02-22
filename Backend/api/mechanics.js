const db = require('../DBconnection/db');
const express = require('express');
const jwt = require('jsonwebtoken');
const activeTokens = require('../authToken');
const JWT_SECRET = '9eac032b704a445a7e13225488f7ac9dabb944c0f2a238b8822e54b90dff458d035780b27c33f24af5d2b8f82a1560de0052c9221d7fd9f04b46a5abf92a36ff';
const router = express.Router();

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

        req.mechanic = decoded;
        next();
    })
};


// Get Mechanics
router.get('/', (req, res) => {
    let mechanic_id = req.query.id;
    if (mechanic_id == '%' || !mechanic_id) {
        db.query('SELECT * FROM mechanics WHERE is_deleted = 0', (err, result) => {
            if (err) {
                res.status(404).send('Mechanic not found!')
            }
            res.send(result)
        })
    }
    else {
        db.query('SELECT * FROM mechanics WHERE id=? AND is_deleted = 0', [mechanic_id], (err, result) => {
            if (err) {
                res.status(404).send('Mechanic not found!')
            }
            res.send(result)
        })
    }
})

// Add Mechanic
router.post('/signup', (req, res) => {
    let { name, email, phone,  specialization, rating } = req.body;
    let query = `INSERT INTO mechanics (name, email,  phone, specialization, rating) VALUES (?,?,?,?,?)`;
    if (!name || !email || !phone || !specialization) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, email, phone, specialization, rating], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding mechanic!')
        }
        res.send(`${name} added successfully!`)
        console.log('Mechanic added successfully!')
    })
})

// Update Mechanic
router.put('/updatemechanic', (req, res) => {
    let mechanic_id = req.query.id;
    let { name, email, phone,  specialization, rating } = req.body;
    let query = `UPDATE mechanics SET name=?, email=?,  phone=?, specialization=?, rating=? WHERE id=?`;
    if (!name || !email || !phone || !specialization || !rating) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, email, phone, specialization, rating, mechanic_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating mechanic!')
        }
        res.send(`${name} updated successfully!`)
        console.log('Mechanic updated successfully!')
    })
})


// Delete Mechanic Smoothly
router.delete('/deletemechanic', (req, res) => {
    let mechanic_id = req.query.id;
    let query = `UPDATE mechanics SET is_deleted = 1 WHERE id=?`;
    db.query(query, [mechanic_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting mechanic!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("Mechanic not found!");
        else {
            res.send(`${mechanic_id} deleted successfully!`)
            console.log('Mechanic deleted successfully!')
        }
    })
})

// Login Mechanic
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    let query = `SELECT * FROM mechanics WHERE email=? AND password=? AND is_deleted = 0`;
    if (!email || !password) {
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
            const mechanic = { 'id': result[0].id, 'name': result[0].name, 'email': result[0].email, 'phone': result[0].phone };
            const token = jwt.sign(mechanic, JWT_SECRET, { expiresIn: '1h' });
            activeTokens.add(token);
            return res.send({ 'token': token })
        }
    })
})

// Logout Mechanic
router.post('/logout', authebticateToken, (req, res) => {
    let authHeader = req.headers.authorization;

    let token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    activeTokens.delete(token);

    res.send('Mechanic logged out successfully!');
});


// Active Tokens
router.get('/activetokens', (req, res) => {
    res.json({ activeUsers: activeTokens.size })
    console.log([...activeTokens])
})

module.exports = router;