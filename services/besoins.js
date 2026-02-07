const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/besoins.json");

exports.getAllBesoins = async () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

exports.addBesoin = async (besoin) => {
  console.log("Ajout d'un besoin:", besoin);
  const besoins = await this.getAllBesoins();
  
  // Générer un ID si absent
  if (!besoin.id) {
    besoin.id = `besoin-${Date.now()}`;
  }
  
  // Ajouter la date de création
  if (!besoin.date) {
    besoin.date = new Date().toISOString();
  }
  
  // Initialiser les votes à 0 si absent
  if (!besoin.votes) {
    besoin.votes = 0;
  }
  
  besoins.push(besoin);
  console.log("Besoin ajouté. Total:", besoins.length);
  fs.writeFileSync(filePath, JSON.stringify(besoins, null, 2));
  
  return besoin;
}

exports.deleteBesoin = async (id) => {
  console.log("Suppression du besoin:", id);
  try {
    const besoins = await this.getAllBesoins();
    const filteredBesoins = besoins.filter(b => b.id !== id);
    
    if (filteredBesoins.length < besoins.length) {
      fs.writeFileSync(filePath, JSON.stringify(filteredBesoins, null, 2));
      console.log("Besoin supprimé. Total:", filteredBesoins.length);
      return true;
    }
    
    console.log("Besoin non trouvé:", id);
    return false;
  } catch (error) {
    console.error("Erreur dans deleteBesoin:", error);
    return false;
  }
}

exports.voteForBesoin = async (id) => {
  console.log("Vote pour le besoin:", id);
  try {
    const besoins = await this.getAllBesoins();
    const besoin = besoins.find(b => b.id === id);
    
    if (besoin) {
      besoin.votes = (besoin.votes || 0) + 1;
      fs.writeFileSync(filePath, JSON.stringify(besoins, null, 2));
      return besoin;
    }
    
    return null;
  } catch (error) {
    console.error("Erreur dans voteForBesoin:", error);
    return null;
  }
}

exports.getStats = async () => {
  const besoins = await this.getAllBesoins();
  
  const stats = {
    total: besoins.length,
    votesTotal: besoins.reduce((sum, b) => sum + (b.votes || 0), 0),
    parUrgence: {
      haute: besoins.filter(b => b.urgence === 'haute').length,
      moyenne: besoins.filter(b => b.urgence === 'moyenne').length,
      basse: besoins.filter(b => b.urgence === 'basse').length
    },
    parType: {}
  };
  
  // Comptage par type
  besoins.forEach(b => {
    stats.parType[b.type] = (stats.parType[b.type] || 0) + 1;
  });
  
  return stats;
}
