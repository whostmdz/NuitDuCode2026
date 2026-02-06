# 🌍 Territoire Connecté

**Plateforme d'impact local - La Nuit Du Code 2026 × Crédit Agricole**

Rendre l'impact local visible : connecter citoyens, projets et besoins du territoire.

---

## 🚀 Démarrage Rapide

### 1. Installation

```bash
npm install
```

### 2. Configuration Google OAuth (OPTIONNEL - pour l'authentification)

Si vous voulez activer l'authentification Google :

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet
3. Activer Google+ API
4. Créer des identifiants OAuth 2.0
5. Ajouter `http://localhost:3000/auth/google/callback` dans les URIs de redirection autorisées
6. Copier Client ID et Client Secret dans le fichier `.env`

**IMPORTANT:** Pour gagner du temps, vous pouvez **désactiver l'authentification** en laissant les champs Google vides dans `.env`. L'application fonctionnera sans login.

### 3. Lancement

```bash
npm start
```

Ouvrir : **http://localhost:3000**

---

## 📁 Structure du Projet

```
territoire-connecte/
├── app.js                 # Point d'entrée
├── package.json           # Dépendances
├── .env                   # Configuration
├── data/                  # Données JSON
│   ├── projets.json       # Projets financés
│   └── besoins.json       # Besoins du territoire
├── services/              # Logique métier
│   ├── auth.js
│   ├── errorHandler.js
│   ├── projets.js
│   └── besoins.js
├── routes/                # Routes API
│   ├── auth.js
│   ├── pages.js
│   ├── projets.js
│   └── besoins.js
├── views/                 # Templates EJS
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── carte.ejs
│   ├── soumettre-besoin.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── public/                # Fichiers statiques
    ├── css/
    │   └── style.css
    └── js/
        ├── dashboard.js
        ├── carte.js
        └── soumettre-besoin.js
```

---

## 🎯 Fonctionnalités

### ✅ EXIGENCE 1 - RENDRE VISIBLE
- **Dashboard** avec statistiques en temps réel
- Graphiques des projets par type (Doughnut Chart)
- Timeline des derniers projets financés
- Montants investis et impacts mesurés

### ✅ EXIGENCE 2 - CONNAÎTRE LES BESOINS
- **Formulaire de soumission** de besoins
- Sélection interactive sur carte (Leaflet)
- Catégorisation (commerce, social, environnement, culture, etc.)
- Système de votes pour prioriser

### ✅ EXIGENCE 3 - VOIR L'IMPACT
- **Carte interactive** (Leaflet.js)
- Visualisation projets (vert) et besoins (orange)
- Filtres dynamiques (tout / projets / besoins)
- Panels d'information détaillés
- Géolocalisation réelle (Montpellier)

---

## 🎨 Technologies Utilisées

**Backend:**
- Node.js + Express
- EJS (templating)
- Passport.js (OAuth Google)
- JSON pour la persistance

**Frontend:**
- HTML5 / CSS3 vanilla
- JavaScript vanilla (aucun framework)
- Leaflet.js (cartes interactives)
- Chart.js (graphiques)

**Pourquoi ce stack ?**
- ✅ Rapide à mettre en place (9h)
- ✅ Pas de build complexe
- ✅ Performance optimale
- ✅ Code compréhensible

---

## 👥 Répartition des Tâches (5 Personnes)

### Personne 1 - Backend + Coordination
- [x] Structure backend (app.js, routes, services)
- [x] Gestion des données JSON
- [x] API REST (/projets, /besoins)
- [ ] Intégration finale
- [ ] Préparation de la démo

### Personne 2 - Dashboard
- [ ] Page dashboard.ejs
- [ ] Graphiques Chart.js
- [ ] Stats en temps réel
- [ ] Timeline des projets

### Personne 3 - Carte Interactive
- [ ] Page carte.ejs
- [ ] Intégration Leaflet.js
- [ ] Marqueurs projets/besoins
- [ ] Filtres et interactions

### Personne 4 - Formulaire Besoins
- [ ] Page soumettre-besoin.ejs
- [ ] Formulaire avec validation
- [ ] Sélection de position sur carte
- [ ] Soumission AJAX

### Personne 5 - Design & UX
- [ ] CSS global (style.css)
- [ ] Design system (couleurs, typo)
- [ ] Responsive design
- [ ] Animations et micro-interactions
- [ ] Support sur toutes les pages

---

## 📊 Données Mockées

