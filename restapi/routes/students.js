const express = require('express');

const router = express.Router();
const sc = require('../controllers/studentcontroller');
//localhost:3000/students
router.get('/', sc.findAll);
router.get('/findbelowlimit/:id', sc.findBelowLimit);
router.get('/findbycourse/:id', sc.findByCourse);
//localhost:3000/students/updategrade/h1234/HTS10600
router.get('/:id', sc.findById);
router.get('/:id', sc.findByStudentcode);
router.post('/', sc.add);
router.delete('/:id', sc.delete);
router.put('/updategrade/:scode/:ccode', sc.updateGrade);
router.put('/updatestudent/:scode', sc.updateStudent);
router.put('/addgrade/:id', sc.addGrade);
module.exports = router;
