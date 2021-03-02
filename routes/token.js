let express  = require('express');
let router   = express.Router();
let accountService = require('../service/accountService');
const constants = require('../lib/constants');

router.post('/signIn/:id', function(req,res){
  return accountService.signin(req, res);
});

router.get('/valid', accountService.verifyToken, function(req, res) {
  console.log('valid', req.id);
  res.status(constants.statusCode.SUCCESS).send({id: req.id});
});


module.exports = router;
