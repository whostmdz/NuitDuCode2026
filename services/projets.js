const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/projets.json");

exports.getAllProjets = async () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

exports.addProjet = async (projet) => {
  console.log("Ajout d'un projet:", projet);
  const projets = await this.getAllProjets();
  
  const projetExiste = projets.some(p => {
    if (p.id && projet.id) {
      return p.id === projet.id;
    }
    return false;
  });
  
  if (projetExiste) {
    console.log("Le projet existe déjà");
    const error = new Error("Ce projet existe déjà !");
    error.statusCode = 409;
    throw error;
  }
  
  // Générer un ID si absent
  if (!projet.id) {
    projet.id = `proj-${Date.now()}`;
  }
  
  projets.push(projet);
  console.log("Projet ajouté. Total:", projets.length);
  fs.writeFileSync(filePath, JSON.stringify(projets, null, 2));
}

exports.deleteProjet = async (id) => {
  console.log("Suppression du projet:", id);
  try {
    const projets = await this.getAllProjets();
    console.log("Total projets avant suppression:", projets.length);
    
    const filteredProjets = projets.filter(p => p.id !== id);
    
    if (filteredProjets.length < projets.length) {
      fs.writeFileSync(filePath, JSON.stringify(filteredProjets, null, 2));
      console.log("Projet supprimé. Total:", filteredProjets.length);
      return true;
    }
    
    console.log("Projet non trouvé:", id);
    return false;
  } catch (error) {
    console.error("Erreur dans deleteProjet:", error);
    return false;
  }
}

exports.getStats = async () => {
  const projets = await this.getAllProjets();
  
  const stats = {
    total: projets.length,
    montantTotal: projets.reduce((sum, p) => sum + (p.montant || 0), 0),
    termines: projets.filter(p => p.statut === 'termine').length,
    enCours: projets.filter(p => p.statut === 'en_cours').length,
    planifies: projets.filter(p => p.statut === 'planifie').length,
    parType: {}
  };
  
  // Comptage par type
  projets.forEach(p => {
    stats.parType[p.type] = (stats.parType[p.type] || 0) + 1;
  });
  
  return stats;
}
