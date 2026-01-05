import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslate } from '@/locales';

import { Logo } from '@/components/logo';

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('pages');

  return (
    <Box component="footer" sx={[{ py: 8 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Logo isSingle sx={{ mb: 1 }} />

        <Box component="span" sx={{ color: 'text.secondary', typography: 'caption' }}>
          {new Date().getFullYear()} {t('footer.copyright')} - MADIN.IA
        </Box>
      </Container>
    </Box>
  );
}

