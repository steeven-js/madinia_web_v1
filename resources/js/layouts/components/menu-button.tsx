import type { IconButtonProps } from '@mui/material/IconButton';

import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export type MenuButtonProps = IconButtonProps;

export function MenuButton({ sx, ...other }: MenuButtonProps) {
  return (
    <IconButton
      aria-label="Menu button"
      sx={[{ p: 0, width: 40, height: 40 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <SvgIcon viewBox="0 0 32 32" sx={{ width: 22, height: 22 }}>
        <path fill="currentColor" d="M4 24h24v2H4zm0-6h24v2H4zm0-8h24v2H4z" />
      </SvgIcon>
    </IconButton>
  );
}

