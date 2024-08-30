import { ReactNode } from 'react';

import { Box, useTheme } from '@mui/material';

interface SimpleContainerProps {
  children: ReactNode;
}

export const EasyContainer = ({ children }: SimpleContainerProps) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        height: '00vh',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};