import type { SettingsState, SettingsProviderProps } from '../types';

import { isEqual } from 'es-toolkit';
import { useLocalStorage } from 'minimal-shared/hooks';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { getStorage as getStorageValue } from 'minimal-shared/utils';

import { SettingsContext } from './settings-context';
import { SETTINGS_STORAGE_KEY } from '../settings-config';

// ----------------------------------------------------------------------

export function SettingsProvider({
  children,
  defaultSettings,
  storageKey = SETTINGS_STORAGE_KEY,
}: SettingsProviderProps) {
  const { state, setState, resetState, setField } = useLocalStorage<SettingsState>(
    storageKey,
    defaultSettings
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  // Comparer en normalisant le mode "system" qui peut être équivalent au mode par défaut
  const canReset = useMemo(() => {
    // Normaliser le mode pour la comparaison
    // Si defaultSettings.mode est "light" et state.mode est "system", 
    // on considère que c'est équivalent (le système détecte automatiquement le mode)
    const normalizedState = { ...state };
    const normalizedDefault = { ...defaultSettings };
    
    // Si le mode par défaut est "light" et le mode actuel est "system", 
    // normaliser pour la comparaison
    if (normalizedDefault.mode === 'light' && normalizedState.mode === 'system') {
      normalizedState.mode = 'light';
    }
    
    // Exclure la version de la comparaison car elle peut changer sans modification utilisateur
    const { version: _, ...stateWithoutVersion } = normalizedState;
    const { version: __, ...defaultWithoutVersion } = normalizedDefault;
    
    return !isEqual(stateWithoutVersion, defaultWithoutVersion);
  }, [state, defaultSettings]);

  const onReset = useCallback(() => {
    resetState(defaultSettings);
  }, [defaultSettings, resetState]);

  // Version check and reset handling
  useEffect(() => {
    const storedValue = getStorageValue<SettingsState>(storageKey);

    if (storedValue) {
      try {
        if (!storedValue.version || storedValue.version !== defaultSettings.version) {
          onReset();
        }
      } catch {
        onReset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedValue = useMemo(
    () => ({
      canReset,
      onReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      state,
      setState,
      setField,
    }),
    [canReset, onReset, openDrawer, onCloseDrawer, onToggleDrawer, state, setField, setState]
  );

  return <SettingsContext value={memoizedValue}>{children}</SettingsContext>;
}



