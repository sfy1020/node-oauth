let express  = require('express');
let router   = express.Router();
let passport = require('../service/passportService');

router.get('/login', function(req,res){
  res.render('auth/login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

router.get( '/google/success', (req, res) => {
  res.redirect('/');
});

router.get( '/google/failure', (req, res) => {
  res.redirect('/logout');
});

module.exports = router;
