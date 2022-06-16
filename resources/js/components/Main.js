import ReactDOM from 'react-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store';

function Main() {

    const [ initialMenu, setInitialMenu] = useState('SIGN_IN'),
        [token, setToken] = useState(localStorage.getItem('jwtToken'))

        const user = useSelector(state => state.user.value )

    if (user) {
        return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Dashboard uiAttr={{token, setToken}}/>
            </LocalizationProvider>
        )
    } else {
        switch(initialMenu) {
            case 'SIGN_UP'  : return <SignUp uiAttr={{ setInitialMenu }}/>
            default         : return <SignIn uiAttr={{ setInitialMenu }}/>
            case 'SIGN_IN'  : return <SignIn uiAttr={{ setInitialMenu }}/>
        }
    }
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    , document.getElementById('app'));
}
