const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // You can remove this route later if needed
router.post('/login', login);

module.exports = router;
