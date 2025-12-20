import type { BoxProps } from '@mui/material/Box';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from '@/global-config';

import { Image } from '@/components/image';
import { AnimateCountUp } from '@/components/animate';

// ----------------------------------------------------------------------

const TERRITOIRES = [
  {
    id: 'martinique',
    name: 'Martinique',
    color: '#FF6B6B',
    mapPath: `${CONFIG.assetsDir}/assets/map/martinique.svg`,
    stats: {
      interventions: 45,
      formations: 12,
      entreprises: 28,
      participants: 320,
    },
  },
  {
    id: 'guadeloupe',
    name: 'Guadeloupe',
    color: '#4ECDC4',
    mapPath: `${CONFIG.assetsDir}/assets/map/guadeloupe.svg`,
    stats: {
      interventions: 38,
      formations: 10,
      entreprises: 22,
      participants: 280,
    },
  },
  {
    id: 'guyane',
    name: 'Guyane',
    color: '#FFE66D',
    mapPath: `${CONFIG.assetsDir}/assets/map/guyane.svg`,
    stats: {
      interventions: 25,
      formations: 8,
      entreprises: 15,
      participants: 180,
    },
  },
];

// ----------------------------------------------------------------------

export function CareerLandingTerritoires({ sx, ...other }: BoxProps) {
  const renderHeader = () => (
    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 10 } }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Nos interventions dans les territoires d'outre-mer
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
        MADIN.IA accompagne les entreprises et les professionnels des DOM-TOM avec des formations
        et des interventions en intelligence artificielle adaptées à leurs besoins spécifiques.
      </Typography>
    </Box>
  );

  const renderStat = (value: number, label: string, color: string) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            mb: 0.5,
            display: 'flex',
            alignItems: 'baseline',
            gap: 0.5,
            justifyContent: 'center',
          }}
        >
          <AnimateCountUp variant="h4" to={value} sx={{ color }} />
          <Typography component="span" variant="h6" sx={{ color: 'text.secondary' }}>
            +
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Box>
    );
  };

  const renderCard = (territoire: (typeof TERRITOIRES)[0]) => {
    return (
      <Box
        key={territoire.id}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Légende au-dessus de la carte */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: 'center',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {territoire.name}
        </Typography>

        {/* Carte SVG centrale sans cadre - taille fixe pour homogénéité */}
        <Box
          sx={{
            width: { xs: 240, sm: 280, md: 320 },
            height: { xs: 240, sm: 280, md: 320 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          {territoire.mapPath ? (
            <Box
              component="img"
              src={territoire.mapPath}
              alt={`Carte de ${territoire.name}`}
              sx={{
                width: { xs: 240, sm: 280, md: 320 },
                height: { xs: 240, sm: 280, md: 320 },
                objectFit: 'contain',
                objectPosition: 'center',
                filter: `drop-shadow(0 2px 8px ${alpha(territoire.color, 0.3)})`,
                flexShrink: 0,
              }}
            />
          ) : null}
        </Box>

        {/* Cadre avec infographies en dessous */}
        <Card
          sx={(theme) => ({
            width: '100%',
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.vars.customShadows.z8,
          })}
        >
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {renderStat(
              territoire.stats.interventions,
              'Interventions',
              territoire.color
            )}
            {renderStat(
              territoire.stats.formations,
              'Formations',
              territoire.color
            )}
            {renderStat(
              territoire.stats.entreprises,
              'Entreprises',
              territoire.color
            )}
            {renderStat(
              territoire.stats.participants,
              'Participants',
              territoire.color
            )}
          </Box>
        </Card>
      </Box>
    );
  };

  return (
    <Box
      component="section"
      sx={[
        {
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 15 },
          bgcolor: 'background.neutral',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        {renderHeader()}

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {TERRITOIRES.map((territoire) => renderCard(territoire))}
        </Box>
      </Container>
    </Box>
  );
}
