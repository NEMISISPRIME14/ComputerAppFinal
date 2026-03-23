const db = require('../DBconnection/db');
const express = require('express');
const jwt = require('jsonwebtoken');
const activeTokens = require('../authToken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const JWT_SECRET = '9eac032b704a445a7e13225488f7ac9dabb944c0f2a238b8822e54b90dff458d035780b27c33f24af5d2b8f82a1560de0052c9221d7fd9f04b46a5abf92a36ff';

// auth middleware
// let autheticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access token required'
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   if (!activeTokens.has(token)) {
//     return res.status(403).json({
//       success: false,
//       message: 'Invalid token'
//     });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid or expired token'
//       });
//     }

//     req.user = user;
//     next();
//   });
// };

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/properties/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});


// =========================
// CREATE PROPERTY
// =========================
router.post('/create', upload.array('images', 20), (req, res) => {
  console.log('content-type:', req.headers['content-type']);
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);

  const {
    title,
    location_city,
    location_state,
    price,
    bedrooms,
    bathrooms,
    square_feet,
    property_type,
    listing_type,
    is_favorite
  } = req.body;

  if (!title || price === undefined || price === null || price === '') {
    return res.status(400).json({
      success: false,
      message: 'Title and price are required'
    });
  }

  const propertySql = `
    INSERT INTO properties
    (title, location_city, location_state, price, bedrooms, bathrooms, square_feet, property_type, listing_type, is_favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const propertyValues = [
    title,
    location_city || null,
    location_state || null,
    price,
    bedrooms || null,
    bathrooms || null,
    square_feet || null,
    property_type || null,
    listing_type || null,
    is_favorite ? 1 : 0
  ];

  db.query(propertySql, propertyValues, (err, propertyResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error creating property',
        error: err
      });
    }

    const propertyId = propertyResult.insertId;

    if (!req.files || req.files.length === 0) {
      return res.status(201).json({
        success: true,
        message: 'Property created successfully',
        property_id: propertyId
      });
    }

    const imageValues = req.files.map(file => [propertyId, file.filename]);

    const imageSql = `
      INSERT INTO property_image (property_id, image)
      VALUES ?
    `;

    db.query(imageSql, [imageValues], (imgErr, imgResult) => {
      if (imgErr) {
        return res.status(500).json({
          success: false,
          message: 'Property created but image insert failed',
          error: imgErr
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Property created successfully',
        property_id: propertyId,
        images_uploaded: req.files.length
      });
    });
  });
});


// =========================
// GET ALL PROPERTIES
// =========================
router.get('/', (req, res) => {
  const sql = `
    SELECT
      p.property_id AS property_id,
      p.title,
      p.location_city,
      p.location_state,
      p.price,
      p.bedrooms,
      p.bathrooms,
      p.square_feet,
      p.property_type,
      p.listing_type,
      p.is_favorite,
      p.created_at,
      p.updated_at,
      pi.property_image_id,
      pi.image
    FROM properties p
    LEFT JOIN property_image pi
      ON p.property_id = pi.property_id
    ORDER BY p.property_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching properties',
        error: err
      });
    }

    const propertiesMap = {};
    const baseUrl = 'http://localhost:3000/uploads/properties/';

    results.forEach((row) => {
      const propertyId = row.property_id;

      if (!propertiesMap[propertyId]) {
        propertiesMap[propertyId] = {
          property_id: row.property_id,
          title: row.title,
          location_city: row.location_city,
          location_state: row.location_state,
          price: row.price,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          square_feet: row.square_feet,
          property_type: row.property_type,
          listing_type: row.listing_type,
          is_favorite: !!row.is_favorite,
          created_at: row.created_at,
          updated_at: row.updated_at,
          images: []
        };
      }

      if (row.property_image_id) {
        propertiesMap[propertyId].images.push({
          property_image_id: row.property_image_id,
          image: baseUrl + row.image
        });
      }
    });

    return res.status(200).json({
      success: true,
      data: Object.values(propertiesMap)
    });
  });
});


// =========================
// GET SINGLE PROPERTY
// =========================
router.get('/:id', (req, res) => {
  const propertyId = req.params.id;

  const sql = `
    SELECT
      p.property_id,
      p.title,
      p.location_city,
      p.location_state,
      p.price,
      p.bedrooms,
      p.bathrooms,
      p.square_feet,
      p.property_type,
      p.listing_type,
      p.is_favorite,
      p.created_at,
      p.updated_at,
      pi.property_image_id,
      pi.image
    FROM properties p
    LEFT JOIN property_image pi
      ON p.property_id = pi.property_id
    WHERE p.property_id = ?
  `;

  db.query(sql, [propertyId], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching property',
        error: err
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const baseUrl = 'http://localhost:3000/uploads/properties/';

    // Create property object from first row
    const property = {
      property_id: results[0].property_id,
      title: results[0].title,
      location_city: results[0].location_city,
      location_state: results[0].location_state,
      price: results[0].price,
      bedrooms: results[0].bedrooms,
      bathrooms: results[0].bathrooms,
      square_feet: results[0].square_feet,
      property_type: results[0].property_type,
      listing_type: results[0].listing_type,
      is_favorite: !!results[0].is_favorite,
      created_at: results[0].created_at,
      updated_at: results[0].updated_at,
      images: []
    };

    // Add images
    results.forEach(row => {
      if (row.property_image_id) {
        property.images.push({
          property_image_id: row.property_image_id,
          image: baseUrl + row.image
        });
      }
    });

    return res.status(200).json({
      success: true,
      data: property
    });
  });
});


