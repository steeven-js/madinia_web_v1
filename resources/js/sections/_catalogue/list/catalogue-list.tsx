import type { BoxProps } from '@mui/material/Box';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { CatalogueItem } from './catalogue-item';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  formations: Formation[];
};

export function CatalogueList({ formations, sx, ...other }: Props) {
  return (
    <>
      <Box
        sx={[
          { gap: 4, display: 'flex', flexDirection: 'column', pb: { xs: 5, md: 10 } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {formations.map((formation) => (
            <CatalogueItem key={formation.id} formation={formation} />
        ))}
      </Box>

      {/* <Pagination
        count={10}
        sx={{
          mb: 10,
          mt: { xs: 5, md: 10 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      /> */}
    </>
  );
}

