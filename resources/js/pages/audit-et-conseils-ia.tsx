import { Head } from '@inertiajs/react';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { Iconify } from '@/components/iconify';
import { CtaPreinscription } from '@/components/cta-preinscription';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Audit & Conseils IA - Madin.IA',
  description:
    "Audit et conseils en intelligence artificielle pour votre entreprise. Évaluation de votre maturité IA et recommandations stratégiques personnalisées.",
  keywords: 'audit,conseil,intelligence artificielle,IA,évaluation,stratégie,entreprise,madinia',
};

const features = [
  {
    icon: 'solar:chart-2-bold',
    title: 'Évaluation complète',
    description: 'Analyse de votre maturité IA et identification des opportunités',
  },
  {
    icon: 'solar:diploma-bold',
    title: 'Conseils stratégiques',
    description: 'Recommandations personnalisées pour votre transformation IA',
  },
  {
    icon: 'solar:rocket-2-bold',
    title: 'Plan d'action',
    description: 'Feuille de route concrète pour vos projets IA',
  },
];

export default function AuditEtConseilsIAPage() {
  const theme = useTheme();

  return (
    <MainLayout
      slotProps={{
        header: {
          sx: { position: { md: 'fixed' } },
        },
      }}
    >
      <Head title={metadata.title}>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <Box sx={{ minHeight: '100vh' }}>
        <Container sx={{ py: { xs: 10, md: 15 } }}>
          {/* Hero Section */}
          <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h1" color="primary.main">
              Audit & Conseils IA
            </Typography>

            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 720 }}>
              Évaluez votre maturité IA et définissez votre stratégie de transformation
            </Typography>
          </Stack>

          {/* Description */}
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              mb: 6,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
              Notre service d'audit et de conseil en IA vous permet d'évaluer le potentiel de
              l'intelligence artificielle dans votre organisation et d'identifier les opportunités
              stratégiques les plus prometteuses.
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              Nous analysons vos processus, vos données et vos objectifs pour vous proposer un plan
              d'action concret et adapté à vos ressources.
            </Typography>
          </Card>

          {/* Features */}
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              mb: 6,
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <Iconify
                    icon={feature.icon}
                    width={32}
                    style={{ color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>

        <CtaPreinscription />
      </Box>
    </MainLayout>
  );
}
