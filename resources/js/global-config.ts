// ----------------------------------------------------------------------

export const CONFIG = {
  appName: 'Madinia',
  appVersion: '1.0.0',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  googleMapApiKey: import.meta.env.VITE_MAP_API ?? '',
  serverUrl: import.meta.env.DEV ? 'http://localhost:3000' : '',
  site: {
    name: 'Madinia - Dashboard Laravel React',
    serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
    assetURL: import.meta.env.VITE_ASSET_URL ?? '',
    basePath: import.meta.env.VITE_BASE_PATH ?? '',
  },

  // URLs systeme.io pour les demandes d'accès aux formations
  systemeioDB: {
    appelOffertUrl:
      import.meta.env.VITE_SYSTEMEIO_APPELOFFERT_URL ??
      'https://formation.madinia.fr/appel-offert',
    starter:
      import.meta.env.VITE_SYSTEMEIO_STARTER_URL ?? 'https://formation.madinia.fr/ia-starter',
    performer:
      import.meta.env.VITE_SYSTEMEIO_PERFORMER_URL ?? 'https://formation.madinia.fr/ia-performer',
    master: import.meta.env.VITE_SYSTEMEIO_MASTER_URL ?? 'https://formation.madinia.fr/ia-master',
  },

  // URLs des réseaux sociaux
  socialMedia: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/madin_ia',
    twitter: import.meta.env.VITE_TWITTER_URL ?? 'https://twitter.com/madin_ia',
    linkedin: import.meta.env.VITE_LINKEDIN_URL ?? 'https://www.linkedin.com/company/madin-ia',
    facebook: import.meta.env.VITE_FACEBOOK_URL ?? 'https://www.facebook.com/madin.ia',
  },
};
