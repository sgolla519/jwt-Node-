var exp =require('express');

var UserCtrl = require('../controllers/user.controller');


var router =exp.Router();


router.post('/create', UserCtrl.create);

router.post('/login', UserCtrl.login);

router.get('/token', UserCtrl.verifyToken);



module.exports = router;