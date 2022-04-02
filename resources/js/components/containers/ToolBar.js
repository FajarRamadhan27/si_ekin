import { IconButton, Toolbar } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

function ToolBar(props) {

    const { toggleDrawer } = props.uiAttr

    return (
        <Toolbar
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            }}
        >
            <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
    )
}

export default ToolBar
