import { Divider, List } from "@mui/material"
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ApprovalIcon from '@mui/icons-material/Approval';
import BadgeIcon from '@mui/icons-material/Badge';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PowerSettingsNew } from '@mui/icons-material';

function SideBar (props) {

    const { setUser, setToken } = props.uiAttr

    const handleLogout = () => {
        setUser(null)
        setToken(null)
        localStorage.clear('jwtToken')
        localStorage.clear('user')
      }


    return (
        <List component="nav">
            <React.Fragment>
                <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                Data Master
                </ListSubheader>
                <ListItemButton>
                <ListItemIcon>
                    <BadgeIcon />
                </ListItemIcon>
                <ListItemText primary="Data Karyawan" />
                </ListItemButton>
                <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Index Penilaian" />
                </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                Assessment
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                    <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Penilaian Saya" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                    <ApprovalIcon />
                    </ListItemIcon>
                    <ListItemText primary="Approval" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                    <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItemButton>
                </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                Laporan
                </ListSubheader>
                <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Rangking" />
                </ListItemButton>
                <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Nilai Saya" />
                </ListItemButton>
                <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Rangking" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon> <PowerSettingsNew /> </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </List>
    )
}

export default SideBar
