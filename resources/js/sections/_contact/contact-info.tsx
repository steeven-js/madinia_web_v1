import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from '@/components/iconify';
import { SocialLinks } from '@/components/social-links';

// ----------------------------------------------------------------------

type MarketingContactInfoProps = {
  sx?: SxProps<Theme>;
  [key: string]: any;
};

export function MarketingContactInfo({ sx, ...other }: MarketingContactInfoProps) {
  const infoRow = (icon: string, label: string, value: string, link = '') => (
    <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
      <Iconify icon={icon} width={24} height={24} style={{ flexShrink: 0 }} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        {link ? (
          <Link variant="subtitle2" href={link} target="_blank" rel="noopener">
            {value}
          </Link>
        ) : (
          <Typography variant="subtitle2">{value}</Typography>
        )}
      </Stack>
    </Stack>
  );

  const renderSocials = (
    <Stack spacing={2}>
      <Typography variant="h6">Suivez-nous</Typography>
      <SocialLinks variant="buttons" size="medium" spacing={1} />
    </Stack>
  );

  return (
    <Box sx={{ ...sx }} {...other}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Contactez-nous
      </Typography>

      {infoRow('carbon:email', 'Email', 'contact@madinia.fr', 'mailto:contact@madinia.fr')}
      {infoRow('carbon:location', 'Adresse', 'Martinique, France')}
      {infoRow('carbon:phone', 'Téléphone', '+33 6 47 43 80 84', 'tel:+33647438084')}

      <Divider sx={{ my: 4 }} />

      {renderSocials}
    </Box>
  );
}
