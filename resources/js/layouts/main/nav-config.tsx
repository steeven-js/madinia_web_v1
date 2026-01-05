import type { TFunction } from 'i18next';

import { Iconify } from '@/components/iconify';

import { paths } from '@/routing/paths';

import { CONFIG } from '@/global-config';

// ----------------------------------------------------------------------

const imagePath = (name: string) => `${CONFIG.assetsDir}/assets/images/menu/${name}`;

// Functions to generate navigation items with translations
const getPageLinks = (t: TFunction) => [
  {
    subheader: t('navigation:footer.sections.formations'),
    coverUrl: imagePath('marketing.webp'),
    items: [
      { title: t('pages:footer.links.formationIA'), path: paths.formations.root },
      { title: t('navigation:footer.links.preinscription') || 'Pré-inscription', path: paths.formations.preinscription },
    ],
  },
  {
    subheader: t('navigation:footer.sections.services'),
    coverUrl: imagePath('travel.webp'),
    items: [
      { title: t('navigation:footer.links.conferenceIA'), path: paths.services.conferenceIa },
      { title: t('navigation:footer.links.auditConseilsIA'), path: paths.services.auditEtConseilsIa },
      { title: t('navigation:footer.links.accompagnementPerso'), path: paths.services.accompagnementPerso },
    ],
  },
  {
    subheader: t('navigation:subheader.madinia'),
    coverUrl: imagePath('career.webp'),
    items: [
      { title: t('navigation:footer.links.about'), path: paths.about.root },
      { title: t('pages:footer.links.certificationQualiopi'), path: paths.about.certificationQualiopi },
    ],
  },
  {
    subheader: t('pages:footer.sections.resources') || 'Ressources',
    coverUrl: imagePath('e-learning.webp'),
    items: [
      { title: t('pages:footer.links.allPosts'), path: paths.blog.posts },
      // { title: 'Post', path: paths.blog.post },
    ],
  },
  {
    subheader: t('navigation:footer.social.followUs') || 'Nos réseaux',
    coverUrl: imagePath('e-commerce.webp'),
    items: [
      { title: t('navigation:footer.social.facebook'), path: paths.facebook },
      { title: t('navigation:footer.social.linkedin'), path: paths.linkedin },
      { title: t('navigation:footer.social.instagram'), path: paths.instagram },
      { title: t('navigation:footer.social.twitter'), path: paths.twitter },
      // { title: 'YouTube', path: paths.youtube },
    ],
  },
  {
    subheader: t('navigation:footer.sections.legal') || 'Autres liens',
    items: [
      { title: t('navigation:footer.links.privacyPolicy'), path: paths.privacyPolicy },
      { title: t('navigation:footer.links.reglementInterieur'), path: paths.reglementInterieur },
    ],
  },
];

export const getNavData = (t: TFunction) => [
  {
    title: t('navigation:main.home'),
    path: '/',
    icon: <Iconify icon="solar:home-2-outline" width={20} />,
  },
  {
    title: t('navigation:subheader.madinia'),
    path: paths.about.root,
    children: getPageLinks(t),
    icon: <Iconify icon="solar:menu-dots-bold" width={20} />,
  },
  {
    title: t('navigation:main.contact'),
    path: paths.contact.root,
    icon: <Iconify icon="solar:chat-round-dots-outline" width={20} />,
  },
  // { title: 'Docs', path: paths.docs },
];

// Legacy export for backward compatibility (will be removed)
export const pageLinks = getPageLinks(() => '');
export const navData = getNavData(() => '');
