// Chargement des données au démarrage
document.addEventListener('DOMContentLoaded', async () => {
    await loadStats();
    await loadCharts();
    await loadTimeline();
    await loadTopBesoins();
});

// Charger les statistiques
async function loadStats() {
    try {
        const [projetsStats, besoinsStats] = await Promise.all([
            fetch('/projets/stats').then(r => r.json()),
            fetch('/besoins/stats').then(r => r.json())
        ]);
        
        // Afficher les stats
        document.getElementById('montantTotal').textContent = 
            formatMontant(projetsStats.montantTotal);
        document.getElementById('projetsTermines').textContent = 
            projetsStats.termines;
        document.getElementById('projetsEnCours').textContent = 
            projetsStats.enCours;
        document.getElementById('besoinsTotal').textContent = 
            besoinsStats.total;
            
    } catch (error) {
        console.error('Erreur lors du chargement des stats:', error);
    }
}

// Charger les graphiques
async function loadCharts() {
    try {
        const [projetsStats, besoinsStats] = await Promise.all([
            fetch('/projets/stats').then(r => r.json()),
            fetch('/besoins/stats').then(r => r.json())
        ]);
        
        // Graphique des projets par type
        const projetsCtx = document.getElementById('projetsParTypeChart');
        new Chart(projetsCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(projetsStats.parType),
                datasets: [{
                    data: Object.values(projetsStats.parType),
                    backgroundColor: [
                        '#00a651',
                        '#2c5f2d',
                        '#ff6b35',
                        '#4ecdc4',
                        '#ffe66d',
                        '#a8dadc'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
        // Graphique des besoins par type
        const besoinsCtx = document.getElementById('besoinsParTypeChart');
        new Chart(besoinsCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(besoinsStats.parType),
                datasets: [{
                    label: 'Nombre de besoins',
                    data: Object.values(besoinsStats.parType),
                    backgroundColor: '#ff6b35'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Erreur lors du chargement des graphiques:', error);
    }
}

// Charger la timeline des projets
async function loadTimeline() {
    try {
        const projets = await fetch('/projets').then(r => r.json());
        
        // Trier par date (plus récents en premier)
        const projetsTries = projets
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5); // Les 5 derniers
        
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = projetsTries.map(projet => `
            <div class="timeline-item">
                <div class="timeline-date">${formatDate(projet.date)}</div>
                <div class="timeline-title">${projet.nom}</div>
                <div class="timeline-description">
                    ${projet.description} - ${formatMontant(projet.montant)}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erreur lors du chargement de la timeline:', error);
    }
}

// Charger les besoins les plus votés
async function loadTopBesoins() {
    try {
        const besoins = await fetch('/besoins').then(r => r.json());
        
        // Trier par nombre de votes (plus votés en premier)
        const topBesoins = besoins
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 5);
        
        const container = document.getElementById('topBesoins');
        container.innerHTML = topBesoins.map(besoin => `
            <div class="besoin-card ${besoin.urgence === 'haute' ? 'urgence-haute' : ''}">
                <div class="besoin-info">
                    <h3>${besoin.titre}</h3>
                    <div class="besoin-meta">
                        <span>📍 ${besoin.adresse || 'Localisation non précisée'}</span>
                        <span>🏷️ ${besoin.type}</span>
                    </div>
                </div>
                <div class="besoin-votes">
                    <span>👍</span>
                    <span>${besoin.votes}</span>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erreur lors du chargement des besoins:', error);
    }
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
