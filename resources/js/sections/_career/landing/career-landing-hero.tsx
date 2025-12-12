import type { BoxProps } from '@mui/material/Box';
import type { IJobFiltersProps } from '@/types/job';

import { varAlpha } from 'minimal-shared/utils';
import { useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { fShortenNumber } from '@/utils/format-number';

import { CONFIG } from '@/global-config';
import { _brands, _jobTitles } from '@/_mock';

import { Iconify } from '@/components/iconify';
import { SvgColor } from '@/components/svg-color';
import { CountrySelect } from '@/components/country-select';

// ----------------------------------------------------------------------

type FiltersProps = Partial<IJobFiltersProps>;

export function CareerLandingHero({ sx, ...other }: BoxProps) {
  const filters = useSetState<FiltersProps>({ keyword: null, location: null });

  const renderFilters = () => (
    <Box
      sx={{
        width: 1,
        maxWidth: 560,
        display: 'flex',
        borderRadius: 1.25,
        alignItems: 'center',
        bgcolor: 'common.white',
        justifyContent: 'center',
        p: { xs: 1, md: 0 },
        flexDirection: { xs: 'column', md: 'row' },
        [`& .${inputBaseClasses.root}`]: {
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
          [`&.${inputBaseClasses.focused}`]: { bgcolor: 'transparent' },
        },
      }}
    >
      <Autocomplete
        sx={{ width: 1 }}
        options={_jobTitles}
        value={filters.state.keyword}
        onChange={(event, newValue: string | null) => filters.setState({ keyword: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            hiddenLabel
            placeholder="Job title, keywords..."
            slotProps={{
              input: {
                ...params.InputProps,
                autoComplete: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="carbon:search" sx={{ color: 'text.disabled', ml: 0.5 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Divider
        orientation="vertical"
        sx={{ my: 'auto', height: 24, display: { xs: 'none', md: 'block' } }}
      />

      <CountrySelect
        fullWidth
        hiddenLabel
        placeholder="Location"
        value={filters.state.location}
        onChange={(event, newValue: string) => filters.setState({ location: newValue })}
      />

      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={(theme) => ({
          width: 1,
          [theme.breakpoints.up('md')]: {
            mr: 0.5,
            width: 48,
            minWidth: 'auto',
          },
        })}
      >
        <Iconify icon="carbon:search" />
      </Button>
    </Box>
  );

  const renderBrands = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 2, lg: 4 },
      }}
    >
      {_brands.slice(0, 4).map((brand) => (
        <SvgColor
          key={brand.id}
          src={brand.image}
          sx={{ width: 94, height: 28, color: 'text.disabled' }}
        />
      ))}
    </Box>
  );

  const renderSummary = () => (
    <Stack
      divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      sx={{
        color: 'common.white',
        flexDirection: 'row',
        gap: { xs: 1.5, sm: 3 },
      }}
    >
      {[
        { label: 'Jobs', value: 2000000 },
        { label: 'Successful hiring', value: 500000 },
        { label: 'Partners', value: 250000 },
        { label: 'Employee', value: 156000 },
      ].map((item) => (
        <div key={item.label}>
          <Typography component="span" variant="h4" sx={{ mb: 0.75, display: 'block' }}>
            {fShortenNumber(item.value)}+
          </Typography>
          <Typography component="span" variant="body2" sx={{ opacity: 0.48 }}>
            {item.label}
          </Typography>
        </div>
      ))}
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          py: 10,
          overflow: 'hidden',
          position: 'relative',
          [theme.breakpoints.up('md')]: {
            py: 15,
            minHeight: 760,
            height: '100vh',
            maxHeight: 1440,
            display: 'flex',
            alignItems: 'center',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Vidéo en arrière-plan */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </Box>
      
      {/* Overlay sombre sur la vidéo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0),
          zIndex: 1,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            gap: 5,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h1" sx={{ color: 'common.white' }}>
            {`Get the `}
            <Box
              component="span"
              sx={(theme) => ({
                ...theme.mixins.textGradient(
                  `90deg, ${theme.vars.palette.primary.main} 20%, ${theme.vars.palette.secondary.main} 100%`
                ),
              })}
            >
              Career
            </Box>

            {` you deserve`}
          </Typography>

          <Typography sx={{ color: 'grey.500', maxWidth: 480 }}>
            Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis
            venenatis ante odio sit amet eros.
          </Typography>

          {renderFilters()}
          {renderBrands()}
          {renderSummary()}
        </Box>
      </Container>
    </Box>
  );
}
