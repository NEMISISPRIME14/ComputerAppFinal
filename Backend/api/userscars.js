const db = require('../DBconnection/db');
const express=require('express');
const router=express.Router();


// Get each user's cars
router.get('/getusercars', (req, res) => {
    let user_id = req.query.user_id;
    db.query('SELECT * FROM cars WHERE user_id=? AND is_deleted = 0', [user_id], (err, result) => {
        if (err) {
            res.status(500).send('Error getting user cars!')
            res.status(404).send('User cars not found!')
        }
        res.send(result)
    })
})
// Get Users Cars
router.get('/', (req, res) => {
    let car_id = req.query.id;
    if (car_id == '%' || !car_id) {
        db.query('SELECT * FROM cars WHERE is_deleted = 0', (err, result) => {
            if (err) {
                res.status(500).send('Error getting user cars!')
                res.status(404).send('User cars not found!')
            }
            res.send(result)
        })
    }
    else {
        db.query('SELECT * FROM cars WHERE id=? AND is_deleted = 0', [car_id], (err, result) => {
            if (err) {
                res.status(500).send('Error getting user cars!')
                res.status(404).send('User cars not found!')
            }
            res.send(result)
        })
    }
})

// Add User Car
router.post('/addusercar', (req, res) => {
    let user_id = req.query.user_id;
    let { brand, model, year, car_image } = req.body;
    let query = `INSERT INTO cars (user_id, brand, model, year, car_image) VALUES (?,?,?,?,?)`;
    if (!brand || !model || !year || !car_image) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [user_id, brand, model, year, car_image], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding user car!')
        }
        res.send(`${brand} car added successfully!`)
        console.log('User car added successfully!')
    })
})

// Update User Car
router.put('/updateusercar', (req, res) => {
    let car_id = req.query.id;
    let { brand, model, year, car_image } = req.body;
    let query = `UPDATE cars SET brand=?, model=?, year=?, car_image=? WHERE id=?`;
    if (!brand || !model || !year || !car_image) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [brand, model, year, car_image, car_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating user car!')
        }
        res.send(`${brand} car updated successfully!`)
        console.log('User car updated successfully!')
    })
})

// Delete User Car Smoothly
router.delete('/deleteusercar', (req, res) => {
    let car_id = req.query.id;
    let query = `UPDATE cars SET is_deleted = 1 WHERE id=?`;
    db.query(query, [car_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting user car!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("User car not found!");
        else {
            res.send(`${car_id} car deleted successfully!`)
            console.log('User car deleted successfully!')
        }
    })
})

module.exports=router;