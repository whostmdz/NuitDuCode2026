const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET || 'TerritoireConnecte-secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./services/auth')(passport, { callbackURL: '/auth/google/callback' });

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const auth = require('./services/auth');

// Middleware d'authentification
app.use((req, res, next) => {
  const publicPrefixes = ['/login', '/auth', '/logout', '/public'];
  const isPublic = publicPrefixes.some(p => req.path === p || req.path.startsWith(p));
  if (isPublic) return next();

  if (!(req.isAuthenticated && req.isAuthenticated())) {
    return res.redirect('/login');
  }

  if (auth.isEnabled() && !auth.isAllowed(req.user)) {
    return res.status(403).send('Accès refusé : votre compte n\'est pas autorisé.');
  }

  next();
});

// Logger
app.use((req, res, next) => {
	console.log(new Date().toISOString(), req.method, req.originalUrl);
	next();
});

// Routes
const pages = require('./routes/pages');
app.use('/', pages);

const projets = require('./routes/projets');
app.use('/projets', projets);

const besoins = require('./routes/besoins');
app.use('/besoins', besoins);

// Middleware de gestion d'erreurs global
const { errorHandler } = require('./services/errorHandler');
app.use(errorHandler);

app.listen(port, hostname, () => {
	console.info(`==> 🌍 Territoire Connecté tourne sur http://${hostname}:${port}/`);
});