### Projets (8 exemples)
- Boulangerie Bio du Centre (15 000€, terminé)
- Espace de Coworking Solidaire (45 000€, en cours)
- Jardin Partagé Antigone (8 000€, terminé)
- Bibliothèque Mobile (25 000€, en cours)
- Épicerie Solidaire Figuerolles (18 000€, terminé)
- Atelier Vélo Participatif (12 000€, planifié)
- Soutien Scolaire Numérique (9 500€, terminé)
- Composteur Collectif (3 500€, en cours)

### Besoins (10 exemples)
- Librairie indépendante (87 votes, haute urgence)
- Crèche associative (134 votes, haute urgence)
- Piste cyclable sécurisée (156 votes, haute urgence)
- Cinéma de quartier (62 votes, moyenne urgence)
- Maraude sociale mobile (98 votes, haute urgence)
- Marché de producteurs (73 votes, moyenne urgence)
- Cours de français (45 votes, moyenne urgence)
- Fontaine à eau (51 votes, basse urgence)
- Terrain de basket (112 votes, moyenne urgence)
- Fresque murale (38 votes, basse urgence)

**Toutes les données sont géolocalisées à Montpellier.**

---

## 🎤 Préparation de la Présentation (4 minutes)

### Structure recommandée:

**Slide 1 - Le Problème (30s)**
> "Votre territoire bouge. Des projets naissent, des commerces sont soutenus.
> Mais personne ne le voit. Il n'existe aucun outil pour raconter cet impact."

**Slide 2 - Notre Solution (30s)**
> "Territoire Connecté : la plateforme qui rend l'impact local visible.
> 3 fonctionnalités clés en une seule application."

**Démo Live (2min30)**
1. Dashboard (30s) : "Voici l'impact en chiffres : X€ investis, Y projets terminés"
2. Carte (1min) : "Chaque point vert = un projet réalisé. Chaque point orange = un besoin"
   - Cliquer sur un projet terminé
   - Cliquer sur un besoin urgent
3. Soumettre un besoin (1min) : "N'importe quel citoyen peut signaler un besoin"
   - Remplir le formulaire
   - Cliquer sur la carte
   - Soumettre

**Slide 3 - Impact (30s)**
> "Notre plateforme connecte 3 acteurs : citoyens, projets locaux, territoire.
> Elle transforme les données en action concrète."

**Questions (1min)**

---

## 💡 Conseils pour la Nuit

### Priorités (ordre d'importance)
1. ✅ **Données mockées crédibles** → Déjà fait !
2. ⚡ **Démo fluide** → Testez la démo 10 fois
3. 🎨 **Design propre** → Cohérence visuelle
4. 🚀 **Histoire captivante** → Racontez l'impact

### Ce qui impressionne le jury
- ✅ Authentification Google (déjà intégrée)
- ✅ Vraie carte interactive (Leaflet)
- ✅ Données géolocalisées réelles
- ✅ Design moderne et épuré
- ✅ Histoire émotionnelle

### Ce qui ne compte PAS
- ❌ Complexité technique
- ❌ Nombre de lignes de code
- ❌ Frameworks à la mode

### En cas de bug en démo
> "Pas de panique ! On a une alternative..."
Toujours avoir un plan B (screenshots, vidéo).

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier que Node.js est installé
node --version

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### La carte ne s'affiche pas
- Vérifier la connexion internet (Leaflet charge les tuiles en ligne)
- Ouvrir la console (F12) pour voir les erreurs

### L'authentification Google ne fonctionne pas
- Laisser les champs vides dans `.env` pour désactiver
- Ou configurer correctement les OAuth credentials

### Les données ne se chargent pas
- Vérifier que `data/projets.json` et `data/besoins.json` existent
- Vérifier la syntaxe JSON (pas de virgule en trop)

---

## 🏆 Points Bonus pour le Jury

- **Nom de projet accrocheur** : "Territoire Connecté"
- **Slogan impactant** : "Rendre l'impact local visible"
- **Vraies données géographiques** : Montpellier
- **Authentification pro** : Google OAuth
- **Code propre et commenté** : Architecture claire

---

## 📝 Checklist Finale (avant la démo)

- [ ] Serveur lancé et accessible
- [ ] Données chargées correctement
- [ ] Les 3 pages fonctionnent (dashboard, carte, formulaire)
- [ ] Graphiques s'affichent
- [ ] Carte interactive fonctionne
- [ ] Formulaire de besoin fonctionnel
- [ ] Design cohérent sur toutes les pages
- [ ] Démo chronométrée (max 3min)
- [ ] Slides préparés (3-4 max)
- [ ] Histoire claire et impactante

---

## 🎉 Bonne chance !

Vous avez tous les outils pour créer quelque chose d'exceptionnel.
**Concentrez-vous sur l'histoire et l'impact, pas sur la technique.**

*L'équipe Territoire Connecté*
