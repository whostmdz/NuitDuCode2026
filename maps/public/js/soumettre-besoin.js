let map;
let marker;
let selectedLat = null;
let selectedLon = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupForm();
});

// Initialiser la carte
function initMap() {
    // Centrer sur Montpellier
    map = L.map('mapPicker').setView([43.6108, 3.8767], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Clic sur la carte pour placer le marqueur
    map.on('click', async (e) => {
        selectedLat = e.latlng.lat;
        selectedLon = e.latlng.lng;
        
        // Retirer l'ancien marqueur s'il existe
        if (marker) {
            map.removeLayer(marker);
        }
        
        // Ajouter le nouveau marqueur
        marker = L.marker([selectedLat, selectedLon]).addTo(map);
        
        // Mettre à jour les champs cachés
        document.getElementById('lat').value = selectedLat;
        document.getElementById('lon').value = selectedLon;
        
        // Géocodage inversé (optionnel - afficher l'adresse approximative)
        await reverseGeocode(selectedLat, selectedLon);
    });
}

// Géocodage inversé pour afficher l'adresse
async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        
        const addressDiv = document.getElementById('addressDisplay');
        addressDiv.textContent = `📍 ${data.display_name}`;
        addressDiv.style.display = 'block';
    } catch (error) {
        console.error('Erreur géocodage:', error);
    }
}

// Configuration du formulaire
function setupForm() {
    const form = document.getElementById('besoinForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Vérifier que la localisation est définie
        if (!selectedLat || !selectedLon) {
            alert('⚠️ Veuillez sélectionner une position sur la carte');
            return;
        }
        
        // Récupérer les données du formulaire
        const besoin = {
            type: document.getElementById('type').value,
            titre: document.getElementById('titre').value,
            description: document.getElementById('description').value,
            urgence: document.getElementById('urgence').value,
            auteur: document.getElementById('auteur').value || 'Anonyme',
            lat: parseFloat(selectedLat),
            lon: parseFloat(selectedLon)
        };
        
        try {
            const response = await fetch('/besoins/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(besoin)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Masquer le formulaire
                form.style.display = 'none';
                
                // Afficher le message de succès
                document.getElementById('successMessage').classList.remove('hidden');
            } else {
                alert('❌ Erreur lors de la soumission du besoin');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Erreur lors de la soumission du besoin');
        }
    });
}
