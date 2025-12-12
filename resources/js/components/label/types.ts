import type { Theme, SxProps } from '@mui/material/styles';
import type { PaletteColorKey, CommonColorsKeys } from '@/theme/core';

// ----------------------------------------------------------------------

export type LabelColor = PaletteColorKey | CommonColorsKeys | 'default';

export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';

export interface LabelProps {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  color?: LabelColor;
  variant?: LabelVariant;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

