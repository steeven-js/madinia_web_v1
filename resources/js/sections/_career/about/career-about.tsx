import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from '@/global-config';
import { useTranslate } from '@/locales';

import { AnimateCountUp } from '@/components/animate';

// ----------------------------------------------------------------------

export function CareerAbout({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('pages');

  // Récupérer les statistiques depuis les traductions
  const stats = t('about.career.stats', { returnObjects: true }) as any;
  const SUMMARY = [
    { 
      name: stats.formations.name, 
      number: stats.formations.number 
    },
    { 
      name: stats.clients.name, 
      number: stats.clients.number 
    },
    { 
      name: stats.partners.name, 
      number: stats.partners.number 
    },
    { 
      name: stats.team.name, 
      number: stats.team.number 
    },
  ];

  return (
    <Box
      component="section"
      sx={[
        {
          pt: { xs: 3, md: 10 },
          pb: { xs: 5, md: 10 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Typography
          variant="overline"
          sx={{
            mb: 1,
            display: 'block',
            color: 'primary.main',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {t('about.career.overline')}
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'space-between',
            mb: { xs: 5, md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Typography variant="h2">{t('about.career.title')}</Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{
              rowGap: 3,
              columnGap: { xs: 0, md: 3 },
              display: 'grid',
              color: 'text.secondary',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            }}
          >
            <Typography>
              {t('about.career.description1')}
            </Typography>

            <Typography>
              {t('about.career.description2')}
            </Typography>
          </Grid>
        </Grid>

        <Section summary={SUMMARY} />
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type SectionProps = BoxProps & {
  summary: Array<{ name: string; number: number }>;
};

function Section({ summary, sx, ...other }: SectionProps) {
  const { t } = useTranslate('pages');

  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [`url(${CONFIG.assetsDir}/assets/images/career/about-team.webp)`],
          }),
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={(theme) => ({
          py: { xs: 8, md: 10 },
          pb: { xs: 10, md: 12 },
          ml: 'auto',
          width: { lg: 0.5 },
          minHeight: { xs: 400, md: 500 },
          textAlign: 'center',
          color: 'common.white',
          px: { xs: 2.5, md: 5 },
          backgroundImage: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.common.black} 75%)`,
        })}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 3,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {t('about.career.section.title')}
        </Typography>

        <Typography 
          sx={{ 
            mb: 5, 
            opacity: 0.72,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {t('about.career.section.description')}
        </Typography>

        <Box sx={{ gap: { xs: 3, md: 5 }, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {summary.map((value) => (
            <Box
              key={value.name}
              sx={{
                color: 'grey.500',
                overflow: 'hidden',
                typography: 'body2',
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  gap: 0.5,
                  mx: 'auto',
                  display: 'flex',
                  color: 'primary.main',
                  justifyContent: 'center',
                }}
              >
                <AnimateCountUp variant="h2" to={value.number} toFixed={0} />
                <Box component="span" sx={{ typography: 'h3' }}>
                  +
                </Box>
              </Box>
              {value.name}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
