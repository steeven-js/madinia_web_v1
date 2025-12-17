import type { Theme, SxProps } from '@mui/material/styles';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { CONFIG } from '@/global-config';

import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

type SocialLinksProps = {
  variant?: 'icons' | 'buttons';
  size?: 'small' | 'medium' | 'large';
  spacing?: number;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  showLabels?: boolean;
};

type SocialNetwork = {
  name: string;
  icon: 'socials:facebook' | 'socials:instagram' | 'socials:twitter' | 'socials:linkedin';
  url: string;
  color: string;
};

const socialNetworks: SocialNetwork[] = [
  {
    name: 'Facebook',
    icon: 'socials:facebook' as const,
    url: CONFIG.socialMedia.facebook,
    color: '#1877F2',
  },
  {
    name: 'Instagram',
    icon: 'socials:instagram' as const,
    url: CONFIG.socialMedia.instagram,
    color: '#E4405F',
  },
  {
    name: 'Twitter',
    icon: 'socials:twitter' as const,
    url: CONFIG.socialMedia.twitter,
    color: '#1DA1F2',
  },
  {
    name: 'LinkedIn',
    icon: 'socials:linkedin' as const,
    url: CONFIG.socialMedia.linkedin,
    color: '#0A66C2',
  },
];

export function SocialLinks({
  variant = 'icons',
  size = 'medium',
  spacing = 1,
  sx,
  iconSx,
  showLabels = false,
}: SocialLinksProps): React.JSX.Element {
  const iconSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;

  const renderIcon = (social: SocialNetwork) => <Iconify icon={social.icon} width={iconSize} />;

  if (variant === 'buttons') {
    return (
      <Stack direction="row" spacing={spacing} sx={sx}>
        {socialNetworks.map((social) => (
          <IconButton
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: social.color,
                bgcolor: 'action.hover',
              },
            }}
          >
            {renderIcon(social)}
          </IconButton>
        ))}
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={spacing} sx={sx}>
      {socialNetworks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: showLabels ? 1 : 0,
            '&:hover': {
              color: social.color,
            },
          }}
        >
          {renderIcon(social)}
          {showLabels && social.name}
        </Link>
      ))}
    </Stack>
  );
}
