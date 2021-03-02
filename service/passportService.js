const passport         = require('passport');
const GoogleStrategy   = require('passport-google-oauth2').Strategy;
let config = require('../config/google.json');
let db = require('./db/dbService');


passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID      : config.web.client_id,
    clientSecret  : config.web.client_secret,
    callbackURL   : config.web.redirect_uris[0],
    passReqToCallback   : true
    }, 
    async function(request, accessToken, refreshToken, profile, done){
    let log = {accessToken, refreshToken, profile}
    console.log('Google Log:', accessToken, refreshToken, profile);
    console.log('profile: ', profile);
    
    let user = profile;
    await saveUser(user, 'google');

    done(null, user);
  }
));

async function saveUser(user, type){
    if(user && user.email){
        let id = user.email;
        let dbInfo = await db.getUser(id);
        let userValue = getUserValue(user, type);
        console.log('dbinfo',dbInfo);

        if(dbInfo){
            await db.updateUser(id, userValue);
        } else {
            await db.setUser(id, userValue);
        }
    }
}

function getUserValue(user, type){
    return {
        displayName: user.displayName ? user.displayName : 'none',
        updateTime: new Date(),
        type: type ? type : 'google'
    }
}

module.exports = passport;
