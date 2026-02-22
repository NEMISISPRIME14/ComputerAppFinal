const db = require('../DBconnection/db');
const express = require('express');
const router = express.Router();

// Get All Appointments

router.get('/', (req, res) => {
    db.query('SELECT * FROM appointments WHERE is_deleted = 0', (err, result) => {
        if (err) {
            res.status(500).send('Error getting appointments!')
            res.status(404).send('Appointments not found!')
        }
        res.send(result)
    })
})

// Get  Appointment  By  User  Id

router.get('/getappointment', (req, res) => {
    let user_id = req.query.user_id;

    db.query('SELECT * FROM appointments WHERE user_id=? AND is_deleted = 0', [user_id], (err, result) => {
        if (err) {
            res.status(500).send('Error getting appointment!')
            res.status(404).send('Appointment not found!')
        }
        res.send(result)
    })
})

// Add Appointment
router.post('/addappointment', (req, res) => {
    let { user_id, service_id, appointment_date } = req.body;
    let query = `INSERT INTO appointments (user_id, service_id, appointment_date) VALUES (?,?,?)`;
    if (!user_id || !service_id || !appointment_date) {
        return res.status(400).send('Please fill all the fields!');
    }
    let formattedDate = appointment_date.replace("T", " ");
    db.query(query, [user_id, service_id, formattedDate], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding appointment!')
        }
        res.send(`${user_id} appointment added successfully!`)
        console.log('Appointment added successfully!')
    })
})

// Delete Appointment
router.delete('/deleteappointment', (req, res) => {
    let appointment_id = req.query.id;
    let query = `UPDATE appointments SET is_deleted = 1 WHERE id=?`;
    db.query(query, [appointment_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error deleting appointment!')
        }
        if (result.affectedRows === 0)
            return res.status(404).send("Appointment not found!");
        else {
            res.send(`${appointment_id} deleted successfully!`)
            console.log('Appointment deleted successfully!')
        }
    })
})

// Get deleted appointments
router.get('/deleted', (req, res) => {
    let user_id = req.query.user_id;
    if (!user_id) {
    db.query('SELECT * FROM appointments WHERE is_deleted = 1', (err, result) => {
        if (err) {
            console.error('Database error:', err)
            return res.status(500).send('Error getting appointments!')
        }

        if (!result || result.length === 0) {
            return res.status(404).send('No deleted appointments found!')
        }

        res.send(result)
    })
}else if (user_id) {
    db.query('SELECT * FROM appointments WHERE user_id=? AND is_deleted = 1', [user_id], (err, result) => {
        if (err) {
            console.error('Database error:', err)
            return res.status(500).send('Error getting appointments!')
        }

        if (!result || result.length === 0) {
            return res.status(404).send('No deleted appointments found!')
        }

        res.send(result)
    })
}
})
// Edit Appointment
router.put('/updateappointment', (req, res) => {
    let appointment_id = req.query.id;
    let { user_id, service_id, appointment_date, price, mechanic_id ,appointment_status } = req.body;
    let query = `UPDATE appointments SET user_id=?, service_id=?, price=?, appointment_date=?, mechanic_id=? ,appointment_status=? WHERE id=?`;
    if (!user_id || !service_id || !appointment_date || !price || !mechanic_id || !appointment_status) {
        return res.status(400).send('Please fill all the fields!');
    }
    db.query(query, [user_id, service_id, price, appointment_date, mechanic_id, appointment_status, appointment_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating appointment!')
        }
        res.send(`${user_id} appointment updated successfully!`)
        console.log('Appointment updated successfully!')
    })
})

module.exports = router;