const db = require("../DBconnection/db");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const activeTokens = require("../authToken");

const JWT_SECRET =
  "13dde816aa7325ac75fe65bc54318f9c315e53a7b9c5066f71d51a40e96dbdb7b7845ab8b33cb3c3b2b9f5374a7f3c0d2776b532bb14f58ba46ed741b4c1122c";

// Admin Auth Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
};

// Get Admins (only not deleted)
router.get("/", (req, res) => {
  db.query("SELECT id, name, email, phone, is_deleted, created_at FROM admins WHERE is_deleted=0", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error getting admins!");
    }
    return res.json(result);
  });
});

// Get Admin by Id
router.get("/getadmin", (req, res) => {
  const admin_id = req.query.id;

  db.query(
    "SELECT id, name, email, phone, is_deleted, created_at FROM admins WHERE id=? LIMIT 1",
    [admin_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error getting admin!");
      }
      if (!result || result.length === 0) return res.status(404).send("Admin not found!");
      return res.json(result[0]);
    }
  );
});

// Update Admin
router.put("/updateadmin", (req, res) => {
  const admin_id = req.query.id;
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send("Please fill all the fields!");
  }

  const query = "UPDATE admins SET name=?, email=?, phone=?, password=? WHERE id=? AND is_deleted=0";

  db.query(query, [name, email, phone, password, admin_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating admin!");
    }
    if (result.affectedRows === 0) return res.status(404).send("Admin not found!");

    // ✅ do NOT include password in token
    const token = jwt.sign({ id: admin_id, name, email, phone, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      message: "Admin updated successfully!",
      token,
    });
  });
});

// Add Admin
router.post("/addadmin", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send("Please fill all the fields!");
  }

  const query = "INSERT INTO admins (name, email, phone, password, is_deleted) VALUES (?,?,?,?,0)";

  db.query(query, [name, email, phone, password], (err, result) => {
    if (err) {
      console.log(err);
      // duplicate email
      if (err.code === "ER_DUP_ENTRY") return res.status(409).send("Email already exists!");
      return res.status(500).send("Error adding admin!");
    }
    return res.json({ message: `${name} added successfully!`, id: result.insertId });
  });
});

// Delete Admin (soft delete)
router.delete("/deleteadmin", (req, res) => {
  const admin_id = req.query.id;

  db.query("UPDATE admins SET is_deleted = 1 WHERE id=?", [admin_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting admin!");
    }
    if (result.affectedRows === 0) return res.status(404).send("Admin not found!");
    return res.json({ message: `${admin_id} deleted successfully!` });
  });
});

// Login Admin
router.post("/loginadmin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Please fill all the fields!");

  const query = "SELECT id, name, email, phone FROM admins WHERE email=? AND password=? AND is_deleted=0 LIMIT 1";

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error logging in!");
    }

    if (!result || result.length === 0) {
      return res.status(401).send("Invalid email or password!");
    }

    const admin = result[0];
    const token = jwt.sign({ ...admin, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

    activeTokens.add(token);
    return res.json({ token });
  });
});

// Logout Admin
router.post("/logout", authenticateToken, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  activeTokens.delete(token);
  return res.send("Admin logged out successfully!");
});

module.exports = router;