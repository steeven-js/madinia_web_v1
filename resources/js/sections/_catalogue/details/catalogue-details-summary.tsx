import type { BoxProps } from '@mui/material/Box';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  formation: Formation;
};

export function CatalogueDetailsSummary({ formation, sx, ...other }: Props) {
  const renderObjectives = () => {
    if (!formation.objectives || !formation.show_objectives) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Objectifs de la formation
        </Typography>

        <Box
          sx={{
            color: 'text.secondary',
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.objectives }}
        />
      </div>
    );
  };

  const renderProgram = () => {
    if (!formation.program || !formation.show_program) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Programme
        </Typography>

        <Box
          sx={{
            color: 'text.secondary',
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.program }}
        />
      </div>
    );
  };

  const renderPrerequisites = () => {
    if (!formation.prerequisites || !formation.show_prerequisites) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Prérequis
        </Typography>

        <Box
          sx={{
            color: 'text.secondary',
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.prerequisites }}
        />
      </div>
    );
  };

  const renderTargetAudience = () => {
    if (!formation.target_audience) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Public cible
        </Typography>

        <Box
          sx={{ 
            color: 'text.secondary', 
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.target_audience }}
        />
      </div>
    );
  };

  const renderTrainingMethods = () => {
    if (!formation.training_methods) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Méthodes pédagogiques
        </Typography>

        <Box
          sx={{ 
            color: 'text.secondary', 
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.training_methods }}
        />
      </div>
    );
  };

  const renderDescription = () => {
    if (!formation.description) return null;

    return (
      <div>
        <Typography component="h6" variant="h4" sx={{ mb: 3 }}>
          Description
        </Typography>

        <Box
          sx={{ 
            color: 'text.secondary', 
            lineHeight: 1.8,
            '& p': { mb: 2 },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: formation.description }}
        />
      </div>
    );
  };

  return (
    <Box
      sx={[
        {
          gap: 5,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderDescription()}
      {renderObjectives()}
      {renderProgram()}
      {renderPrerequisites()}
      {renderTargetAudience()}
      {renderTrainingMethods()}
    </Box>
  );
}

