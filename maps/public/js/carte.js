let map;
let projetsLayer;
let besoinsLayer;
let allMarkers = {
    projets: [],
    besoins: []
};

// Initialisation de la carte
document.addEventListener('DOMContentLoaded', async () => {
    // Centrer sur Montpellier
    map = L.map('map').setView([43.6108, 3.8767], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Créer les layers
    projetsLayer = L.layerGroup().addTo(map);
    besoinsLayer = L.layerGroup().addTo(map);
    
    // Charger les données
    await loadProjets();
    await loadBesoins();
    
    // Gérer les filtres
    setupFilters();
});

// Charger les projets
async function loadProjets() {
    try {
        const projets = await fetch('/projets').then(r => r.json());
        
        projets.forEach(projet => {
            const marker = L.circleMarker([projet.lat, projet.lon], {
                radius: 10,
                fillColor: '#00a651',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
            
            marker.on('click', () => showProjetInfo(projet));
            marker.addTo(projetsLayer);
            allMarkers.projets.push(marker);
        });
        
    } catch (error) {
        console.error('Erreur chargement projets:', error);
    }
}

// Charger les besoins
async function loadBesoins() {
    try {
        const besoins = await fetch('/besoins').then(r => r.json());
        
        besoins.forEach(besoin => {
            const marker = L.circleMarker([besoin.lat, besoin.lon], {
                radius: 8,
                fillColor: '#ff6b35',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
            
            marker.on('click', () => showBesoinInfo(besoin));
            marker.addTo(besoinsLayer);
            allMarkers.besoins.push(marker);
        });
        
    } catch (error) {
        console.error('Erreur chargement besoins:', error);
    }
}

// Afficher info projet
function showProjetInfo(projet) {
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    
    const statutColors = {
        'termine': '#00a651',
        'en_cours': '#ff6b35',
        'planifie': '#4ecdc4'
    };
    
    const statutLabels = {
        'termine': 'Terminé',
        'en_cours': 'En cours',
        'planifie': 'Planifié'
    };
    
    content.innerHTML = `
        <h2 style="color: #00a651; margin-bottom: 1rem;">${projet.nom}</h2>
        
        <div style="display: inline-block; padding: 0.25rem 0.75rem; background: ${statutColors[projet.statut]}; color: white; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1rem;">
            ${statutLabels[projet.statut]}
        </div>
        
        <p style="margin-bottom: 1rem; line-height: 1.6;">
            ${projet.description}
        </p>
        
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <div style="margin-bottom: 0.5rem;">
                <strong>💰 Budget:</strong> ${formatMontant(projet.montant)}
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>📅 Date:</strong> ${formatDate(projet.date)}
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>🏷️ Type:</strong> ${projet.type}
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>📍 Adresse:</strong> ${projet.adresse}
            </div>
            <div>
                <strong>👤 Porteur:</strong> ${projet.porteur}
            </div>
        </div>
        
        <div style="padding: 1rem; background: #e8f5e9; border-left: 4px solid #00a651; border-radius: 4px;">
            <strong>Impact:</strong><br>
            ${projet.impact}
        </div>
    `;
    
    panel.classList.remove('hidden');
}

// Afficher info besoin
function showBesoinInfo(besoin) {
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    
    const urgenceColors = {
        'haute': '#ff6b35',
        'moyenne': '#ff9f1c',
        'basse': '#4ecdc4'
    };
    
    const urgenceLabels = {
        'haute': 'Urgence haute',
        'moyenne': 'Urgence moyenne',
        'basse': 'Urgence basse'
    };
    
    content.innerHTML = `
        <h2 style="color: #ff6b35; margin-bottom: 1rem;">${besoin.titre}</h2>
        
        <div style="display: inline-block; padding: 0.25rem 0.75rem; background: ${urgenceColors[besoin.urgence]}; color: white; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1rem;">
            ${urgenceLabels[besoin.urgence]}
        </div>
        
        <p style="margin-bottom: 1rem; line-height: 1.6;">
            ${besoin.description}
        </p>
        
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <div style="margin-bottom: 0.5rem;">
                <strong>🏷️ Type:</strong> ${besoin.type}
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>📍 Adresse:</strong> ${besoin.adresse}
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>📅 Date:</strong> ${formatDate(besoin.date)}
            </div>
            <div>
                <strong>👤 Auteur:</strong> ${besoin.auteur}
            </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #fff3e0; border-radius: 8px;">
            <div>
                <strong style="font-size: 1.2rem;">${besoin.votes}</strong> votes
            </div>
            <button onclick="voterPourBesoin('${besoin.id}')" style="padding: 0.5rem 1.5rem; background: #ff6b35; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                👍 Voter
            </button>
        </div>
    `;
    
    panel.classList.remove('hidden');
}

// Voter pour un besoin
async function voterPourBesoin(id) {
    try {
        const response = await fetch('/besoins/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Votre vote a été enregistré !');
            // Recharger les besoins
            besoinsLayer.clearLayers();
            allMarkers.besoins = [];
            await loadBesoins();
        }
    } catch (error) {
        console.error('Erreur lors du vote:', error);
        alert('❌ Erreur lors du vote');
    }
}

// Fermer le panel d'info
function closeInfoPanel() {
    document.getElementById('info-panel').classList.add('hidden');
}

// Gérer les filtres
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter active au bouton cliqué
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            if (filter === 'all') {
                map.addLayer(projetsLayer);
                map.addLayer(besoinsLayer);
            } else if (filter === 'projets') {
                map.addLayer(projetsLayer);
                map.removeLayer(besoinsLayer);
            } else if (filter === 'besoins') {
                map.removeLayer(projetsLayer);
                map.addLayer(besoinsLayer);
            }
        });
    });
}

// Utilitaires
function formatMontant(montant) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(montant);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}
