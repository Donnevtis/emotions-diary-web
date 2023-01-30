import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Fallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Fallback;
