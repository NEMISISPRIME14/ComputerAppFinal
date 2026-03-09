const db = require('../DBconnection/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const activeTokens = require('../authToken');
const JWT_SECRET = '13dde816aa7325ac75fe65bc54318f9c315e53a7b9c5066f71d51a40e96dbdb7b7845ab8b33cb3c3b2b9f5374a7f3c0d2776b532bb14f58ba46ed741b4c1122c';

// Admin Auth Token
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


// Get Admins
router.get('/', (req, res) => {
    db.query('SELECT * FROM admins', (err, result) => {
        if (err) {
            res.status(500).send('Error getting admins!')
            res.status(404).send('Admins not found!')
        }
        res.send(result)
    })
})

// Get Admin  By  Admin  Id
router.get('/getadmin', (req, res) => {
    let admin_id = req.query.id;
    db.query('SELECT * FROM admins WHERE id=?', [admin_id], (err, result) => {
        if (err) {
            res.status(500).send('Error getting admin!')
            res.status(404).send('Admin not found!')
        }
        res.send(result)
    })
})

// Update Admin
router.put('/updateadmin', (req, res) => {
    let admin_id = req.query.id;
    let { name, email, phone, password } = req.body;
    let query = `UPDATE admins SET name=?, email=?, phone=?, password=? WHERE id=?`;
    if (!name || !email || !phone || !password) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, email, phone, password, admin_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating admin!')
        }
        const updatedAdmin = {
            id: admin_id,
            name,
            email,
            phone,
            password
        };

        const token = jwt.sign(updatedAdmin, JWT_SECRET);
        return res.json({
            message: "Admin updated successfully!",
            token
        });
    })
})

// Add Admin
router.post('/addadmin', (req, res) => {
    let { name, email, phone, password } = req.body;
    let query = `INSERT INTO admins (name, email, phone, password) VALUES (?,?,?,?)`;
    if (!name || !email || !phone || !password) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, email, phone, password], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding admin!')
        }
        res.send(`${name} added successfully!`)
        console.log('Admin added successfully!')
    })
})

// Delete Admin Smoothly
router.delete('/deleteadmin', (req, res) => {
    let admin_id = req.query.id;
    let query = `UPDATE admins SET is_deleted = 1 WHERE id=?`;
    db.query(query, [admin_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting admin!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("Admin not found!");
        else {
            res.send(`${admin_id} deleted successfully!`)
            console.log('Admin deleted successfully!')
        }
    })
})

// Login Admin
router.post('/loginadmin', (req, res) => {
    let { email, password } = req.body;
    let query = `SELECT * FROM admins WHERE email=? AND password=? AND is_deleted = 0`;
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
            const admin = { id: result[0].id, name: result[0].name, email: result[0].email, phone: result[0].phone, password: result[0].password }
            const token = jwt.sign(admin, JWT_SECRET, { expiresIn: '1h' });
            activeTokens.add(token);
            return res.send({ token })
        }
    })
})

// Logout Admin

router.post('/logout', authebticateToken, (req, res) => {
    let authHeader = req.headers.authorization;

    let token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    activeTokens.delete(token);

    res.send('Admin logged out successfully!');
});


module.exports = router;