// =========================
// UPDATE PROPERTY
// =========================
router.put('/update/:id', upload.array('images', 20), (req, res) => {
  const propertyId = req.params.id;

  const {
    title,
    location_city,
    location_state,
    price,
    bedrooms,
    bathrooms,
    square_feet,
    property_type,
    listing_type,
    is_favorite
  } = req.body;

  if (!title || price === undefined || price === null || price === '') {
    return res.status(400).json({
      success: false,
      message: 'Title and price are required'
    });
  }

  const favoriteValue =
    is_favorite === true ||
    is_favorite === 'true' ||
    is_favorite === 1 ||
    is_favorite === '1'
      ? 1
      : 0;

  db.beginTransaction((txErr) => {
    if (txErr) {
      return res.status(500).json({
        success: false,
        message: 'Could not start transaction',
        error: txErr
      });
    }

    const updateSql = `
      UPDATE properties SET
        title = ?,
        location_city = ?,
        location_state = ?,
        price = ?,
        bedrooms = ?,
        bathrooms = ?,
        square_feet = ?,
        property_type = ?,
        listing_type = ?,
        is_favorite = ?
      WHERE property_id = ?
    `;

    const updateValues = [
      title,
      location_city || null,
      location_state || null,
      price,
      bedrooms || null,
      bathrooms || null,
      square_feet || null,
      property_type || null,
      listing_type || null,
      favoriteValue,
      propertyId
    ];

    db.query(updateSql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        return db.rollback(() => {
          res.status(500).json({
            success: false,
            message: 'Error updating property',
            error: updateErr
          });
        });
      }

      if (updateResult.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({
            success: false,
            message: 'Property not found'
          });
        });
      }

      if (!req.files || req.files.length === 0) {
        return db.commit((commitErr) => {
          if (commitErr) {
            return db.rollback(() => {
              res.status(500).json({
                success: false,
                message: 'Commit failed',
                error: commitErr
              });
            });
          }

          res.status(200).json({
            success: true,
            message: 'Property updated successfully'
          });
        });
      }

      db.query(
        'SELECT image FROM property_image WHERE property_id = ?',
        [propertyId],
        (selectErr, oldImages) => {
          if (selectErr) {
            return db.rollback(() => {
              res.status(500).json({
                success: false,
                message: 'Failed to fetch old images',
                error: selectErr
              });
            });
          }

          db.query(
            'DELETE FROM property_image WHERE property_id = ?',
            [propertyId],
            (deleteErr) => {
              if (deleteErr) {
                return db.rollback(() => {
                  res.status(500).json({
                    success: false,
                    message: 'Failed to delete old image records',
                    error: deleteErr
                  });
                });
              }

              const imageValues = req.files.map(file => [propertyId, file.filename]);

              db.query(
                'INSERT INTO property_image (property_id, image) VALUES ?',
                [imageValues],
                (insertErr) => {
                  if (insertErr) {
                    return db.rollback(() => {
                      res.status(500).json({
                        success: false,
                        message: 'Failed to insert new images',
                        error: insertErr
                      });
                    });
                  }

                  db.commit((commitErr) => {
                    if (commitErr) {
                      return db.rollback(() => {
                        res.status(500).json({
                          success: false,
                          message: 'Commit failed',
                          error: commitErr
                        });
                      });
                    }

                    oldImages.forEach((img) => {
                      const filePath = path.join(__dirname, '..', 'uploads', 'properties', img.image);

                      fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                          console.log('Could not delete old image:', filePath, unlinkErr.message);
                        }
                      });
                    });

                    res.status(200).json({
                      success: true,
                      message: 'Property and images updated successfully'
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});


// =========================
// DELETE PROPERTY
// =========================
router.delete('/delete/:id', (req, res) => {
  const propertyId = req.params.id;

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Transaction error' });
    }

    db.query(
      'SELECT image FROM property_image WHERE property_id = ?',
      [propertyId],
      (selectErr, images) => {
        if (selectErr) {
          return db.rollback(() => {
            res.status(500).json({ success: false, message: 'Error fetching images' });
          });
        }

        db.query(
          'DELETE FROM properties WHERE property_id = ?',
          [propertyId],
          (deleteErr, result) => {
            if (deleteErr) {
              return db.rollback(() => {
                res.status(500).json({ success: false, message: 'Delete failed' });
              });
            }

            if (result.affectedRows === 0) {
              return db.rollback(() => {
                res.status(404).json({ success: false, message: 'Property not found' });
              });
            }

            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => {
                  res.status(500).json({ success: false, message: 'Commit failed' });
                });
              }

              // delete files AFTER commit
              images.forEach((img) => {
                const filePath = path.join(
                  __dirname,
                  '..',
                  'uploads',
                  'properties',
                  img.image
                );

                fs.unlink(filePath, () => {});
              });

              res.json({
                success: true,
                message: 'Property deleted successfully'
              });
            });
          }
        );
      }
    );
  });
});

module.exports = router;