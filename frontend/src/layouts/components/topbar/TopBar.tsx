import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';



import { useAppSelector } from '../../../store';
import { LogoutButton } from '../../../components/logout-button/LogoutButton';
import { ToggleThemeModeButton } from '../../../components';

interface StyledTopBarProps extends MuiAppBarProps {
  topbarHeight: number;
  sidebarWidth: number;
  open: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'topbarHeight' && prop !== 'sidebarWidth',
})<StyledTopBarProps>(({ theme, topbarHeight, sidebarWidth, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: topbarHeight,
  ...(open && {
    marginLeft: sidebarWidth,
    height: topbarHeight,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Topbar = () => {
  const { topbarHeight, sidebarWidth, isSidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <StyledAppBar position="absolute" topbarHeight={topbarHeight} sidebarWidth={sidebarWidth} open={isSidebarOpen}>
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          React App From Scratch
        </Typography>

        <Box>
          <ToggleThemeModeButton />
          <LogoutButton />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};