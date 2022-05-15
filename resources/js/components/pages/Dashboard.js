import * as React from 'react';
import Box from '@mui/material/Box';
import Home from './sidebar_menus/Home';
import NavBar from '../containers/NavBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import SideBar from '../containers/Sidebar';
import MuiDrawer from '@mui/material/Drawer';
import ToolBar from '../containers/ToolBar';
import Ranking from './sidebar_menus/Ranking';
import MyScore from './sidebar_menus/MyScore';
import Profile from './sidebar_menus/Profile';
import Copyright from '../containers/copyright';
import Container from '@mui/material/Container';
import Approval from './sidebar_menus/Approval';
import CssBaseline from '@mui/material/CssBaseline';
import MyAssessment from './Sidebar_menus/MyAssessment';
import AssessmentIndex from './Sidebar_menus/AssessmentIndex';
import EmployeeMasterData from './sidebar_menus/EmployeMasterData';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { MENU_APPROVAL, MENU_ASSESSMENT_INDEX, MENU_DASHBOARD, MENU_EMPLOYEE_MASTER, MENU_MY_ASSESSMENT, MENU_MY_SCORE, MENU_PROFILE, MENU_RANKING } from '../../helpers/constant';
import { Route, Routes } from 'react-router-dom';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true),
    [activeMenu, setActiveMenu] = React.useState()

  const { user, setUser, token, setToken } = props.uiAttr

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <NavBar uiAttr={{ user, toggleDrawer, open }}/>

        <Drawer variant="permanent" open={open}>
          <ToolBar uiAttr={{ toggleDrawer }}/>
          <Divider />
          <SideBar uiAttr={{ setUser, setToken, setActiveMenu }}/>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="100" sx={{ mt: 2, mb: 4 }}>
            <Routes>
                <Route path={MENU_DASHBOARD} element={<Home/>}/>
                <Route path={MENU_EMPLOYEE_MASTER} element={<EmployeeMasterData/>}/>
                <Route path={MENU_ASSESSMENT_INDEX} element={<AssessmentIndex/>}/>
                <Route path={MENU_MY_ASSESSMENT} element={<MyAssessment/>}/>
                <Route path={MENU_APPROVAL} element={<Approval/>}/>
                <Route path={MENU_RANKING} element={<Ranking/>}/>
                <Route path={MENU_MY_SCORE} element={<MyScore/>}/>
                <Route path={MENU_PROFILE} element={<Profile/>}/>
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard(props) {
  return <DashboardContent {...props}/>;
}
