var exp =require('express');

var UserRoue = require('../routes/user.route');


var router =exp.Router();


router.use('/auth', UserRoue);



module.exports = router;