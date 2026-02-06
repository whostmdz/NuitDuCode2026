// Gestion des onglets
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        // Reset
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // Active
        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});


// Récupération du formulaire
const form = document.getElementById("clientForm");

form.addEventListener("submit", function (e) {

    e.preventDefault(); // Bloque l'envoi classique

    const formData = new FormData(form);

    const data = {};

    // Transforme en objet JS
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Organisation propre
    const result = {

        client: {
            raison_sociale: data.raison_sociale,
            type_commerce: data.type_commerce,
            besoins: data.besoins,
            lieu: data.lieu,
            chiffre_affaires: Number(data.chiffre_affaires),
            arguments: data.arguments
        },

        financement: {
            tranche1: {
                montant: Number(data.tranche1_montant),
                date: data.tranche1_date
            },

            tranche2: {
                montant: Number(data.tranche2_montant),
                date: data.tranche2_date
            },

            tranche3: {
                montant: Number(data.tranche3_montant),
                date: data.tranche3_date
            }
        }

    };

    // Conversion JSON
    const jsonData = JSON.stringify(result, null, 2);

    console.log("Données JSON :");
    console.log(jsonData);

    // Optionnel : alerte
    alert("Formulaire envoyé ! Voir console (F12)");
});

// Sélection des boutons du menu
const menuButtons = document.querySelectorAll("#menu .list-group-item");
const sections = document.querySelectorAll(".content-section");

// Fonction de changement de section
menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Retirer active sur tous les boutons
        menuButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Masquer toutes les sections
        sections.forEach(sec => sec.classList.add("d-none"));

        // Afficher la section ciblée
        const targetId = btn.getAttribute("data-target");
        document.getElementById(targetId).classList.remove("d-none");
    });
});