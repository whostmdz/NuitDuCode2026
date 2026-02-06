const GoogleStrategy = require('passport-google-oauth20').Strategy;

function parseCsv(s) {
  if (!s) return [];
  return s.split(',').map(x => x.trim()).filter(Boolean);
}

const allowedEmails = parseCsv(process.env.ALLOWED_USERS);
const allowedIds = parseCsv(process.env.ALLOWED_USER_IDS);

function isEnabled() {
  return allowedEmails.length > 0 || allowedIds.length > 0;
}

function getUserEmails(user) {
  if (!user) return [];
  if (Array.isArray(user.emails)) return user.emails.map(e => (e && e.value) || '').filter(Boolean);
  return [];
}

function isAllowed(user) {
  if (!isEnabled()) return true;
  if (!user) return false;
  
  const id = user.id || (user.profile && user.profile.id) || '';
  if (id && allowedIds.includes(id)) return true;
  
  const emails = getUserEmails(user);
  for (const e of emails) {
    if (allowedEmails.includes(e)) return true;
  }
  return false;
}

function setupPassport(passport, options = {}) {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: options.callbackURL || '/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  ));

  passport.serializeUser(function (user, done) {
    try {
      const safeUser = {
        id: user.id || (user.profile && user.profile.id) || null,
        displayName: user.displayName || (user.profile && user.profile.displayName) || '',
        emails: user.emails || (user.profile && user.profile.emails) || []
      };
      done(null, safeUser);
    } catch (err) {
      done(err);
    }
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
}

module.exports = setupPassport;
module.exports.isEnabled = isEnabled;
module.exports.isAllowed = isAllowed;
