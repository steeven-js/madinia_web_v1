import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type PostTagsProps = BoxProps & {
  tags: string[];
};

export function PostTags({ tags, sx, ...other }: PostTagsProps) {
  return (
    <Box
      sx={[
        {
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Typography variant="subtitle2">Tags</Typography>

      <Box
        sx={{
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {tags.map((tag) => (
          <Chip key={tag} label={tag} variant="soft" size="small" />
        ))}
      </Box>
    </Box>
  );
}
