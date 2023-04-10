const express = require('express');
const authorize = require('../verifytoken');
// eslint-disable-next-line new-cap
const router = express.Router();
const sc = require('../controllers/studentcontroller');
//localhost:3000/students
router.get('/', sc.findAll);
router.get('/findbelowlimit/:id', sc.findBelowLimit);
router.get('/findbycourse/:id', sc.findByCourse);
//localhost:3000/students/updategrade/h1234/HTS10600
router.get('/:id', sc.findById);
router.get('/:id', sc.findByStudentcode);
router.post('/', authorize, sc.add);
router.delete('/:id', authorize, sc.delete);
router.put('/updategrade/:scode/:ccode', authorize, sc.updateGrade);
router.put('/:id', authorize, sc.updateStudent);
router.put('/addgrade/:id', authorize, sc.addGrade);
module.exports = router;
