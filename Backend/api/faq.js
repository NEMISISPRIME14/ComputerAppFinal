const db = require('../DBconnection/db');
const express=require('express');
const router=express.Router();

// Get Each FAQ
router.get('/getfaq', (req, res) => {
    let faq_id = req.query.id;
    db.query('SELECT * FROM faq WHERE id=?', [faq_id], (err, result) => {
        if (err) {
            res.status(500).send('Error getting FAQ!')
            res.status(404).send('FAQ not found!')
        }
        res.send(result)
    })
})

// Get All FAQs
router.get('/', (req, res) => {
    db.query('SELECT * FROM faq', (err, result) => {
        if (err) {
            res.status(500).send('Error getting FAQs!')
            res.status(404).send('FAQs not found!')
        }
        res.send(result)
    })
})

// Add FAQ
router.post('/addfaq', (req, res) => {
    let { question, answer } = req.body;
    let query = `INSERT INTO faq (question, answer) VALUES (?,?)`;
    if (!question || !answer) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [question, answer], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error adding FAQ!')
        }
        res.send(`${question} FAQ added successfully!`)
        console.log('FAQ added successfully!')
    })
})

// Update FAQ
router.put('/updatefaq', (req, res) => {
    let faq_id = req.query.id;
    let { question, answer } = req.body;
    let query = `UPDATE faq SET question=?, answer=? WHERE id=?`;
    if (!question || !answer) {
        res.send('Please fill all the fields!')
        return
    }
    db.query(query, [question, answer, faq_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error updating FAQ!')
        }
        res.send(`${question} FAQ updated successfully!`)
        console.log('FAQ updated successfully!')
    })
})

module.exports=router;