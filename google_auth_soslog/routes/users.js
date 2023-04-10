const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const uc = require('../controllers/usercontroller');
router.post('/register', uc.registerUser);
router.post('/login', uc.authenticateUser);

module.exports = router;
