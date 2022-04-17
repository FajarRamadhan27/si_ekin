import ReactDOM from 'react-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function Main() {

    const [ initialMenu, setInitialMenu] = useState('SIGN_IN'),
        [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))),
        [token, setToken] = useState(localStorage.getItem('jwtToken'))

    if (user) {
        return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Dashboard uiAttr={{ user, setUser, token, setToken}}/>
            </LocalizationProvider>
        )
    } else {
        switch(initialMenu) {
            case 'SIGN_UP'  : return <SignUp uiAttr={{ setInitialMenu }} data={{ setUser }}/>
            default         : return <SignIn uiAttr={{ setInitialMenu }} data={{ setUser }}/>
            case 'SIGN_IN'  : return <SignIn uiAttr={{ setInitialMenu }} data={{ setUser }}/>
        }
    }
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
