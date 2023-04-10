var express = require('express');
var router = express.Router();
const uc = require('../controllers/usercontroller');
// Reititetään userscontrollerin metodeja
router.post('/register', uc.registerUser);
router.post('/login', uc.authenticateUser);
module.exports = router;
