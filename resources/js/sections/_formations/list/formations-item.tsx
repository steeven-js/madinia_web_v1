import type { Formation } from '@/types/formation';

import { toast } from 'sonner';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from '@/routing/paths';
import { RouterLink } from '@/routing/components';

import { Label } from '@/components/label';
import { Image } from '@/components/image';
import { Iconify } from '@/components/iconify';
import { SimpleLightbox } from '@/components/lightbox/simple-lightbox';

// ----------------------------------------------------------------------

type Props = {
  formation: Formation;
  isVertical?: boolean;
};

export function FormationsItem({ formation, isVertical }: Props) {
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
    const preinscriptionUrl = `${window.location.origin}${paths.preinscription}?formation_id=${formation.id}`;
    try {
      await navigator.clipboard.writeText(preinscriptionUrl);
      toast.success('URL de pré-inscription copiée dans le presse-papier');
    } catch (err) {
      toast.error('Impossible de copier l\'URL');
    }
  };

  // Fonction pour mapper les niveaux de difficulté à des couleurs
  const getLevelColor = (level: string) => {
    const levelLower = level.toLowerCase();
    
    if (levelLower === 'avance' || levelLower === 'avancé') {
      return 'error';
    }
    if (levelLower === 'intermediaire') {
      return 'warning';
    }
    if (levelLower === 'debutant') {
      return 'success';
    }
    
    return 'info';
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

  const renderImage = () => (
    <Box
      onClick={handleOpenLightbox}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        width: '100%',
        height: '100%',
        '&:hover': {
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
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
        ratio={isVertical ? '1/1' : { xs: '1/1', sm: '3/4' }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );

  const renderTop = () => (
    <Stack spacing={1}>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography variant="overline" sx={{ color: 'primary.main', flexGrow: 1 }}>
          {formation.category?.name || 'Formation'}
        </Typography>
        
        {formation.level && (
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
        )}
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
          width: 'fit-content',
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
    </Stack>
  );

  const renderContent = () => (
    <Stack spacing={2} sx={{ p: 3, flex: '1 1 auto' }}>
      {renderTop()}

      <Link
        component={RouterLink}
        href={paths.formations.detail(formation.slug)}
        color="inherit"
        variant="h6"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          lineHeight: 1.4,
          maxHeight: '2.8em',
        }}
      >
        {formation.title}
      </Link>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          lineHeight: 1.5,
          maxHeight: '4.5em',
          wordBreak: 'break-word',
        }}
      >
        {formation.short_description || formation.description}
      </Typography>

      {/* <Stack
        direction="row"
        alignItems="center"
        sx={{
          pt: 1,
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Iconify icon="carbon:time" sx={{ mr: 0.5 }} />
        {formation.duration || 'Durée non spécifiée'}
      </Stack> */}

      {/* CTAs - Amélioration UI/UX */}
      <Stack spacing={1.5} sx={{ mt: 3 }}>
        {/* Bouton principal - S'inscrire */}
        <Button
          component={RouterLink}
          href={`/preinscription?formation_id=${formation.id}`}
          variant="contained"
          size="medium"
          fullWidth
          startIcon={<Iconify icon="solar:user-plus-bold" width={18} />}
          sx={{
            py: 1.25,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          S'inscrire à cette formation
        </Button>

        {/* Actions secondaires - Partager et Pré-inscription */}
        <Stack direction="row" spacing={1}>
          <Tooltip title="Copier le lien de la formation">
            <Button
              variant="outlined"
              size="medium"
              onClick={handleShareFormation}
              startIcon={<Iconify icon="solar:link-bold" width={18} />}
              sx={{
                flex: 1,
                py: 1,
                fontSize: '0.8125rem',
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
              size="medium"
              onClick={handleSharePreinscription}
              startIcon={<Iconify icon="solar:share-bold" width={18} />}
              sx={{
                flex: 1,
                py: 1,
                fontSize: '0.8125rem',
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

        {/* Actions tertiaires - PDF et Détails */}
        <Stack direction="row" spacing={1} alignItems="center">
          {formation.pdf_file && (
            <Tooltip title="Télécharger le PDF">
              <Button
                variant="text"
                size="medium"
                startIcon={<Iconify icon="carbon:document-pdf" width={18} />}
                href={formation.pdf_file}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: 1,
                  py: 0.75,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.08),
                    color: 'text.primary',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                PDF
              </Button>
            </Tooltip>
          )}

          <Button
            component={RouterLink}
            href={paths.formations.detail(formation.slug)}
            variant="text"
            size="medium"
            endIcon={<Iconify icon="solar:arrow-right-bold" width={18} />}
            sx={{
              flex: formation.pdf_file ? 1 : 'none',
              py: 0.75,
              fontSize: '0.8125rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                transform: 'translateX(2px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Plus de détails
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...(isVertical && {
            flexDirection: 'column',
          }),
        }}
      >
        <Box
          sx={{
            flex: '0 0 40%', // Largeur fixe pour l'image (40%)
            maxWidth: isVertical ? '100%' : '40%',
          }}
        >
          {renderImage()}
        </Box>
        <Box
          sx={{
            flex: '1 1 60%', // Largeur flexible pour le contenu (60%)
            minWidth: 0, // Permet au contenu de se rétrécir si nécessaire
          }}
        >
          {renderContent()}
        </Box>
      </Card>

      <SimpleLightbox
        open={openLightbox}
        onClose={handleCloseLightbox}
        src={formation.image || '/assets/images/placeholder.jpg'}
        alt={formation.title}
      />
    </>
  );
}

