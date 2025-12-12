import type { CardProps } from '@mui/material/Card';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from '@/routing/components';

import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  formation: Formation;
};

export function CatalogueDetailsInfo({ sx, formation, ...other }: Props) {
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

  return (
    <Card
      sx={[
        {
          p: 3,
          gap: 2,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Informations
      </Typography>

      <Divider />

          {formation.duration && formation.show_duration && (
            <Box
              sx={{
                gap: 1.5,
                display: 'flex',
                typography: 'body2',
                alignItems: 'center',
              }}
            >
              <Iconify icon="solar:clock-circle-outline" />
              <Box>
                <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                  Durée
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formation.duration} heures
                </Typography>
              </Box>
            </Box>
          )}

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          typography: 'body2',
          alignItems: 'center',
        }}
      >
        <Iconify icon="carbon:skill-level" />
        <Box>
          <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
            Niveau
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
              mt: 0.5,
            }}
          >
            {getLevelLabel(formation.level)}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          typography: 'body2',
          alignItems: 'center',
        }}
      >
        <Iconify 
          icon={formation.certification ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} 
          width={20} 
          height={20}
          style={{ 
            color: formation.certification ? '#2e7d32' : '#9e9e9e'
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
            Certification
          </Typography>
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
              mt: 0.5,
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
            {formation.certification_label || (formation.certification ? 'Certifiante' : 'Non certifiante')}
          </Box>
        </Box>
      </Box>

      {formation.category && (
        <Box
          sx={{
            gap: 1.5,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
          }}
        >
          <Iconify icon="carbon:category" />
          <Box>
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
              Catégorie
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {formation.category.name}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 1 }} />
      <Stack spacing={2}>
        <Button
          component={RouterLink}
          href={`/preinscription?formation_id=${formation.id}`}
          variant="contained"
          size="large"
          color="primary"
          startIcon={<Iconify icon="solar:user-plus-bold" />}
          fullWidth
        >
          S'inscrire à cette formation
        </Button>

        {formation.pdf_file && (
          <Button
            variant="outlined"
            size="large"
            startIcon={<Iconify icon="carbon:document-pdf" />}
            href={formation.pdf_file}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            Télécharger le PDF
          </Button>
        )}
      </Stack>
    </Card>
  );
}

