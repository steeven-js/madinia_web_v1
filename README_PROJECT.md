# 🚀 Madinia Web v1 - Projet de Départ

> Projet Laravel + React base propre pour la refonte complète du site web Madinia

## 📋 Description

Ce projet est un **template de départ prêt à l'emploi** pour créer le nouveau site web Madinia from scratch. Il contient une architecture moderne et complète avec tous les outils nécessaires pour démarrer rapidement.

## 🛠️ Stack Technique

### Backend
- **Laravel 12** - Framework PHP moderne
- **Inertia.js** - SPA sans API REST
- **SQLite/PostgreSQL** - Base de données

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - JavaScript typé
- **Material-UI (MUI)** - Design system complet
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation côté client

### Features Incluses
- ✅ **Hero Career Landing** avec navbar blanche sur fond noir
- ✅ **Système de thème MUI** complet (light/dark mode)
- ✅ **Illustrations animées** avec parallax effect
- ✅ **Components réutilisables** (CountrySelect, SvgColor, Iconify, etc.)
- ✅ **Authentication** avec Laravel Fortify
- ✅ **TypeScript** configuré avec types stricts
- ✅ **Linting & Formatting** (ESLint + Prettier)

## 📁 Structure

```
madinia_web/
├── app/                      # Laravel backend
│   ├── Models/              # Modèles Eloquent
│   ├── Http/Controllers/    # Contrôleurs
│   └── Mail/                # Templates email
├── resources/
│   ├── js/                  # Code React/TypeScript
│   │   ├── components/      # Composants réutilisables
│   │   ├── layouts/         # Layouts (header, footer, etc.)
│   │   ├── pages/           # Pages Inertia
│   │   ├── sections/        # Sections de pages
│   │   ├── theme/           # Configuration MUI
│   │   └── routing/         # Navigation
│   └── css/                 # Styles globaux
├── public/
│   └── assets/              # Images, icônes, fonts
├── database/                # Migrations & seeders
└── docs/                    # Documentation

```

## 🚀 Installation

```bash
# 1. Cloner le projet (déjà fait si vous lisez ceci)
cd madinia_web

# 2. Installer les dépendances PHP
composer install

# 3. Installer les dépendances JavaScript
npm install

# 4. Copier le fichier d'environnement
cp .env.example .env

# 5. Générer la clé d'application
php artisan key:generate

# 6. Créer la base de données (SQLite par défaut)
touch database/database.sqlite

# 7. Lancer les migrations
php artisan migrate

# 8. Démarrer le serveur de développement
composer run dev
```

Le site sera accessible sur `http://localhost:8000` 🎉

## 🎨 Hero Career Landing

Le projet inclut un **hero professionnel** avec :

- ✅ **Navbar blanche** sur fond noir (configuration exacte de vite-ts)
- ✅ **Header fixe** qui suit le scroll
- ✅ **Formulaire de recherche** (Job title + Location)
- ✅ **Illustration animée** avec effet parallax
- ✅ **Statistiques** (2M+ Jobs, 500k+ Successful hiring, etc.)
- ✅ **Logos des marques** partenaires

### Configuration du Layout

Le layout est configuré exactement comme dans vite-ts :

```tsx
<MainLayout
  slotProps={{
    header: {
      sx: {
        position: { md: 'fixed' },      // Header fixe
        color: { md: 'common.white' },  // Navbar blanche
      },
    },
  }}
>
  <CareerLandingView />
</MainLayout>
```

## 📚 Documentation

- **[CONFIGURATION_CAREER_LANDING.md](./CONFIGURATION_CAREER_LANDING.md)** - Configuration du layout career
- **[CORRECTIONS_IMPORTS_CAREER.md](./CORRECTIONS_IMPORTS_CAREER.md)** - Guide des imports corrigés

## 🔧 Commandes Utiles

```bash
# Développement
composer run dev              # Lance tous les services (Laravel + Vite + Queue + Logs)
npm run dev                   # Lance uniquement Vite
php artisan serve            # Lance uniquement Laravel

# Build production
npm run build                # Compile les assets pour production
php artisan optimize         # Optimise Laravel

# Linting
npm run lint                 # Vérifie le code TypeScript
npm run format               # Formate le code avec Prettier

# Base de données
php artisan migrate          # Lance les migrations
php artisan migrate:fresh    # Reset et relance les migrations
php artisan db:seed          # Lance les seeders

# Cache
php artisan cache:clear      # Nettoie le cache
php artisan config:clear     # Nettoie la config
php artisan view:clear       # Nettoie les vues
```

## 🎯 Points Clés pour Développement

### 1. Imports
Dans madinia_web, utilisez **`@/`** pour les imports :

```tsx
// ✅ Correct
import { Iconify } from '@/components/iconify';
import { CONFIG } from '@/global-config';

// ❌ Incorrect
import { Iconify } from 'src/components/iconify';
```

### 2. Routing
Les chemins utilisent **`routing/`** au lieu de `routes/` :

```tsx
// ✅ Correct
import { paths } from '@/routing/paths';
import { RouterLink } from '@/routing/components';

// ❌ Incorrect
import { paths } from '@/routes/paths';
```

### 3. Thème MUI
Le thème est configuré dans `/resources/js/theme/` avec :
- Palette de couleurs personnalisée
- Typographie (Public Sans Variable + Barlow)
- Breakpoints responsive
- Dark mode supporté

## 🌐 Déploiement

### Variables d'Environnement Importantes

```env
APP_NAME="Madinia Web"
APP_ENV=production
APP_URL=https://votre-domaine.com

DB_CONNECTION=pgsql  # ou mysql
DB_DATABASE=madinia
# ... autres variables DB

MAIL_MAILER=smtp
# ... configuration mail
```

### Build Production

```bash
# 1. Build des assets
npm run build

# 2. Optimisation Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Upload sur serveur
# (via FTP, Git, ou déploiement automatique)
```

## 📝 TODO / Améliorations Futures

- [ ] Ajouter d'autres sections career (Steps, Featured Jobs, etc.)
- [ ] Créer les pages About, Contact, Services
- [ ] Implémenter le système de blog
- [ ] Ajouter l'internationalisation (FR/EN)
- [ ] Configurer le SEO (meta tags, sitemap, etc.)
- [ ] Intégrer les analytics
- [ ] Optimiser les images (lazy loading, WebP)
- [ ] Ajouter les tests (PHPUnit + Jest)

## 🤝 Contribution

Ce projet est un template de base. N'hésitez pas à :
- Personnaliser les couleurs et le style
- Ajouter de nouvelles sections
- Améliorer les composants existants
- Documenter vos modifications

## 📄 License

Projet privé - Tous droits réservés Madinia

---

**Commit Initial** : `9d51cd5` 🎉  
**Date** : 4 Décembre 2025  
**Status** : ✅ Prêt pour développement

