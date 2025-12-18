import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback, useEffect } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { FlagIcon } from '@/components/flag-icon';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'app-locale';

export type LanguagePopoverProps = IconButtonProps & {
  data?: {
    value: string;
    label: string;
    countryCode: string;
  }[];
};

export function LanguagePopover({ data = [], sx, ...other }: LanguagePopoverProps) {
  const { open, onClose, onOpen, anchorEl } = usePopover();

  // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
  const getInitialLocale = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && data.find((lang) => lang.value === stored)) {
        return stored;
      }
    }
    // Par défaut, utiliser 'fr' ou le premier élément du tableau
    return data.find((lang) => lang.value === 'fr')?.value || data[0]?.value || 'fr';
  };

  const [locale, setLocale] = useState<string>(getInitialLocale());

  // Synchroniser avec localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  // Écouter l'événement de reset depuis Settings
  useEffect(() => {
    const handleLocaleReset = (event: CustomEvent) => {
      const newLocale = event.detail?.locale || 'fr';
      setLocale(newLocale);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLocale);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('locale-reset', handleLocaleReset as EventListener);
      return () => {
        window.removeEventListener('locale-reset', handleLocaleReset as EventListener);
      };
    }
  }, []);

  const currentLang = data.find((lang) => lang.value === locale) || data[0];

  const handleChangeLang = useCallback(
    (newLang: string) => {
      setLocale(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang);
      }
      onClose();
    },
    [onClose]
  );

  const renderButton = () => (
    <IconButton
      onClick={onOpen}
      sx={[
        {
          p: 0,
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <FlagIcon code={currentLang?.countryCode} />
    </IconButton>
  );

  const renderMenuList = () => (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MenuList sx={{ width: 160, minHeight: 72 }}>
        {data?.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang?.value}
            onClick={() => handleChangeLang(option.value)}
            sx={{ gap: 2 }}
          >
            <FlagIcon code={option.countryCode} />
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}



