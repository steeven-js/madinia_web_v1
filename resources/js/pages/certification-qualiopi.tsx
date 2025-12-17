import { Head } from '@inertiajs/react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { Iconify } from '@/components/iconify';
import { CtaPreinscription } from '@/components/cta-preinscription';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Certification Qualiopi - Madin.IA',
  description:
    "Découvrez la certification Qualiopi de Madin.IA, gage de qualité pour nos formations en intelligence artificielle. Organisme de formation certifié pour l'excellence de nos prestations.",
  keywords: 'certification,qualiopi,formation,qualité,madin.IA,organisme,formation,professionnelle',
};

export default function CertificationQualiopiPage(): React.JSX.Element {
  const theme = useTheme();

  const handleDownloadCertificate = (): void => {
    const documentUrl: string =
      import.meta.env.VITE_DOCUMENTS_QUALIOPI_URL ||
      'https://rrgxotnrwmjqnaugllks.supabase.co/storage/v1/object/public/documents//Certificat_Qualiopi_Mise_a_jour_le_25-06-2025.pdf';
    window.open(documentUrl, '_blank');
  };

  const benefits = [
    {
      icon: 'solar:verified-check-bold',
      title: 'Gage de Qualité',
      description:
        "La certification Qualiopi garantit la qualité de nos processus de formation et notre engagement envers l'excellence pédagogique.",
    },
    {
      icon: 'solar:shield-check-bold',
      title: 'Confiance et Transparence',
      description:
        'Cette certification assure à nos apprenants et partenaires une transparence totale sur nos méthodes et notre organisation.',
    },
    {
      icon: 'solar:star-bold',
      title: "Reconnaissance d'Excellence",
      description:
        "Qualiopi reconnaît notre expertise et notre capacité à dispenser des formations de haute qualité dans le domaine de l'IA.",
    },
  ];

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

      <Container sx={{ py: { xs: 10, md: 15 } }}>
        <Stack spacing={5} alignItems="center" textAlign="center">
          {/* En-tête */}
          <Stack spacing={3} alignItems="center">
            <Typography variant="h2" component="h1">
              Certification Qualiopi
            </Typography>

            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 600 }}>
              Organisme de formation certifié pour la qualité de nos prestations
            </Typography>
          </Stack>

          {/* Carte principale avec le certificat */}
          <Card
            sx={{
              maxWidth: 800,
              width: '100%',
              boxShadow: theme.customShadows.z24,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Stack spacing={4} alignItems="center">
                {/* Image du certificat */}
                <Box
                  component="img"
                  src="/assets/logos/actions-de-formation-e1651846993564.png"
                  alt="Certificat Qualiopi Madin.IA"
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: theme.customShadows.z8,
                  }}
                />

                {/* Informations sur la certification */}
                <Stack spacing={2} textAlign="center">
                  <Typography variant="h4" color="primary.main">
                    Notre Certification
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    MADIN.IA est un organisme de formation certifié Qualiopi. Cette certification
                    nationale atteste de la qualité de nos processus de formation et garantit notre
                    conformité aux standards les plus élevés du secteur.
                  </Typography>

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1" color="primary.main">
                        Détails de la certification
                      </Typography>
                      <Typography variant="body2">
                        <strong>N° de certificat :</strong> 650911-1
                      </Typography>
                      <Typography variant="body2">
                        <strong>Date de délivrance :</strong> 25/06/2025
                      </Typography>
                      <Typography variant="body2">
                        <strong>Valable jusqu'au :</strong> 24/06/2028
                      </Typography>
                      <Typography variant="body2">
                        <strong>Catégorie :</strong> L.6313-1 - 1° Actions de formation
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Bouton de téléchargement */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon="solar:download-bold" />}
                  onClick={handleDownloadCertificate}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Télécharger le certificat
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Section explicative */}
          <Stack spacing={3} textAlign="center" sx={{ maxWidth: 800 }}>
            <Typography variant="h4">Qu'est-ce que Qualiopi ?</Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              La certification Qualiopi est une marque de certification mise en place par le
              ministère du Travail. Elle atteste de la qualité du processus mis en œuvre par les
              organismes de formation et garantit la conformité aux critères définis par le Référentiel
              National Qualité.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                mt: 4,
              }}
            >
              {benefits.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                    '&:hover': {
                      boxShadow: theme.customShadows.z8,
                    },
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
                      icon={item.icon}
                      width={32}
                      style={{ color: theme.palette.primary.main }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Container>

      <CtaPreinscription />
    </MainLayout>
  );
}
