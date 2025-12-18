import type { BoxProps } from '@mui/material/Box';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '@/routing/components';
import { paths } from '@/routing/paths';

import { Iconify } from '@/components/iconify';

import { FormationsItem } from './formations-item';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  formations: Formation[];
};

export function FormationsListSimilar({ formations, sx, ...other }: Props) {
  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          bgcolor: 'background.neutral',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 5, md: 10 } }}>
          <Typography component="h6" variant="h3" sx={{ flexGrow: 1 }}>
            Formations similaires
          </Typography>

          <Button
            component={RouterLink}
            href={paths.formations.root}
            color="inherit"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Voir toutes
          </Button>
        </Box>

        <Box
          sx={{
            gap: 4,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {formations.map((formation) => (
            <FormationsItem key={formation.id} formation={formation} isVertical />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

