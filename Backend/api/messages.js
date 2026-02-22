const db = require('../DBconnection/db');
const express=require('express');
const router=express.Router();

// Add Message
router.post('/addmessage', (req, res) => {
    let user_id = req.query.user_id;
    let { subject, content } = req.body;
    let query = `INSERT INTO messages (user_id, subject, content) VALUES (?,?,?)`;
    if (!subject || !content) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [user_id, subject, content], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding message!')
        }
        res.send(`${subject} message added successfully!`)
        console.log('Message added successfully!')
    })
})

// Get All Messages
router.get('/', (req, res) => {
    db.query('SELECT * FROM messages', (err, result) => {
        if (err) {
            res.status(500).send('Error getting messages!')
            res.status(404).send('Messages not found!')
        }
        res.send(result)
    })
})  

module.exports=router;