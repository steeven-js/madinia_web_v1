import { useEffect } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

type SimpleLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export function SimpleLightbox({ open, onClose, src, alt }: SimpleLightboxProps) {
  // Gestion de la touche Échap uniquement
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

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Bouton de fermeture */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <Iconify icon="carbon:close" width={24} />
      </IconButton>

      {/* Image */}
      <Box
        component="img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        sx={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: 1,
        }}
      />
    </Box>
  );
}

