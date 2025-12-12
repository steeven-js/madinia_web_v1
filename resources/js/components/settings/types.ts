import type { Theme, SxProps } from '@mui/material/styles';
import type { ThemeColorPreset } from '@/theme/with-settings';

// ----------------------------------------------------------------------

export type SettingsState = {
  version: string;
  fontSize: number;
  fontFamily: string;
  primaryColor: ThemeColorPreset;
  mode: 'light' | 'dark' | 'system';
  direction: 'ltr' | 'rtl';
};

export type SettingsContextValue = {
  state: SettingsState;
  canReset: boolean;
  onReset: () => void;
  setState: (updateValue: Partial<SettingsState>) => void;
  setField: (name: keyof SettingsState, updateValue: SettingsState[keyof SettingsState]) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  defaultSettings: SettingsState;
  children: React.ReactNode;
  storageKey?: string;
};

export type SettingsDrawerProps = {
  sx?: SxProps<Theme>;
  defaultSettings: SettingsState;
};

