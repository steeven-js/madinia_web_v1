import type { CardProps } from '@mui/material/Card';
import type { Theme, SxProps } from '@mui/material/styles';
import type { IconifyName } from '@/components/iconify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { Iconify } from '@/components/iconify';

import { paths } from '@/routing/paths';

// ----------------------------------------------------------------------

type Props = CardProps & {
  category?: string;
  duration?: string;
  format?: string;
};

export function ServiceDetailsInfo({ sx, category, duration, format, ...other }: Props) {
  return (
    <Card
      sx={[
        {
          p: 3,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {category && <Item icon="carbon:baggage-claim" label="Catégorie" value={category} />}

      {duration && <Item icon="solar:clock-circle-bold" label="Durée" value={duration} />}

      {format && <Item icon="solar:document-text-bold" label="Format" value={format} />}

      <Box sx={{ pt: 2 }}>
        <Button fullWidth variant="contained" size="large" color="primary" href={paths.contact.root}>
          Demander un devis
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  icon: IconifyName;
  sx?: SxProps<Theme>;
  value: string | null;
};

function Item({ icon, label, value, sx }: ItemProps) {
  return (
    <Box
      sx={[
        {
          gap: 2,
          display: 'flex',
          typography: 'subtitle2',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Iconify width={24} icon={icon} />

      <div>
        {label}
        <Box
          component="span"
          className="value"
          sx={{ display: 'block', typography: 'body2', color: 'text.secondary' }}
        >
          {value || '-'}
        </Box>
      </div>
    </Box>
  );
}

