import { paths } from '@/routing/paths';

import { _caseStudies } from '@/_mock';
import { CONFIG } from '@/global-config';

// ----------------------------------------------------------------------

const imagePath = (name: string) => `${CONFIG.assetsDir}/assets/images/menu/${name}`;

export const pageLinks = [
  {
    subheader: 'Formations',
    coverUrl: imagePath('marketing.webp'),
    items: [
      { title: 'Nos formations', path: paths.formations.root },
      { title: 'Pré-inscription', path: paths.formations.preinscription },
    ],
  },
  {
    subheader: 'Services',
    coverUrl: imagePath('travel.webp'),
    items: [
      { title: 'Conférence IA', path: paths.services.conferenceIa },
      { title: 'Audit et conseils IA', path: paths.services.auditEtConseilsIa },
      { title: 'Accompagnement personnalisé', path: paths.services.accompagnementPerso },
    ],
  },
  {
    subheader: 'Madin.IA',
    coverUrl: imagePath('career.webp'),
    items: [
      { title: 'À propos', path: paths.about.root },
      { title: 'Certification Qualiopi', path: paths.about.certificationQualiopi },
    ],
  },
  {
    subheader: 'Nos articles',
    coverUrl: imagePath('e-learning.webp'),
    items: [
      { title: 'Posts', path: paths.blog.posts },
      { title: 'Post', path: paths.blog.post },
    ],
  },
  {
    subheader: 'Nos réseaux',
    coverUrl: imagePath('e-commerce.webp'),
    items: [
      { title: 'Facebook', path: paths.facebook },
      { title: 'LinkedIn', path: paths.linkedin },
      { title: 'Instagram', path: paths.instagram },
      { title: 'Twitter', path: paths.twitter },
      { title: 'YouTube', path: paths.youtube },
    ],
  },
  {
    subheader: 'Autres liens',
    items: [
      { title: 'Politique de confidentialité', path: paths.privacyPolicy },
      { title: 'Règlement intérieur', path: paths.reglementInterieur },
    ],
  },
];

export const navData = [
  { title: 'Accueil', path: '/' },
  { title: 'Madin.IA', path: paths.about.root, children: pageLinks },
  { title: 'Contact', path: paths.contact.root },
  // { title: 'Docs', path: paths.docs },
];
