import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { varAlpha, isEqualPath } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Button, { buttonClasses } from '@mui/material/Button';

import { usePathname } from '@/routing/hooks';
import { RouterLink } from '@/routing/components';

import { Logo } from '@/components/logo';
import { SocialLinks } from '@/components/social-links';

// ----------------------------------------------------------------------

export type FooterProps = BoxProps & {
  layoutQuery?: Breakpoint;
};

// Structure du footer avec les liens principaux
const getFooterLinks = () => [
  {
    subheader: 'Formations',
    items: [
      { title: 'Catalogue des formations', path: '/catalogue' },
      // { title: 'Formation IA', path: '/formation-ia' },
      // { title: 'Formations Certifiantes', path: '/formations-certifiantes' },
      { title: 'Pré-inscription', path: '/preinscription' },
    ],
  },
  {
    subheader: 'Services',
    items: [
      { title: 'Conférence IA', path: '/conference-ia' },
      { title: 'Audit & Conseils IA', path: '/audit-et-conseils-ia' },
      { title: 'Accompagnement Perso', path: '/accompagnement-perso' },
    ],
  },
  {
    subheader: 'À propos',
    items: [
      { title: 'À propos', path: '/about' },
      { title: 'Contact', path: '/contact' },
      { title: 'Certification Qualiopi', path: '/certification-qualiopi' },
    ],
  },
  {
    subheader: 'Ressources',
    items: [{ title: 'Tous les articles', path: '/posts' }],
  },
];

// ----------------------------------------------------------------------

type AppStoreButtonProps = ButtonProps & {
  title: string;
  caption: string;
};

const AppStoreButton = styled(({ title, caption, ...other }: AppStoreButtonProps) => (
  <Button {...other}>
    <div>
      <Box
        component="span"
        sx={{
          opacity: 0.72,
          display: 'block',
          textAlign: 'left',
          typography: 'caption',
        }}
      >
        {caption}
      </Box>

      <Box component="span" sx={{ mt: -0.5, typography: 'h6' }}>
        {title}
      </Box>
    </div>
  </Button>
))(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.vars.palette.common.white,
  border: `solid 1px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.vars.palette.grey[900]}, ${theme.vars.palette.common.black})`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

const blockStyles = (theme: Theme, layoutQuery: Breakpoint): SxProps<Theme> => ({
  gap: 2,
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up(layoutQuery)]: {
    textAlign: 'left',
    alignItems: 'flex-start',
  },
});

// ----------------------------------------------------------------------

export function Footer({ layoutQuery = 'md', sx, ...other }: FooterProps) {
  const theme = useTheme();
  const pathname = usePathname();

  const renderInfo = () => (
    <>
      <Logo />
      <Typography variant="body2" sx={{ maxWidth: 360, color: 'text.secondary' }}>
        MADIN.IA - Expert en Intelligence Artificielle pour transformer votre entreprise avec des
        solutions innovantes et sur-mesure. Formation, conseil et accompagnement personnalisé.
      </Typography>
      <SocialLinks variant="icons" size="medium" spacing={1} sx={{ mt: 2 }} />
    </>
  );

  const renderList = () => (
    <Box
      component="ul"
      sx={(theme) => ({
        columnGap: 2,
        display: 'none',
        columnCount: { xs: 3, lg: 4 },
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'block',
        },
      })}
    >
      {getFooterLinks().map((list) => (
        <Box
          component="li"
          key={list.subheader}
          sx={{
            mb: 2,
            gap: 0.75,
            display: 'flex',
            breakInside: 'avoid',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="subtitle2">{list.subheader}</Typography>

          <Box component="ul" sx={{ gap: 'inherit', display: 'flex', flexDirection: 'column' }}>
            {list.items.map((item) => {
              const isActive = isEqualPath(item.path, pathname);

              return (
                <Box component="li" key={item.title} sx={{ display: 'inline-flex' }}>
                  <Link
                    component={RouterLink}
                    href={item.path}
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'text.primary' },
                      ...(isActive && { color: 'text.primary', fontWeight: 'fontWeightSemiBold' }),
                    }}
                  >
                    {item.title}
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderTop = () => (
    <Container
      sx={{
        pt: 10,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container spacing={3} sx={{ justifyContent: { md: 'space-between' } }}>
        <Grid
          size={{ xs: 12, md: 5, lg: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 5 },
          }}
        >
          <Box sx={[(theme) => ({ ...blockStyles(theme, layoutQuery) }), { gap: 3 }]}>
            {renderInfo()}
          </Box>
        </Grid>

        <Grid component="nav" size={{ xs: 12, md: 6, lg: 6 }}>
          {renderList()}
        </Grid>
      </Grid>
    </Container>
  );

  const renderLegalInfo = () => (
    <Container
      sx={{
        py: 2,
        textAlign: 'center',
        borderBottom: `solid 1px ${theme.vars.palette.divider}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          lineHeight: 1.5,
          maxWidth: '100%',
          display: 'block',
        }}
      >
        MADIN.IA – 934 303 843 00015 | +33 6 47 43 80 84 | contact@madinia.fr | Enregistré sous
        le numéro de déclaration d&apos;activité 02973663897 auprès du préfet de la région
        Martinique, ce numéro ne vaut pas agrément de l&apos;État
      </Typography>
    </Container>
  );

  const renderQualiopi = () => (
    <Container
      sx={{
        py: 4,
        textAlign: 'center',
        borderBottom: `solid 1px ${theme.vars.palette.divider}`,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="subtitle2" color="primary.main">
          Organisme de formation certifié Qualiopi
        </Typography>
        <Link
          component={RouterLink}
          href="/certification-qualiopi"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          <Box
            component="img"
            src="/assets/logos/actions-de-formation-e1651846993564.png"
            alt="Certification Qualiopi"
            sx={{
              height: 60,
              width: 'auto',
              borderRadius: 1,
              boxShadow: theme.customShadows?.z4,
            }}
          />
        </Link>
        <Typography variant="caption" color="text.secondary">
          La certification qualité a été délivrée au titre de la catégorie d&apos;action suivante
          : ACTION DE FORMATION
        </Typography>
      </Stack>
    </Container>
  );

  const renderBottom = () => (
    <Container
      sx={{
        py: 3,
        gap: 2.5,
        display: 'flex',
        textAlign: 'center',
        color: 'text.secondary',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Typography variant="caption">
        {new Date().getFullYear()} © Tous droits réservés - MADIN.IA
      </Typography>

      <Box
        component="span"
        sx={{
          gap: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link variant="caption" color="inherit" href="/privacy-policy">
          Politique de confidentialité
        </Link>
        <Box
          sx={{
            width: 3,
            height: 3,
            opacity: 0.4,
            borderRadius: '50%',
            bgcolor: 'currentColor',
          }}
        />
        <Link variant="caption" color="inherit" href="/reglement-interieur">
          Règlement intérieur
        </Link>
      </Box>
    </Container>
  );

  return (
    <Box
      component="footer"
      sx={[
        (theme) => ({
          borderTop: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderTop()}
      <Divider />
      {renderLegalInfo()}
      {renderQualiopi()}
      {renderBottom()}
    </Box>
  );
}
