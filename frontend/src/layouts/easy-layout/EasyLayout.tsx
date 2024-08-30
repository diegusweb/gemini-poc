import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { EasyContainer } from "../components/easy-container/EasyContainer"

export const EasyLayout = () => {
    return (
        <Box sx={{ display: 'flex'}}>
            <EasyContainer>
                <Outlet />
            </EasyContainer>
        </Box>
    )
}