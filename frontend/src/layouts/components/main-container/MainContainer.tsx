
import { Box, useTheme } from "@mui/material";
import { useAppSelector } from "../../../store";
import { ReactNode } from "react";
import { ToggleSidebarButton } from "../toggle-sidebar-button/ToggleSidebarButton";

interface MainContainerProps {
    children: ReactNode;
  }

export const MainContainer = ({ children }: MainContainerProps) => {
    const theme = useTheme();
    const { topbarHeight } = useAppSelector((state) => state.ui);
  
    console.log(topbarHeight)
    return (
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.default,
          flexGrow: 1,
          height: `calc(100vh - ${topbarHeight}px)`,
          marginTop: `53px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ToggleSidebarButton />
        <Box
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    );
  };