const express = require('express');
const router = express.Router();
const serviceBesoins = require('../services/besoins');
const { asyncHandler } = require('../services/errorHandler');

// Liste tous les besoins
router.get('/', asyncHandler(async function (req, res, next) {
    console.log("Route: besoins, list");
    const besoins = await serviceBesoins.getAllBesoins();
    res.json(besoins);
}));

// Récupère les statistiques
router.get('/stats', asyncHandler(async function (req, res, next) {
    console.log("Route: besoins, stats");
    const stats = await serviceBesoins.getStats();
    res.json(stats);
}));

// Ajoute un besoin
router.post('/add', asyncHandler(async function (req, res, next) {
    console.log("Route: besoins, add");
    const besoin = await serviceBesoins.addBesoin(req.body);
    res.json({ 
        message: "Besoin ajouté avec succès", 
        success: true,
        besoin: besoin
    });
}));

// Vote pour un besoin
router.post('/vote', asyncHandler(async function (req, res, next) {
    console.log("Route: besoins, vote");
    const { id } = req.body;
    
    if (!id) {
        const error = new Error("ID manquant");
        error.statusCode = 400;
        throw error;
    }
    
    const besoin = await serviceBesoins.voteForBesoin(id);
    
    if (besoin) {
        res.json({ 
            message: "Vote enregistré", 
            success: true,
            votes: besoin.votes
        });
    } else {
        res.status(404).json({ 
            message: "Besoin non trouvé", 
            success: false
        });
    }
}));

// Supprime un besoin
router.post('/delete', asyncHandler(async function (req, res, next) {
    console.log("Route: besoins, delete");
    const { id } = req.body;
    
    if (!id) {
        const error = new Error("ID manquant");
        error.statusCode = 400;
        throw error;
    }
    
    const success = await serviceBesoins.deleteBesoin(id);
    res.json({ 
        message: success ? "Besoin supprimé" : "Besoin non trouvé", 
        success 
    });
}));

module.exports = router;
