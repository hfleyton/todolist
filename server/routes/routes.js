const { Router } = require('express');
const router = Router();
const authenticate = require('../config/authenticate');

router.post('/createtarea', require('../controllers/createTarea.controller'));
router.post('/deletetarea' , require('../controllers/deleteTarea.controller'))
router.post('/updatetarea' , require('../controllers/updateTarea.controller'))
router.post('/readtareas' , require('../controllers/readTareas.controller'))
router.post('/createuser',require('../controllers/createUser.controller'));
router.post('/loginUser' , require('../controllers/loginUser.controller'))

module.exports = router;

