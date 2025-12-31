import type { SxProps, Theme } from '@mui/material/styles';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { RouterLink } from '@/routing/components';

// ----------------------------------------------------------------------

type BreadcrumbLink = {
  name?: string;
  href?: string;
  icon?: React.ReactNode;
};

type CustomBreadcrumbsProps = {
  links?: BreadcrumbLink[];
  sx?: SxProps<Theme>;
  heading?: string;
  action?: React.ReactNode;
  textColor?: string;
};

export function CustomBreadcrumbs({
  links = [],
  sx,
  heading,
  action,
  textColor,
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1];

  return (
    <Box sx={{ mb: 5, ...sx }}>
      {heading && (
        <Typography variant="h3" sx={{ mb: 3 }}>
          {heading}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumbs
          separator="›"
          sx={{
            typography: 'body2',
            ...(textColor && {
              color: textColor,
              '& .MuiBreadcrumbs-separator': { color: textColor },
            }),
          }}
        >
          {links.map((link, index) => {
            const isLast = index === links.length - 1;

            return isLast || !link.href ? (
              <Typography
                key={link.name ?? index}
                variant="body2"
                sx={{ 
                  color: textColor || (isLast ? 'text.primary' : 'text.disabled'),
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {link.name}
              </Typography>
            ) : (
              <Link
                key={link.name ?? index}
                component={RouterLink}
                href={link.href}
                color="inherit"
                sx={{
                  display: 'inline-flex',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: textColor || 'inherit',
                  }}
                >
                  {link.icon && <Box sx={{ display: 'flex' }}>{link.icon}</Box>}
                  {link.name}
                </Box>
              </Link>
            );
          })}
        </Breadcrumbs>

        {action}
      </Box>
    </Box>
  );
}

