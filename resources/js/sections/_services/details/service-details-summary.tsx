import type { BoxProps } from '@mui/material/Box';
import type { IServiceProps } from '@/types/service';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { Iconify } from '@/components/iconify';
import { Markdown } from '@/components/markdown';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  content: IServiceProps['content'];
  features: IServiceProps['features'];
  benefits: IServiceProps['benefits'];
};

export function ServiceDetailsSummary({ sx, content, features, benefits, ...other }: Props) {
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
      <Markdown content={content} />

      {!!features?.length && (
        <div>
          <Typography component="h6" variant="h5" sx={{ mb: 3 }}>
            Caractéristiques
          </Typography>
          <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
            {features.map((feature) => (
              <Chip key={feature} label={feature} size="small" variant="soft" />
            ))}
          </Box>
        </div>
      )}

      {!!benefits?.length && (
        <div>
          <Typography component="h6" variant="h5" sx={{ mb: 3 }}>
            Avantages
          </Typography>
          <Box
            sx={{
              rowGap: 2,
              columnGap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {benefits.map((benefit) => (
              <Box
                key={benefit}
                sx={{
                  gap: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  typography: 'body2',
                }}
              >
                <Iconify
                  width={24}
                  icon={
                    (benefit.includes('Flexible') && 'solar:calendar-add-outline') ||
                    (benefit.includes('Support') && 'solar:headphones-sound-round-outline') ||
                    (benefit.includes('Formation') && 'solar:presentation-graph-outline') ||
                    (benefit.includes('Expert') && 'solar:medal-star-bold') ||
                    (benefit.includes('Sur mesure') && 'solar:user-hands-bold') ||
                    'carbon:checkmark-outline'
                  }
                  sx={{ color: 'primary.main' }}
                />
                {benefit}
              </Box>
            ))}
          </Box>
        </div>
      )}
    </Box>
  );
}

