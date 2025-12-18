import type { Theme, SxProps } from '@mui/material/styles';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { ICourseFiltersProps } from '@/types/course';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

const autocompleteProps = {
  root: { limitTags: 2, multiple: true, disableCloseOnSelect: true },
  chip: { size: 'small', variant: 'soft' },
  paper: {
    sx: {
      [`& .${autocompleteClasses.option}`]: { [`& .${checkboxClasses.root}`]: { p: 0, mr: 1 } },
    },
  },
} as const;

const filtersStyles: SxProps<Theme> = {
  gap: 2.5,
  width: 280,
  flexShrink: 0,
  flexDirection: 'column',
};

// ----------------------------------------------------------------------

type ElearningFiltersProps = {
  open: boolean;
  onClose: () => void;
  filters: UseSetStateReturn<ICourseFiltersProps>;
  options: {
    levels: string[];
    categories: string[];
  };
};

export function FormationsFilters({ open, onClose, filters, options }: ElearningFiltersProps) {
  const { state, setState } = filters;

  // Gestion de la touche Échap pour fermer le drawer mobile
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const renderFilters = () => (
    <>
      <TextField
        fullWidth
        hiddenLabel
        placeholder="Rechercher..."
        value={state.keyword}
        onChange={(event) => setState({ keyword: event.target.value })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" style={{ color: '#9e9e9e' }} />
              </InputAdornment>
            ),
          },
        }}
      />


      {/* <Block title="Duration">
        <FilterSelect
          name="duration"
          label="All duration"
          filters={filters}
          options={options.durations}
        />
      </Block> */}

          <Block title="Catégorie">
        <Autocomplete
          {...autocompleteProps.root}
          options={options.categories}
          value={state.categories}
          onChange={(event, newValue) => setState({ categories: newValue })}
          renderInput={(params) => (
            <TextField
              {...params}
              hiddenLabel={!state.categories.length}
                  placeholder="Toutes les catégories"
              slotProps={{ input: { ...params.InputProps, autoComplete: 'search' } }}
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...otherProps } = props;

            return (
              <li key={key} {...otherProps}>
                <Checkbox
                  size="small"
                  disableRipple
                  checked={selected}
                  slotProps={{
                    input: {
                      id: `${option}-checkbox`,
                      'aria-label': `${option} checkbox`,
                    },
                  }}
                />
                {option}
              </li>
            );
          }}
          slotProps={{
            paper: autocompleteProps.paper,
            chip: autocompleteProps.chip,
          }}
        />
      </Block>

          <Block title="Niveau">
            <FilterSelect name="level" label="Tous les niveaux" filters={filters} options={options.levels} />
          </Block>

          <Block title="Certification">
            <FilterSelect 
              name="certification" 
              label="Toutes les formations" 
              filters={filters} 
              options={['Certifiante', 'Non certifiante']} 
            />
          </Block>

    </>
  );

  const renderDesktop = () => (
    <Box sx={{ ...filtersStyles, display: { xs: 'none', md: 'flex' } }}>{renderFilters()}</Box>
  );

  const renderMobile = () => (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: { ...filtersStyles, p: 3 } },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filtres</Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="carbon:close" />
        </IconButton>
      </Box>
      {renderFilters()}
    </Drawer>
  );

  return (
    <>
      {renderDesktop()}
      {renderMobile()}
    </>
  );
}

// ----------------------------------------------------------------------

type BlockProps = {
  title: string;
  children: React.ReactNode;
};

function Block({ title, children }: BlockProps) {
  return (
    <div>
      <Typography variant="overline" sx={{ mb: 1, display: 'block', color: 'text.disabled' }}>
        {title}
      </Typography>

      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

type FilterSelectProps = {
  label: string;
  options: string[];
  sx?: SxProps<Theme>;
  name: keyof ICourseFiltersProps;
  filters: UseSetStateReturn<ICourseFiltersProps>;
};

export function FilterSelect({ sx, name, label, options, filters }: FilterSelectProps) {
  const { state, setField } = filters;

  const value = state[name];

  return (
    <FormControl fullWidth hiddenLabel sx={sx}>
      <Select
        multiple
        displayEmpty
        value={value}
        inputProps={{ id: `${name}-filter-select` }}
        onChange={(event) => {
          const newValue =
            typeof event.target.value === 'string'
              ? event.target.value.split(',')
              : event.target.value;

          setField(name, newValue);
        }}
        renderValue={(selected) => {
          if (Array.isArray(selected) && selected?.length) {
            return (
              <Typography variant="subtitle2" component="span">
                {selected.join(', ')}
              </Typography>
            );
          }
          return (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {label}
            </Typography>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              size="small"
              checked={(state[name] as string[])?.includes(option)}
              sx={{ [`&.${checkboxClasses.root}`]: { p: 0, mr: 1 } }}
            />
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

