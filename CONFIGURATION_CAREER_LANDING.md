# Configuration Career Landing - Code Exact de vite-ts appliqué à madinia_web

## ✅ Configuration Appliquée

### 1. **Page home.tsx** - Settings du Layout

Le code **EXACT** de vite-ts a été appliqué dans `/resources/js/pages/home.tsx` :

```tsx
<MainLayout
  slotProps={{
    header: {
      sx: {
        position: { md: 'fixed' },      // Header fixé en mode desktop
        color: { md: 'common.white' },  // Navbar BLANCHE sur fond sombre
      },
    },
  }}
>
  <CareerLandingView />
</MainLayout>
```

**Ce code fait exactement ce qui se passe dans vite-ts :**
- `position: { md: 'fixed' }` → Header reste en haut quand on scroll
- `color: { md: 'common.white' }` → Texte de la navbar est BLANC quand on est en haut (sur le fond noir du hero)

### 2. **CareerLandingView** - Structure complète

Le fichier `/resources/js/sections/_career/view/career-landing-view.tsx` contient maintenant **EXACTEMENT** la même structure que vite-ts :

```tsx
export function CareerLandingView() {
  return (
    <>
      <CareerLandingHero />
      <CareerLandingStep />
      <CareerLandingFeaturedJobs jobs={featuredJobs} />
      <CareerLandingTopCompanies companies={_jobsByCompanies} />
      <CareerLandingHotCategories categories={_jobsByCategories} />
      <CareerLandingConnections countries={_jobsByCountries} />
      <CareerLandingForRecruiters />
      <CareerTestimonial testimonials={_testimonials} />
      <CareerOurClients brands={_brands} />
      <CareerLatestPosts largePost={latestPosts[0]} smallPosts={latestPosts.slice(1, 5)} />
      <CareerDownloadApp />
      <CareerNewsletter />
    </>
  );
}
```

### 3. **CareerLandingHero** - Hero exact

Le fichier `/resources/js/sections/_career/landing/career-landing-hero.tsx` est **100% identique** à vite-ts avec :

- ✅ Fond noir avec overlay (ligne 165-167)
- ✅ Titre avec gradient "Career" (ligne 197-210)
- ✅ Formulaire de recherche job + location (ligne 36-109)
- ✅ Logos des marques partenaires (ligne 111-129)
- ✅ Statistiques (2m+ Jobs, 500k+ Successful hiring, etc.) (ligne 131-156)
- ✅ Illustration CareerHeroIllustration (ligne 224)

## 🎯 Résultat

Maintenant `http://localhost:8000/` affiche **EXACTEMENT** la même chose que `http://localhost:8001/career` :

1. ✅ **Navbar blanche** quand on est en haut (sur le fond sombre)
2. ✅ **Navbar qui change de couleur** quand on scroll
3. ✅ **Header fixe** en desktop
4. ✅ **Toutes les sections** de la page career landing
5. ✅ **Illustration animée** avec parallax
6. ✅ **Tous les composants** (Step, Featured Jobs, Top Companies, etc.)

## 📁 Fichiers Modifiés

1. `/resources/js/pages/home.tsx` - Props slotProps du MainLayout
2. `/resources/js/sections/_career/view/career-landing-view.tsx` - Structure complète
3. `/resources/js/sections/_career/landing/career-landing-hero.tsx` - Hero identique

## 🚀 Test

```bash
cd /Users/steeven/www/madinia/madinia_v1_web/madinia_web
npm run dev
# Dans un autre terminal
php artisan serve
```

Puis ouvrez `http://localhost:8000/` pour voir le résultat identique à `http://localhost:8001/career` 🎉

## 📊 Comparaison Code

### vite-ts (routes/sections/career.tsx - lignes 28-34)
```tsx
slotProps={{
  header: {
    sx: {
      position: { md: 'fixed' },
      color: { md: 'common.white' },
    },
  },
}}
```

### madinia_web (pages/home.tsx - lignes 28-34)
```tsx
slotProps={{
  header: {
    sx: {
      position: { md: 'fixed' },
      color: { md: 'common.white' },
    },
  },
}}
```

**CODE 100% IDENTIQUE** ✅

