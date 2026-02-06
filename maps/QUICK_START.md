# 🚀 DÉMARRAGE ULTRA-RAPIDE

## Pour commencer MAINTENANT (sans lire le README)

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer l'application
```bash
npm start
```

### 3. Ouvrir dans le navigateur
```
http://localhost:3000
```

**C'EST TOUT !** L'authentification Google est désactivée par défaut.

---

## 🎯 Ce que vous devez savoir

### Structure simple :
- **`data/`** = Vos données (projets + besoins)
- **`views/`** = Vos pages HTML
- **`public/css/`** = Vos styles
- **`public/js/`** = Votre JavaScript frontend

### Pour modifier les données mockées :
1. Ouvrir `data/projets.json`
2. Ouvrir `data/besoins.json`
3. Modifier le JSON (attention à la syntaxe !)
4. Relancer le serveur (Ctrl+C puis `npm start`)

### Pour changer les couleurs :
Ouvrir `public/css/style.css` et modifier les variables en haut :
```css
--primary-color: #00a651;  /* Vert principal */
--accent-color: #ff6b35;   /* Orange pour besoins */
```

### Les 3 pages principales :
1. **Dashboard** (`/`) - Statistiques et graphiques
2. **Carte** (`/carte`) - Vue géographique
3. **Soumettre un besoin** (`/soumettre-besoin`) - Formulaire

---

## ⚡ Commandes utiles

```bash
# Démarrer
npm start

# Arrêter
Ctrl + C

# Voir les logs
# (déjà visibles dans le terminal)
```

---

## 🐛 Problème ?

**Erreur "Port 3000 already in use"**
→ Changer le port dans `.env` : `PORT=3001`

**La carte ne s'affiche pas**
→ Vérifier que vous avez internet (tuiles chargées en ligne)

**Les graphiques ne s'affichent pas**
→ Ouvrir la console (F12) et vérifier les erreurs

---

## 📞 Qui fait quoi ce soir ?

Voir le README.md section "Répartition des tâches"

BON COURAGE ! 🎉
