// ----------------------------------------------------------------------

export const paths = {
    /**
     * Formations
     */
    formations: {
        root: '/formations',
        preinscription: '/formations/preinscription',
        detail: (slug: string) => `/formations/${slug}`,
    },
    /**
     * Services
     */
    services: {
        root: '/services',
        conferenceIa: '/services/conference-ia',
        auditEtConseilsIa: '/services/audit-et-conseils-ia',
        accompagnementPerso: '/services/accompagnement-perso',
    },
    /**
     * About
     */
    about: {
        root: '/about',
        certificationQualiopi: '/about/certification-qualiopi',
    },
    /**
     * Blog (pour les composants blog/posts)
     */
    blog: {
      posts: '/blog/posts',
      post: '/blog/posts/details',
    },

    /**
     * Contact
     */
    contact: {
        root: '/contact',
        store: '/contact/store',
    },
    /**
     * Dashboard
     */
    dashboard: {
        root: '/dashboard',
    },
    /**
     * Home
     */
    home: '/',
    /**
     * Others
     */
    privacyPolicy: '/privacy-policy',
    reglementInterieur: '/reglement-interieur',
    certificationQualiopi: '/certification-qualiopi',
    facebook: 'https://www.facebook.com/madinia.fr',
    linkedin: 'https://www.linkedin.com/company/madinia',
    instagram: 'https://www.instagram.com/madinia.fr',
    twitter: 'https://www.twitter.com/madinia.fr',
    youtube: 'https://www.youtube.com/madinia.fr',
};
