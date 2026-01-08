# Maintenance - Pages désactivées temporairement

**Date de mise en maintenance :** 2025-01-XX  
**Raison :** Mise à jour du code en cours

## Pages désactivées

### 1. Page About (`/about`)
- **Fichiers modifiés :**
  - `resources/js/layouts/main/nav-config.tsx` (ligne ~36 et ~75-79)
  - `resources/js/layouts/main/footer.tsx` (ligne ~54)

- **Actions effectuées :**
  - Lien "About" commenté dans le menu footer (section Madin.IA)
  - Menu principal "Madin.IA" modifié : le lien direct vers `/about` est désactivé (path: '#')
  - Le menu conserve les sous-menus (Certification Qualiopi reste accessible)

- **Pour réactiver :**
  1. Dans `nav-config.tsx` :
     - Décommenter la ligne 36 : `{ title: t('navigation:footer.links.about'), path: paths.about.root }`
     - Décommenter le bloc menu principal (lignes 74-79) et commenter l'alternative (lignes 80-85)
  2. Dans `footer.tsx` :
     - Décommenter la ligne 54 : `{ title: t('navigation:footer.links.about'), path: paths.about.root }`

### 2. Pages Blog/Posts (`/blog/posts` et `/blog/posts/details`)
- **Fichiers modifiés :**
  - `resources/js/layouts/main/nav-config.tsx` (ligne ~44)
  - `resources/js/layouts/main/footer.tsx` (ligne ~61)

- **Actions effectuées :**
  - Lien "Tous les posts" commenté dans le menu footer (section Ressources)
  - Section "Ressources" reste visible mais sans items

- **Pour réactiver :**
  1. Dans `nav-config.tsx` :
     - Décommenter la ligne 44 : `{ title: t('pages:footer.links.allPosts'), path: paths.blog.posts }`
  2. Dans `footer.tsx` :
     - Décommenter la ligne 61 : `{ title: tPages('footer.links.allPosts'), path: '/posts' }`

## Notes importantes

- Les routes dans `resources/js/routing/paths.ts` n'ont **PAS** été modifiées
- Les pages elles-mêmes n'ont **PAS** été supprimées, seulement les liens de navigation
- Les utilisateurs peuvent toujours accéder aux pages via URL directe (si les routes existent)
- La Certification Qualiopi reste accessible via `/about/certification-qualiopi`

## Historique

- **2025-01-XX** : Mise en maintenance initiale des pages About et Blog/Posts
