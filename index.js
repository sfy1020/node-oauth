const express   = require('express');
const app       = express();
const passport  = require('passport');
const session   = require('express-session');

app.set('view engine', 'ejs');
app.use(session({secret:'SecretTest', resave: false, saveUninitialized:true}));

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));
app.use('/token', require('./routes/token'));

// Port setting
const port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
