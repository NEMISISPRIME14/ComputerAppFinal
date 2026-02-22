const db = require('../DBconnection/db');
const express = require('express');
const router = express.Router();

// Get Services
router.get('/', (req, res) => {
    let service_id = req.query.id;
    if (service_id == '%' || !service_id) {
        db.query('SELECT * FROM services WHERE is_deleted = 0', (err, result) => {
            if (err) {
                res.status(404).json({'message':'Service not found!'})
            }
            res.send(result)
        })
    }
    else {
        db.query('SELECT * FROM services WHERE id=? AND is_deleted = 0', [service_id], (err, result) => {
            if (err) {
                res.status(404).send('Service not found!')
            }
            res.send(result)
        })
    }
})

// Add Service
router.post('/addservice', (req, res) => {
    let { name, description, price, image } = req.body;
    let query = `INSERT INTO services (name, description, price, image) VALUES (?,?,?,?)`;
    if (!name || !description || !price || !image) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, description, price, image], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding service!')
        }
        res.send(`${name} service added successfully!`)
        console.log('Service added successfully!')
    })
})

// Update Service
router.put('/updateservice', (req, res) => {
    let service_id = req.query.id;
    let { name, description, price, image } = req.body;
    let query = `UPDATE services SET name=?, description=?, price=?, image=? WHERE id=?`;
    if (!name || !description || !price || !image) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [name, description, price, image, service_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating service!')
        }
        res.send(`${name} service updated successfully!`)
        console.log('Service updated successfully!')
    })
})
// Delete Service Smoothly
router.delete('/deleteservice', (req, res) => {
    let service_id = req.query.id;
    let query = `UPDATE services SET is_deleted = 1 WHERE id=?`;
    db.query(query, [service_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting service!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("Service not found!");
        else {
            res.send(`${service_id} service deleted successfully!`)
            console.log('Service deleted successfully!')
        }
    })
})



module.exports = router;