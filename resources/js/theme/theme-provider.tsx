import type { Theme, ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles';
import type {} from './extend-theme-types';
import type { ThemeOptions, SettingsState } from './types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { Rtl } from './with-settings/right-to-left';
import { themeConfig } from './theme-config';
import { CONFIG } from '@/global-config';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<MuiThemeProviderProps<Theme>> & {
  themeOverrides?: ThemeOptions;
  modeStorageKey?: string;
  defaultMode?: 'light' | 'dark';
};

// Default settings sans le contexte Settings
const defaultSettings: SettingsState = {
  mode: themeConfig.defaultMode,
  direction: themeConfig.direction,
  primaryColor: 'default',
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.primary,
  version: CONFIG.appVersion,
};

export function ThemeProvider({ 
  themeOverrides, 
  children, 
  defaultMode, 
  ...other 
}: ThemeProviderProps) {
  const settingsState: SettingsState = {
    ...defaultSettings,
    ...(defaultMode && { mode: defaultMode }),
  };

  const theme = createTheme({
    settingsState,
    themeOverrides,
  });

  return (
    <ThemeVarsProvider disableTransitionOnChange theme={theme} {...other}>
      <CssBaseline />
      <Rtl direction={settingsState.direction}>{children}</Rtl>
    </ThemeVarsProvider>
  );
}
