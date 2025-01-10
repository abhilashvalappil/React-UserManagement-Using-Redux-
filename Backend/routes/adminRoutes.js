const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
// const  authenticateJWT =  require( '../middlewares/authentication')

// router.use(authenticateJWT);


router.get('/getusers',adminController.fetchUser)

module.exports = router;