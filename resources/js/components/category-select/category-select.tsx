import type { TextFieldProps } from '@mui/material/TextField';
import type {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import type { FormationCategory } from '@/types/formation';

import { useId, useMemo, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

type ExcludedProps = 'options' | 'renderOption' | 'renderInput' | 'getOptionLabel';

export type CategorySelectProps = Omit<
  AutocompleteProps<FormationCategory, false, false, false>,
  ExcludedProps
> &
  Pick<TextFieldProps, 'label' | 'error' | 'variant' | 'helperText' | 'placeholder' | 'hiddenLabel'> & {
    categories: FormationCategory[];
    slotProps?: {
      textField?: Partial<TextFieldProps>;
    };
  };

export function CategorySelect({
  id,
  label,
  error,
  variant,
  categories,
  slotProps,
  helperText,
  hiddenLabel,
  placeholder,
  ...other
}: CategorySelectProps) {
  const uniqueId = useId();

  const options = useMemo(() => categories, [categories]);

  const getOptionLabel = useCallback((option: FormationCategory | string) => {
    if (typeof option === 'string') {
      return option;
    }
    return option.name;
  }, []);

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement> & { key: any }, option: FormationCategory) => {
      const { key, ...otherProps } = props;

      return (
        <li key={key} {...otherProps}>
          {option.name}
        </li>
      );
    },
    []
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const textFieldSlotProps: TextFieldProps['slotProps'] = {
        ...slotProps?.textField?.slotProps,
        htmlInput: {
          ...params.inputProps,
          ...slotProps?.textField?.slotProps?.htmlInput,
          autoComplete: 'new-password',
        },
        input: {
          ...params.InputProps,
          ...slotProps?.textField?.slotProps?.input,
        },
      };

      return (
        <TextField
          {...params}
          label={label}
          variant={variant ?? 'outlined'}
          placeholder={placeholder}
          helperText={helperText}
          hiddenLabel={hiddenLabel}
          error={!!error}
          {...slotProps?.textField}
          slotProps={textFieldSlotProps}
        />
      );
    },
    [error, helperText, hiddenLabel, label, placeholder, slotProps?.textField, variant]
  );

  return (
    <Autocomplete
      id={id ?? `${uniqueId}-category-select`}
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      {...slotProps}
      {...other}
    />
  );
}
