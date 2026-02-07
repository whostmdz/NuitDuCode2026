const path = require('path');
const express = require('express');
require('dotenv').config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = express();

app.use("/assets", express.static(path.join(__dirname, "views", "partials", "assets")));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Logger simple
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
