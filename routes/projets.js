const express = require('express');
const router = express.Router();
const serviceProjets = require('../services/projets');
const { asyncHandler } = require('../services/errorHandler');

// Liste tous les projets
router.get('/', asyncHandler(async function (req, res, next) {
    console.log("Route: projets, list");
    const projets = await serviceProjets.getAllProjets();
    res.json(projets);
}));

// Récupère les statistiques
router.get('/stats', asyncHandler(async function (req, res, next) {
    console.log("Route: projets, stats");
    const stats = await serviceProjets.getStats();
    res.json(stats);
}));

// Ajoute un projet
router.post('/add', asyncHandler(async function (req, res, next) {
    console.log("Route: projets, add");
    await serviceProjets.addProjet(req.body);
    res.json({ message: "Projet ajouté avec succès", success: true });
}));

// Supprime un projet
router.post('/delete', asyncHandler(async function (req, res, next) {
    console.log("Route: projets, delete");
    const { id } = req.body;
    
    if (!id) {
        const error = new Error("ID manquant");
        error.statusCode = 400;
        throw error;
    }
    
    const success = await serviceProjets.deleteProjet(id);
    res.json({ 
        message: success ? "Projet supprimé" : "Projet non trouvé", 
        success 
    });
}));

module.exports = router;
