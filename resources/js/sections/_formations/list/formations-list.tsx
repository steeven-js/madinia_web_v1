import type { BoxProps } from '@mui/material/Box';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { FormationsItem } from './formations-item';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  formations: Formation[];
};

export function FormationsList({ formations, sx, ...other }: Props) {
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
            <FormationsItem key={formation.id} formation={formation} />
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

