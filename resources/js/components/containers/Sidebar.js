import * as React from 'react';
import { Divider, List } from "@mui/material"
import { useNavigate } from 'react-router-dom';
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
import ConfirmLogOutModal from "../modals/ConfirmLogOutModal";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InputIcon from '@mui/icons-material/Input';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BallotIcon from '@mui/icons-material/Ballot';
import { MENU_APPROVAL, MENU_ASSESSMENT_INDEX, MENU_ASSESSMENT_INPUT, MENU_DASHBOARD, MENU_EMPLOYEE_MASTER, MENU_HISTORY, MENU_MY_ASSESSMENT, MENU_MY_SCORE, MENU_PROFILE, MENU_RANKING } from "../../helpers/constant";
import { useSelector } from 'react-redux';

function SideBar (props) {

    const navigate = useNavigate()

    const [ logOutModal, setModalLogOut ] = React.useState(false)
    const { setToken } = props.uiAttr

    const { user } = useSelector(state => state)

    const handleSidebarClick = (path) => {
        navigate(path)
    }

    return (
        <List component="nav">

            <React.Fragment>

                <ListItemButton
                    onClick={() => handleSidebarClick(MENU_DASHBOARD)}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

            </React.Fragment>

            {
                user.value.role != 'Karyawan' &&
                <>
                    <Divider sx={{ my: 1 }} />

                    <React.Fragment>
                        <ListSubheader component="div" inset>Data Master</ListSubheader>

                        <ListItemButton
                            onClick={() => handleSidebarClick(MENU_EMPLOYEE_MASTER)}
                        >
                            <ListItemIcon>
                                <BadgeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Data Karyawan" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => handleSidebarClick(MENU_ASSESSMENT_INDEX)}
                        >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Index Penilaian" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => handleSidebarClick(MENU_ASSESSMENT_INPUT)}
                        >
                            <ListItemIcon>
                                <InputIcon />
                            </ListItemIcon>
                            <ListItemText primary="Input Penilaian" />
                        </ListItemButton>

                    </React.Fragment>
                </>
            }


            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>Assessment</ListSubheader>

                <ListItemButton
                    onClick={() => handleSidebarClick(MENU_MY_ASSESSMENT)}
                >
                    <ListItemIcon>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Penilaian Saya" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => handleSidebarClick(MENU_APPROVAL)}
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
                    onClick={() => handleSidebarClick(MENU_RANKING)}
                >
                    <ListItemIcon>
                        <AutoGraphIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rangking" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => handleSidebarClick(MENU_MY_SCORE)}
                >
                    <ListItemIcon>
                        <BallotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nilai Saya" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => handleSidebarClick(MENU_HISTORY)}
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItemButton>

            </React.Fragment>
            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListItemButton onClick={() => handleSidebarClick(MENU_PROFILE)}>
                    <ListItemIcon> <ManageAccountsIcon /> </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
            </React.Fragment>

            <React.Fragment>
                <ListItemButton onClick={() => setModalLogOut(true)}>
                    <ListItemIcon> <PowerSettingsNew /> </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>

            {
                logOutModal ? <ConfirmLogOutModal uiAttr={{ logOutModal, setModalLogOut, setToken }}/> : null
            }

        </List>
    )
}

export default SideBar
