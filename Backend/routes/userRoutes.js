const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer'); // Import the multer config

// Route to get user profile
router.get('/profile', userController.profile);

// Route to edit user profile
// Use the upload middleware to handle the file upload and profile update
router.post('/update-profile', upload.single('profileImage'), userController.profileEdit);

module.exports = router;
