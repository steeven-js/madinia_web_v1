import type { BoxProps } from '@mui/material/Box';
import type { Formation } from '@/types/formation';

import { toast } from 'sonner';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from '@/routing/paths';
import { RouterLink } from '@/routing/components';

import { Image } from '@/components/image';
import { Iconify } from '@/components/iconify';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { SimpleLightbox } from '@/components/lightbox/simple-lightbox';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  formation: Formation;
};

export function FormationsDetailsHero({ sx, formation, ...other }: Props) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const handleOpenLightbox = () => {
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  // Copier l'URL de la formation dans le presse-papier
  const handleShareFormation = async () => {
    const formationUrl = `${window.location.origin}${paths.formations.detail(formation.slug)}`;
    try {
      await navigator.clipboard.writeText(formationUrl);
      toast.success('URL de la formation copiée dans le presse-papier');
    } catch (err) {
      toast.error('Impossible de copier l\'URL');
    }
  };

  // Copier l'URL de pré-inscription avec formation_id dans le presse-papier
  const handleSharePreinscription = async () => {
    const preinscriptionUrl = `${window.location.origin}${paths.formations.preinscription}?formation_id=${formation.id}`;
    try {
      await navigator.clipboard.writeText(preinscriptionUrl);
      toast.success('URL de pré-inscription copiée dans le presse-papier');
    } catch (err) {
      toast.error('Impossible de copier l\'URL');
    }
  };

  // Fonction pour afficher les niveaux en français
  const getLevelLabel = (level: string) => {
    const levelLower = level.toLowerCase();

    if (levelLower === 'avance' || levelLower === 'avancé') {
      return 'Avancé';
    }
    if (levelLower === 'intermediaire') {
      return 'Intermédiaire';
    }
    if (levelLower === 'debutant') {
      return 'Débutant';
    }

    return level;
  };

  // Fonction pour obtenir les styles de couleur personnalisés
  const getLevelStyles = (level: string) => {
    const levelLower = level.toLowerCase();

    if (levelLower === 'avance' || levelLower === 'avancé') {
      return {
        backgroundColor: '#ffebee',
        color: '#c62828',
        border: '1px solid #ef5350',
      };
    }
    if (levelLower === 'intermediaire') {
      return {
        backgroundColor: '#fff3e0',
        color: '#ef6c00',
        border: '1px solid #ff9800',
      };
    }
    if (levelLower === 'debutant') {
      return {
        backgroundColor: '#e8f5e8',
        color: '#2e7d32',
        border: '1px solid #4caf50',
      };
    }

    return {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
      border: '1px solid #2196f3',
    };
  };

  const renderTexts = () => (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="overline" sx={{ color: 'primary.main' }}>
          {formation.category?.name || 'Formation'}
        </Typography>

        <Box
          sx={{
            ...getLevelStyles(formation.level),
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            display: 'inline-block',
          }}
        >
          {getLevelLabel(formation.level)}
        </Box>

        {/* Badge de certification */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            ...(formation.certification ? {
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '1px solid #4caf50',
            } : {
              backgroundColor: '#f5f5f5',
              color: '#616161',
              border: '1px solid #e0e0e0',
            }),
          }}
        >
          <Iconify 
            icon={formation.certification ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} 
            width={16} 
            height={16} 
          />
          {formation.certification_label || (formation.certification ? 'Certifiante' : 'Non certifiante')}
        </Box>
      </Box>

      <Typography variant="h3" component="h1">
        {formation.title}
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        {formation.short_description || formation.description}
      </Typography>
    </Box>
  );

  const renderImage = () => (
    <Box
      onClick={handleOpenLightbox}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            zIndex: 1,
          },
          '&::before': {
            content: '"🔍"',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            zIndex: 2,
            pointerEvents: 'none',
          },
        },
      }}
    >
      <Image
        alt={formation.title}
        src={formation.image || '/assets/images/placeholder.jpg'}
        ratio={{ xs: '4/3', md: '3/4' }}
        sx={{ borderRadius: 2 }}
      />
    </Box>
  );

      const renderSummary = () => (
        <Box
          sx={{
            rowGap: 3,
            columnGap: 5,
            maxWidth: 480,
            display: 'flex',
            flexWrap: 'wrap',
            typography: 'body2',
            '& > div': {
              gap: 1,
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {formation.duration && formation.show_duration && (
            <div>
              <Iconify icon="solar:clock-circle-outline" /> {formation.duration} heures
            </div>
          )}
        </Box>
      );
  return (
    <>
      <Box
        component="section"
        sx={[
          { pt: { xs: 5, md: 15 }, pb: 10, bgcolor: 'background.neutral' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Container sx={{ overflow: 'hidden' }}>
          <CustomBreadcrumbs
            links={[
              { name: 'Accueil', href: '/' },
              { name: 'Formations', href: paths.formations.root },
              { name: formation.title },
            ]}
            sx={{ mb: { xs: 5, md: 10 } }}
          />

          <Grid container spacing={{ xs: 5, md: 10 }} direction="row-reverse">
            <Grid size={{ xs: 12, md: 5 }}>{renderImage()}</Grid>

            <Grid size={{ xs: 12, md: 7 }} sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              {renderTexts()}
              {renderSummary()}

              <Stack spacing={2.5} sx={{ mt: 3, width: '100%', maxWidth: 500 }}>
                {/* Bouton principal - S'inscrire */}
                <Button
                  component={RouterLink}
                  href={`${paths.formations.preinscription}?formation_id=${formation.id}`}
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  startIcon={<Iconify icon="solar:user-plus-bold" width={20} />}
                  sx={{
                    py: 1.75,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      boxShadow: (theme) => `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  S'inscrire à cette formation
                </Button>

                {/* Actions secondaires - Partager */}
                <Stack direction="row" spacing={1.5}>
                  <Tooltip title="Copier le lien de la formation">
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleShareFormation}
                      startIcon={<Iconify icon="solar:link-bold" width={20} />}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Partager
                    </Button>
                  </Tooltip>

                  <Tooltip title="Copier le lien de pré-inscription">
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleSharePreinscription}
                      startIcon={<Iconify icon="solar:share-bold" width={20} />}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Pré-inscription
                    </Button>
                  </Tooltip>
                </Stack>

                {/* Action tertiaire - PDF */}
                {formation.pdf_file && (
                  <Tooltip title="Télécharger le document PDF">
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      startIcon={<Iconify icon="carbon:document-pdf" width={20} />}
                      href={formation.pdf_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        py: 1.5,
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: 'error.main',
                          backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                          color: 'error.main',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Télécharger le PDF
                    </Button>
                  </Tooltip>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <SimpleLightbox
        open={openLightbox}
        onClose={handleCloseLightbox}
        src={formation.image || '/assets/images/placeholder.jpg'}
        alt={formation.title}
      />
    </>
  );
}

