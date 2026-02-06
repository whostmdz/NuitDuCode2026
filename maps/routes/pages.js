const express = require('express');
const router = express.Router();

router.get('/', async function (req, res, next) {
    console.log("Route: pages, dashboard");
    res.render('dashboard', { 
        title: "Territoire Connecté",
        user: req.user || {}
    });
});

router.get('/login', async function (req, res, next) {
    console.log("Route: pages, login");
    res.render('login', { 
        title: "Connexion - Territoire Connecté"
    });
});

router.get('/carte', async function (req, res, next) {
    console.log("Route: pages, carte");
    res.render('carte', { 
        title: "Carte Interactive",
        user: req.user || {}
    });
});

router.get('/soumettre-besoin', async function (req, res, next) {
    console.log("Route: pages, soumettre-besoin");
    res.render('soumettre-besoin', { 
        title: "Soumettre un Besoin",
        user: req.user || {}
    });
});

module.exports = router;
