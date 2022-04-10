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
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PowerSettingsNew } from '@mui/icons-material';
import { MENU_APPROVAL, MENU_ASSESSMENT_INDEX, MENU_EMPLOYEE_MASTER, MENU_MY_ASSESSMENT, MENU_MY_SCORE, MENU_RANKING } from "../../helpers/constant";
import ConfirmLogOutModal from "../modals/ConfirmLogOutModal";

function SideBar (props) {

    const [ logOutModal, setModalLogOut ] = React.useState(false)
    const { setUser, setToken, setActiveMenu } = props.uiAttr


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
                <ListSubheader component="div" inset>Data Master</ListSubheader>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_EMPLOYEE_MASTER)}
                >
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Data Karyawan" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_ASSESSMENT_INDEX)}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Index Penilaian" />
                </ListItemButton>

            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>Assessment</ListSubheader>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_MY_ASSESSMENT)}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Penilaian Saya" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_APPROVAL)}
                >
                    <ListItemIcon>
                    <ApprovalIcon />
                    </ListItemIcon>
                    <ListItemText primary="Approval" />
                </ListItemButton>

            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>Laporan</ListSubheader>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_RANKING)}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rangking" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => setActiveMenu(MENU_MY_SCORE)}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nilai Saya" />
                </ListItemButton>

            </React.Fragment>
            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListItemButton onClick={() => setModalLogOut(true)}>
                    <ListItemIcon> <PowerSettingsNew /> </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>

            {
                logOutModal ? <ConfirmLogOutModal uiAttr={{ logOutModal, setModalLogOut, setUser, setToken }}/> : null
            }

        </List>
    )
}

export default SideBar
