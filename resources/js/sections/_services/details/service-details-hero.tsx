import type { BoxProps } from '@mui/material/Box';
import type { IServiceProps } from '@/types/service';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from '@/routing/paths';

import { CONFIG } from '@/global-config';

import { Iconify } from '@/components/iconify';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title: IServiceProps['title'];
  category: IServiceProps['category'];
  totalViews?: IServiceProps['totalViews'];
};

export function ServiceDetailsHero({ sx, title, category, totalViews, ...other }: Props) {
  const renderInfo = () => (
    <Box
      sx={{
        display: 'flex',
        color: 'common.white',
        gap: { xs: 3, md: 2 },
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" component="h1">
        {title}
      </Typography>

      <Box
        sx={{
          gap: 3,
          opacity: 0.48,
          display: 'flex',
          flexWrap: 'wrap',
          typography: 'body2',
        }}
      >
        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          <Iconify icon="carbon:baggage-claim" />
          <Link color="inherit" underline="always">
            {category}
          </Link>
        </Box>

        {totalViews && (
          <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
            <Iconify icon="solar:eye-outline" /> {totalViews} vues
          </Box>
        )}
      </Box>
    </Box>
  );

  const renderActions = () => (
    <Box
      sx={{
        gap: 2,
        width: 1,
        maxWidth: 340,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Button fullWidth variant="contained" size="large" color="primary" href={paths.contact.root}>
        Nous contacter
      </Button>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.common.blackChannel, 0.8)}, ${varAlpha(theme.vars.palette.common.blackChannel, 0.8)})`,
              `url(${CONFIG.assetsDir}/assets/background/overlay-2.webp)`,
            ],
          }),
          pt: 5,
          pb: 10,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <CustomBreadcrumbs
          links={[
            { name: 'Accueil', href: paths.home },
            { name: 'Services', href: paths.home },
            { name: title },
          ]}
          sx={{
            mb: { xs: 5, md: 10 },
            '& a > div': { color: 'common.white' },
            '& .MuiTypography-root': { color: 'common.white' },
            '& .MuiBreadcrumbs-separator': { color: 'common.white' },
          }}
          textColor="common.white"
        />

        <Box
          sx={{
            gap: 5,
            display: 'flex',
            justifyContent: { md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {renderInfo()}
          {renderActions()}
        </Box>
      </Container>
    </Box>
  );
}

