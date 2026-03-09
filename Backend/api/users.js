const db = require('../DBconnection/db');
const express=require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const activeTokens=require('../authToken');
const multer = require('multer');
const path = require('path');
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/national_ids/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|pdf/;

    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /image|pdf/.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, PNG, or PDF files are allowed'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit (recommended)
});


// Add User
router.post('/signup', upload.single('national_id'), async (req, res) => {
    try {
        let { name, phone, email, password, confirm_password, role } = req.body;

        if (!name || !phone || !email || !password || !confirm_password || !role) {
            return res.status(400).send('Please fill all the fields!');
        }

        if (password !== confirm_password) {
            return res.status(400).send('Passwords do not match!');
        }

        if (!req.file) {
            return res.status(400).send('National ID image is required!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const national_id = req.file.filename;

        let query = `
            INSERT INTO users (name, phone, national_id, email, password, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [name, phone, national_id, email, hashedPassword, role], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error adding user!');
            }

            res.send(`${name} added successfully!`);
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
});

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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please fill all the fields!');
    }

    const query = `SELECT * FROM users WHERE email=? AND is_deleted=0 LIMIT 1`;

    db.query(query, [email], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging in!');
        }

        if (result.length === 0) {
            return res.status(404).send('Invalid email or password!');
        }

        const user = result[0];
        let isMatch = false;

        // ✅ If password is already hashed
        if (user.password.startsWith('$2')) {
            isMatch = await bcrypt.compare(password, user.password);
        } 
        // ✅ If password is plain text (old accounts)
        else {
            isMatch = password === user.password;

            // If matched, upgrade it to hashed
            if (isMatch) {
                const hashed = await bcrypt.hash(password, 10);
                db.query('UPDATE users SET password=? WHERE id=?', [hashed, user.id]);
            }
        }

        if (!isMatch) {
            return res.status(404).send('Invalid email or password!');
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
           
            // password: user.password
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return res.send({ token });
    });
});



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